/*
  Warnings:

  - You are about to drop the column `createdAt` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `typeUser` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tb_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_user" DROP COLUMN "createdAt",
DROP COLUMN "typeUser",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type_user" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updated_at" TIMESTAMP(3);
