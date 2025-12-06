import React from 'react';
import cars from '../data/cars';

function TestPage() {
  console.log('Тестовые данные:', cars);
  console.log('Первый автомобиль:', cars[0]);
  
  return (
    <div className="container mt-5">
      <h1>Тест отображения данных</h1>
      
      {/* Простой текст для проверки кириллицы */}
      <div className="mb-4">
        <h3>Проверка кириллицы:</h3>
        <p>Мощность: 128 л.с.</p>
        <p>Разгон: 8.5 сек (0-100 км/ч)</p>
        <p>Скорость: 200 км/ч</p>
      </div>
      
      {/* Простая карточка без стилей */}
      <div className="mb-4">
        <h3>Автомобиль 1 (простая версия):</h3>
        <div style={{border: '1px solid #ccc', padding: '20px', borderRadius: '8px'}}>
          <h4>{cars[0].name}</h4>
          <p><strong>Производитель:</strong> {cars[0].manufacturer}</p>
          <p><strong>Год:</strong> {cars[0].year}</p>
          <p><strong>Мощность:</strong> {cars[0].horsepower}</p>
          <p><strong>Двигатель:</strong> {cars[0].engine}</p>
        </div>
      </div>
      
      {/* Все автомобили в простом списке */}
      <div>
        <h3>Все автомобили:</h3>
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              #{car.id}: {car.name} ({car.manufacturer}, {car.year})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TestPage;