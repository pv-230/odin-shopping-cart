import { NavLink } from 'react-router-dom';
import './navbar.css';
import cartUrl from './cart.svg';

function Navbar() {
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
      <div className="navbar__cart-icon">
        <img className="navbar__cart-svg" src={cartUrl} alt="Shopping cart" />
      </div>
    </nav>
  );
}

export default Navbar;
