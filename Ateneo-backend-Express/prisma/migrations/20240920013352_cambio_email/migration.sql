/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Professor_email_key` ON `Professor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_dni_key` ON `Student`(`dni`);
