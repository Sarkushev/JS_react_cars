import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BasketList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Используем JSONPlaceholder для демо данных
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const ordersData = response.data.map(item => ({
        id: item.id,
        carName: `Toyota ${item.id === 1 ? 'AE86' : item.id === 2 ? 'Supra' : 'Camry'}`,
        price: `$${(item.id * 10000) + 15000}`,
        status: ['Pending', 'Processing', 'Completed'][item.id % 3],
        date: new Date().toLocaleDateString(),
        quantity: item.id
      }));
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      // Объединяем локальные заказы (созданные в приложении) перед серверными
      setOrders([...local, ...ordersData]);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback данные
      const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const fallback = [
        { id: 1, carName: 'Toyota AE86 Trueno', price: '$25,000', status: 'Pending', date: '2024-01-15', quantity: 1 },
        { id: 2, carName: 'Nissan Skyline GT-R R34', price: '$80,000', status: 'Processing', date: '2024-01-14', quantity: 1 },
        { id: 3, carName: 'Mazda RX-7 FD', price: '$45,000', status: 'Completed', date: '2024-01-10', quantity: 2 }
      ];
      setOrders([...local, ...fallback]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setOrders(orders.filter(order => order.id !== id));
        alert('Заказ успешно удален!');
      } catch (error) {
        console.error('Error deleting order:', error);
        // Локальное удаление для демо
        setOrders(orders.filter(order => String(order.id) !== String(id)));
        // Удаляем из локального хранилища, если был локальный заказ
        const local = JSON.parse(localStorage.getItem('localOrders') || '[]');
        const updatedLocal = local.filter(o => String(o.id) !== String(id));
        localStorage.setItem('localOrders', JSON.stringify(updatedLocal));
        alert('Заказ удален (демо)');
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Мои заказы</h1>
        <Link to="/create-order" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>
          Новый заказ
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">Корзина пуста</h4>
          <p>У вас нет активных заказов. Создайте новый заказ!</p>
          <Link to="/create-order" className="btn btn-outline-primary">
            Создать первый заказ
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Автомобиль</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.carName}</td>
                  <td className="fw-bold text-success">{order.price}</td>
                  <td>
                    <span className="badge bg-primary">{order.quantity}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      order.status === 'Completed' ? 'bg-success' :
                      order.status === 'Processing' ? 'bg-warning' : 'bg-secondary'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link 
                        to={`/order/${order.id}`} 
                        className="btn btn-outline-info"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link 
                        to={`/update-order/${order.id}`} 
                        className="btn btn-outline-warning"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="btn btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Итого</h5>
          <div className="row">
            <div className="col-md-6">
              <p>Общее количество заказов: <strong>{orders.length}</strong></p>
              <p>Общая стоимость: <strong className="text-success">
                ${orders.reduce((sum, order) => sum + parseInt(order.price.replace(/[^0-9]/g, '')), 0).toLocaleString()}
              </strong></p>
            </div>
            <div className="col-md-6">
              <p>В обработке: <strong>{orders.filter(o => o.status === 'Processing').length}</strong></p>
              <p>Завершено: <strong>{orders.filter(o => o.status === 'Completed').length}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketList;