// src/app/api/pricing-variables/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pricingVariables = await prisma.pricingVariables.findFirst();
    if (!pricingVariables) {
      return NextResponse.json({ error: 'Pricing variables not found' }, { status: 404 });
    }
    return NextResponse.json(pricingVariables);
  } catch (error) {
    console.error('Failed to fetch pricing variables:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing variables' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trailerRentalCost, perMileCost, rentalRatePerFoot, installRatePerSection, installRatePerLanding } = body;

    const pricingVariables = await prisma.pricingVariables.upsert({
      where: { id: 1 }, // Assuming we only have one set of pricing variables
      update: {
        trailerRentalCost,
        perMileCost,
        rentalRatePerFoot,
        installRatePerSection,
        installRatePerLanding,
      },
      create: {
        trailerRentalCost,
        perMileCost,
        rentalRatePerFoot,
        installRatePerSection,
        installRatePerLanding,
      },
    });

    return NextResponse.json(pricingVariables);
  } catch (error) {
    console.error('Failed to update pricing variables:', error);
    return NextResponse.json({ error: 'Failed to update pricing variables' }, { status: 500 });
  }
}