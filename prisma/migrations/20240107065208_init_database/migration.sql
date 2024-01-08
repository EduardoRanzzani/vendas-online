-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "typeUser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_state" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "numberAddress" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_cpf_key" ON "tb_user"("cpf");

-- AddForeignKey
ALTER TABLE "tb_city" ADD CONSTRAINT "tb_city_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "tb_state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_address" ADD CONSTRAINT "tb_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_address" ADD CONSTRAINT "tb_address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "tb_city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
