import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: Prisma.ProductCreateInput): Promise<Product> {
    return this.prismaService.product.create({
      data: { ...createProductDto },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(
    id: number,
    updateProductDto: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: number): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
