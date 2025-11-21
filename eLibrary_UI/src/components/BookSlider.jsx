import React from 'react';
import './BookSlider.css';
import { useNavigate } from 'react-router-dom';

const BookSlider = ({ books, isLoading = false }) => {
  const navigate = useNavigate();
  
  const skeletonItems = Array(5).fill(0);

  const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="book-slider industrial-theme">
      <div className="book-slider-content">
        <h2 className="slider-title">TOP RATED BOOKS</h2>
        <div className="books-container">
          
          {isLoading ? (
            /* --- LOADING STATE --- */
            skeletonItems.map((_, index) => (
              <div key={`skeleton-${index}`} className="book-card skeleton-loader">
                {/* Skeleton Cover */}
                <div className="skeleton-cover shimmer"></div>
                
                <div className="book-content">
                  <div>
                    {/* Skeleton Title */}
                    <div className="skeleton-line title shimmer"></div>
                    {/* Skeleton Author */}
                    <div className="skeleton-line author shimmer"></div>
                    {/* Skeleton Genres */}
                    <div className="skeleton-line genre shimmer"></div>
                    {/* Skeleton Description (3 lines) */}
                    <div className="skeleton-line desc shimmer"></div>
                    <div className="skeleton-line desc shimmer"></div>
                    <div className="skeleton-line desc short shimmer"></div>
                  </div>
                  {/* Skeleton Button */}
                  <div className="skeleton-button shimmer"></div>
                </div>
              </div>
            ))
          ) : (
            /* --- LOADED STATE --- */
            books.map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.coverUrl} alt={book.title} className="book-cover" />
                <div className="book-content">
                  <div> 
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-genres">
                      {book.categories.map((genre) => (
                        <span key={genre.id} className="genre-tag">{genre.name}</span>
                      ))}
                    </div>
                    <p className="book-description">{book.description}</p>
                  </div>
                  <button className="view-details-button action-btn primary-btn" onClick={() => navigate(`/book/${book.id}`)}>
                    <span>View Details</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default BookSlider;