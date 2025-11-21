import "../../pages/UserProfilePage.css";
const Profile = ({
  formData,
  handleInputChange,
  handleSubmit,
  setActiveDelete,
}) => {
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
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="university">University</label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Birthday</label>
            <div className="birthday-inputs">
              <input
                type="text"
                name="birthDate"
                placeholder="Date"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="birthMonth"
                placeholder="Month"
                value={formData.birthMonth}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="birthYear"
                placeholder="Year"
                value={formData.birthYear}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="profile-form-button">
            <button type="submit" className="save-button primary-btn">
              Save Changes
            </button>
            <button
              type="button"
              className="delete-button primary-btn"
              onClick={() => setActiveDelete(true)}
            >
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
  );
};
export default Profile;