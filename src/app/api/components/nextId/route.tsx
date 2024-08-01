import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix');
  const size = searchParams.get('size');

  if (!prefix || !size) {
    return NextResponse.json({ error: 'Missing prefix or size' }, { status: 400 });
  }

  try {
    const components = await prisma.component.findMany({
      where: {
        id: {
          startsWith: `${prefix}_${size}_`,
        },
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    let nextNumber = 1;
    if (components.length > 0) {
      const lastId = components[0].id;
      const lastNumber = parseInt(lastId.split('_').pop() || '0', 10);
      nextNumber = lastNumber + 1;
    }

    const nextId = `${prefix}_${size}_${nextNumber.toString().padStart(2, '0')}`;

    return NextResponse.json({ nextId });
  } catch (error) {
    console.error('Failed to generate next ID:', error);
    return NextResponse.json({ error: 'Failed to generate next ID' }, { status: 500 });
  }
}