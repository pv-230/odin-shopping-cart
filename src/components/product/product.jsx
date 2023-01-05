import { useState } from 'react';
import PropTypes from 'prop-types';
import './product.css';

function Product({ id, name, price, addToCart, imageUrl }) {
  const [isAdded, setIsAdded] = useState(false);

  /**
   * Displays an indication for the user when the add to cart button is clicked.
   */
  function flashAddIndicator() {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 500);
  }

  return (
    <div className="product">
      <img className="product__image" src={imageUrl} alt={name} />
      <div className="product__info">
        <div className="product__name">{name}</div>
        <div className="product__price">${price.toFixed(2)}</div>
      </div>
      <button
        className="product__add-btn"
        type="button"
        onClick={() => {
          addToCart(id);
          flashAddIndicator();
        }}
      >
        {isAdded ? (
          <span className="product__btn-text_added">+1</span>
        ) : (
          <span className="product__btn-text_normal">Add to cart</span>
        )}
      </button>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Product;
