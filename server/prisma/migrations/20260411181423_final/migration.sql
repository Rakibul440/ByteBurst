/*
  Warnings:

  - You are about to drop the column `ifEmailVerified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,roll]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('S', 'M', 'L', 'XL', 'XXL');

-- AlterTable
ALTER TABLE "registration" ADD COLUMN     "isTeamLeader" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerifiedForCertificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "submittedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "ifEmailVerified",
ADD COLUMN     "TshirtSize" "SIZE",
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_roll_key" ON "user"("email", "roll");
