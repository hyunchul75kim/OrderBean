import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import RecommendationConfigPage from './pages/RecommendationConfigPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/products" element={<ProductListPage />} />
      <Route path="/admin/products/new" element={<ProductEditPage />} />
      <Route path="/admin/products/:id/edit" element={<ProductEditPage />} />
      <Route path="/admin/recommendation-config" element={<RecommendationConfigPage />} />
    </Routes>
  );
}

export default App;

