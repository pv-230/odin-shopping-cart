import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import products from '../../data/products';
import 'normalize.css';
import './app.css';
import Navbar from '../navbar/navbar';
import Cart from '../cart/cart';

function App() {
  const [cartItems, setCartItems] = useState(new Map());
  const [cartQuantity, setCartQuantity] = useState(0);

  /**
   * Adds a product to the shopping cart.
   * @param {number} id Product ID
   */
  function addToCart(id) {
    let productToAdd = products.get(id);
    const prevQuantity = cartItems.get(id)?.quantity;

    productToAdd = {
      ...productToAdd,
      quantity: prevQuantity ? prevQuantity + 1 : 1,
      totalPrice: productToAdd.price * (prevQuantity ? prevQuantity + 1 : 1),
    };

    setCartItems(new Map(cartItems.set(id, productToAdd)));
    setCartQuantity(cartQuantity + 1);
  }

  return (
    <div className="app">
      <Navbar cartQuantity={cartQuantity} />
      <Cart cartItems={cartItems} />
      <Outlet context={{ addToCart }} />
    </div>
  );
}

export default App;
