/*
  Warnings:

  - You are about to drop the `UsersOnVillages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnVillages" DROP CONSTRAINT "UsersOnVillages_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnVillages" DROP CONSTRAINT "UsersOnVillages_villageId_fkey";

-- DropTable
DROP TABLE "UsersOnVillages";

-- CreateTable
CREATE TABLE "_UserToVillage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVillage_AB_unique" ON "_UserToVillage"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVillage_B_index" ON "_UserToVillage"("B");

-- AddForeignKey
ALTER TABLE "_UserToVillage" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVillage" ADD FOREIGN KEY ("B") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;
