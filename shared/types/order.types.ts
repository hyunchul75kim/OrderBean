export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  productId: string;
  grindType: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

