import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import './App.css'
import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import BookSlider from './components/BookSlider'
import BookGrid from './components/BookGrid'
import Login from './components/Login'
import UserProfile from './components/UserProfile'

const Home = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = sessionStorage.getItem('isLoggedIn');
    return stored === 'true';
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
