import React, { useState, useEffect } from 'react';
import AdminCusineCard from '../components/AdminCusineCard';
import { FiPlus } from 'react-icons/fi';
import AddCusineModal from '../components/AddCusineModal';
import EditCusineModal from '../components/EditCusineModal';
import { fetchRecipeCusineTypes, updateCuisine, deleteCuisine, addCuisine } from '../services/recipeApi';
import { message, Input } from 'antd';
import '../styles/AdminCuisinesPage.css';
import '../styles/AdminRecipeCard.css';

const AdminCuisinesPage = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState(null);
  const [originalCuisineName, setOriginalCuisineName] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cuisines from Firestore
  const loadCuisines = async () => {
    setLoading(true);
    const data = await fetchRecipeCusineTypes();
    setCuisines(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCuisines();
  }, []);

  const handleEdit = (cuisine) => {
    setEditingCuisine(cuisine);
    setOriginalCuisineName(cuisine.name);
    setEditModalOpen(true);
  };

  const handleDelete = async (cuisine) => {
    setLoading(true);
    const result = await deleteCuisine(cuisine.name);
    if (result) {
      message.success('Cuisine deleted!', 2);
      await loadCuisines();
    } else {
      message.error('Failed to delete cuisine', 2);
      setLoading(false);
    }
  };

  const handleAddCuisine = () => {
    setAddModalOpen(true);
  };

  const handleCuisineAdded = async (newCuisine) => {
    setLoading(true);
    await addCuisine(newCuisine);
    await loadCuisines();
    setAddModalOpen(false);
  };

  const handleCuisineEdited = async (updatedCuisine) => {
    setLoading(true);
    const result = await updateCuisine(originalCuisineName, updatedCuisine);
    if (result) {
      message.success('Cuisine updated!', 2);
      await loadCuisines();
      setEditModalOpen(false);
    } else {
      message.error('Failed to update cuisine', 2);
      setLoading(false);
    }
  };

  const filteredCuisines = cuisines.filter(cuisine =>
    (cuisine.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-cuisines-page">
      <AddCusineModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleCuisineAdded} />
      <EditCusineModal open={editModalOpen} onClose={() => setEditModalOpen(false)} cuisine={editingCuisine} onEdit={handleCuisineEdited} />
      <div className="admin-recipes-header-row">
        <h1 className="admin-page-title">Cuisine Management</h1>
        <Input.Search
          className="admin-search-bar"
          placeholder="Search cuisines..."
          allowClear
          style={{ maxWidth: 320, margin: '0 16px' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="admin-add-recipe-btn" onClick={handleAddCuisine}>
          <FiPlus size={20} style={{ marginRight: 7, marginBottom: -2 }} /> Add Cuisine
        </button>
      </div>
      {/* <p className="admin-page-desc">Manage all cuisines in your database.</p> */}
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>Loading cuisines...</div>
      ) : (
        <div className="admin-recipes-grid">
          {filteredCuisines.map((cuisine) => (
            <AdminCusineCard
              key={cuisine.id || cuisine.name}
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