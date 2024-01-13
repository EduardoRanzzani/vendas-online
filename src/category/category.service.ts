import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.category.findUnique({ where: { id } });
  }

  async update(id: number, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
