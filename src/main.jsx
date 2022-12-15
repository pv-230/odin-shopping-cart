import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import './index.css';
import Root from './routes/root/root';
import Error from './routes/error';
import Home from './routes/home/home';
import Shop from './routes/shop/shop';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />} errorElement={<Error />}>
//       <Route errorElement={<Error />}>
//         <Route index element={<Home />} />
//         <Route path="shop" element={<Shop />} />
//       </Route>
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Home /> },
          { path: 'shop', element: <Shop /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
