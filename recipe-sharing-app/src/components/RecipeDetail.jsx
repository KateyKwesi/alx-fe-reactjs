
import React from 'react';

import useRecipeStore from './recipeStore';

import { useNavigate } from 'react-router-dom';

const RecipeDetail = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === recipeId)
  );
  const navigate = useNavigate();

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="mb-4">{recipe.description}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default RecipeDetail;
