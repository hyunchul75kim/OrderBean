import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from './DashboardPage';

// Mock API services
const mockGetDashboardStats = vi.fn();
const mockGetInventory = vi.fn();
const mockGetOrders = vi.fn();
const mockUpdateInventory = vi.fn();
const mockUpdateOrderStatus = vi.fn();

vi.mock('../services/adminService', () => ({
  adminService: {
    getDashboardStats: () => mockGetDashboardStats(),
    getInventory: () => mockGetInventory(),
    getOrders: () => mockGetOrders(),
    updateInventory: (...args: any[]) => mockUpdateInventory(...args),
    updateOrderStatus: (...args: any[]) => mockUpdateOrderStatus(...args),
  },
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('관리자 대시보드 요약', () => {
    it('4개의 항목(총 주문, 주문 접수, 제조 중, 제조 완료)을 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 10,
        received: 5,
        processing: 3,
        completed: 2,
      });
      mockGetInventory.mockResolvedValue([]);
      mockGetOrders.mockResolvedValue([]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/총 주문 10/)).toBeInTheDocument();
        expect(screen.getByText(/주문 접수 5/)).toBeInTheDocument();
        expect(screen.getByText(/제조 중 3/)).toBeInTheDocument();
        expect(screen.getByText(/제조 완료 2/)).toBeInTheDocument();
      });
    });
  });

  describe('재고 현황', () => {
    it('메뉴 3개에 대한 재고 개수를 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 10 },
        { productId: '2', productName: '아메리카노(HOT)', stock: 8 },
        { productId: '3', productName: '카페라떼', stock: 5 },
      ]);
      mockGetOrders.mockResolvedValue([]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
        expect(screen.getByText('10개')).toBeInTheDocument();
        expect(screen.getByText('아메리카노(HOT)')).toBeInTheDocument();
        expect(screen.getByText('8개')).toBeInTheDocument();
        expect(screen.getByText('카페라떼')).toBeInTheDocument();
        expect(screen.getByText('5개')).toBeInTheDocument();
      });
    });

    it('재고가 5개 미만이면 "주의"를 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 4 },
      ]);
      mockGetOrders.mockResolvedValue([]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('주의')).toBeInTheDocument();
      });
    });

    it('재고가 0개이면 "품절"을 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 0 },
      ]);
      mockGetOrders.mockResolvedValue([]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('품절')).toBeInTheDocument();
      });
    });

    it('재고가 5개 이상이면 "정상"을 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 10 },
      ]);
      mockGetOrders.mockResolvedValue([]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('정상')).toBeInTheDocument();
      });
    });

    it('재고 증가 버튼을 클릭하면 재고가 증가해야 한다', async () => {
      const user = userEvent.setup();
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 10 },
      ]);
      mockGetOrders.mockResolvedValue([]);
      mockUpdateInventory.mockResolvedValue({
        productId: '1',
        productName: '아메리카노(ICE)',
        stock: 11,
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('10개')).toBeInTheDocument();
      });

      const increaseButtons = screen.getAllByRole('button', { name: /\+/ });
      await user.click(increaseButtons[0]);

      await waitFor(() => {
        expect(mockUpdateInventory).toHaveBeenCalledWith('1', 11);
        expect(screen.getByText('11개')).toBeInTheDocument();
      });
    });

    it('재고 감소 버튼을 클릭하면 재고가 감소해야 한다', async () => {
      const user = userEvent.setup();
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([
        { productId: '1', productName: '아메리카노(ICE)', stock: 10 },
      ]);
      mockGetOrders.mockResolvedValue([]);
      mockUpdateInventory.mockResolvedValue({
        productId: '1',
        productName: '아메리카노(ICE)',
        stock: 9,
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText('10개')).toBeInTheDocument();
      });

      const decreaseButtons = screen.getAllByRole('button', { name: /-/ });
      await user.click(decreaseButtons[0]);

      await waitFor(() => {
        expect(mockUpdateInventory).toHaveBeenCalledWith('1', 9);
        expect(screen.getByText('9개')).toBeInTheDocument();
      });
    });
  });

  describe('주문 현황', () => {
    it('접수된 주문 정보를 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([]);
      const mockDate = new Date('2024-07-31T13:00:00');
      mockGetOrders.mockResolvedValue([
        {
          orderId: '1',
          orderDate: mockDate,
          items: [
            { productName: '아메리카노(ICE)', quantity: 1, price: 4000 },
          ],
          totalPrice: 4000,
          status: 'received',
        },
      ]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/7월 31일 13:0/)).toBeInTheDocument();
        expect(screen.getByText(/아메리카노\(ICE\) x 1/)).toBeInTheDocument();
        expect(screen.getByText(/4,000원/)).toBeInTheDocument();
      });
    });

    it('주문 상태가 "주문접수"일 때 "제조시작" 버튼을 표시해야 한다', async () => {
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([]);
      const mockDate = new Date('2024-07-31T13:00:00');
      mockGetOrders.mockResolvedValue([
        {
          orderId: '1',
          orderDate: mockDate,
          items: [
            { productName: '아메리카노(ICE)', quantity: 1, price: 4000 },
          ],
          totalPrice: 4000,
          status: 'received',
        },
      ]);

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /제조시작/ })).toBeInTheDocument();
      });
    });

    it('"제조시작" 버튼을 클릭하면 주문 상태가 "제조 중"으로 변경되어야 한다', async () => {
      const user = userEvent.setup();
      mockGetDashboardStats.mockResolvedValue({
        total: 0,
        received: 0,
        processing: 0,
        completed: 0,
      });
      mockGetInventory.mockResolvedValue([]);
      const mockDate = new Date('2024-07-31T13:00:00');
      mockGetOrders.mockResolvedValue([
        {
          orderId: '1',
          orderDate: mockDate,
          items: [
            { productName: '아메리카노(ICE)', quantity: 1, price: 4000 },
          ],
          totalPrice: 4000,
          status: 'received',
        },
      ]);
      mockUpdateOrderStatus.mockResolvedValue({
        orderId: '1',
        status: 'processing',
      });
      mockGetDashboardStats.mockResolvedValueOnce({
        total: 1,
        received: 0,
        processing: 1,
        completed: 0,
      });

      render(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /제조시작/ })).toBeInTheDocument();
      });

      const startButton = screen.getByRole('button', { name: /제조시작/ });
      await user.click(startButton);

      await waitFor(() => {
        expect(mockUpdateOrderStatus).toHaveBeenCalledWith('1', 'processing');
      });
    });
  });
});

