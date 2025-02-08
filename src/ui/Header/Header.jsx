import React from 'react';
import './Header.css';

function Header({ currentPage, setPage, pages }) {
  return (
    <header className="header">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => setPage(page.id)}
          className={page.id === currentPage ? 'active' : ''}
        >
          {page.title}
        </button>
      ))}
    </header>
  );
}

export default Header;