-- AlterTable
ALTER TABLE "tb_address" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tb_city" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tb_state" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tb_user" ALTER COLUMN "updatedAt" DROP NOT NULL;
