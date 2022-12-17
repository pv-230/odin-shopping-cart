import './shop.css';
import Product from '../product/product';
import products from '../../data/products';

function Shop() {
  return (
    <div className="shop">
      <div className="shop__products">
        {products.map((product) => (
          <Product key={product.id} name={product.name} price={product.price} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
