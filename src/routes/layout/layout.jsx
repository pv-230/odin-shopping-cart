import { Outlet } from 'react-router-dom';
import './layout.css';

// Components
import Navbar from '../../components/navbar/navbar';

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
