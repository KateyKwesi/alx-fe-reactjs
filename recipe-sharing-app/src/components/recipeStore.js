// src/recipeStore.js
import { create } from 'zustand';
import { nanoid } from 'nanoid';



export const useRecipeStore = create((setRecipes, getRecipes) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // === RECIPES ===
  addRecipe: (recipe) =>
    setRecipes((state) => ({
      recipes: [...state.recipes, { id: nanoid(), ...recipe }],
    })),

  updateRecipe: (updated) =>
    setRecipes((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      ),
    })),

  deleteRecipe: (id) =>
    setRecipes((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // === SEARCH ===
  setRecipesSearchTerm: (term) => setRecipes({ searchTerm: term }),

  filterRecipes: () => {
    const { recipes, searchTerm } = getRecipes();
    const term = searchTerm.toLowerCase().trim();

    const filtered = recipes.filter((recipe) => {
      const title = (recipe.title || '').toLowerCase();
      const desc = (recipe.description || '').toLowerCase();
      const ingredients = (recipe.ingredients || []).join(' ').toLowerCase();
      return title.includes(term) || desc.includes(term) || ingredients.includes(term);
    });

    setRecipes({ filteredRecipes: filtered });
  },

  // === FAVORITES ===
  addFavorite: (recipeId) =>
    setRecipes((state) => ({
      favorites: [...new setRecipes([...state.favorites, recipeId])], // Prevent duplicates
    })),

  removeFavorite: (recipeId) =>
    setRecipes((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // === RECOMMENDATIONS ===
  generateRecommendations: () => {
    const { recipes, favorites } = getRecipes();
    if (favorites.length === 0) {
      setRecipes({ recommendations: [] });
      return;
    }

    // Recommend recipes with matching ingredients from favorites
    const favoriteRecipes = favorites.map((id) =>
      recipes.find((r) => r.id === id)
    ).filter(Boolean);

    const commonIngredients = favoriteRecipes
      .flatMap((r) => r.ingredients || [])
      .reduce((acc, ing) => {
        acc[ing] = (acc[ing] || 0) + 1;
        return acc;
      }, {});

    const recommendations = recipes
      .filter((recipe) => !favorites.includes(recipe.id))
      .filter((recipe) => {
        const recipeIngs = recipe.ingredients || [];
        return recipeIngs.some((ing) => commonIngredients[ing] > 0);
      })
      .slice(0, 3); // Top 3

    setRecipes({ recommendations });
  },
}));