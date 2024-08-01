import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 'Customer Name': fullName, Email, Phone, Address, Notes } = body;

    // Split the full name into first and last name
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    const newCustomer = await prisma.customer.create({
      data: {
        name: fullName,
        email: Email,
        phone: Phone,
        address: Address,
        notes: Notes,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}