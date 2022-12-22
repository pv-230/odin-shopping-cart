import PropTypes from 'prop-types';
import './cart.css';

function Cart({ cartItems, removeFromCart, updateItemQuantity }) {
  // Sums the price of all items in cart
  const cartItemsArray = Array.from(cartItems);
  const cartTotalPrice = cartItemsArray.reduce((prev, curr) => prev + curr[1].totalPrice, 0);

  return (
    <div className="cart">
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
                X
              </button>
            </div>
            <div className="cart__item-price">${product.totalPrice.toFixed(2)}</div>
            <div className="cart__item-quantity-wrapper">
              <span>Qty: </span>
              <input
                className="cart__item-quantity"
                type="number"
                min="1"
                value={product.quantity || ''}
                onChange={(e) => {
                  const newQuantity = Math.abs(Math.floor(Number(e.target.value)));
                  updateItemQuantity(productKey, newQuantity);
                }}
              />
            </div>
          </li>
        ))}
        <div className="cart__total-price">Cart total: ${cartTotalPrice.toFixed(2)}</div>
      </ul>
    </div>
  );
}

Cart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cartItems: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateItemQuantity: PropTypes.func.isRequired,
};

export default Cart;
