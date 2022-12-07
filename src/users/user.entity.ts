import { Bill } from 'src/bills/bill.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  typeUser: number;
  @OneToMany(() => Bill, (bill) => bill.user)
  bill: Bill[];
}
