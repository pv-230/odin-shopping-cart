import React from 'react';
import { Outlet } from 'react-router-dom';
import 'normalize.css';
import './app.css';

// Components
import Navbar from '../navbar/navbar.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
