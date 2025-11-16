// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import RecommendationsList from './RecommendationsList';
const RecipeList = () => {
  // CORRECT: Use selector functions
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  return (
    <div>
      <h2>All Recipes</h2>
      <SearchBar />
      <FavoritesList />
      <RecommendationsList />

      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredRecipes.map((recipe) => (
            <li
              key={recipe.id}
              style={{
                border: '1px solid #eee',
                margin: '0.5rem 0',
                padding: '1rem',
                borderRadius: '6px',
              }}
            >
              <Link
                to={`/recipe/${recipe.id}`}
                style={{ textDecoration: 'none', color: '#007bff' }}
              >
                <h3>{recipe.title}</h3>
              </Link>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;