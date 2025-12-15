import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carName: '',
    price: '',
    quantity: 1,
    customerName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(true);

  const cars = [
    { name: 'Toyota AE86 Trueno', price: '25000' },
    { name: 'Nissan Skyline GT-R R34', price: '80000' },
    { name: 'Toyota Supra A80', price: '40000' },
    { name: 'Mazda RX-7 FD', price: '35000' },
    { name: 'Honda NSX', price: '60000' },
    { name: 'Subaru Impreza WRX STI 22B', price: '300000' }
  ];

  const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      // Сначала ищем локальный заказ
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const found = local.find(o => String(o.id) === String(id));
      if (found) {
        // Приводим поля к формату формы
        setFormData({
          carName: found.carName || '',
          price: (found.price || '').toString().replace(/[^0-9]/g, '') || '',
          quantity: found.quantity || 1,
          customerName: found.customerName || '',
          email: found.email || '',
          phone: found.phone || '',
          address: found.address || '',
          notes: found.notes || '',
          status: found.status || 'Pending'
        });
        setLoading(false);
        return;
      }

      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const orderData = {
        carName: `Toyota ${response.data.id === 1 ? 'AE86 Trueno' : response.data.id === 2 ? 'Supra A80' : 'Camry'}`,
        price: '25000',
        quantity: response.data.id,
        customerName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        address: 'Москва, ул. Пушкина, д. Колотушкина',
        notes: response.data.body,
        status: 'Pending'
      };
      setFormData(orderData);
    } catch (error) {
      console.error('Error fetching order:', error);
      // Fallback данные
      setFormData({
        carName: 'Toyota AE86 Trueno',
        price: '25000',
        quantity: 1,
        customerName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        address: 'Москва, ул. Пушкина, д. Колотушкина',
        notes: 'Хочу черный цвет с красными полосками',
        status: 'Pending'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedOrder = {
        ...formData,
        id: id,
        updatedAt: new Date().toISOString(),
        price: `$${parseInt(formData.price).toLocaleString()}`
      };

      // Если заказ локальный — обновляем localStorage
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const idx = local.findIndex(o => String(o.id) === String(id));
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...updatedOrder };
        localStorage.setItem('localOrders', JSON.stringify(local));
      } else {
        // Отправляем на фейковый API и также сохраняем локально, чтобы изменения были видимы
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedOrder);
        localStorage.setItem('localOrders', JSON.stringify([updatedOrder, ...local]));
      }

      alert('Заказ успешно обновлен!');
      navigate(`/order/${id}`);
    } catch (error) {
      console.error('Error updating order:', error);
      // На ошибке тоже сохраняем локально чтобы пользователь видел изменения
      const updatedOrder = {
        ...formData,
        id: id,
        updatedAt: new Date().toISOString(),
        price: `$${parseInt(formData.price).toLocaleString()}`
      };
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const idx = local.findIndex(o => String(o.id) === String(id));
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...updatedOrder };
      } else {
        local.unshift(updatedOrder);
      }
      localStorage.setItem('localOrders', JSON.stringify(local));

      alert('Заказ обновлен (демо режим)');
      navigate(`/order/${id}`);
    }
  };

  const calculateTotal = () => {
    const price = parseInt(formData.price) || 0;
    const quantity = parseInt(formData.quantity) || 1;
    return (price * quantity).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h3 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                Редактирование заказа #{id}
              </h3>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h5 className="border-bottom pb-2">Информация о заказе</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Статус заказа</label>
                      <select
                        name="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        {statuses.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Автомобиль</label>
                      <select
                        name="carName"
                        className="form-select"
                        value={formData.carName}
                        onChange={handleChange}
                      >
                        {cars.map((car, index) => (
                          <option key={index} value={car.name}>
                            {car.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Цена ($)</label>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-4 mb-3">
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
                    
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Итого</label>
                      <div className="form-control bg-light">
                        <strong className="text-success">${calculateTotal()}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="border-bottom pb-2">Информация о клиенте</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Имя</label>
                      <input
                        type="text"
                        name="customerName"
                        className="form-control"
                        value={formData.customerName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Телефон</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
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
                    <label className="form-label">Примечания</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      rows="4"
                      value={formData.notes}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(`/order/${id}`)}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Отмена
                  </button>
                  
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        if (window.confirm('Удалить этот заказ?')) {
                          navigate('/basket');
                        }
                      }}
                    >
                      <i className="bi bi-trash me-2"></i>
                      Удалить
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-warning"
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;
