import { useOutletContext } from 'react-router-dom';
import './shop.css';
import Product from '../product/product';
import products from '../../data/products';

function Shop() {
  const { addToCart } = useOutletContext();

  return (
    <div className="shop">
      <div className="shop__products">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
