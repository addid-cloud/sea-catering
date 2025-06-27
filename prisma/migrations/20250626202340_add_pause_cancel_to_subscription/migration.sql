/*
  Warnings:

  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscription` ADD COLUMN `pauseEnd` DATETIME(3) NULL,
    ADD COLUMN `pauseStart` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Active',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
