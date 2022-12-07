import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeProduct } from 'src/type-products/type-product.entity';
import { TypeProductsService } from 'src/type-products/type-products.service';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, typeProduct])],
  controllers: [ProductsController],
  providers: [ProductsService, TypeProductsService],
})
export class ProductsModule {}
