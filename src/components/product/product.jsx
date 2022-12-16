import PropTypes from 'prop-types';
import './product.css';

function Product({ name, price }) {
  return (
    <div className="product">
      <img className="product__image" src="" alt={name} />
      <div className="product__info">
        <div className="product__name">{name}</div>
        <div className="product__price">${price}</div>
      </div>
      <button className="product__add-btn" type="button">
        Add to cart
      </button>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
