import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { typeProductDTO } from './dto/type-product.dto';
import { typeProduct } from './type-product.entity';

@Injectable()
export class TypeProductsService {
  constructor(
    @InjectRepository(typeProduct)
    private typeProductRepository: Repository<typeProduct>,
  ) {}
  async getAllTypeProduct(): Promise<typeProduct[]> {
    return await this.typeProductRepository.find();
  }

  async getTypeProductById(id: string): Promise<typeProduct> {
    return await this.typeProductRepository.findOneBy({ id: id });
  }

  async createTypeProduct(
    typeProductDTO: typeProductDTO,
  ): Promise<typeProduct> {
    const { name } = typeProductDTO;
    const newTypeProduct = new typeProduct();
    newTypeProduct.name = name;
    await this.typeProductRepository.save(newTypeProduct);
    return newTypeProduct;
  }

  async updateTypeProduct(
    id: string,
    typeProduct: typeProductDTO,
  ): Promise<typeProduct> {
    const typeProductUpdate = await this.typeProductRepository.findOneBy({
      id,
    });
    const { name } = typeProduct;
    typeProductUpdate.name = name ? name : typeProductUpdate.name;
    return await this.typeProductRepository.save(typeProductUpdate);
  }

  async deleteTypeProduct(id: string) {
    return await this.typeProductRepository.delete(id);
  }
}
