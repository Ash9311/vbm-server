/*
  Warnings:

  - A unique constraint covering the columns `[userId,year]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donation_userId_year_key" ON "Donation"("userId", "year");
