import { typeProduct } from 'src/type-products/type-product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  currentRate: number;
  @Column()
  idType: string;
  @OneToOne(() => typeProduct, (typeProduct) => typeProduct.product)
  @JoinColumn()
  typeProduct: typeProduct;
}
