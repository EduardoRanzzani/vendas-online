import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, State } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async findPaginated(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StateWhereUniqueInput;
    where?: Prisma.StateWhereInput;
    orderBy?: Prisma.StateOrderByWithRelationInput;
  }): Promise<State[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const states = await this.prisma.state.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    if (!states) {
      throw new NotFoundException('No states found');
    }
    return states;
  }

  async findAll() {
    const states = await this.prisma.state.findMany();
    if (!states) {
      throw new NotFoundException('No states found');
    }
    return states;
  }

  async findStateById(id: number): Promise<State> {
    const state = await this.prisma.state.findUnique({ where: { id } });
    if (!state) {
      throw new NotFoundException('State not found');
    }
    return state;
  }
}
