/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `tb_tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_tag_content_key` ON `tb_tag`(`content`);
