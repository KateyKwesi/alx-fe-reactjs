// src/components/RecommendationsList.jsx
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
src/components/RecommendationsList.jsx

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  // MEMOIZE: Prevent re-renders
  const displayRecs = useMemo(() => recommendations, [recommendations]);

  if (displayRecs.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>You Might Like</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {displayRecs.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>{recipe.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>
                Based on your favorites
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;