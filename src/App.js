import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AuthorList from "./components/AuthorList";
import AddEditBook from "./components/AddEditBook";
import AddEditAuthor from "./components/AddEditAuthor";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: books.length + 1 }]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map((book) => (book.id === id ? updatedBook : book)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const addAuthor = (author) => {
    setAuthors([...authors, { ...author, id: authors.length + 1 }]);
  };

  const updateAuthor = (id, updatedAuthor) => {
    setAuthors(
      authors.map((author) => (author.id === id ? updatedAuthor : author))
    );
  };

  const deleteAuthor = (id) => {
    setAuthors(authors.filter((author) => author.id !== id));
  };

  return (
    <Router>
      <div className="App container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Library Management
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/books">
                    Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/authors">
                    Authors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/books"
            element={<BookList books={books} onDelete={deleteBook} />}
          />
          <Route
            path="/authors"
            element={<AuthorList authors={authors} onDelete={deleteAuthor} />}
          />
          <Route
            path="/add-book"
            element={<AddEditBook onSubmit={addBook} authors={authors} />}
          />
          <Route
            path="/edit-book/:id"
            element={
              <AddEditBook
                onSubmit={updateBook}
                books={books}
                authors={authors}
              />
            }
          />
          <Route
            path="/add-author"
            element={<AddEditAuthor onSubmit={addAuthor} />}
          />
          <Route
            path="/edit-author/:id"
            element={
              <AddEditAuthor onSubmit={updateAuthor} authors={authors} />
            }
          />
          <Route
            exact
            path="/"
            element={<BookList books={books} onDelete={deleteBook} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
