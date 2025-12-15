-- OrderBean 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  acidity INT NOT NULL CHECK (acidity >= 1 AND acidity <= 5),
  bitterness INT NOT NULL CHECK (bitterness >= 1 AND bitterness <= 5),
  nuttiness INT NOT NULL CHECK (nuttiness >= 1 AND nuttiness <= 5),
  milk_compatible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 설문 테이블
CREATE TABLE IF NOT EXISTS surveys (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 설문 응답 테이블
CREATE TABLE IF NOT EXISTS survey_answers (
  id VARCHAR(36) PRIMARY KEY,
  survey_id VARCHAR(36) NOT NULL,
  question_id VARCHAR(100) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(36),
  product_id VARCHAR(36) NOT NULL,
  grind_type VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- 피드백 테이블
CREATE TABLE IF NOT EXISTS feedbacks (
  id VARCHAR(36) PRIMARY KEY,
  order_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 추천 가중치 설정 테이블 (관리자용)
CREATE TABLE IF NOT EXISTS recommendation_weights (
  id VARCHAR(36) PRIMARY KEY,
  acidity DECIMAL(5, 2) DEFAULT 1.0,
  bitterness DECIMAL(5, 2) DEFAULT 1.0,
  nuttiness DECIMAL(5, 2) DEFAULT 1.0,
  milk_compatible DECIMAL(5, 2) DEFAULT 1.0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_surveys_user_id ON surveys(user_id);
CREATE INDEX idx_survey_answers_survey_id ON survey_answers(survey_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_feedbacks_product_id ON feedbacks(product_id);
CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);

