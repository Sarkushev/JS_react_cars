import React from 'react';

function Hero() {
  return (
    <section className="hero-section text-white position-relative">
      <div className="container position-relative z-1 py-5">
        <div className="row align-items-center min-vh-70">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">
              Легендарные <span className="text-danger">Японские</span> Автомобили
            </h1>
            <p className="lead mb-4">
              Откройте для себя мир культовых JDM-автомобилей. 
              ТОП-6 самых значимых и легендарных моделей, 
              изменивших автомобильную индустрию.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-danger btn-lg px-4">
                <i className="bi bi-play-circle me-2"></i>
                Смотреть видео
              </button>
              <button className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-info-circle me-2"></i>
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Фоновое изображение */}
      <div className="hero-overlay"></div>
    </section>
  );
}

export default Hero;