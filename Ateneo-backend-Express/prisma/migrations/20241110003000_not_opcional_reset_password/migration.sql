/*
  Warnings:

  - Made the column `resetPassword` on table `professor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `professor` MODIFY `resetPassword` DATETIME(3) NOT NULL;
