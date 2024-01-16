import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { IncludeProductDTO } from './dto/include-product.dto';

@Roles(UserType.ADMIN, UserType.USER)
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //   @Post()
  //   create(
  //     @UserId() userId: number,
  //     @Body() createCartDto: Prisma.CartCreateInput,
  //   ): Promise<Cart> {
  //     return this.cartService.create(userId, createCartDto);
  //   }

  @Post('/add-products')
  async addProductsInCart(
    @UserId() userId: number,
    @Body() addProductsDTO: IncludeProductDTO,
  ) {
    return this.cartService.addProductsInCart(userId, addProductsDTO);
  }

  @Post('/remove-products')
  async removeProductsFromCart(
    @UserId() userId: number,
    @Body() removeProductsDTO: IncludeProductDTO,
  ) {
    return this.cartService.removeProductsFromCart(userId, removeProductsDTO);
  }

  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return this.cartService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Cart> {
    return this.cartService.remove(id);
  }
}
