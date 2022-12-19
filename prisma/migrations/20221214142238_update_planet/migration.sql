/*
  Warnings:

  - Added the required column `name` to the `planet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "planet" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "is_explored" DROP NOT NULL,
ALTER COLUMN "is_explored" SET DEFAULT false,
ALTER COLUMN "is_populated" DROP NOT NULL,
ALTER COLUMN "is_populated" SET DEFAULT false;
