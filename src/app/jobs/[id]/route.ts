import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        components: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { customerId, status, scheduledAt, address, deliveryFee, installFee, monthlyRentalRate, notes, components } = body;

    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: {
        customerId,
        status,
        scheduledAt: new Date(scheduledAt),
        address,
        deliveryFee: parseFloat(deliveryFee),
        installFee: parseFloat(installFee),
        monthlyRentalRate: parseFloat(monthlyRentalRate),
        notes,
        components: {
          set: components.map((id: string) => ({ id }))
        }
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}