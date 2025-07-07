import React, { useEffect, useState } from 'react';
import AdminRecipeCard from '../components/AdminRecipeCard';
import { fetchAllRecipes, deleteRecipe } from '../services/recipeApi';
import { FiPlus } from 'react-icons/fi';
import AddRecipeModal from '../components/AddRecipeModal';
import EditRecipeModal from '../components/EditRecipeModal';
import '../styles/AdminRecipesPage.css';
import '../styles/AddRecipeModal.css';
import { message, Input } from 'antd';

message.config({ placement: 'bottomRight' });

const AdminRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadRecipes = async () => {
    setLoading(true);
    const data = await fetchAllRecipes(100, 0);
    setRecipes(data || []);
    window._localRecipes = data ? [...data] : [];
    setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setEditModalOpen(true);
  };

  const handleDelete = async (recipe) => {
    const result = await deleteRecipe(recipe.id);
    setRecipes(prev => prev.filter(r => r.id !== recipe.id));
    if (Array.isArray(window._localRecipes)) {
      window._localRecipes = window._localRecipes.filter(r => r.id !== recipe.id);
    }
    if (result) {
      message.success('Recipe deleted!', 2);
    } else {
      message.error('Failed to delete recipe', 2);
    }
  };

  const handleAddRecipe = () => {
    setAddModalOpen(true);
  };

  const handleRecipeAdded = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
    if (Array.isArray(window._localRecipes)) {
      window._localRecipes = [newRecipe, ...window._localRecipes];
    }
    message.success('Recipe added!', 2);
  };

  const handleRecipeUpdated = (updatedRecipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    if (Array.isArray(window._localRecipes)) {
      window._localRecipes = window._localRecipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    }
    message.success('Recipe updated!', 2);
  };

  const filteredRecipes = recipes.filter(recipe =>
    (recipe.name || recipe.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-recipes-page">
      <AddRecipeModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onRecipeAdded={handleRecipeAdded} />
      <EditRecipeModal open={editModalOpen} onClose={() => setEditModalOpen(false)} recipe={editingRecipe} onRecipeUpdated={handleRecipeUpdated} />
      <div className="admin-recipes-header-row">
        <h1 className="admin-page-title">Recipe Management</h1>
        <Input.Search
          className="admin-search-bar"
          placeholder="Search recipes..."
          allowClear
          style={{ maxWidth: 320, margin: '0 16px' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="admin-add-recipe-btn" onClick={handleAddRecipe}>
          <FiPlus size={20} style={{ marginRight: 7, marginBottom: -2 }} /> Add Recipe
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>Loading recipes...</div>
      ) : (
        <div className="admin-recipes-grid">
          {filteredRecipes.map((recipe) => (
            <AdminRecipeCard
              key={recipe.id}
              image={recipe.image}
              label={recipe.name || recipe.title}
              cuisine={recipe.cuisine}
              mealType={recipe.mealType}
              difficulty={recipe.difficulty}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              onEdit={() => handleEdit(recipe)}
              onDelete={() => handleDelete(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRecipesPage;