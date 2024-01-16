import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
