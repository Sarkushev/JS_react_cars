import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CreateOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carName: '',
    price: '',
    quantity: 1,
    customerName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const cars = [
    { name: 'Toyota AE86 Trueno', price: '25000' },
    { name: 'Nissan Skyline GT-R R34', price: '80000' },
    { name: 'Toyota Supra A80', price: '40000' },
    { name: 'Mazda RX-7 FD', price: '35000' },
    { name: 'Honda NSX', price: '60000' },
    { name: 'Subaru Impreza WRX STI 22B', price: '300000' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Автоматическое обновление цены при выборе автомобиля
    if (name === 'carName') {
      const selectedCar = cars.find(car => car.name === value);
      if (selectedCar) {
        setFormData(prev => ({
          ...prev,
          price: selectedCar.price,
          carName: value
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        id: uuidv4(),
        ...formData,
        date: new Date().toISOString(),
        status: 'Pending',
        price: `$${parseInt(formData.price).toLocaleString()}`
      };

      // Отправляем на фейковый API
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', orderData);
      console.log('Order created:', response.data);
      
      // Сохраняем заказ локально, т.к. jsonplaceholder не сохраняет данные для последующего GET
      const existing = JSON.parse(localStorage.getItem('localOrders') || '[]');
      localStorage.setItem('localOrders', JSON.stringify([orderData, ...existing]));

      alert('Заказ успешно создан!');
      navigate('/basket');
    } catch (error) {
      console.error('Error creating order:', error);
      // Сохраняем локально даже в случае ошибки (демо режим)
      const orderData = {
        id: uuidv4(),
        ...formData,
        date: new Date().toISOString(),
        status: 'Pending',
        price: `$${parseInt(formData.price).toLocaleString()}`
      };
      const existing = JSON.parse(localStorage.getItem('localOrders') || '[]');
      localStorage.setItem('localOrders', JSON.stringify([orderData, ...existing]));

      console.warn('Заказ создан (демо режим)');
      alert('Заказ создан (демо режим)');
      navigate('/basket');
    }
  };

  const calculateTotal = () => {
    const price = parseInt(formData.price) || 0;
    const quantity = parseInt(formData.quantity) || 1;
    return (price * quantity).toLocaleString();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="bi bi-cart-plus me-2"></i>
                Создание нового заказа
              </h3>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h5 className="border-bottom pb-2">Выбор автомобиля</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Автомобиль *</label>
                      <select
                        name="carName"
                        className="form-select"
                        value={formData.carName}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Выберите автомобиль</option>
                        {cars.map((car, index) => (
                          <option key={index} value={car.name}>
                            {car.name} - ${parseInt(car.price).toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Цена ($)</label>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        readOnly
                      />
                    </div>
                    
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Количество</label>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        min="1"
                        max="10"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="alert alert-info">
                    <strong>Итого:</strong> 
                    <span className="fs-4 text-success ms-2">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="border-bottom pb-2">Информация о клиенте</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Имя *</label>
                      <input
                        type="text"
                        name="customerName"
                        className="form-control"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Телефон *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Адрес доставки</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="border-bottom pb-2">Дополнительная информация</h5>
                  <div className="mb-3">
                    <label className="form-label">Примечания к заказу</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      rows="4"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Особые пожелания, цвет автомобиля, дополнительные опции..."
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/basket')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Отмена
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Создать заказ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;