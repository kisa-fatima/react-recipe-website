import React, { useState } from 'react';
import AdminCusineCard from '../components/AdminCusineCard';
import { cuisinesData } from '../utils/cusinesData';
import { FiPlus } from 'react-icons/fi';
import AddCusineModal from '../components/AddCusineModal';
import EditCusineModal from '../components/EditCusineModal';
import { updateCuisine } from '../services/recipeApi';
import { message } from 'antd';
import '../styles/AdminCuisinesPage.css';
import '../styles/AdminRecipeCard.css';

const AdminCuisinesPage = () => {
  const [cuisines, setCuisines] = useState(cuisinesData);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState(null);
  const [originalCuisineName, setOriginalCuisineName] = useState(null);

  const handleEdit = (cuisine) => {
    setEditingCuisine(cuisine);
    setOriginalCuisineName(cuisine.name);
    setEditModalOpen(true);
  };

  const handleDelete = (cuisine) => {
    // TODO: Implement delete logic/confirmation
    setCuisines(prev => prev.filter(c => c.name !== cuisine.name));
    // Optionally show a message.success here
  };

  const handleAddCuisine = () => {
    setAddModalOpen(true);
  };

  const handleCuisineAdded = (newCuisine) => {
    setCuisines(prev => [newCuisine, ...prev]);
  };

  const handleCuisineEdited = async (updatedCuisine) => {
    const result = await updateCuisine(originalCuisineName, updatedCuisine);
    if (result) {
      setCuisines(prev => prev.map(c => c.name === originalCuisineName ? updatedCuisine : c));
      message.success('Cuisine updated!', 2);
      console.log('Updated cuisine:', result);
    } else {
      message.error('Failed to update cuisine', 2);
    }
  };

  return (
    <div className="admin-cuisines-page">
      <AddCusineModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleCuisineAdded} />
      <EditCusineModal open={editModalOpen} onClose={() => setEditModalOpen(false)} cuisine={editingCuisine} onEdit={handleCuisineEdited} />
      <div className="admin-recipes-header-row">
        <h1 className="admin-page-title">Cuisine Management</h1>
        <button className="admin-add-recipe-btn" onClick={handleAddCuisine}>
          <FiPlus size={20} style={{ marginRight: 7, marginBottom: -2 }} /> Add Cuisine
        </button>
      </div>
      {/* <p className="admin-page-desc">Manage all cuisines in your database.</p> */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>Loading cuisines...</div>
      ) : (
        <div className="admin-recipes-grid">
          {cuisines.map((cuisine) => (
            <AdminCusineCard
              key={cuisine.name}
              image={cuisine.image}
              name={cuisine.name}
              description={cuisine.description}
              onEdit={() => handleEdit(cuisine)}
              onDelete={() => handleDelete(cuisine)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCuisinesPage; 