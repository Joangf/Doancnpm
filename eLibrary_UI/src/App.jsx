import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import BookSlider from './components/BookSlider'
import BookGrid from './components/BookGrid'
import Login from './components/Login'

const Home = () => {
  return (
    <div className="app">
      <Navbar />
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
