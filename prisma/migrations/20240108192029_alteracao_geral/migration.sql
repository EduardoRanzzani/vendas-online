/*
  Warnings:

  - You are about to drop the column `cityId` on the `tb_address` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tb_address` table. All the data in the column will be lost.
  - You are about to drop the column `numberAddress` on the `tb_address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_address` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tb_address` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tb_city` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `tb_city` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_city` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tb_state` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_state` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `tb_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `tb_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tb_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `tb_city` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_address" DROP CONSTRAINT "tb_address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "tb_address" DROP CONSTRAINT "tb_address_userId_fkey";

-- DropForeignKey
ALTER TABLE "tb_city" DROP CONSTRAINT "tb_city_stateId_fkey";

-- AlterTable
ALTER TABLE "tb_address" DROP COLUMN "cityId",
DROP COLUMN "createdAt",
DROP COLUMN "numberAddress",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "city_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tb_city" DROP COLUMN "createdAt",
DROP COLUMN "stateId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "state_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tb_state" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "tb_city" ADD CONSTRAINT "tb_city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "tb_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_address" ADD CONSTRAINT "tb_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_address" ADD CONSTRAINT "tb_address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "tb_city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
