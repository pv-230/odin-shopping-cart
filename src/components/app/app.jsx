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
  const [cartVisible, setCartVisible] = useState(false);

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
    if (!cartItems.has(id)) {
      throw new Error('Unable to remove cart item (ID not found)');
    }

    setCartQuantity(cartQuantity - cartItems.get(id).quantity);
    cartItems.delete(id);
    setCartItems(new Map(cartItems));
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * @param {string} id Product ID
   * @param {number} newQuantity
   */
  function updateItemQuantity(id, newQuantity) {
    let productToUpdate = cartItems.get(id);
    if (productToUpdate === 'undefined') {
      throw new Error('Unable to update cart item (ID not found)');
    }

    const oldQuantity = productToUpdate.quantity;
    productToUpdate = {
      ...productToUpdate,
      quantity: newQuantity,
      totalPrice: productToUpdate.price * newQuantity,
    };

    setCartItems(new Map(cartItems.set(id, productToUpdate)));
    setCartQuantity(cartQuantity - oldQuantity + newQuantity);
  }

  /**
   * Toggles visibility of the cart.
   */
  function toggleCart() {
    setCartVisible(!cartVisible);
  }

  return (
    // eslint-disable-next-line
    <div
      className="app"
      onClick={(e) => {
        if (
          e.target.offsetParent &&
          !e.target.offsetParent.classList.contains('cart') &&
          !e.target.offsetParent.classList.contains('navbar__cart-icon') &&
          !e.target.classList.contains('navbar__cart-icon') &&
          !e.target.classList.contains('product__add-btn') &&
          !e.target.classList.contains('product__btn-text_normal') &&
          !e.target.classList.contains('product__btn-text_added')
        ) {
          // Hides the cart when the user clicks on something not cart related
          setCartVisible(false);
        }
      }}
    >
      <Navbar cartQuantity={cartQuantity} toggleCart={toggleCart} />
      <Cart
        cartVisible={cartVisible}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateItemQuantity={updateItemQuantity}
      />
      <Outlet context={{ addToCart }} />
    </div>
  );
}

export default App;
