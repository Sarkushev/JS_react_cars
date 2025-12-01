import React from 'react';
import cars from '../data/cars';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">ТОП-6 Японских Автомобилей</h1>
      
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card">
              <img 
                src={car.image} 
                className="card-img-top" 
                alt={car.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">
                  <strong>Производитель:</strong> {car.manufacturer}<br/>
                  <strong>Год:</strong> {car.year}<br/>
                  <strong>Мощность:</strong> {car.horsepower}
                </p>
                <Link to={`/car/${car.id}`} className="btn btn-primary">
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;