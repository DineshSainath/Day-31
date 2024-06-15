import React from "react";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, onDelete }) => {
  return (
    <div>
      <h2>Authors</h2>
      <Link to="/add-author" className="btn btn-primary mb-2">
        Add Author
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Biography</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.birthDate}</td>
              <td>{author.biography}</td>
              <td>
                <Link
                  to={`/edit-author/${author.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(author.id)}
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

export default AuthorList;
