import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const scrollToCars = () => {
    const carsSection = document.getElementById('cars-section');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="text-danger">JDM</span> Legends
          </Link>
          
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door me-1"></i>
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={scrollToCars}
                  style={{ background: 'none', border: 'none' }}
                >
                  <i className="bi bi-car-front me-1"></i>
                  Автомобили
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/basket">
                  <i className="bi bi-cart me-1"></i>
                  Корзина
                  <span className="badge bg-danger ms-1">3</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;