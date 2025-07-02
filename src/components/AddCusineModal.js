import React from 'react';
import { Modal, message } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/AddRecipeModal.css';

const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';

const AddCusineModal = ({ open, onClose, onAdd }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Add New Cuisine"
      className="add-recipe-modal"
      destroyOnClose
      centered
    >
      <Formik
        initialValues={{
          name: '',
          description: '',
          image: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const newCuisine = {
            name: values.name,
            description: values.description,
            image: values.image || defaultImage,
          };
          onAdd && onAdd(newCuisine);
          message.success('Cuisine added!', 2);
          resetForm();
          onClose();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="add-recipe-form">
            <div className="form-row">
              <label>Name</label>
              <Field name="name" className="form-input" />
              <ErrorMessage name="name" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Description</label>
              <Field as="textarea" name="description" className="form-input" rows={3} />
              <ErrorMessage name="description" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Image URL <span className="form-hint">(optional)</span></label>
              <Field name="image" className="form-input" />
            </div>
            <div className="form-actions">
              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Cuisine'}
              </button>
              <button type="button" className="form-cancel-btn" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCusineModal; 