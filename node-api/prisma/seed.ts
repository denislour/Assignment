import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: { name: "A", email: "levana@example.com" },
  });

  await prisma.user.create({
    data: { name: "B", email: "levanb@example.com" },
  });

  await prisma.user.create({
    data: { name: "C", email: "levanc@example.com" },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
