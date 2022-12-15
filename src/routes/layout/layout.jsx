import React from 'react';
import { Outlet } from 'react-router-dom';
import 'normalize.css';
import './layout.css';

// Components
import Navbar from '../../components/navbar/navbar.jsx';

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
