import React from 'react';
import cars from '../data/cars';
import { Link } from 'react-router-dom';

function HomePage() {
  // Функция для обработки ошибок изображений
  const handleImageError = (e, carId) => {
    e.target.onerror = null;
    // Создаем SVG placeholder
    const svg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <rect x="10" y="10" width="380" height="280" rx="10" fill="#e9ecef" stroke="#dee2e6" stroke-width="2"/>
        <text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="#6c757d">
          Автомобиль #${carId}
        </text>
      </svg>`
    )}`;
    e.target.src = svg;
  };

  return (
    <div className="container mt-4" id="cars-section">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">ТОП-6 Японских Автомобилей</h1>
        <p className="lead text-muted">Легендарные JDM автомобили</p>
      </div>
      
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              {/* Изображение с номером */}
              <div className="position-relative">
                <img 
                  src={car.image} 
                  className="card-img-top" 
                  alt={car.name}
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                  onError={(e) => handleImageError(e, car.id)}
                />
                {/* Номер в левом верхнем углу */}
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-danger fs-5 px-3 py-2 rounded-circle">
                    #{car.id}
                  </span>
                </div>
                {/* Рейтинг в правом верхнем углу */}
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-warning text-dark fs-5 px-3 py-2">
                    {car.rating}/10
                  </span>
                </div>
              </div>
              
              {/* Контент карточки */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2">{car.name}</h5>
                
                {/* Бейджи */}
                <div className="mb-3">
                  <span className="badge bg-dark me-1 mb-1">{car.manufacturer}</span>
                  <span className="badge bg-primary me-1 mb-1">{car.year}</span>
                  <span className="badge bg-info mb-1">{car.category}</span>
                </div>
                
                {/* Статистика */}
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="text-muted small">Мощность</div>
                    <div className="fw-bold text-danger">{car.horsepower}</div>
                  </div>
                  <div className="col-4">
                    <div className="text-muted small">Разгон</div>
                    <div className="fw-bold text-danger">{car.acceleration}</div>
                  </div>
                  <div className="col-4">
                    <div className="text-muted small">Скорость</div>
                    <div className="fw-bold text-danger">{car.topSpeed}</div>
                  </div>
                </div>
                
                {/* Двигатель */}
                <p className="card-text mb-3">
                  <small className="text-muted">Двигатель:</small><br/>
                  <strong>{car.engine}</strong>
                </p>
                
                {/* Цена и кнопка */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="text-success fw-bold">{car.price}</span>
                  <Link 
                    to={`/car/${car.id}`} 
                    className="btn btn-danger"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;