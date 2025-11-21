import BookGrid from "../Book/BookGrid";
import "../../pages/UserProfilePage.css";
const Library = ({ borrowedBooks }) => {
  return (
    <main className="profile-main">
      <div className="profile-header">
        <h1>Library</h1>
      </div>
      <BookGrid
        books={borrowedBooks}
        displaySecTitle={false}
        backgroundColor="#242424"
        pad1="0px"
        pad2="0px"
      />
    </main>
  );
};

export default Library;