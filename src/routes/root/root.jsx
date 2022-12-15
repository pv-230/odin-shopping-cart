import { Outlet } from 'react-router-dom';
import 'normalize.css';
import './root.css';

// Components
import Navbar from '../../components/navbar/navbar';

function Root() {
  return (
    <div className="root">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
