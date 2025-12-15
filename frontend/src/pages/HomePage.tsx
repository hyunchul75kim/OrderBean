import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="brand-name">OrderBean</span>
            <span className="tagline">나에게 딱 맞는 커피를 찾아보세요</span>
          </h1>
          <p className="hero-description">
            복잡한 원두 선택, 이제 그만!<br />
            간단한 설문으로 당신만의 완벽한 커피를 추천해드립니다.
          </p>
          <button className="cta-button" onClick={handleStartSurvey}>
            취향 설문 시작하기
          </button>
          <p className="hero-subtext">3분이면 끝! 전문 용어 없이 쉽게</p>
        </div>
        <div className="hero-image">
          <div className="coffee-beans-illustration">
            <div className="bean bean-1"></div>
            <div className="bean bean-2"></div>
            <div className="bean bean-3"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <h2 className="section-title">이런 고민 있으신가요?</h2>
          <div className="problem-list">
            <div className="problem-item">
              <div className="problem-icon">😰</div>
              <h3>원두 종류가 너무 많아요</h3>
              <p>수백 가지 원두 중에서 어떤 걸 선택해야 할지 막막하신가요?</p>
            </div>
            <div className="problem-item">
              <div className="problem-icon">🤔</div>
              <h3>전문 용어가 어려워요</h3>
              <p>산미, 바디감, 아로마... 전문 용어 때문에 망설여지시나요?</p>
            </div>
            <div className="problem-item">
              <div className="problem-icon">😞</div>
              <h3>실패 경험이 두려워요</h3>
              <p>잘못된 선택으로 맛없는 커피를 마신 경험이 있으신가요?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <h2 className="section-title">OrderBean이 해결해드립니다</h2>
          <div className="solution-content">
            <div className="solution-feature">
              <div className="feature-number">1</div>
              <h3>간단한 설문</h3>
              <p>5문항 이내의 쉬운 질문으로<br />당신의 커피 취향을 파악합니다</p>
            </div>
            <div className="solution-feature">
              <div className="feature-number">2</div>
              <h3>맞춤 추천</h3>
              <p>설문 결과를 바탕으로<br />당신에게 딱 맞는 커피 3~5종을 추천합니다</p>
            </div>
            <div className="solution-feature">
              <div className="feature-number">3</div>
              <h3>실패 없는 선택</h3>
              <p>각 추천 커피에 대한<br />이유를 쉽게 설명해드립니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">이렇게 시작하세요</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">📝</div>
              <h3>취향 설문</h3>
              <p>산미, 쓴맛, 고소함 등<br />간단한 질문에 답하세요</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">☕</div>
              <h3>맞춤 추천</h3>
              <p>당신의 취향에 맞는<br />커피를 추천해드립니다</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-icon">🛒</div>
              <h3>주문하기</h3>
              <p>마음에 드는 커피를<br />바로 주문하세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">지금 바로 시작해보세요</h2>
          <p className="cta-description">
            전문 지식 없이도 나에게 맞는 커피를 찾을 수 있습니다
          </p>
          <button className="cta-button large" onClick={handleStartSurvey}>
            무료로 취향 설문 시작하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
