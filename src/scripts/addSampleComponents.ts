import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleComponents() {
  const componentCount = await prisma.component.count();

  if (componentCount === 0) {
    await prisma.component.createMany({
      data: [
        { id: 'RS_4_01', type: 'RAMP', size: '4', status: 'AVAILABLE' },
        { id: 'RS_6_01', type: 'RAMP', size: '6', status: 'AVAILABLE' },
        { id: 'L_5x5_01', type: 'LANDING', size: '5x5', status: 'AVAILABLE' },
      ],
    });
    console.log('Sample components added');
  } else {
    console.log('Components already exist');
  }
}

addSampleComponents()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });