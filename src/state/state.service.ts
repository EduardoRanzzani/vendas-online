import { Injectable } from '@nestjs/common';
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
    return this.prisma.state.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll() {
    return this.prisma.state.findMany();
  }
}
