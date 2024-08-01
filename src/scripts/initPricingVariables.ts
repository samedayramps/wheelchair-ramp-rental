// src/scripts/initPricingVariables.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function initPricingVariables() {
  const existingVariables = await prisma.pricingVariables.findFirst();

  if (!existingVariables) {
    await prisma.pricingVariables.create({
      data: {
        trailerRentalCost: 50, // Example value
        perMileCost: 2, // Example value
        rentalRatePerFoot: 5, // Example value
        installRatePerSection: 20, // Example value
        installRatePerLanding: 30, // Example value
      },
    });
    console.log('Pricing variables initialized');
  } else {
    console.log('Pricing variables already exist');
  }
}

initPricingVariables()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });