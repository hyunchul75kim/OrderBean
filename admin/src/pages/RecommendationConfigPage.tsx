import React from 'react';
import Header from '../components/Header';

const RecommendationConfigPage: React.FC = () => {
  return (
    <div>
      <Header currentPage="admin" />
      <div style={{ padding: '32px' }}>
        <h1>추천 로직 설정</h1>
        {/* 추천 속성 가중치 설정 예정 */}
      </div>
    </div>
  );
};

export default RecommendationConfigPage;

