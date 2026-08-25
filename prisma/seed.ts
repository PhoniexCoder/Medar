import { PrismaClient, UserRoleEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial platform roles and data...');

  const roles = Object.values(UserRoleEnum);

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `System role for ${roleName}`
      }
    });
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
