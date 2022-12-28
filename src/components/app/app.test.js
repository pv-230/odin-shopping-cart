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
                  data-testid={`${productKey}-quantity-input`}
                  value={product.quantity || ''}
                  onChange={(e) =>
                    updateItemQuantity(productKey, Math.abs(Math.floor(Number(e.target.value))))
                  }
                />
                <span data-testid={`${productKey}-quantity`}>{product.quantity}</span>
                <button
                  data-testid={`${productKey}-remove-btn`}
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
        data-testid={`${productKey}-add-btn`}
        key={productKey}
        onClick={() => context.addToCart(productKey)}
      ></button>
    )),
}));

describe('app component', () => {
  it('adds product to cart', async () => {
    render(<App />);
    const cartBtn = screen.getByTestId('cart-btn');

    // ensure cart is empty
    expect(screen.queryByTestId('cart')).not.toBeInTheDocument();
    expect(cartBtn.textContent).toBe('0');

    // add item
    userEvent.click(screen.getByTestId('key1-add-btn'));
    expect(cartBtn.textContent).toBe('1');

    // check cart
    userEvent.click(cartBtn);
    expect(screen.getByTestId('cart')).toBeInTheDocument();
    expect(screen.getByTestId('key1-name').textContent).toBe('item1');
    expect(screen.getByTestId('key1-quantity').textContent).toBe('1');
  });

  it('removes items from cart', () => {
    render(<App />);

    // add to cart
    userEvent.click(screen.getByTestId('key2-add-btn'));
    userEvent.click(screen.getByTestId('cart-btn'));
    expect(screen.getByTestId('key2-name').textContent).toBe('item2');

    // remove from cart
    userEvent.click(screen.getByTestId('key2-remove-btn'));
    expect(screen.queryByTestId('key2-name')).not.toBeInTheDocument();
  });

  it('updates quantity of a cart item', () => {
    render(<App />);

    // add to cart
    userEvent.click(screen.getByTestId('key2-add-btn'));
    expect(screen.getByTestId('cart-btn').textContent).toBe('1');
    userEvent.click(screen.getByTestId('cart-btn'));
    expect(screen.getByTestId('key2-name').textContent).toBe('item2');
    expect(screen.getByTestId('key2-quantity').textContent).toBe('1');

    // update quantity
    userEvent.type(screen.getByTestId('key2-quantity-input'), '0');
    expect(screen.getByTestId('cart-btn').textContent).toBe('10');
    expect(screen.getByTestId('key2-quantity').textContent).toBe('10');
  });
});
