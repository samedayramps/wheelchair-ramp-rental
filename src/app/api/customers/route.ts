import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const skip = (page - 1) * limit;

  try {
    const [customers, totalCount] = await Promise.all([
      prisma.customer.findMany({
        orderBy: { [sortBy]: sortOrder as 'asc' | 'desc' },
        skip,
        take: limit,
      }),
      prisma.customer.count(),
    ]);

    return NextResponse.json({
      customers,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        notes,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}