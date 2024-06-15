import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onDelete }) => {
  return (
    <div>
      <h2>Books</h2>
      <Link to="/add-book" className="btn btn-primary mb-2">
        Add Book
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publicationDate}</td>
              <td>
                <Link
                  to={`/edit-book/${book.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(book.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
