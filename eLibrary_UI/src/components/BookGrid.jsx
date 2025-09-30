import React from 'react';
import './BookGrid.css';

const BookGrid = () => {
  // Generate 10 placeholder books to match the design
  const books = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Book ${index + 1}`,
    imageUrl: null // Using placeholder rectangles instead
  }));

  return (
    <div className="book-grid">
      <div className="book-grid-container">
        {books.map((book) => (
          <div key={book.id} className="book-grid-item">
            <div className="book-cover-placeholder"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
