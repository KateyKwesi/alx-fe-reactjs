import React, { useEffect } from 'react';
import useRecipeStore from '../stores/useRecipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="my-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Recommended for You</h2>
      {recommendations.length === 0 && <p>No recommendations available!</p>}
      {recommendations.map(recipe => (
        <div key={recipe.id} className="mb-2 p-2 border rounded">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
