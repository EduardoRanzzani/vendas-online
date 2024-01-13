import { Injectable, NotFoundException } from '@nestjs/common';
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
    const products = await this.prismaService.product.findMany();
    if (!products) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    await this.findById(id);
    return this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findById(id);
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
