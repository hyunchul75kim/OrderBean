import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductWithOptions } from '../../../shared/types/product.types';
import { CartItem } from '../types/order.types';
import { formatPrice } from '../../../shared/utils/format';
import { productService } from '../services/productService';
import { MOCK_PRODUCTS } from '../constants/products';
import { NetworkError, ApiError } from '../utils/errors';
import './OrderPage.css';

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductWithOptions[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 상품 데이터 로드
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // API에서 상품 데이터 가져오기
        const fetchedProducts = await productService.getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        // API 실패 시 임시 데이터 사용 (개발 환경)
        if (err instanceof NetworkError || err instanceof ApiError) {
          console.warn('API에서 상품을 가져오는데 실패했습니다. 임시 데이터를 사용합니다.', err);
          // 이미 MOCK_PRODUCTS가 기본값으로 설정되어 있음
        } else {
          setError('상품을 불러오는데 실패했습니다.');
          console.error('Failed to load products:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ProductWithOptions, selectedOptions: string[]) => {
    const selectedOptionsData = product.customizationOptions.filter((opt) =>
      selectedOptions.includes(opt.id)
    );

    const totalPrice =
      (product.basePrice + selectedOptionsData.reduce((sum, opt) => sum + opt.price, 0)) * 1;

    const newItem: CartItem = {
      productId: product.id,
      productName: product.name,
      basePrice: product.basePrice,
      selectedOptions: selectedOptionsData.map((opt) => ({
        optionId: opt.id,
        optionName: opt.name,
        optionPrice: opt.price,
      })),
      quantity: 1,
      totalPrice,
    };

    setCart([...cart, newItem]);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <div className="order-page">
      {/* Header */}
      <header className="order-header">
        <div className="brand-name">COZY</div>
        <div className="header-buttons">
          <button className="nav-button" onClick={() => navigate('/order')}>
            주문하기
          </button>
          <button className="nav-button admin-button" onClick={() => navigate('/admin')}>
            관리자
          </button>
        </div>
      </header>

      {/* Product Menu */}
      <main className="product-menu">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>상품을 불러오는 중...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
            <p>{error}</p>
            <p style={{ fontSize: '14px', marginTop: '8px', color: '#666' }}>
              임시 데이터를 사용합니다.
            </p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              formatPrice={formatPrice}
            />
          ))
        )}
      </main>

      {/* Shopping Cart */}
      <div className="shopping-cart">
        <h2 className="cart-title">장바구니</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">장바구니가 비어있습니다</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span className="cart-item-name">
                    {item.productName}
                    {item.selectedOptions.length > 0 &&
                      ` (${item.selectedOptions.map((opt) => opt.optionName).join(', ')})`}
                    {' X '}
                    {item.quantity}
                  </span>
                  <span className="cart-item-price">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span className="total-label">총 금액</span>
              <span className="total-amount">{formatPrice(calculateTotal())}</span>
            </div>
            <button className="order-button" onClick={() => navigate('/order/confirm')}>
              주문하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductWithOptions;
  onAddToCart: (product: ProductWithOptions, selectedOptions: string[]) => void;
  formatPrice: (price: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, formatPrice }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const handleAddClick = () => {
    onAddToCart(product, selectedOptions);
    setSelectedOptions([]);
  };

  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        <div className="image-placeholder-x">✕</div>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{formatPrice(product.basePrice)}</p>
      <p className="product-description">{product.description}</p>
      <div className="customization-options">
        {product.customizationOptions.map((option) => (
          <label key={option.id} className="option-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
            />
            <span>
              {option.name} ({option.price > 0 ? `+${formatPrice(option.price)}` : '+0원'})
            </span>
          </label>
        ))}
      </div>
      <button className="add-to-cart-button" onClick={handleAddClick}>
        담기
      </button>
    </div>
  );
};

export default OrderPage;
