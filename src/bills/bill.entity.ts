import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  total: number;
  @ManyToOne(() => User, (user) => user.bill)
  user: User;
  @ManyToMany(() => Product)
  @JoinTable()
  billDetail: {
    amount: number;
    product: Product;
  }[];
}
