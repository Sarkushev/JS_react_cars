import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Японские Автомобили
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;