import React, { useState, useEffect, useRef, use } from 'react';
import './BookProfile.css';
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import TickingFail from './TickingFail';
import TickingSuccess from './TickingSuccess';
const BookProfile = ({id, alreadyBorrowedBookId, setAlreadyBorrowedBookId, isLoggedIn}) => {
  const dropdownRef = useRef(null);
  const [borrowDone, setBorrowDone] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState(14);
  const [borrowButtonText, setBorrowButtonText] = useState("Borrow Book");
  const [activeTab, setActiveTab] = useState('details');
  const [book, setBook] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const StarIcon = ({ filled = true, size = "20", onStarClick, starRating, fetchBook }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={isLoggedIn ? onStarClick : undefined}
      style={{
        cursor: isLoggedIn ? 'pointer' : 'not-allowed',
      }}
    >
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill={filled ? "#FFD700" : "#555"} 
        stroke={!filled ? "#888" : "none"} 
        strokeWidth={!filled ? "1" : "0"}
      />
    </svg>
  );
  const handleRating = async (rating) => {
    try {
      await fetch(`${API_URL}/rating/${localStorage.getItem('idUser')}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          rating: rating
        }),
      });
      await fetchBook();
      setUserRating(rating);
    } catch (error) {
      console.error("Failed to send rating:", error);
    }
  };

  const PlayIcon = () => (
    <svg onMouseEnter={()=> {
      if(!alreadyBorrowedBookId.includes(book.id)) {
        setDropdownVisible(true)}
      }}
      style={{
        transform: isDropdownVisible ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease'
      }}
      width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/> {/* Use currentColor for fill */}
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9H15V3H9V9H5L12 17L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/> {/* Use currentColor for fill */}
    </svg>
  );

  const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor"/>
    </svg>
  );
  const SmallHeartIcon = HeartIcon; // Reuse the same heart icon for consistency
  const handleDayClick = (day) => {
    setSelectedDays(day);
    setBorrowButtonText(`Borrow for ${day} Days`);
    setDropdownVisible(false); // Hide dropdown after selection
  };
  
  const handleBorrowClick = async () => {
    if(!isLoggedIn){
      setBorrowDone('fail');
      setTimeout(() => setBorrowDone(''), 2000);
      return;
    }
    const userId = localStorage.getItem('idUser');
    const request = {
      userId: userId,
      bookId: book.id,
      borrowDays: selectedDays
    };
    try{
      const response = await fetch(`${API_URL}/borrow`,{
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(request),
      });
      if(!response.ok) {
        console.log("Borrowing failed");
        setBorrowDone('fail');
        setTimeout(() => setBorrowDone(''), 2000);
        return;
      }
      setAlreadyBorrowedBookId(prev => prev ? [...prev, book.id] : [book.id]
      );      
      setBorrowDone('success');
      setTimeout(() => setBorrowDone(''), 2000);
    }
    catch(error){

    }
  };

  // Generate an array of numbers from 1 to 30 for the dropdown
  const daysOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const fetchBook = async () =>{
    try{
      const response = await fetch(`${API_URL}/book/${id}`);
      const data = await response.json();
      if(!response.ok){
        console.log('Fetching failed');
      }
      setBook(data.result);
      if (data.result.averageRating) {
        setUserRating(data.result.averageRating);
        setAverageRating(data.result.averageRating);
      }
    }
    catch{
    }
  }
  useEffect(()=>{
    fetchBook();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[id])
  return (
    <div className="book-profile industrial-theme"> {/* Added industrial-theme class */}
      <Link to={`/book/${id}`} />
      <TickingFail isVisible={borrowDone === 'fail'} message={ isLoggedIn ?'Someone else already have this': 'You need to login to borrow'}/>
      <TickingSuccess isVisible={borrowDone === 'success'} message={`Borrowing "${book.title}" for ${selectedDays} days.`}/>
      <div className="book-profile-layout">
        
        {/* Main Content Area */}
        <div className="main-content-area">
          <div className="book-main-section">
            <div className="book-cover-section">
              <img 
                src={book.coverUrl}
                alt={book.title}
                className="book-cover"
              />
            </div>

            <div className="book-details-section">
              <h1 className="book-profile-title">{book.title}</h1>
              
              <div className="book-rating-stats">
                <div className="rating-section">
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon 
                        key={index}
                        filled={index < (userRating || book.rating)}
                        size="20"
                        onStarClick={() => handleRating(index + 1)}
                        starRating={index + 1}
                        fetchBook={fetchBook}
                      />
                    ))}
                    <span className="rating-value">{ averageRating ? averageRating.toFixed(1) : 'N/A'}</span>
                  </div>
                </div>
                
                <div className="favorite-section">
                  <SmallHeartIcon />
                  <span className="favorite-count">234 Favorites</span> {/* Changed label */}
                </div>
                
                <div className="readers-section">
                  <span className="readers-count">567 Readers</span>
                </div>
              </div>

              <div className="book-info">
                <div className="author-info">
                  <div className="author-avatar">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f53e5a3cd404dcbf19d7812630d34998eb804145?width=162"
                      alt="Author Avatar"
                      className="avatar-image"
                    />
                  </div>
                  <div className="author-details">
                    <span className="author-label">Written by</span>
                    <span className="author-name">{book.author}</span> {/* Full Name */}
                  </div>
                </div>

                <div className="publisher-info">
                  <span className="publisher-label">Publisher</span>
                  <span className="publisher-name">{book.publisher}</span> {/* Full Name */}
                </div>

                <div className="year-info">
                  <span className="year-label">Publish Year</span> {/* More formal label */}
                  <span className="year-value">{book.publishYear}</span>
                </div>
              </div>
              <div className='book-genres-section'>
                {book.categories && book.categories.map(category => 
                <div className="book-genre-tag" key={category.id}> 
                  {category.name}
                </div>)}
              </div>


              <div className="action-buttons">
                <div 
                  className="borrow-container"
                >
                  {alreadyBorrowedBookId.includes(book.id)?
                  (
                    <button 
                      className="action-btn primary-btn"
                      onClick={() => alert("preview   ")}
                    >
                      <PlayIcon />
                      <span>You have this</span>
                    </button>
                  ):(
                    <button 
                      className="action-btn primary-btn"
                      onClick={() => {
                        if (borrowButtonText == 'Borrow Book')
                          return setDropdownVisible(true);
                        return handleBorrowClick();
                        }}
                      onMouseEnter={() => {
                        if (borrowButtonText == 'Borrow Book')
                          return setDropdownVisible(true);
                        }}
                    >
                      <PlayIcon />
                      <span>{borrowButtonText}</span>
                    </button>
                  )}


                  {isDropdownVisible && (
                    <div ref={dropdownRef} className="days-dropdown">
                      {daysOptions.map((day) => (
                        <div
                          key={day}
                          className={`days-dropdown-item ${selectedDays === day ? 'active' : ''}`}
                          onClick={() => handleDayClick(day)}
                        >
                          {day} Day{day > 1 ? 's' : ''}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                <button className="download-button action-btn secondary-btn" 
                  onClick={() =>
                    window.open(book.pdfUrl, '_blank')}
                  disabled={!alreadyBorrowedBookId.includes(book.id)}
                > 
                  
                  <DownloadIcon />
                  <span>Download PDF</span> {/* More descriptive label */}
                </button>
              </div>
            </div>
          </div>

          <div className="book-content-section">
            <div className="tabs-section">
              <div className="tab-navigation">
                <button 
                  className={`book-tab-button ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Book Details
                </button>
                <button 
                  className={`book-tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reader Reviews
                </button>
              </div>
              <div className="tab-underline">
                <div className={`active-line ${activeTab === 'details' ? 'details' : 'reviews'}`}></div>
              </div>
            </div>

            <div className="tab-content">
              {activeTab === 'details' && (
                <div className="details-content">
                  {book.description}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <p><strong>"An engaging classic!"</strong> - A timeless read that continues to captivate. The plot is intricate, and Holmes's deductions are as sharp as ever. Highly recommended for any mystery lover.</p>
                  <p><strong>"Excellent Edition"</strong> - The annotations are incredibly helpful, providing historical context that enhances the reading experience. A must-have for serious fans.</p>
                  {/* More review content could go here */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Books Section (Sidebar) */}
        <aside className="related-books-section">
          <h3 className="related-title">More From This Author</h3> {/* Changed title */}

          <div className="related-book-item">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5d5934a251ef2c91482da36df4539e72c325b0f4?width=300"
              alt="Related Book 1"
              className="related-book-cover"
            />
            <div className="related-book-details">
              <h4 className="related-book-title">The Hound of the Baskervilles</h4> {/* Changed title */}
              <span className="related-book-author">Sir Arthur Conan Doyle</span>
              <div className="related-book-rating">
                <StarIcon filled={true} size="16" />
                <StarIcon filled={true} size="16" />
                <StarIcon filled={true} size="16" />
                <StarIcon filled={true} size="16" />
                <StarIcon filled={false} size="16" />
              </div>
              <button className="related-preview-button small-action-btn"> {/* Added new class */}
                <span>View</span>
              </button>
            </div>
          </div>
          {/* Add more related books here if needed */}
        </aside>

      </div>
    </div>
  );
};

export default BookProfile;