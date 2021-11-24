import { prismaClient } from "./../src/lib/Prisma";
import { users } from "./seeds/users";

async function main() {
  await prismaClient.user.createMany({ data: users });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
