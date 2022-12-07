import { Product } from 'src/products/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class typeProduct {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @OneToOne(() => Product, (product) => product.typeProduct)
  product: Product;
}
