import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    categoryId: number,
    createProductDto: Prisma.ProductCreateInput,
  ): Promise<Product> {
    await this.categoryService.findById(categoryId);

    const product = await this.findByName(createProductDto.name).catch(
      () => undefined,
    );
    if (product) {
      throw new ConflictException('Product already exists');
    }
    return this.prisma.product.create({
      data: { ...createProductDto, category: { connect: { id: categoryId } } },
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    if (!products) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { name },
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
    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findById(id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
