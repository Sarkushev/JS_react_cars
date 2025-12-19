import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.phone) {
      setError('Заполните обязательные поля');
      return;
    }

    const result = registerUser(form);
    if (result && result.error) {
      setError(result.error);
      return;
    }
    setSuccess('Регистрация успешна. Вы автоматически вошли.');
    setTimeout(() => navigate('/'), 900);
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Регистрация</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Имя *</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Фамилия *</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль *</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Телефон *</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Адрес</label>
          <input name="address" value={form.address} onChange={handleChange} className="form-control" />
        </div>
        <button className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
