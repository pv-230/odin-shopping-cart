import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

const cartItemsArrMock = [
  [
    'key1',
    {
      name: 'item1',
      price: 3.5,
      quantity: 1,
      totalPrice: 3.5,
    },
  ],
  [
    'key2',
    {
      name: 'item2',
      price: 1,
      quantity: 2,
      totalPrice: 2,
    },
  ],
];

const cartItemsMock = new Map(cartItemsArrMock);
const cartTotalPrice = cartItemsArrMock.reduce((prev, curr) => prev + curr[1].totalPrice, 0);

const propMocks = {
  cartVisible: true,
  cartItems: cartItemsMock,
  removeFromCart: jest.fn(),
  updateItemQuantity: jest.fn(),
};

describe('cart component', () => {
  it('displays all cart items with info', () => {
    render(<Cart {...propMocks} />);

    cartItemsArrMock.forEach((cartItem, i) => {
      expect(screen.getByText(`${cartItemsArrMock[i][1].name}`)).toBeInTheDocument();
      expect(
        screen.getByText(`$${cartItemsArrMock[i][1].totalPrice.toFixed(2)}`)
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue(cartItemsArrMock[i][1].quantity)).toBeInTheDocument();
    });
    expect(screen.getAllByRole('button').length).toBe(cartItemsArrMock.length);
    expect(screen.getByText(`Cart total: $${cartTotalPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    render(<Cart {...propMocks} />);
    const removeBtns = screen.getAllByRole('button');
    removeBtns.forEach((btn) => {
      userEvent.click(btn);
      expect(propMocks.removeFromCart).toBeCalled();
    });
  });

  it('updates new quantity with spinner', () => {
    render(<Cart {...propMocks} />);
    const firstInput = screen.getAllByRole('spinbutton')[0];

    userEvent.type(firstInput, '0');
    expect(propMocks.updateItemQuantity).toBeCalled();
  });
});
