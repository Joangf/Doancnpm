import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import BookProfile from './BookProfile';
import './BookProfilePage.css';
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const BookProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
  const {id} = useParams();
  const [alreadyBorrowedBookId, setAlreadyBorrowedBookId] = useState([]);
  const fetchBorrowedBook = async () => {
    try{
      const response = await fetch(`${API_URL}/borrow/user/${localStorage.getItem('idUser')}`,{
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
      });
      const data = await response.json();
      if(!response.ok){
        console.log('Fetching borrowed books failed');
        return;
      }
      setAlreadyBorrowedBookId(data.result.content.map(book => book.bookId));
    }
    catch (error){
      console.error('Error fetching user data:', error); 
    }
  } 
  useEffect(() => {
    if (isLoggedIn) {
      fetchBorrowedBook();
    } else {
      setAlreadyBorrowedBookId([]);
    }
  }, [isLoggedIn]); 
  return (
    <div className="book-profile-page">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} activeCategories={[]} />
      <BookProfile id={id} alreadyBorrowedBookId={alreadyBorrowedBookId} setAlreadyBorrowedBookId={setAlreadyBorrowedBookId} isLoggedIn={isLoggedIn}/>
    </div>
  );
};

export default BookProfilePage;
