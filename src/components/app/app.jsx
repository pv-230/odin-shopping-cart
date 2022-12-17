import { Outlet } from 'react-router-dom';
import 'normalize.css';
import './app.css';
import Navbar from '../navbar/navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
