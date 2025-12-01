import React from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../data/cars';

function CarDetailPage() {
  const { id } = useParams();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="container mt-5">
        <h2>Автомобиль не найден</h2>
        <Link to="/" className="btn btn-primary">Назад</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">← Назад</Link>
      
      <div className="card">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={car.image} 
              className="img-fluid" 
              alt={car.name}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2>{car.name}</h2>
              <p><strong>Производитель:</strong> {car.manufacturer}</p>
              <p><strong>Год:</strong> {car.year}</p>
              <p><strong>Двигатель:</strong> {car.engine}</p>
              <p><strong>Мощность:</strong> {car.horsepower}</p>
              <p><strong>Разгон 0-100:</strong> {car.acceleration}</p>
              <p><strong>Макс. скорость:</strong> {car.topSpeed}</p>
              <p><strong>Цена:</strong> {car.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;