const products = new Map();

products.set(crypto.randomUUID(), { name: 'Pumpkin', price: 10 });
products.set(crypto.randomUUID(), { name: 'Strawberries', price: 5 });
products.set(crypto.randomUUID(), { name: 'Lemon', price: 0.75 });
products.set(crypto.randomUUID(), { name: 'Cherries', price: 4.25 });
products.set(crypto.randomUUID(), { name: 'Orange', price: 1.25 });
products.set(crypto.randomUUID(), { name: 'Apple', price: 1.5 });

export default products;