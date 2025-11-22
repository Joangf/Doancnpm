import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login'
import UserProfile from './pages/UserProfilePage'
import BookProfilePage from './pages/BookProfilePage'
import OAuthSuccess from './verification/OAuthSuccess';
import OAuthRegister from './verification/OAuthRegister';
import Payment from './verification/Payment';
import SessionManager from './utils/SessionManager';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem('isLoggedIn');
    return stored === 'true';
  });

  return (
    <BrowserRouter>
      <SessionManager isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path ="/book/:id" element={<BookProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> }/>
          <Route path ="/oauth-success" element={<OAuthSuccess setIsLoggedIn={setIsLoggedIn} />} />
          <Route path ="/oauth-register" element={<OAuthRegister setIsLoggedIn={setIsLoggedIn} />} />
          <Route path ="/payment" element={<Payment />} />
        </Routes>
      </SessionManager>
    </BrowserRouter>
  )
}

export default App
