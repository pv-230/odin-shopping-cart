import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from './product';

const testProps = {
  id: 'randomkey',
  name: 'test product',
  price: 3.5,
  imageUrl: '',
  addToCart: jest.fn(),
};

describe('product component', () => {
  it('displays correct product information', () => {
    render(<Product {...testProps} />);
    expect(screen.getByAltText(testProps.name)).toBeInTheDocument();
    expect(screen.getByText('test product')).toBeInTheDocument();
    expect(screen.getByText('$3.50')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });

  it('calls addToCart when button is clicked', () => {
    render(<Product {...testProps} />);
    const addBtn = screen.getByRole('button', { name: 'Add to cart' });
    userEvent.click(addBtn);
    expect(testProps.addToCart).toBeCalled();
  });
});
