import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const bookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  isbn: Yup.string().required("ISBN number is required"),
  publicationDate: Yup.date().required("Publication date is required"),
});

const AddEditBook = ({ onSubmit, books = [], authors = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
  });

  useEffect(() => {
    if (isEditing) {
      const book = books.find((book) => book.id === parseInt(id));
      if (book) {
        setInitialValues(book);
      }
    }
  }, [id, isEditing, books]);

  const handleSubmit = (values) => {
    if (isEditing) {
      onSubmit(parseInt(id), values);
    } else {
      onSubmit(values);
    }
    navigate("/books");
  };

  return (
    <div className="container">
      <h2 className="mb-4">{isEditing ? "Edit Book" : "Add Book"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={bookSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" className="form-control" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <Field name="author" className="form-control" />
              <ErrorMessage
                name="author"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN Number</label>
              <Field name="isbn" className="form-control" />
              <ErrorMessage
                name="isbn"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationDate">Publication Date</label>
              <Field
                name="publicationDate"
                type="date"
                className="form-control"
              />
              <ErrorMessage
                name="publicationDate"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditBook;
