import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, message } from 'antd';
import * as Yup from 'yup';
import { fetchRecipeCusineTypes, updateRecipe } from '../services/recipeApi';
import { cuisinesData } from '../utils/cusinesData';
import 'react-toastify/dist/ReactToastify.css';

const mealTypes = [
  { label: 'Dinner', value: 'dinner' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Appetizer', value: 'appetizer' },
  { label: 'Side dish', value: 'side dish' },
  { label: 'Beverage', value: 'beverage' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Snack', value: 'snack' },
  { label: 'Snacks', value: 'snacks' },
];

const difficulties = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const defaultImage = 'https://via.placeholder.com/300x200?text=No+Image';

const EditRecipeModal = ({ open, onClose, recipe, onRecipeUpdated }) => {
  const [cuisineOptions, setCuisineOptions] = useState([]);

  useEffect(() => {
    fetchRecipeCusineTypes().then(data => setCuisineOptions(data || cuisinesData));
  }, [open]);

  if (!recipe) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Edit Recipe"
      className="add-recipe-modal"
      destroyOnClose
      centered
    >
      <Formik
        initialValues={{
          name: recipe.name || '',
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients || '',
          instructions: Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : recipe.instructions || '',
          cuisine: recipe.cuisine || '',
          prepTimeMinutes: recipe.prepTimeMinutes || '',
          cookTimeMinutes: recipe.cookTimeMinutes || '',
          servings: recipe.servings || '',
          difficulty: (recipe.difficulty || '').toLowerCase(),
          mealType: Array.isArray(recipe.mealType) ? (recipe.mealType[0] ? recipe.mealType[0].toLowerCase() : '') : (recipe.mealType ? recipe.mealType.toLowerCase() : ''),
          image: recipe.image || '',
          tags: Array.isArray(recipe.tags) ? recipe.tags.join(', ') : (recipe.tags || ''),
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          ingredients: Yup.string().required('Required'),
          instructions: Yup.string().required('Required'),
          cuisine: Yup.string().required('Required'),
          prepTimeMinutes: Yup.number().typeError('Must be a number').required('Required'),
          cookTimeMinutes: Yup.number().typeError('Must be a number').required('Required'),
          servings: Yup.number().typeError('Must be a number').required('Required'),
          difficulty: Yup.string().required('Required'),
          mealType: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const updatedRecipe = {
            ...recipe,
            name: values.name,
            ingredients: values.ingredients.split('\n').map(i => i.trim()).filter(Boolean),
            instructions: values.instructions.split('\n').map(i => i.trim()).filter(Boolean),
            cuisine: values.cuisine,
            prepTimeMinutes: Number(values.prepTimeMinutes),
            cookTimeMinutes: Number(values.cookTimeMinutes),
            servings: Number(values.servings),
            difficulty: values.difficulty,
            mealType: [values.mealType],
            image: values.image || defaultImage,
            tags: values.tags.split(',').map(t => t.trim()).filter(Boolean),
          };
          const result = await updateRecipe(recipe.id, updatedRecipe);
          console.log('API response (updated recipe):', result);
          if (result) {
            message.success('Recipe updated!', 2);
            onRecipeUpdated && onRecipeUpdated(result);
            console.log('Updated recipe:', result);
            resetForm();
            onClose();
          } else {
            message.error('Failed to update recipe', 2);
          }
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
              <label>Ingredients <span className="form-hint">(one per line)</span></label>
              <Field as="textarea" name="ingredients" className="form-input" rows={3} />
              <ErrorMessage name="ingredients" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Instructions <span className="form-hint">(one per line)</span></label>
              <Field as="textarea" name="instructions" className="form-input" rows={3} />
              <ErrorMessage name="instructions" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Cuisine</label>
              <Field as="select" name="cuisine" className="form-input">
                <option value="">Select cuisine</option>
                {cuisineOptions.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </Field>
              <ErrorMessage name="cuisine" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Meal Type</label>
              <Field as="select" name="mealType" className="form-input">
                <option value="">Select meal type</option>
                {mealTypes.map(mt => (
                  <option key={mt.value} value={mt.value}>{mt.label}</option>
                ))}
              </Field>
              <ErrorMessage name="mealType" component="div" className="form-error" />
            </div>
            <div className="form-row">
              <label>Difficulty</label>
              <Field as="select" name="difficulty" className="form-input">
                <option value="">Select difficulty</option>
                {difficulties.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </Field>
              <ErrorMessage name="difficulty" component="div" className="form-error" />
            </div>
            <div className="form-row-inline">
              <div className="form-row">
                <label>Prep Time (min)</label>
                <Field name="prepTimeMinutes" className="form-input" />
                <ErrorMessage name="prepTimeMinutes" component="div" className="form-error" />
              </div>
              <div className="form-row">
                <label>Cook Time (min)</label>
                <Field name="cookTimeMinutes" className="form-input" />
                <ErrorMessage name="cookTimeMinutes" component="div" className="form-error" />
              </div>
              <div className="form-row">
                <label>Servings</label>
                <Field name="servings" className="form-input" />
                <ErrorMessage name="servings" component="div" className="form-error" />
              </div>
            </div>
            <div className="form-row">
              <label>Image URL <span className="form-hint">(optional)</span></label>
              <Field name="image" className="form-input" />
            </div>
            <div className="form-row">
              <label>Tags <span className="form-hint">(comma separated, e.g. Vegan, Quick, Gluten-Free)</span></label>
              <Field name="tags" className="form-input" placeholder="e.g. Vegan, Quick, Gluten-Free" />
            </div>
            <div className="form-actions">
              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default EditRecipeModal; 