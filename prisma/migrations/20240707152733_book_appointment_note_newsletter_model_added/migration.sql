/*
  Warnings:

  - Added the required column `data` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `data` LONGTEXT NOT NULL,
    ADD COLUMN `dob` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `emailVerifiedAt` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `phone` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `profileImage` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `profileImagePath` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `selfSignup` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `verificationToken` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `BookAppointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `dob` VARCHAR(191) NOT NULL DEFAULT '',
    `bookingDateTime` VARCHAR(191) NOT NULL DEFAULT '',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT 'tentative',
    `createdAt` VARCHAR(191) NOT NULL DEFAULT '',
    `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClientNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `note` LONGTEXT NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL DEFAULT '',
    `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Newsletter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` VARCHAR(191) NOT NULL DEFAULT '',
    `updatedAt` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
