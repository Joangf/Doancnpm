import { useNavigate } from 'react-router-dom';
import './BookGrid.css';

const BookGrid = ({ 
  books,
  borrowedBooks = false, 
  displaySecTitle = true, 
  backgroundColor = '#1A1A1A', 
  pad1 = '40px', 
  pad2 = '40px',
  isLoading = false
}) => {
  const navigate = useNavigate();

  // Create an array of 10 items for the skeleton loader
  const skeletonItems = Array(24).fill(0);

  return (
    <section className="book-grid industrial-theme" style={{
      "--color": backgroundColor,
      "--pad1" : pad1,
      "--pad2" : pad2
    }}> 
      <div className="book-grid-content">
        {displaySecTitle && <h2 className="grid-section-title">Explore The Collection</h2>}
        
        <div className="book-grid-container">
          {isLoading ? (
            /* Loading State: Render Skeleton Items */
            skeletonItems.map((_, index) => (
              <div key={`skeleton-${index}`} className="book-grid-item skeleton-loader"></div>
            ))
          ) : (
            /* Data Loaded State: Render Actual Books */
            books.map((book) => (
              <div 
                key={book.bookId ?? book.id} 
                className="book-grid-item" 
                onClick={() => navigate(`/book/${book.bookId ?? book.id}`)}
                title={`${book.bookTitle ?? book.title} by ${book.bookAuthor ?? book.author}`}
              >
                <img src={book.bookCoverUrl ?? book.coverUrl} alt={book.bookTitile ?? book.title} className="book-cover-image" />
                <div className="book-item-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{book.bookTitle ?? book.title}</h3>
                    <p className="overlay-author">{book.bookAuthor ?? book.author}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BookGrid;