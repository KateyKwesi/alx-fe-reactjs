import React from 'react';
import useRecipeStore from './recipeStore';


const FavoritesList = () => {
  const favorites = useRecipeStore(state =>
    state.favorites.map(id => state.recipes.find(recipe => recipe.id === id))
  );
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div className="my-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">My Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet!</p>}
      {favorites.map(recipe => (
        <div key={recipe.id} className="mb-2 p-2 border rounded">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button
            onClick={() => removeFavorite(recipe.id)}
            className="mt-1 px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
