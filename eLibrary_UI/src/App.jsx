import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import BookSlider from './components/BookSlider'
import BookGrid from './components/BookGrid'
import Login from './components/Login'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToLogin = () => {
    setCurrentPage('login');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <Login onBack={navigateToHome} />;
  }

  return (
    <div className="app">
      <Navbar onLoginClick={navigateToLogin} />
      <CategoryBar />
      <BookSlider />
      <BookGrid />
      <main className="main-content">
        <div className="content-wrapper">
          <h1>Welcome to KeazoN BOOKS</h1>
          <p>Your digital library awaits</p>
        </div>
      </main>
    </div>
  )
}

export default App
