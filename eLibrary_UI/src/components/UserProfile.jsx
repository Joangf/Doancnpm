import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import Navbar from "./Navbar";
import BookGrid from "./BookGrid";
import TickingFail from './TickingFail';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const Library = ({ borrowedBooks }) => {
  return (
  <main className='profile-main'>
    <div className="profile-header">
      <h1>Library</h1>
    </div>
    <BookGrid books={borrowedBooks} displaySecTitle={false} backgroundColor='#242424' pad1='0px' pad2='0px'/>
  </main>
)}
const Profile = ({ formData, handleInputChange, handleSubmit, setActiveDelete}) => {
  return (
    <main className="profile-main">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-content">
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            </div>

            <div className="form-group">
                <label htmlFor="university">University</label>
                <input type="text" id="university" name="university" value={formData.university} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label>Birthday</label>
              <div className="birthday-inputs">
                <input type="text" name="birthDate" placeholder="Date" value={formData.birthDate} onChange={handleInputChange} />
                <input type="text" name="birthMonth" placeholder="Month" value={formData.birthMonth} onChange={handleInputChange} />
                <input type="text" name="birthYear" placeholder="Year" value={formData.birthYear} onChange={handleInputChange} />
              </div>
            </div>
            <div className='profile-form-button'>
              <button type="submit" className="save-button primary-btn">
                Save Changes
              </button>
              <button type="button" className="delete-button primary-btn" onClick={() => setActiveDelete(true)}>
                Delete Account
              </button>
            </div>
        </form>

        <aside className="profile-picture-section">
          <h2 className="section-title">Profile Picture</h2>
          <div className="profile-picture-wrapper">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/684c1d3085f1617fc628757c78b96af3f1430943?width=600" 
              alt="Profile" 
              className="profile-picture"
            />
            <button className="edit-picture-button secondary-btn">
              <span>Edit Picture</span>
            </button>
          </div>
        </aside>
      </div>
    </main>
)}

