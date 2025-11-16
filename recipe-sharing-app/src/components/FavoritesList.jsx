// src/components/FavoritesList.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  // MEMOIZE: Only recompute when favorites or recipes change
  const favoriteRecipes = useMemo(() => {
    return favorites
      .map((id) => recipes.find((r) => r.id === id))
      .filter(Boolean);
  }, [favorites, recipes]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>My Favorites ({favoriteRecipes.length})</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet. Start adding!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {favoriteRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  border: '1px solid #eee',
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem' }}>{recipe.title}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  {recipe.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;