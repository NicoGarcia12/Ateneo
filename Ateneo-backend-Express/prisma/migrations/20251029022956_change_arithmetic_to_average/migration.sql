/*
  Warnings:

  - The values [Arithmetic] on the enum `Grade_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `grade` MODIFY `type` ENUM('Final', 'Weighted', 'Average') NOT NULL;
