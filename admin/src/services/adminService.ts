export interface DashboardStats {
  total: number;
  received: number;
  processing: number;
  completed: number;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  stock: number;
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  options?: string[];
}

export interface Order {
  orderId: string;
  orderDate: Date;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'received' | 'processing' | 'completed' | 'cancelled';
}

class AdminService {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch('/api/admin/dashboard/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return response.json();
  }

  async getInventory(): Promise<InventoryItem[]> {
    const response = await fetch('/api/admin/inventory');
    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }
    return response.json();
  }

  async getOrders(): Promise<Order[]> {
    const response = await fetch('/api/admin/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data.map((order: any) => ({
      ...order,
      orderDate: new Date(order.orderDate),
    }));
  }

  async updateInventory(productId: string, newStock: number): Promise<InventoryItem> {
    const response = await fetch(`/api/admin/inventory/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: newStock }),
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory');
    }
    return response.json();
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<{ orderId: string; status: Order['status'] }> {
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    return response.json();
  }
}

export const adminService = new AdminService();

