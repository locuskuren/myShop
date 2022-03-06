export interface Order {
  _id: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  amount: number;
  status: string;
  createdAt: string;
}
