/*
  Warnings:

  - You are about to drop the column `placeId` on the `Amenity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `shortDesc` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionLong` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionShort` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `isOpen` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `isHost` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `dailyRate` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostId` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Amenity` DROP FOREIGN KEY `Amenity_placeId_fkey`;

-- DropForeignKey
ALTER TABLE `Place` DROP FOREIGN KEY `Place_ownerId_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Amenity` DROP COLUMN `placeId`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `updatedAt`,
    ALTER COLUMN `status` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Media` DROP COLUMN `createdAt`,
    DROP COLUMN `shortDesc`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `shortDescription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Place` DROP COLUMN `descriptionLong`,
    DROP COLUMN `descriptionShort`,
    DROP COLUMN `isOpen`,
    DROP COLUMN `ownerId`,
    ADD COLUMN `dailyRate` DOUBLE NOT NULL,
    ADD COLUMN `hostId` INTEGER NOT NULL,
    ADD COLUMN `hourlyRate` DOUBLE NOT NULL,
    ADD COLUMN `longDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `shortDescription` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `updatedAt`,
    MODIFY `comment` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isHost`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PlaceAvailability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placeId` INTEGER NOT NULL,
    `availabilityDate` DATETIME(3) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `isOpen` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bookingId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payment_bookingId_key`(`bookingId`),
    UNIQUE INDEX `Payment_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlaceAmenities` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlaceAmenities_AB_unique`(`A`, `B`),
    INDEX `_PlaceAmenities_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Place` ADD CONSTRAINT `Place_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaceAvailability` ADD CONSTRAINT `PlaceAvailability_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaceAmenities` ADD CONSTRAINT `_PlaceAmenities_A_fkey` FOREIGN KEY (`A`) REFERENCES `Amenity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlaceAmenities` ADD CONSTRAINT `_PlaceAmenities_B_fkey` FOREIGN KEY (`B`) REFERENCES `Place`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
