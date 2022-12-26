import { screen, render } from '@testing-library/react';
import Shop from './shop';
import { productsArr } from '../../data/products';
import { useOutletContext } from 'react-router-dom';

jest.mock('react-router-dom', () => ({ useOutletContext: jest.fn() }));

describe('shop component', () => {
  it('displays all products', () => {
    useOutletContext.mockReturnValue({ addToCart: jest.fn() });
    render(<Shop />);

    for (let i = 0; i < productsArr.length; i++) {
      const product = productsArr[i][1]; // Map converted to array
      expect(screen.getByAltText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: 'Add to cart' }).length).toBe(
        productsArr.length
      );
    }
  });
});
