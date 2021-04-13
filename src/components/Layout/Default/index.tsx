import React from 'react';
import Header from '../../Header/Header';
import './styles.css';
import SideNav from '../SideNav';

interface ILayoutProps {
  children: React.ReactNode;
  props: object;
}

const DefaultLayout = ({ children, ...props }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <div className="top-container">
        <SideNav {...props} />
        <div className="wrapper">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
