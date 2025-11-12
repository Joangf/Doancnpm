import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-logo">
          <svg className="book-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 14C24 11.8783 23.1571 9.84344 21.6569 8.34315C20.1566 6.84285 18.1217 6 16 6H4V36H18C19.5913 36 21.1174 36.6321 22.2426 37.7574C23.3679 38.8826 24 40.4087 24 42M24 14V42M24 14C24 11.8783 24.8429 9.84344 26.3431 8.34315C27.8434 6.84285 29.8783 6 32 6H44V36H30C28.4087 36 26.8826 36.6321 25.7574 37.7574C24.6321 38.8826 24 40.4087 24 42" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <nav className="navigation-pills">
          <button className="nav-pill active">Title</button>
          <button className="nav-pill">Title</button>
          <button className="nav-pill">Title</button>
          <button className="nav-pill">Title</button>
          <button className="nav-pill">Title</button>
          <button className="nav-pill">Title</button>
          <button className="nav-pill">Title</button>
        </nav>

        <div className="header-auth">
          <button className="btn-sign-in">Sign in</button>
          <button className="btn-register">Register</button>
        </div>
      </header>

      <section className="hero-section">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/b50cfd0aed74094f477372cd0ee98d019f6c32ec?width=2400" 
          alt="Hero banner" 
          className="hero-image"
        />
      </section>
    </div>
  );
};

export default Home;
