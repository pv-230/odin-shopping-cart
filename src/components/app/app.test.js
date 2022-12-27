import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';

// products mock
jest.mock(
  '../../data/products',
  () =>
    new Map([
      [
        'key1',
        {
          name: 'item1',
          price: 1,
        },
      ],
      [
        'key2',
        {
          name: 'item2',
          price: 2,
        },
      ],
    ])
);

// navbar mock
jest.mock('../navbar/navbar', () => ({ cartQuantity, toggleCart }) => (
  <nav>
    <button data-testid="cart-btn" onClick={toggleCart}>
      {cartQuantity}
    </button>
  </nav>
));

// cart mock
jest.mock(
  '../cart/cart',
  () =>
    ({ cartVisible, cartItems, removeFromCart, updateItemQuantity }) =>
      cartVisible ? (
        <div data-testid="cart">
          <ul>
            {Array.from(cartItems).map(([productKey, product]) => (
              <li key={productKey}>
                <span data-testid={`${productKey}-name`}>{product.name}</span>
                <input
                  type="number"
                  data-testid={`${productKey}-quantity`}
                  value={product.quantity || ''}
                  onChange={(e) =>
                    updateItemQuantity(productKey, Math.abs(Math.floor(Number(e.target.value))))
                  }
                />
                <button
                  data-testid="remove-btn"
                  onClick={() => removeFromCart(productKey)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
      ) : null
);

const productsArr = [
  [
    'key1',
    {
      name: 'item1',
      price: 1,
    },
  ],
  [
    'key2',
    {
      name: 'item2',
      price: 2,
    },
  ],
];

// products page mock
jest.mock('react-router-dom', () => ({
  Outlet: ({ context }) =>
    productsArr.map(([productKey, product]) => (
      <button
        data-testid={`${productKey}-btn`}
        key={productKey}
        onClick={() => context.addToCart(productKey)}
      ></button>
    )),
}));

describe('app component', () => {
  it('adds product to cart', async () => {
    render(<App />);
    const addBtn = screen.getByTestId('key1-btn');
    const cartBtn = screen.getByTestId('cart-btn');

    expect(screen.queryByTestId('cart')).not.toBeInTheDocument();
    expect(cartBtn.textContent).toBe('0');
    userEvent.click(addBtn);
    expect(cartBtn.textContent).toBe('1');
    // TODO: figure out why cart doesn't open
    // userEvent.click(cartBtn);
    // expect(screen.getByTestId('cart')).toBeInTheDocument();
  });
});
