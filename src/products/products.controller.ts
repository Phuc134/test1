import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  getAllTypeProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }
  @Get(':id')
  getTypeProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }
  @Post()
  createTypeProduct(@Body() product: ProductDTO): Promise<Product> {
    return this.productService.createProduct(product);
  }
  @Put(':id')
  updateTypeProduct(
    @Body() product: ProductDTO,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.updateProductById(id, product);
  }
  @Delete(':id')
  deleteTypeProduct(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }
}
