/*
  Warnings:

  - You are about to drop the `_UserToVillage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToVillage" DROP CONSTRAINT "_UserToVillage_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVillage" DROP CONSTRAINT "_UserToVillage_B_fkey";

-- DropTable
DROP TABLE "_UserToVillage";

-- CreateTable
CREATE TABLE "UsersOnVillages" (
    "userId" TEXT NOT NULL,
    "villageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UsersOnVillages_pkey" PRIMARY KEY ("userId","villageId")
);

-- AddForeignKey
ALTER TABLE "UsersOnVillages" ADD CONSTRAINT "UsersOnVillages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnVillages" ADD CONSTRAINT "UsersOnVillages_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
