import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import products from '../../data/products';
import 'normalize.css';
import './app.css';
import Navbar from '../navbar/navbar';

function App() {
  const [cart, setCart] = useState(new Map());
  const [cartQuantity, setCartQuantity] = useState(0);

  /**
   * Adds a product to the shopping cart.
   * @param {number} id Product ID
   */
  function addToCart(id) {
    let productToAdd = products.find((product) => product.id === id);
    const prevQuantity = cart.get(id)?.quantity;

    productToAdd = {
      ...productToAdd,
      quantity: prevQuantity ? prevQuantity + 1 : 1,
      totalPrice: Number(productToAdd.price) * (prevQuantity ? prevQuantity + 1 : 1),
    };

    setCart(new Map(cart.set(id, productToAdd)));
    setCartQuantity(cartQuantity + 1);
  }

  return (
    <div className="app">
      <Navbar cartQuantity={cartQuantity} />
      <Outlet context={{ addToCart }} />
    </div>
  );
}

export default App;
