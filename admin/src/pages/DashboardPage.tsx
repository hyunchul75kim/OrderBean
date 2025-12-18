import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { adminService, DashboardStats, InventoryItem, Order } from '../services/adminService';
import { formatPrice, formatDate } from '../../../shared/utils/format';
import { logger } from '../../../shared/utils/logger';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    received: 0,
    processing: 0,
    completed: 0,
  });
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, inventoryData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getInventory(),
        adminService.getOrders(),
      ]);
      setStats(statsData);
      setInventory(inventoryData);
      setOrders(ordersData);
    } catch (error) {
      logger.error('Failed to load data', error);
      // 백엔드 서버가 실행되지 않은 경우를 위한 기본값 설정
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        logger.warn('백엔드 서버가 실행되지 않았습니다. 기본값을 사용합니다.');
        // 기본값 설정 (선택사항)
        setStats({ total: 0, received: 0, processing: 0, completed: 0 });
        setInventory([]);
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInventoryChange = async (productId: string, currentStock: number, delta: number) => {
    const newStock = currentStock + delta;
    if (newStock < 0) return;

    try {
      const updated = await adminService.updateInventory(productId, newStock);
      setInventory((prev) =>
        prev.map((item) => (item.productId === productId ? updated : item))
      );
    } catch (error) {
      logger.error('Failed to update inventory', error);
    }
  };

  const handleOrderStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      await loadData(); // Reload stats
    } catch (error) {
      logger.error('Failed to update order status', error);
    }
  };

  const getStockStatus = (stock: number): string => {
    if (stock === 0) return '품절';
    if (stock < 5) return '주의';
    return '정상';
  };

  if (loading) {
    return (
      <div>
        <Header currentPage="admin" />
        <div className="dashboard-loading">로딩 중...</div>
      </div>
    );
  }

  // 백엔드 서버 연결 확인을 위한 경고 메시지 (개발 환경)
  const showBackendWarning = inventory.length === 0 && orders.length === 0 && stats.total === 0;

  return (
    <div className="dashboard-page">
      <Header currentPage="admin" />

      <main className="dashboard-content">
        {/* 백엔드 서버 연결 경고 */}
        {showBackendWarning && (
          <div className="backend-warning">
            <p>⚠️ 백엔드 서버가 실행되지 않았습니다.</p>
            <p>터미널에서 <code>npm run dev:backend</code> 또는 <code>cd backend && npm run dev</code>를 실행해주세요.</p>
          </div>
        )}
        
        {/* 관리자 대시보드 요약 */}
        <section className="dashboard-summary">
          <h2>관리자 대시보드</h2>
          <div className="stats-summary">
            총 주문 {stats.total} / 주문 접수 {stats.received} / 제조 중 {stats.processing} / 제조 완료 {stats.completed}
          </div>
        </section>

        {/* 재고 현황 */}
        <section className="inventory-section">
          <h2>재고 현황</h2>
          <div className="inventory-grid">
            {inventory.map((item) => (
              <div key={item.productId} className="inventory-card">
                <div className="product-name">{item.productName}</div>
                <div className="stock-info">
                  <span className="stock-quantity">{item.stock}개</span>
                  <span className={`stock-status status-${getStockStatus(item.stock).toLowerCase().replace('주의', 'warning').replace('품절', 'out').replace('정상', 'normal')}`}>
                    {getStockStatus(item.stock)}
                  </span>
                </div>
                <div className="stock-controls">
                  <button
                    className="stock-button"
                    onClick={() => handleInventoryChange(item.productId, item.stock, -1)}
                    disabled={item.stock === 0}
                  >
                    -
                  </button>
                  <button
                    className="stock-button"
                    onClick={() => handleInventoryChange(item.productId, item.stock, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주문 현황 */}
        <section className="orders-section">
          <h2>주문 현황</h2>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-item">
                <div className="order-info">
                  <div className="order-date">{formatDate(order.orderDate)}</div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.productName} x {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div className="order-price">{formatPrice(order.totalPrice)}</div>
                </div>
                <div className="order-actions">
                  {order.status === 'pending' && (
                    <button
                      className="action-button"
                      onClick={() => handleOrderStatusChange(order.orderId, 'received')}
                    >
                      주문 접수
                    </button>
                  )}
                  {order.status === 'received' && (
                    <button
                      className="action-button"
                      onClick={() => handleOrderStatusChange(order.orderId, 'processing')}
                    >
                      제조시작
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      className="action-button"
                      onClick={() => handleOrderStatusChange(order.orderId, 'completed')}
                    >
                      제조완료
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <span className="status-badge">제조 완료</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
