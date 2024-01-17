import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cart, CartProduct, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { IncludeProductDTO } from './dto/include-product.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async verifyActiveCart(userId: number): Promise<Cart> {
    const activeCart = await this.prisma.cart.findFirst({
      where: { userId, active: true },
    });
    if (!activeCart) {
      throw new NotFoundException('Active cart not found');
    }
    return activeCart;
  }

  async addProductsInCart(
    userId: number,
    addProductsDTO: IncludeProductDTO,
  ): Promise<CartProduct> {
    const activeCart = await this.verifyActiveCart(userId).catch(() => null);
    let cart: Cart;

    if (!activeCart) {
      cart = await this.create(userId, {
        active: true,
        user: { connect: { id: userId } },
      });
    } else {
      cart = activeCart;
    }

    const existingCartProduct = await this.prisma.cartProduct.findFirst({
      where: {
        cartId: cart.id,
        productId: addProductsDTO.productId,
      },
    });

    if (existingCartProduct) {
      existingCartProduct.amount += addProductsDTO.amount;
      return await this.prisma.cartProduct.update({
        where: {
          id: existingCartProduct.id,
          cartId: cart.id,
          productId: addProductsDTO.productId,
        },
        data: {
          ...existingCartProduct,
        },
        include: { product: true, cart: { include: { user: true } } },
      });
    } else {
      const newCartProduct = {
        cartId: cart.id,
        productId: addProductsDTO.productId,
        amount: addProductsDTO.amount,
      };
      return this.prisma.cartProduct.create({
        data: newCartProduct,
        include: { product: true, cart: { include: { user: true } } },
      });
    }
  }

  async removeProductsFromCart(
    userId: number,
    productsDTO: IncludeProductDTO,
  ): Promise<CartProduct> | undefined {
    const activeCart = await this.verifyActiveCart(userId).catch(() => null);
    let cart: Cart;

    if (!activeCart) {
      throw new NotFoundException('Active cart not found');
    } else {
      cart = activeCart;
    }

    const existingCart: CartProduct = await this.prisma.cartProduct
      .findFirst({
        where: {
          cartId: cart.id,
          productId: productsDTO.productId,
        },
      })
      .catch(() => undefined);

    if (!existingCart) {
      throw new NotFoundException('There is no products left to remove');
    }

    if (existingCart.amount === 1) {
      await this.prisma.cartProduct.delete({
        where: {
          id: existingCart.id,
          cartId: cart.id,
          productId: productsDTO.productId,
        },
      });
      throw new HttpException('No products left', HttpStatus.NO_CONTENT);
    }

    existingCart.amount -= productsDTO.amount;

    return await this.prisma.cartProduct.update({
      where: {
        id: existingCart.id,
        cartId: cart.id,
        productId: productsDTO.productId,
      },
      data: {
        ...existingCart,
      },
      include: { product: true, cart: { include: { user: true } } },
    });
  }

  async create(
    userId: number,
    createCartDto: Prisma.CartCreateInput,
  ): Promise<Cart> {
    await this.userService.findById(userId);
    return this.prisma.cart.create({
      data: { ...createCartDto, user: { connect: { id: userId } } },
      include: { user: true },
    });
  }

  async findAll(): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany();
    if (!carts) {
      throw new NotFoundException('No carts found');
    }
    return carts;
  }

  async findById(id: number): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async findAllActive(): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      where: { active: true },
    });
    if (!carts) {
      throw new NotFoundException('There are no active carts');
    }
    return carts;
  }

  async findAllInactive(): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      where: { active: false },
    });
    if (!carts) {
      throw new NotFoundException('There are no inactive carts');
    }
    return carts;
  }

  async update(
    id: number,
    updateCartDto: Prisma.CartUpdateInput,
  ): Promise<Cart> {
    await this.findById(id);
    return this.prisma.cart.update({ where: { id }, data: updateCartDto });
  }

  async remove(id: number): Promise<Cart> {
    await this.findById(id);
    return this.prisma.cart.delete({ where: { id } });
  }
}
