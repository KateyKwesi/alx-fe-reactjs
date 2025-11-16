// src/components/SearchBar.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  // CORRECT: Select only what you need
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <input
      type="text"
      placeholder="Search by title, description, or ingredient..."
      onChange={handleChange}
      style={{
        width: '100%',
        maxWidth: '500px',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    />
  );
};

export default SearchBar;