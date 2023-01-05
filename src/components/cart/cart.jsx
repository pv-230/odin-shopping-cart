import PropTypes from 'prop-types';
import './cart.css';
import closeIconUrl from './close.svg';

function Cart({ cartVisible, cartItems, removeFromCart, updateItemQuantity }) {
  // Sums the price of all items in cart
  const cartItemsArray = Array.from(cartItems);
  const cartTotalPrice = cartItemsArray.reduce((prev, curr) => prev + curr[1].totalPrice, 0);

  return (
    <div className="cart-wrapper">
      <div className={cartVisible ? 'cart' : 'cart_hidden'}>
        <ul className="cart__items">
          {cartItemsArray.map(([productKey, product]) => (
            <li className="cart__item" key={productKey}>
              <div className="cart__item-top-wrapper">
                <div className="cart__item-name">{product.name}</div>
                <button
                  className="cart__remove-item-btn"
                  type="button"
                  onClick={() => removeFromCart(productKey)}
                >
                  <img className="cart__remove-icon" src={closeIconUrl} alt="Close" />
                </button>
              </div>
              <span className="cart__item-price">${product.totalPrice.toFixed(2)}</span>
              <div className="cart__item-quantity-wrapper">
                <label>
                  <span>Qty: </span>
                  <input
                    className="cart__item-quantity"
                    type="number"
                    min="1"
                    max="99"
                    value={product.quantity || ''}
                    onChange={(e) => {
                      const newQuantity = Math.abs(Math.floor(Number(e.target.value)));
                      updateItemQuantity(productKey, newQuantity);
                    }}
                    onBlur={() => {
                      if (cartItems.get(productKey).quantity === 0) {
                        // Removes any cart item that had an invalid quantity set by user input
                        removeFromCart(productKey);
                      }
                    }}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        {cartTotalPrice > 0 ? (
          <div className="cart__checkout">
            <div className="cart__total-price">
              <span>Cart total:</span>
              <div className="cart__total-price-value" data-testid="cart-total">
                ${cartTotalPrice.toFixed(2)}
              </div>
            </div>
            <button className="cart__checkout-btn">Checkout</button>
          </div>
        ) : (
          <div className="cart__empty-text">Cart is empty</div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartVisible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cartItems: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateItemQuantity: PropTypes.func.isRequired,
};

export default Cart;
