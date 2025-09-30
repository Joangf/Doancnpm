import React, { useState } from 'react';
import './CategoryBar.css';

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Children',
    'Young Adult',
    'Poetry',
    'Drama'
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="category-bar">
      <div className="category-bar-content">
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
