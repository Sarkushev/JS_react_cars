import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;