import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/app.jsx';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