const DeleteAccountBox = ({ onCancel, onConfirm }) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <div className="confirm-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L1 21H23L12 2ZM12 18C11.45 18 11 17.55 11 17V15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15V17C13 17.55 12.55 18 12 18ZM13 12H11V8H13V12Z" fill="#B83B5E"/>
          </svg>
        </div>
        <div className="confirm-content">
          <h1 className="confirm-title">Confirm Account Deletion</h1>
          <p className="confirm-text">
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </p>
        </div>
        <div className="confirm-actions">
          <button 
            type="button" 
            className="action-btn neutral-btn" 
            onClick={onCancel}
          >
            No, Go Back
          </button>
          <button 
            type="button" 
            className="action-btn destructive-btn" 
            onClick={onConfirm}
          >
            Yes, I'm Sure
          </button>
        </div>
      </div>
    </div>
  );
};
const UserProfile = ({isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [activeDelete, setActiveDelete] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    university: "",
    birthDate: "",
    birthMonth: "",
    birthYear: ""
  });
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const id = localStorage.getItem('idUser');
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log('Fetched user data:', data);
      setFormData({
        userName: data.result.username || '',
        firstName: data.result.firstName || '',
        lastName: data.result.lastName || '',
        email: data.result.email || '',
        phoneNumber: data.result.phoneNumber || '',
        university: data.result.university || '',
        birthDate: data.result.birthDate || '',
        birthMonth: data.result.birthMonth || '',
        birthYear: data.result.birthYear || ''
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchBorrowedBook = async () => {
    try{
      const response = await fetch(`${API_URL}/borrow/user/${id}`);
      const data = await response.json();
      if(!response.ok){
        console.log('Fetching borrowed books failed');
        return;
      }
      setBorrowedBooks(data.result.content);
    }
    catch (error){
      console.error('Error fetching user data:', error); 
    }
  }
  useEffect(() => {
    fetchUserData();
    fetchBorrowedBook();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Handle form submission
    const userData = {firstName: formData.firstName, lastName: formData.lastName};
    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteAcc = async () => {
    try{
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      });
      if (response.ok) {
        const resDel = await fetch(`${API_URL}/user/${id}`, {
          method: "DELETE",
        });
        if (resDel.ok) {
          setIsLoggedIn(false);
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Delete account failed:", error);
    }
  };

  const menuItems = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 15C13.625 15 12.4479 14.5104 11.4688 13.5312C10.4896 12.5521 10 11.375 10 10C10 8.625 10.4896 7.44792 11.4688 6.46875C12.4479 5.48958 13.625 5 15 5C16.375 5 17.5521 5.48958 18.5312 6.46875C19.5104 7.44792 20 8.625 20 10C20 11.375 19.5104 12.5521 18.5312 13.5312C17.5521 14.5104 16.375 15 15 15ZM5 25V21.5C5 20.7917 5.18229 20.1406 5.54688 19.5469C5.91146 18.9531 6.39583 18.5 7 18.1875C8.29167 17.5417 9.60417 17.0573 10.9375 16.7344C12.2708 16.4115 13.625 16.25 15 16.25C16.375 16.25 17.7292 16.4115 19.0625 16.7344C20.3958 17.0573 21.7083 17.5417 23 18.1875C23.6042 18.5 24.0885 18.9531 24.4531 19.5469C24.8177 20.1406 25 20.7917 25 21.5V25H5ZM7.5 22.5H22.5V21.5C22.5 21.2708 22.4427 21.0625 22.3281 20.875C22.2135 20.6875 22.0625 20.5417 21.875 20.4375C20.75 19.875 19.6146 19.4531 18.4688 19.1719C17.3229 18.8906 16.1667 18.75 15 18.75C13.8333 18.75 12.6771 18.8906 11.5312 19.1719C10.3854 19.4531 9.25 19.875 8.125 20.4375C7.9375 20.5417 7.78646 20.6875 7.67188 20.875C7.55729 21.0625 7.5 21.2708 7.5 21.5V22.5ZM15 12.5C15.6875 12.5 16.276 12.2552 16.7656 11.7656C17.2552 11.276 17.5 10.6875 17.5 10C17.5 9.3125 17.2552 8.72396 16.7656 8.23438C16.276 7.74479 15.6875 7.5 15 7.5C14.3125 7.5 13.724 7.74479 13.2344 8.23438C12.7448 8.72396 12.5 9.3125 12.5 10C12.5 10.6875 12.7448 11.276 13.2344 11.7656C13.724 12.2552 14.3125 12.5 15 12.5Z" fill="white"/>
        </svg>
      ),
    },
    { 
      id: 'library', 
      label: 'Library', 
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5833 22.75L13 17.3333L5.41663 22.75V5.41667C5.41663 4.84203 5.6449 4.29093 6.05123 3.8846C6.45756 3.47827 7.00866 3.25 7.58329 3.25H18.4166C18.9913 3.25 19.5424 3.47827 19.9487 3.8846C20.355 4.29093 20.5833 4.84203 20.5833 5.41667V22.75Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    // { 
    //   id: 'appearance', 
    //   label: 'Appearance', 
    //   icon: (
    //     <img src="https://api.builder.io/api/v1/image/assets/TEMP/c98953a2f3ce96fe910d8c8dc75a0f18762654cf?width=50" alt="" style={{ width: '25px', height: '22px' }} />
    //   )
    // },
    // { 
    //   id: 'history', 
    //   label: 'History', 
    //   icon: (
    //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <g clipPath="url(#clip0_201_70)">
    //         <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    //       </g>
    //     </svg>
    //   )
    // },
    // { 
    //   id: 'language', 
    //   label: 'Language', 
    //   icon: (
    //     <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M13 23.8333C11.5194 23.8333 10.1201 23.5489 8.80204 22.9802C7.48399 22.4114 6.33295 21.635 5.34892 20.651C4.36489 19.667 3.5885 18.5159 3.01975 17.1979C2.451 15.8798 2.16663 14.4805 2.16663 13C2.16663 11.5013 2.451 10.0975 3.01975 8.7885C3.5885 7.47947 4.36489 6.33295 5.34892 5.34892C6.33295 4.36489 7.48399 3.5885 8.80204 3.01975C10.1201 2.451 11.5194 2.16663 13 2.16663C14.4986 2.16663 15.9024 2.451 17.2114 3.01975C18.5204 3.5885 19.667 4.36489 20.651 5.34892C21.635 6.33295 22.4114 7.47947 22.9802 8.7885C23.5489 10.0975 23.8333 11.5013 23.8333 13C23.8333 14.4805 23.5489 15.8798 22.9802 17.1979C22.4114 18.5159 21.635 19.667 20.651 20.651C19.667 21.635 18.5204 22.4114 17.2114 22.9802C15.9024 23.5489 14.4986 23.8333 13 23.8333ZM13 21.6125C13.4694 20.9625 13.8757 20.2854 14.2187 19.5812C14.5618 18.877 14.8416 18.1277 15.0583 17.3333H10.9416C11.1583 18.1277 11.4382 18.877 11.7812 19.5812C12.1243 20.2854 12.5305 20.9625 13 21.6125ZM10.1833 21.1791C9.85829 20.5833 9.57392 19.9649 9.33017 19.3239C9.08642 18.6829 8.88329 18.0194 8.72079 17.3333H5.52496C6.04857 18.2361 6.70308 19.0215 7.4885 19.6895C8.27392 20.3576 9.17218 20.8541 10.1833 21.1791ZM15.8166 21.1791C16.8277 20.8541 17.726 20.3576 18.5114 19.6895C19.2968 19.0215 19.9513 18.2361 20.475 17.3333H17.2791C17.1166 18.0194 16.9135 18.6829 16.6698 19.3239C16.426 19.9649 16.1416 20.5833 15.8166 21.1791ZM4.60413 15.1666H8.28746C8.23329 14.8055 8.19267 14.4489 8.16558 14.0968C8.1385 13.7448 8.12496 13.3791 8.12496 13C8.12496 12.6208 8.1385 12.2552 8.16558 11.9031C8.19267 11.551 8.23329 11.1944 8.28746 10.8333H4.60413C4.51385 11.1944 4.44614 11.551 4.401 11.9031C4.35586 12.2552 4.33329 12.6208 4.33329 13C4.33329 13.3791 4.35586 13.7448 4.401 14.0968C4.44614 14.4489 4.51385 14.8055 4.60413 15.1666ZM10.4541 15.1666H15.5458C15.6 14.8055 15.6406 14.4489 15.6677 14.0968C15.6948 13.7448 15.7083 13.3791 15.7083 13C15.7083 12.6208 15.6948 12.2552 15.6677 11.9031C15.6406 11.551 15.6 11.1944 15.5458 10.8333H10.4541C10.4 11.1944 10.3593 11.551 10.3323 11.9031C10.3052 12.2552 10.2916 12.6208 10.2916 13C10.2916 13.3791 10.3052 13.7448 10.3323 14.0968C10.3593 14.4489 10.4 14.8055 10.4541 15.1666ZM17.7125 15.1666H21.3958C21.4861 14.8055 21.5538 14.4489 21.5989 14.0968C21.6441 13.7448 21.6666 13.3791 21.6666 13C21.6666 12.6208 21.6441 12.2552 21.5989 11.9031C21.5538 11.551 21.4861 11.1944 21.3958 10.8333H17.7125C17.7666 11.1944 17.8073 11.551 17.8343 11.9031C17.8614 12.2552 17.875 12.6208 17.875 13C17.875 13.3791 17.8614 13.7448 17.8343 14.0968C17.8073 14.4489 17.7666 14.8055 17.7125 15.1666ZM17.2791 8.66663H20.475C19.9513 7.76385 19.2968 6.97843 18.5114 6.31038C17.726 5.64232 16.8277 5.14579 15.8166 4.82079C16.1416 5.41663 16.426 6.03503 16.6698 6.676C16.9135 7.31697 17.1166 7.98052 17.2791 8.66663ZM10.9416 8.66663H15.0583C14.8416 7.87218 14.5618 7.12288 14.2187 6.41871C13.8757 5.71454 13.4694 5.03746 13 4.38746C12.5305 5.03746 12.1243 5.71454 11.7812 6.41871C11.4382 7.12288 11.1583 7.87218 10.9416 8.66663ZM5.52496 8.66663H8.72079C8.88329 7.98052 9.08642 7.31697 9.33017 6.676C9.57392 6.03503 9.85829 5.41663 10.1833 4.82079C9.17218 5.14579 8.27392 5.64232 7.4885 6.31038C6.70308 6.97843 6.04857 7.76385 5.52496 8.66663Z" fill="white"/>
    //     </svg>
    //   )
    // },
    // { 
    //   id: 'account', 
    //   label: 'Account', 
    //   icon: (
    //     <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M6.33746 18.525C7.25829 17.8208 8.28746 17.2656 9.42496 16.8593C10.5625 16.4531 11.7541 16.25 13 16.25C14.2458 16.25 15.4375 16.4531 16.575 16.8593C17.7125 17.2656 18.7416 17.8208 19.6625 18.525C20.2944 17.7847 20.7864 16.9451 21.1385 16.0062C21.4906 15.0673 21.6666 14.0652 21.6666 13C21.6666 10.5986 20.8225 8.55378 19.1343 6.86558C17.4461 5.17739 15.4013 4.33329 13 4.33329C10.5986 4.33329 8.55378 5.17739 6.86558 6.86558C5.17739 8.55378 4.33329 10.5986 4.33329 13C4.33329 14.0652 4.50933 15.0673 4.86142 16.0062C5.2135 16.9451 5.70552 17.7847 6.33746 18.525ZM13 14.0833C11.9347 14.0833 11.0364 13.7177 10.3052 12.9864C9.57392 12.2552 9.20829 11.3569 9.20829 10.2916C9.20829 9.22635 9.57392 8.32808 10.3052 7.59683C11.0364 6.86558 11.9347 6.49996 13 6.49996C14.0652 6.49996 14.9635 6.86558 15.6948 7.59683C16.426 8.32808 16.7916 9.22635 16.7916 10.2916C16.7916 11.3569 16.426 12.2552 15.6948 12.9864C14.9635 13.7177 14.0652 14.0833 13 14.0833ZM13 23.8333C11.5013 23.8333 10.093 23.5489 8.77496 22.9802C7.4569 22.4114 6.31038 21.6395 5.33538 20.6645C4.36038 19.6895 3.5885 18.543 3.01975 17.225C2.451 15.9069 2.16663 14.4986 2.16663 13C2.16663 11.5013 2.451 10.093 3.01975 8.77496C3.5885 7.4569 4.36038 6.31038 5.33538 5.33538C6.31038 4.36038 7.4569 3.5885 8.77496 3.01975C10.093 2.451 11.5013 2.16663 13 2.16663C14.4986 2.16663 15.9069 2.451 17.225 3.01975C18.543 3.5885 19.6895 4.36038 20.6645 5.33538C21.6395 6.31038 22.4114 7.4569 22.9802 8.77496C23.5489 10.093 23.8333 11.5013 23.8333 13C23.8333 14.4986 23.5489 15.9069 22.9802 17.225C22.4114 18.543 21.6395 19.6895 20.6645 20.6645C19.6895 21.6395 18.543 22.4114 17.225 22.9802C15.9069 23.5489 14.4986 23.8333 13 23.8333Z" fill="white"/>
    //     </svg>
    //   )
    // }
  ];

  const bottomMenuItems = [
    // ...
  ];
  if(!isLoggedIn) return (
    <TickingFail isVisible={true} message='You needs to login first'/>
  )
  return (
    <div className="profile-page industrial-theme">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} activeCategories={[]}/>
      {activeDelete && <DeleteAccountBox onCancel={() => setActiveDelete(false)} onConfirm={handleDeleteAcc} />}
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/21e8c4ad58b36ddd2a9af3f8fa0325468a156350?width=160" 
                alt="User Avatar" 
              />
            </div>
            <div className="user-details">
              <h3 className="user-name">{formData.userName}</h3>
              <p className="user-subtitle">Your Personal Account</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map(item => (
              <button 
                key={item.id}
                className={`sidebar-nav-item ${item.id === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        {activeTab === 'profile' && (
          <Profile
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setActiveDelete={setActiveDelete}
          />
        )}
        {activeTab === 'library' && <Library borrowedBooks={borrowedBooks} />}
      </div>
    </div>
  );
};

export default UserProfile;