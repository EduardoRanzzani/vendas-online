import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCategoryDto: Prisma.CategoryCreateInput,
  ): Promise<Category> {
    const category = await this.findByName(createCategoryDto.name).catch(
      () => undefined,
    );
    if (category) {
      throw new ConflictException('Category already exists');
    }
    return this.prismaService.category.create({ data: createCategoryDto });
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany();
    if (!categories) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async findById(id: number): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    await this.findById(id);
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number): Promise<Category> {
    await this.findById(id);
    return this.prismaService.category.delete({ where: { id } });
  }
}
