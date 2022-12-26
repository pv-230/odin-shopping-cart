import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './navbar';

jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => {
    return <div>{children}</div>;
  },
}));

const testProps = {
  cartQuantity: 5,
  toggleCart: jest.fn(),
};

describe('navbar component', () => {
  it('shows correct cart quantity', () => {
    render(<Navbar {...testProps} />);
    expect(screen.getByText(testProps.cartQuantity)).toBeInTheDocument();
  });

  it('displays nav links', () => {
    render(<Navbar {...testProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('calls toggleCart when cart icon is clicked', () => {
    render(<Navbar {...testProps} />);
    const cartIcon = screen.getByRole('button');
    userEvent.click(cartIcon);
    expect(testProps.toggleCart).toBeCalled();
  });

  it('hides cart quantity if zero', () => {
    render(<Navbar cartQuantity={0} toggleCart={testProps.toggleCart} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
