import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

// Routes
import Layout from './layout/layout.jsx';
import ErrorPage from './error-page/error-page.jsx';
import Home from './home/home.jsx';
import Shop from './shop/shop.jsx';

// Browser router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Route>
  )
);

// App component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
