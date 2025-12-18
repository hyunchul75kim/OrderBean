import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  currentPage?: 'order' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'order' }) => {
  const navigate = useNavigate();

  return (
    <header className="admin-header">
      <div className="brand-name">OrderBean - 커피주문</div>
      <div className="header-buttons">
        <button 
          className={`nav-button ${currentPage === 'order' ? 'active' : ''}`}
          onClick={() => navigate('/order')}
        >
          주문하기
        </button>
        <button 
          className={`nav-button admin-button ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={() => navigate('/admin')}
        >
          관리자
        </button>
      </div>
    </header>
  );
};

export default Header;

