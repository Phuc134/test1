import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { Bill } from './bill.entity';
import { BillsService } from './bills.service';
import { BillDTO } from './dto/bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billService: BillsService) {}
  @Get()
  getAllBill(): Promise<Bill[]> {
    return this.billService.getAllBill();
  }
  @Post()
  createBill(@Body() BillDTO: BillDTO): Promise<Bill> {
    return this.billService.createBill(BillDTO);
  }
}
