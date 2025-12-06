import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3">
              <span className="text-danger">JDM</span> Legends
            </h5>
            <p className="text-light">
              Сайт посвящен культовым японским автомобилям. 
              Здесь вы найдете информацию о самых легендарных моделях, 
              их истории и технических характеристиках.
            </p>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-3">Навигация</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  Главная
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  Все автомобили
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none">
                  Рейтинг
                </a>
              </li>
              <li>
                <a href="/" className="text-light text-decoration-none">
                  О проекте
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-3">Контакты</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                contact@jdmelegends.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +7 (999) 123-45-67
              </li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                Москва, Россия
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3">
            <h5 className="mb-3">Мы в соцсетях</h5>
            <div className="d-flex gap-3">
              <a href="/" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="/" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="/" className="text-light fs-4">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="/" className="text-light fs-4">
                <i className="bi bi-telegram"></i>
              </a>
            </div>
            
            <div className="mt-4">
              <p className="small text-light">
                Подпишитесь на рассылку новостей
              </p>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Ваш email"
                />
                <button className="btn btn-danger">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="bg-light my-4" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} JDM Legends. Все права защищены.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0">
              Разработано с <i className="bi bi-heart-fill text-danger"></i> для автолюбителей
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;