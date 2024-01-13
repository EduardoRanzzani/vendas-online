import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.prismaService.product.create({
      data: { ...createProductDto },
    });
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { description: true, tags: true, reviews: true },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
