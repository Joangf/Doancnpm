import React, { useState } from 'react';
import './CategoryBar.css';

const CategoryBar = ({ categories, activeCategories, setActiveCategory }) => {
  const handleCategoryClick = (category) => {
    if (category.id === categories[0].id) {
      setActiveCategory([categories[0]]);
      return;
    }

    setActiveCategory((prev) => {
      let newCategories = prev.filter(c => c.id!== categories[0].id);
      if (newCategories.includes(category)) {
        newCategories = newCategories.filter(c => c.id !== category.id);
      } else {
        newCategories.push(category);
      }
      if (newCategories.length === 0) {
        newCategories = [categories[0]];
      }
      return newCategories;
    });
  };

  return (
    <div className="category-bar industrial-theme">
      <div className="category-bar-content">
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategories.map(activeCategory => activeCategory.name).includes(category.name) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;