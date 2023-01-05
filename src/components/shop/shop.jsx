import { useOutletContext } from 'react-router-dom';
import './shop.css';
import Product from '../product/product';
import { productsArr } from '../../data/products';

function Shop() {
  const { addToCart } = useOutletContext();

  return (
    <div className="shop">
      <div className="shop__products">
        {productsArr.map(([productKey, product]) => (
          <Product
            key={productKey}
            id={productKey}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
