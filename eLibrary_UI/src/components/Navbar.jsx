import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
const API_URL = import.meta.env.VITE_BACKEND_URL;
// A new, more geometric logo that fits the industrial theme
const LogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2.5L37.5 12.5V32.5L20 22.5L2.5 32.5V12.5L20 2.5Z" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2.5 12.5L20 22.5L37.5 12.5" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M20 37.5V22.5" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);


const Navbar = ({isLoggedIn, setIsLoggedIn, activeCategories}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);  
  const searchDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Sample book data
  const sampleBooks = [
    { id: 1, title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle" },
    { id: 2, title: "A Study in Scarlet", author: "Arthur Conan Doyle" },
    { id: 3, title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsSearchDropdownOpen(value.length > 0);
    try {
      const request = {
        keyword: value,
        categoryIds: activeCategories.flatMap(category => Array.isArray(category.id) ? category.id : [category.id])
      }
      const response = await fetch(`${API_URL}/book/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      if(!response.ok){
        console.log("Searching failed");
        return;
      }
      setSearchResult(data.result.content);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleSearchFocus = () => {
    if (searchValue.length > 0) {
      setIsSearchDropdownOpen(true);
    }
  };

  const handleBookSelect = (book) => {
    setSearchValue(book.title);
    setIsSearchDropdownOpen(false);
    navigate(`/book/${book.id}`);
  };

  const handleLogout = async () => {
    try{
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      });
      if (response.ok) {
        console.log("Logged out successfully");
        setIsDropdownOpen(false);
        setIsLoggedIn(false);
        sessionStorage.setItem('isLoggedIn', 'false');
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar industrial-theme">
      <div className="navbar-content">
        {/* Logo Section */}
        <button
          type="button"
          className="logo-section logo-navigation-button"
          onClick={() => navigate('/')}
        >
          <LogoIcon />
          <div className="logo-text">
            <span className="logo-keazon">KeazoN</span>
            <span className="logo-books">BOOKS</span>
          </div>
        </button>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#888"/>
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
            />
          </div>

          {isSearchDropdownOpen && (
            <div ref={searchDropdownRef} className="search-dropdown">
              {searchResult.map((book) => (
                <div
                  key={book.id}
                  className="search-book-item"
                  onClick={() => handleBookSelect(book)}
                >
                  <div className="search-book-title">{book.title}</div>
                  <div className="search-book-author">by {book.author}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions & Profile Section */}
        <div className="actions-section">
          <button className="action-button" title="My Library">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z" fill="currentColor"/><path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/></svg>
          </button>
          <button className="action-button" title="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/></svg>
          </button>

          {isLoggedIn  
            ?(
              <div className="profile-wrapper">
                <div
                  ref={profileRef}
                  className="profile-section"
                  onClick={toggleDropdown}
                  title="My Account"
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/21e8c4ad58b36ddd2a9af3f8fa0325468a156350?width=100"
                    alt="Profile"
                    className="profile-image"
                  />
                </div>

                {isDropdownOpen && (
                  <div ref={dropdownRef} className="profile-dropdown">
                    <button className="dropdown-item" onClick={handleProfile}>
                      Profile
                    </button>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )
            :(
              <button className="login-button secondary-btn" onClick={handleLogin}>
                Login
              </button>
            )
          }
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;