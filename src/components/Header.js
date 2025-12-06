import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="text-danger">JDM</span> Legends
          </Link>
          
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Главная</Link>
            <a className="nav-link" href="#cars-section">Автомобили</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;