import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar.css';
import cartUrl from './cart.svg';

function Navbar({ cartQuantity, toggleCart }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              if (isActive) return 'navbar__link navbar__link_active';
              return 'navbar__link';
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => {
              if (isActive) return 'navbar__link navbar__link_active';
              return 'navbar__link';
            }}
          >
            Shop
          </NavLink>
        </li>
      </ul>
      <button className="navbar__cart-icon" type="button" onClick={toggleCart}>
        <img className="navbar__cart-svg" src={cartUrl} alt="Shopping cart" />
        {cartQuantity > 0 ? <div className="navbar__cart-quantity">{cartQuantity}</div> : null}
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default Navbar;
