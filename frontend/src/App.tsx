import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import RecommendationPage from './pages/RecommendationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderPage from './pages/OrderPage';
import FeedbackPage from './pages/FeedbackPage';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

