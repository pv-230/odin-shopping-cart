import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/app/app';
import Home from './components/home/home';
import Shop from './components/shop/shop';
import NoMatch from './components/no-match/no-match';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
