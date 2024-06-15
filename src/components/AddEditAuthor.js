import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const authorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  birthDate: Yup.date().required("Birth date is required"),
  biography: Yup.string().required("Biography is required"),
});

const AddEditAuthor = ({ onSubmit, authors = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [initialValues, setInitialValues] = useState({
    name: "",
    birthDate: "",
    biography: "",
  });

  useEffect(() => {
    if (isEditing) {
      const author = authors.find((author) => author.id === parseInt(id));
      if (author) {
        setInitialValues(author);
      }
    }
  }, [id, isEditing, authors]);

  const handleSubmit = (values) => {
    if (isEditing) {
      onSubmit(parseInt(id), values);
    } else {
      onSubmit(values);
    }
    navigate("/authors");
  };

  return (
    <div className="container">
      <h2 className="mb-4">{isEditing ? "Edit Author" : "Add Author"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={authorSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <Field name="birthDate" type="date" className="form-control" />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="biography">Biography</label>
              <Field name="biography" className="form-control" />
              <ErrorMessage
                name="biography"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isEditing ? "Update Author" : "Add Author"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditAuthor;
