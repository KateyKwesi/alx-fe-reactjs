import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate(); // <-- added useNavigate

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe? This action cannot be undone.'
    );
    if (!confirmed) return;

    deleteRecipe(recipeId);

    // Navigate back to recipes list after deletion
    navigate('/recipes'); // <-- replace '/recipes' with your target route
  };

  return (
    <button
      onClick={handleDelete}
      style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
