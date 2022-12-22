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
   * @param {string} id Product ID
   */
  function addToCart(id) {
    let productToAdd = products.get(id);

    if (productToAdd === 'undefined') {
      throw new Error('Unable to add cart item (ID not found)');
    }

    const prevQuantity = cartItems.get(id)?.quantity;

    productToAdd = {
      ...productToAdd,
      quantity: prevQuantity ? prevQuantity + 1 : 1,
      totalPrice: productToAdd.price * (prevQuantity ? prevQuantity + 1 : 1),
    };

    setCartItems(new Map(cartItems.set(id, productToAdd)));
    setCartQuantity(cartQuantity + 1);
  }

  /**
   * Removes a produce from the shopping cart.
   * @param {string} id Product ID
   */
  function removeFromCart(id) {
    if (cartItems.has(id)) {
      setCartQuantity(cartQuantity - cartItems.get(id).quantity);
      cartItems.delete(id);
      setCartItems(new Map(cartItems));
    } else {
      throw new Error('Unable to remove cart item (ID not found)');
    }
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * @param {string} id Product ID
   * @param {number} newQuantity
   */
  function updateItemQuantity(id, newQuantity) {
    let productToUpdate = cartItems.get(id);

    if (productToUpdate !== 'undefined') {
      const oldQuantity = productToUpdate.quantity;

      productToUpdate = {
        ...productToUpdate,
        quantity: newQuantity,
        totalPrice: productToUpdate.price * newQuantity,
      };

      setCartItems(new Map(cartItems.set(id, productToUpdate)));
      setCartQuantity(cartQuantity - oldQuantity + productToUpdate.quantity);
    } else {
      throw new Error('Unable to update cart item (ID not found)');
    }
  }

  return (
    <div className="app">
      <Navbar cartQuantity={cartQuantity} />
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateItemQuantity={updateItemQuantity}
      />
      <Outlet context={{ addToCart }} />
    </div>
  );
}

export default App;
