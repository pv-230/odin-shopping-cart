import apple from './product-images/apple.webp';
import cherries from './product-images/cherries.webp';
import lemon from './product-images/lemon.webp';
import grapes from './product-images/grapes.webp';
import pumpkin from './product-images/pumpkin.webp';
import strawberry from './product-images/strawberry.webp';

const products = new Map();

products.set(crypto.randomUUID(), { name: 'Pumpkin', price: 10, imageUrl: pumpkin });
products.set(crypto.randomUUID(), { name: 'Strawberries', price: 5, imageUrl: strawberry });
products.set(crypto.randomUUID(), { name: 'Lemon', price: 0.75, imageUrl: lemon });
products.set(crypto.randomUUID(), { name: 'Cherries', price: 4.25, imageUrl: cherries });
products.set(crypto.randomUUID(), { name: 'Grapes', price: 3.5, imageUrl: grapes });
products.set(crypto.randomUUID(), { name: 'Apple', price: 1.5, imageUrl: apple });

// Used when rendering each product inside a component with Array.prototype.map()
const productsArr = Array.from(products);

export { products as default, productsArr };
