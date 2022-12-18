import PropTypes from 'prop-types';
import './product.css';

function Product({ id, name, price, addToCart }) {
  return (
    <div className="product">
      <img className="product__image" src="" alt={name} />
      <div className="product__info">
        <div className="product__name">{name}</div>
        <div className="product__price">${price.toFixed(2)}</div>
      </div>
      <button className="product__add-btn" type="button" onClick={() => addToCart(id)}>
        Add to cart
      </button>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Product;
