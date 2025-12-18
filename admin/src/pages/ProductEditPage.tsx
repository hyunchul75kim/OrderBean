import React from 'react';
import Header from '../components/Header';

const ProductEditPage: React.FC = () => {
  return (
    <div>
      <Header currentPage="admin" />
      <div style={{ padding: '32px' }}>
        <h1>상품 등록/수정</h1>
        {/* 상품 등록/수정 폼 구현 예정 */}
      </div>
    </div>
  );
};

export default ProductEditPage;

