import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const createLink = await prisma.link.create({
    data: {
      url: 'https://github.com',
      description: 'agoi sakit ng balikat ko guys',
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
