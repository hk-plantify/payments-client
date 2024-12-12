export interface FinalResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaymentType {
  transactionId: number;
  userId: number;
  paymentId: number;
  orderId: string;
  orderName: string;
  sellerId: number;
  amount: number;
  pointToUse: number;
  transactionType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  redirectUri: string;
}
