/*
  Warnings:

  - You are about to alter the column `distance` on the `planet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "planet" ALTER COLUMN "distance" SET DATA TYPE INTEGER;
