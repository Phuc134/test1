export class BillDTO {
  idCus: string;
  products: {
    idProduct: string;
    amount: number;
  }[];
}
