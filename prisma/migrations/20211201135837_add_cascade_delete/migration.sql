-- DropForeignKey
ALTER TABLE "UsersOnVillages" DROP CONSTRAINT "UsersOnVillages_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnVillages" DROP CONSTRAINT "UsersOnVillages_villageId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnVillages" ADD CONSTRAINT "UsersOnVillages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnVillages" ADD CONSTRAINT "UsersOnVillages_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;
