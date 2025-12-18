import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductWithOptions } from '../../../shared/types/product.types';
import { CartItem } from '../types/order.types';
import { formatPrice } from '../../../shared/utils/format';
import './OrderPage.css';

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  // 임의의 커피 메뉴 데이터
  const products: ProductWithOptions[] = [
    {
      id: '1',
      name: '아메리카노(ICE)',
      basePrice: 4000,
      description: '시원한 아이스 아메리카노',
      customizationOptions: [
        { id: 'shot', name: '샷 추가', price: 500 },
        { id: 'syrup', name: '시럽 추가', price: 0 },
      ],
    },
    {
      id: '2',
      name: '아메리카노(HOT)',
      basePrice: 4000,
      description: '따뜻한 핫 아메리카노',
      customizationOptions: [
        { id: 'shot', name: '샷 추가', price: 500 },
        { id: 'syrup', name: '시럽 추가', price: 0 },
      ],
    },
    {
      id: '3',
      name: '카페라떼',
      basePrice: 5000,
      description: '부드러운 카페라떼',
      customizationOptions: [
        { id: 'shot', name: '샷 추가', price: 500 },
        { id: 'syrup', name: '시럽 추가', price: 0 },
      ],
    },
  ];

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            formatPrice={formatPrice}
          />
        ))}
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
