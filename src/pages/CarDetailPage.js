import React from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../data/cars';

function CarDetailPage() {
  const { id } = useParams();
  const car = cars.find(c => c.id === parseInt(id));

  const handleImageError = (e) => {
    e.target.onerror = null;
    const svg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <rect x="20" y="20" width="760" height="360" rx="10" fill="#e9ecef" stroke="#dee2e6" stroke-width="2"/>
        <text x="50%" y="45%" font-family="Arial" font-size="30" text-anchor="middle" fill="#6c757d">
          ${car ? car.name : 'Автомобиль'}
        </text>
        <text x="50%" y="55%" font-family="Arial" font-size="20" text-anchor="middle" fill="#adb5bd">
          Изображение временно недоступно
        </text>
      </svg>`
    )}`;
    e.target.src = svg;
  };

  if (!car) {
    return (
      <div className="container mt-5 text-center">
        <h2>Автомобиль не найден</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Вернуться к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-primary mb-4">
        ← Назад к списку
      </Link>
      
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-5">
            <img 
              src={car.image} 
              className="img-fluid rounded-start" 
              alt={car.name}
              style={{ height: '100%', objectFit: 'cover' }}
              onError={handleImageError}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body p-4">
              <h1 className="card-title mb-3">{car.name}</h1>
              
              <div className="mb-3">
                <span className="badge bg-primary me-2">{car.manufacturer}</span>
                <span className="badge bg-success me-2">{car.year}</span>
                <span className="badge bg-warning text-dark">{car.rating}/10</span>
              </div>
              
              <div className="mb-4">
                <h5>Описание</h5>
                <p>{car.description}</p>
              </div>
              
              <div className="mb-4">
                <h5>Характеристики</h5>
                <p><strong>Двигатель:</strong> {car.engine}</p>
                <p><strong>Мощность:</strong> {car.horsepower}</p>
                <p><strong>Разгон 0-100:</strong> {car.acceleration}</p>
                <p><strong>Макс. скорость:</strong> {car.topSpeed}</p>
              </div>
              
              <div className="mb-4">
                <h5>Особенности</h5>
                <ul>
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-success mb-0">{car.price}</h4>
                <button className="btn btn-primary">
                  Подробнее о покупке
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;