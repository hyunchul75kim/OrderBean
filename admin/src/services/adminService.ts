import { ApiError, NetworkError, ParseError } from '../utils/errors';

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

/**
 * API 응답을 파싱하고 에러를 처리하는 헬퍼 함수
 */
async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    if (response.status === 204 || response.statusText === 'No Content') {
      return {} as T;
    }
    throw new ParseError('응답이 JSON 형식이 아닙니다.');
  }

  try {
    const text = await response.text();
    if (!text) {
      return {} as T;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    throw new ParseError('응답 데이터를 파싱하는데 실패했습니다.');
  }
}

/**
 * fetch 요청을 처리하고 에러를 적절히 변환하는 헬퍼 함수
 */
async function handleRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // HTTP 에러 상태 코드 처리
    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }

      throw new ApiError(
        `API 요청 실패: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return parseResponse<T>(response);
  } catch (error) {
    // 이미 ApiError나 ParseError인 경우 그대로 throw
    if (error instanceof ApiError || error instanceof ParseError) {
      throw error;
    }

    // 네트워크 오류 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError();
    }

    // 기타 에러
    throw new Error(`예상치 못한 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
  }
}

class AdminService {
  async getDashboardStats(): Promise<DashboardStats> {
    return handleRequest<DashboardStats>('/api/admin/dashboard/stats');
  }

  async getInventory(): Promise<InventoryItem[]> {
    return handleRequest<InventoryItem[]>('/api/admin/inventory');
  }

  async getOrders(): Promise<Order[]> {
    const data = await handleRequest<Order[]>('/api/admin/orders');
    return data.map((order) => ({
      ...order,
      orderDate: new Date(order.orderDate),
    }));
  }

  async updateInventory(productId: string, newStock: number): Promise<InventoryItem> {
    return handleRequest<InventoryItem>(`/api/admin/inventory/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ stock: newStock }),
    });
  }

  async updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Promise<{ orderId: string; status: Order['status'] }> {
    return handleRequest<{ orderId: string; status: Order['status'] }>(
      `/api/admin/orders/${orderId}/status`,
      {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }
    );
  }
}

export const adminService = new AdminService();
