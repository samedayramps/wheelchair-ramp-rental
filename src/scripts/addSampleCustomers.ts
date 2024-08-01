import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleCustomers() {
  const customerCount = await prisma.customer.count();

  if (customerCount === 0) {
    await prisma.customer.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St, Anytown, USA',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '0987654321',
          address: '456 Elm St, Othertown, USA',
        },
      ],
    });
    console.log('Sample customers added');
  } else {
    console.log('Customers already exist');
  }
}

addSampleCustomers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });