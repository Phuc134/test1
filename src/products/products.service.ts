import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';
import { Product } from './product.entity';
import { typeProduct } from '../type-products/type-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(typeProduct)
    private typeProductRepository: Repository<typeProduct>,
  ) {}

  async getAllProduct(): Promise<Product[]> {
    const listProduct = await this.productRepository.find({
      relations: {
        typeProduct: false,
      },
    });
    return listProduct;
  }

  async getProductById(id: string): Promise<Product> {
    const products = await this.productRepository.findOneBy({ id });
    return products;
  }

  async createProduct(productDTO: ProductDTO): Promise<Product> {
    const { idType, name, price, currentRate } = productDTO;
    const typeProduct = await this.typeProductRepository.findOneBy({
      id: idType,
    });
    console.log(typeProduct);
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.typeProduct = typeProduct;
    newProduct.currentRate = currentRate;
    newProduct.idType = idType;

    return await this.productRepository.save(newProduct);
  }

  async updateProductById(
    id: string,
    productDTO: ProductDTO,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    const { name, price, idType } = productDTO;
    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.idType = idType ? idType : product.idType;
    await this.productRepository.save(product);
    return product;
  }
  async deleteProductById(id: string) {
    return await this.productRepository.delete(id);
  }
}
