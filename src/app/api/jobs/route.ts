import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'scheduledAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const filterStatus = searchParams.get('filterStatus') || '';

  const skip = (page - 1) * limit;

  try {
    const where = filterStatus ? { status: filterStatus } : {};

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { [sortBy]: sortOrder as 'asc' | 'desc' },
        skip,
        take: limit,
        include: {
          customer: {
            select: { name: true },
          },
          components: {
            select: { id: true, type: true, size: true },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    const formattedJobs = jobs.map(job => ({
      ...job,
      customerName: job.customer.name,
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, status, scheduledAt, address, deliveryFee, installFee, monthlyRentalRate, notes, components } = body;

    // Validate input
    if (!customerId || !status || !scheduledAt || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if all components are available
    const componentIds = components.map((id: string) => id);
    const existingComponents = await prisma.component.findMany({
      where: { id: { in: componentIds } },
    });

    const unavailableComponents = existingComponents.filter(
      component => component.status !== 'AVAILABLE'
    );

    if (unavailableComponents.length > 0) {
      return NextResponse.json({
        error: 'Some components are not available',
        unavailableComponents: unavailableComponents.map(c => c.id),
      }, { status: 400 });
    }

    // Determine component status based on job status
    const componentStatus = status === 'INSTALLED' ? 'INSTALLED' : 'RESERVED';
    const componentLocation = status === 'INSTALLED' ? address : 'Warehouse';

    const newJob = await prisma.job.create({
      data: {
        customerId,
        status,
        scheduledAt: new Date(scheduledAt),
        address,
        deliveryFee: parseFloat(deliveryFee) || 0,
        installFee: parseFloat(installFee) || 0,
        monthlyRentalRate: parseFloat(monthlyRentalRate) || 0,
        notes,
        components: {
          connect: components.map((id: string) => ({ id }))
        }
      },
      include: {
        customer: {
          select: { name: true },
        },
        components: true,
      },
    });

    
    // Update component statuses and locations
    await prisma.component.updateMany({
      where: { id: { in: componentIds } },
      data: { status: componentStatus, location: componentLocation },
    });

    const formattedJob = {
      ...newJob,
      customerName: newJob.customer.name,
    };

    return NextResponse.json(formattedJob, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
