/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Village` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Village" ADD COLUMN     "name" VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Village_name_key" ON "Village"("name");
