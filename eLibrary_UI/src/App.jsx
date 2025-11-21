import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css'
const API_URL = import.meta.env.VITE_BACKEND_URL;
import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import BookSlider from './components/BookSlider'
import BookGrid from './components/BookGrid'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import BookProfilePage from './components/BookProfilePage'
import OAuthSuccess from './OAuthSuccess';
import OAuthRegister from './OAuthRegister';
import Payment from './Payment';
import SessionManager from './utils/SessionManager';
const Home = ({isLoggedIn, setIsLoggedIn, size=24}) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategory] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const request = a => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(a),
  });
  const fetchContent = useCallback(async (url, request = null, append = false) => { //function khong co dia chi moi khi rerender
    try {
      const response = await fetch(url, request);
      if (!response.ok) {
        console.log("Fetching failed");
        return;
      }
      const data = await response.json();
      if (url.includes('/book')) {
        setHasMore(!data.result.last);
        if (append) {
          setBooks(prevBooks => [...prevBooks, ...data.result.content]);
        } else {
          setBooks(data.result.content);
        }
      } else if (url.includes('/category')) {
        const allId = data.result.map(data => data.id);
        setCategories([{ id: allId, name: 'all' }, ...data.result]);
        setActiveCategory([{ id: allId, name: 'all' }]);
      }
    } catch (error) {
      console.log("An error has occurred", error);
    }
  }, []);
  useEffect(()=> { // Lấy category ban đầu
    fetchContent(`${API_URL}/category`);
  }, [fetchContent]);
  useEffect(() => { // Đổi category thì reset book và page
    if (!activeCategories || activeCategories.length === 0) return;
    setPage(0);
    setBooks([]);
  }, [activeCategories]);
  useEffect(() => { // Fetch thêm book khi cuộn trang
    if (!activeCategories || activeCategories.length === 0) return;
    const send = request({
      categoryIds: activeCategories.flatMap(category => 
        Array.isArray(category.id) ? category.id : [category.id]
      )
    });
    fetchContent(`${API_URL}/book/filter?page=${page}&size=${size}`, send, page > 0);
  }, [page, activeCategories, fetchContent]);

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} activeCategories={activeCategories}/>

      {categories && (<CategoryBar categories={categories} activeCategories={activeCategories} setActiveCategory={setActiveCategory}/>)}
      <BookSlider books={books} isLoading={books.length === 0} />
      <BookGrid books={books} secMargin='0px' />
      <InfiniteScroll
        dataLength={books.length}
        next={() => setPage(prevPage => prevPage + 1) }
        hasMore={hasMore}
        loader={<BookGrid isLoading={true} displaySecTitle={false} pad1='0px' />}
      />
      {hasMore === false && (
        <main className="main-content">
          <span className="logo-keazon">KeazoN</span>
          <span className="logo-books">BOOKS</span>
        </main>
      )}

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
