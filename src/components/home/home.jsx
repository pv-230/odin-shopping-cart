import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome-box">
        <div className="welcome-box__left">
          <div className="welcome-box__text">
            <div className="welcome-box__header">WELCOME</div>
            <div className="welcome-box__text-description">
              Browse our selection of fresh and organic fruits.
            </div>
            <Link className="welcome-box__shop-btn" to="/shop">
              Shop now
            </Link>
          </div>
        </div>
        <div className="welcome-box__image"></div>
      </div>
    </div>
  );
}

export default Home;
