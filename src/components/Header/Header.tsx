import React from 'react';
import logo from './billhuang.jpeg';

const Header = () => {
  return (
    <header className="header">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <img src={logo} className="header-logo" alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
