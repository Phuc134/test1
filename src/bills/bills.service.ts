import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Bill } from './bill.entity';
import { BillDTO } from './dto/bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAllBill(): Promise<Bill[]> {
    return await this.billRepository.find({
      relations: {
        user: true,
        billDetail: true,
      },
    });
  }
  async createBill(BillDTO: BillDTO): Promise<Bill> {
    const { idCus, products } = BillDTO;
    const bill = new Bill();
    const user = await this.userRepository.findOneBy({ id: idCus });
    bill.user = user;
    let rs = 0;
    bill.billDetail = [];
    for (let i = 0; i < products.length; i++) {
      const product = await this.productRepository.findOneBy({
        id: products[i].idProduct,
      });
      bill.billDetail.push({
        product: product,
        amount: products[i].amount,
      });
      rs += products[i].amount * product.price;
    }
    bill.total = rs;
    await this.billRepository.save(bill);
    return bill;
  }
}
