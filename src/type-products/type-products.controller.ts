import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { typeProductDTO } from './dto/type-product.dto';
import { typeProduct } from './type-product.entity';
import { TypeProductsService } from './type-products.service';

@Controller('type-products')
export class TypeProductsController {
  constructor(private typeProductService: TypeProductsService) {}
  @Get()
  getAllTypeProduct(): Promise<typeProduct[]> {
    return this.typeProductService.getAllTypeProduct();
  }
  @Get(':id')
  getTypeProductById(@Param('id') id: string): Promise<typeProduct> {
    return this.typeProductService.getTypeProductById(id);
  }
  @Post()
  createTypeProduct(@Body() typeProduct: typeProduct): Promise<typeProduct> {
    return this.typeProductService.createTypeProduct(typeProduct);
  }
  @Put(':id')
  updateTypeProduct(
    @Body() typeProduct: typeProductDTO,
    @Param('id') id: string,
  ): Promise<typeProduct> {
    return this.typeProductService.updateTypeProduct(id, typeProduct);
  }
  @Delete(':id')
  deleteTypeProduct(@Param('id') id: string) {
    return this.typeProductService.deleteTypeProduct(id);
  }
}
