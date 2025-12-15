import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BasketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      // Сначала проверяем локальные заказы (созданные в приложении)
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const found = local.find(o => String(o.id) === String(id));
      if (found) {
        setOrder(found);
        return;
      }

      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const orderData = {
        id: response.data.id,
        carName: `Toyota ${response.data.id === 1 ? 'AE86 Trueno' : response.data.id === 2 ? 'Supra A80' : 'Camry'}`,
        price: `$${(response.data.id * 10000) + 15000}`,
        status: ['Pending', 'Processing', 'Completed'][response.data.id % 3],
        date: new Date().toLocaleDateString(),
        quantity: response.data.id,
        // Если данных о клиенте нет на сервере — оставляем демонстрационные значения
        customerName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        address: 'Москва, ул. Пушкина, д. Колотушкина',
        notes: response.data.body
      };
      setOrder(orderData);
    } catch (error) {
      console.error('Error fetching order:', error);
      // Fallback данные
      setOrder({
        id: parseInt(id),
        carName: 'Toyota AE86 Trueno',
        price: '$25,000',
        status: 'Pending',
        date: '2024-01-15',
        quantity: 1,
        customerName: 'Иван Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        address: 'Москва, ул. Пушкина, д. Колотушкина',
        notes: 'Хочу черный цвет с красными полосками'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        alert('Заказ успешно удален!');
        navigate('/basket');
      } catch (error) {
        console.error('Error deleting order:', error);
        // Если удаляем локальный заказ — удаляем из localStorage
        const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const updatedLocal = local.filter(o => String(o.id) !== String(id));
        localStorage.setItem('localOrders', JSON.stringify(updatedLocal));
        alert('Заказ удален (демо)');
        navigate('/basket');
      }
    }
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

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h2>Заказ не найден</h2>
        </div>
        <Link to="/basket" className="btn btn-primary">
          Вернуться к списку заказов
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/basket" className="btn btn-outline-secondary mb-3">
            ← Назад к заказам
          </Link>
          <h1>Заказ #{order.id}</h1>
        </div>
        <div className="btn-group">
          <Link to={`/update-order/${order.id}`} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Редактировать
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <i className="bi bi-trash me-2"></i>
            Удалить
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Информация о заказе</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Автомобиль:</strong> {order.carName}</p>
                  <p><strong>Цена:</strong> <span className="text-success fw-bold">{order.price}</span></p>
                  <p><strong>Количество:</strong> <span className="badge bg-primary">{order.quantity}</span></p>
                </div>
                <div className="col-md-6">
                  <p><strong>Статус:</strong> 
                    <span className={`badge ms-2 ${
                      order.status === 'Completed' ? 'bg-success' :
                      order.status === 'Processing' ? 'bg-warning' : 'bg-secondary'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p><strong>Дата заказа:</strong> {order.date}</p>
                  <p><strong>Итого:</strong> <span className="text-success fw-bold fs-5">
                    ${(parseInt(order.price.replace(/[^0-9]/g, '')) * order.quantity).toLocaleString()}
                  </span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Информация о клиенте</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Имя:</strong> {order.customerName}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Телефон:</strong> {order.phone}</p>
                  <p><strong>Адрес:</strong> {order.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Дополнительная информация</h5>
            </div>
            <div className="card-body">
              <h6>Примечания:</h6>
              <p className="text-muted">{order.notes}</p>
              
              <hr />
              
              <h6>История статусов:</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Заказ создан - {order.date}
                </li>
                <li className="mb-2">
                  <i className="bi bi-clock-fill text-warning me-2"></i>
                  В обработке - {order.date}
                </li>
                {order.status === 'Completed' && (
                  <li>
                    <i className="bi bi-truck text-primary me-2"></i>
                    Доставлен - {order.date}
                  </li>
                )}
              </ul>
              
              <hr />
              
              <div className="d-grid gap-2">
                <button className="btn btn-success">
                  <i className="bi bi-credit-card me-2"></i>
                  Оплатить сейчас
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-printer me-2"></i>
                  Распечатать счет
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketDetail;