// src/components/FavoriteButton.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const { favorites, addFavorite, removeFavorite, generateRecommendations } = useRecipeStore();
  const isFavorite = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
    generateRecommendations(); // Update recs
  };

  return (
    <button
      onClick={toggleFavorite}
      style={{
        backgroundColor: isFavorite ? '#ff4757' : '#eee',
        color: isFavorite ? 'white' : '#333',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
      }}
    >
      {isFavorite ? '❤️ Remove' : '♡ Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;