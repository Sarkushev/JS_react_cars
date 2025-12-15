import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import BasketList from './pages/BasketList';
import BasketDetail from './pages/BasketDetail';
import CreateOrder from './pages/CreateOrder';
import UpdateOrder from './pages/UpdateOrder';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            
            {/* Новые маршруты для корзины */}
            <Route path="/basket" element={<BasketList />} />
            <Route path="/order/:id" element={<BasketDetail />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/update-order/:id" element={<UpdateOrder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;