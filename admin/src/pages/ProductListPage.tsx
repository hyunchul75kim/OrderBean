import React from 'react';
import Header from '../components/Header';

const ProductListPage: React.FC = () => {
  return (
    <div>
      <Header currentPage="admin" />
      <div style={{ padding: '32px' }}>
        <h1>상품 목록</h1>
        {/* 상품 목록 표시 및 관리 예정 */}
      </div>
    </div>
  );
};

export default ProductListPage;

