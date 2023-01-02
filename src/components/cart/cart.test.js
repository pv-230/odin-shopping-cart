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

const cartTotalPrice = cartItemsArrMock.reduce((prev, curr) => prev + curr[1].totalPrice, 0);

const propMocks = {
  cartVisible: true,
  cartItems: new Map(cartItemsArrMock),
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
    expect(screen.getByText(`$${cartTotalPrice.toFixed(2)}`)).toBeInTheDocument();
  });

  it('calls removeFromCart when remove button is clicked', () => {
    render(<Cart {...propMocks} />);
    const removeBtns = screen.getAllByRole('button');
    removeBtns.forEach((btn) => {
      userEvent.click(btn);
      expect(propMocks.removeFromCart).toBeCalled();
    });
  });

  it('updates new quantity with number input', () => {
    render(<Cart {...propMocks} />);
    const firstInput = screen.getAllByRole('spinbutton')[0];

    userEvent.type(firstInput, '0');
    expect(propMocks.updateItemQuantity).toBeCalled();
  });

  it('removes cart items with zero quantity', () => {
    const cartItemZeroQuantity = [
      [
        'key1',
        {
          name: 'zero item',
          price: 3.5,
          quantity: 0,
          totalPrice: 0,
        },
      ],
    ];

    render(<Cart {...{ ...propMocks, cartItems: new Map(cartItemZeroQuantity) }} />);
    const numberInput = screen.getByRole('spinbutton');
    const itemName = screen.getByText('zero item');

    expect(screen.getByText('zero item')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton').getAttribute('value')).toBe('');
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
    userEvent.click(numberInput);
    userEvent.click(itemName);
    expect(propMocks.removeFromCart).toBeCalled();
  });

  it('hides cart if visiblilty is false', () => {
    render(<Cart {...{ ...propMocks, cartVisible: false }} />);
    expect(screen.queryByText('Cart total')).not.toBeInTheDocument();
  });
});
