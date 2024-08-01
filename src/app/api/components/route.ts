// src/app/api/components/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComponentStatus, ComponentLocation } from '@/lib/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'type';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const filterType = searchParams.get('filterType') || '';
  const filterStatus = searchParams.get('filterStatus') || '';

  const skip = (page - 1) * limit;

  try {
    const where = {
      AND: [
        search ? {
          OR: [
            { id: { contains: search, mode: 'insensitive' } },
            { type: { contains: search, mode: 'insensitive' } },
            { size: { contains: search, mode: 'insensitive' } },
            { status: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        filterType ? { type: filterType } : {},
        filterStatus ? { status: filterStatus } : {},
      ],
    };

    const [components, totalCount] = await Promise.all([
      prisma.component.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          size: true,
          status: true,
          location: true,
          jobs: {
            select: {
              id: true,
            },
            take: 1,
          },
        },
      }),
      prisma.component.count({ where }),
    ]);

    const formattedComponents = components.map(comp => ({
      ...comp,
      jobId: comp.jobs[0]?.id || null,
      jobs: undefined,
    }));

    return NextResponse.json({
      components: formattedComponents,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch components:', error);
    return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, type, size } = body;

    const newComponent = await prisma.component.create({
      data: {
        id,
        type,
        size,
        status: ComponentStatus.AVAILABLE,
        location: ComponentLocation.WAREHOUSE,
      },
    });

    return NextResponse.json(newComponent, { status: 201 });
  } catch (error) {
    console.error('Failed to create component:', error);
    return NextResponse.json({ error: 'Failed to create component' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
    }

    const component = await prisma.component.findUnique({
      where: { id },
      include: { jobs: true }
    });

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    if (action === 'setMaintenance' && component.jobs.length > 0) {
      return NextResponse.json({ error: 'Cannot set component to maintenance while assigned to a job' }, { status: 400 });
    }

    let newStatus;
    let newLocation;
    if (action === 'setMaintenance') {
      newStatus = ComponentStatus.MAINTENANCE;
      newLocation = ComponentLocation.WAREHOUSE;
    } else if (action === 'setAvailable') {
      newStatus = ComponentStatus.AVAILABLE;
      newLocation = ComponentLocation.WAREHOUSE;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedComponent = await prisma.component.update({
      where: { id },
      data: {
        status: newStatus,
        location: newLocation,
      },
    });

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ error: 'Failed to update component' }, { status: 500 });
  }
}