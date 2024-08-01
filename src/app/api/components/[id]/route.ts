import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const component = await prisma.component.findUnique({
      where: { id: params.id },
    });

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('Failed to fetch component:', error);
    return NextResponse.json({ error: 'Failed to fetch component' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { type, size, status } = body;

    const updatedComponent = await prisma.component.update({
      where: { id: params.id },
      data: {
        type,
        size,
        status,
      },
    });

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ error: 'Failed to update component' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if the component is assigned to any job
    const component = await prisma.component.findUnique({
      where: { id: params.id },
      include: { jobs: true }
    });

    if (component && component.jobs && component.jobs.length > 0) {
      return NextResponse.json({ error: 'Cannot delete component assigned to a job' }, { status: 400 });
    }

    await prisma.component.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete component:', error);
    return NextResponse.json({ error: 'Failed to delete component' }, { status: 500 });
  }
}