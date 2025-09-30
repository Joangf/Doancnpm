import React from 'react';
import './BookSlider.css';

const BookSlider = () => {
  const books = [
    {
      id: 1,
      background: 'rgba(113, 197, 244, 0.38)',
      title: 'Books Head',
      genres: 'Detective-Love-History',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum mi eget consectetur posuere dui vulputate magna.',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/7a0f6f9bfe68ab4fd07f13552ec007d2607827fe?width=406'
    },
    {
      id: 2,
      background: 'rgba(171, 113, 244, 0.38)',
      title: 'Books Head',
      genres: 'Detective-ScienceFiction-Fantastic',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum mi eget consectetur posuere dui vulputate magna.',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/088d686adc270eed87c0e19bedffcf8c1d93af86?width=406'
    },
    {
      id: 3,
      background: 'rgba(244, 113, 168, 0.38)',
      title: 'Books Head',
      genres: 'Novel-History-Love',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum mi eget consectetur posuere dui vulputate magna.',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/088d686adc270eed87c0e19bedffcf8c1d93af86?width=406'
    }
  ];

  return (
    <div className="book-slider">
      <div className="book-slider-content">
        <div className="books-container">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div 
                className="book-background"
                style={{ background: book.background }}
              ></div>
              <div className="book-image-placeholder"></div>
              <div className="book-content">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-description">{book.description}</p>
                <div className="book-genres">{book.genres}</div>
                <button className="read-now-button">
                  <span>Now Read!</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSlider;
