import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import OrderPage from '../OrderPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('OrderPage', () => {
  it('should render header with brand name and navigation buttons', () => {
    renderWithRouter(<OrderPage />);
    
    expect(screen.getByText('COZY')).toBeInTheDocument();
    expect(screen.getByText('주문하기')).toBeInTheDocument();
    expect(screen.getByText('관리자')).toBeInTheDocument();
  });

  it('should render product cards with coffee menu items', () => {
    renderWithRouter(<OrderPage />);
    
    expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
    expect(screen.getByText('아메리카노(HOT)')).toBeInTheDocument();
    expect(screen.getByText('카페라떼')).toBeInTheDocument();
  });

  it('should display product prices', () => {
    renderWithRouter(<OrderPage />);
    
    const prices = screen.getAllByText('4,000원');
    expect(prices.length).toBeGreaterThan(0);
    expect(screen.getByText('5,000원')).toBeInTheDocument();
  });

  it('should render customization options for each product', () => {
    renderWithRouter(<OrderPage />);
    
    const shotOptions = screen.getAllByText(/샷 추가/);
    const syrupOptions = screen.getAllByText(/시럽 추가/);
    
    expect(shotOptions.length).toBeGreaterThan(0);
    expect(syrupOptions.length).toBeGreaterThan(0);
  });

  it('should render "담기" button for each product', () => {
    renderWithRouter(<OrderPage />);
    
    const addButtons = screen.getAllByText('담기');
    expect(addButtons.length).toBeGreaterThanOrEqual(3);
  });

  it('should render shopping cart section at the bottom', () => {
    renderWithRouter(<OrderPage />);
    
    expect(screen.getByText('장바구니')).toBeInTheDocument();
  });

  it('should add product to cart when "담기" button is clicked', () => {
    renderWithRouter(<OrderPage />);
    
    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);
    
    // Check if cart item appears in shopping cart (use getAllByText and find cart item)
    const americanoElements = screen.getAllByText(/아메리카노\(ICE\)/);
    const cartItem = americanoElements.find(el => 
      el.closest('.cart-item') !== null
    );
    expect(cartItem).toBeInTheDocument();
  });

  it('should update total price when product is added to cart', () => {
    renderWithRouter(<OrderPage />);
    
    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);
    
    expect(screen.getByText(/총 금액/)).toBeInTheDocument();
  });

  it('should display selected options in cart item', () => {
    renderWithRouter(<OrderPage />);
    
    // Find and check customization option
    const shotCheckboxes = screen.getAllByLabelText(/샷 추가/);
    fireEvent.click(shotCheckboxes[0]);
    
    // Click add to cart
    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);
    
    // Check if option appears in cart item name
    const cartItemName = screen.getByText(/아메리카노\(ICE\).*샷 추가/);
    expect(cartItemName).toBeInTheDocument();
  });

  it('should render "주문하기" button in cart when items exist', () => {
    renderWithRouter(<OrderPage />);
    
    const addButtons = screen.getAllByText('담기');
    fireEvent.click(addButtons[0]);
    
    // Find order button in cart (not header)
    const orderButtons = screen.getAllByText('주문하기');
    const cartOrderButton = orderButtons.find(button => 
      button.closest('.shopping-cart') !== null
    );
    expect(cartOrderButton).toBeInTheDocument();
  });
});

