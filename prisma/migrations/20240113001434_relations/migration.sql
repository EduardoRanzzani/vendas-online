/*
  Warnings:

  - You are about to drop the column `productId` on the `tb_description` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `tb_reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `tb_description` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `tb_description` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `tb_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_description` DROP FOREIGN KEY `tb_description_productId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_reviews` DROP FOREIGN KEY `tb_reviews_productId_fkey`;

-- AlterTable
ALTER TABLE `tb_description` DROP COLUMN `productId`,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tb_reviews` DROP COLUMN `productId`,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_description_product_id_key` ON `tb_description`(`product_id`);

-- AddForeignKey
ALTER TABLE `tb_description` ADD CONSTRAINT `tb_description_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_reviews` ADD CONSTRAINT `tb_reviews_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `tb_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
