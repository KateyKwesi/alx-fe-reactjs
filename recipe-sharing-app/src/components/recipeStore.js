import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],

  setRecipes: (recipes) => set({ recipes }),

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  updateRecipe: (id, updatedData) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedData } : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  searchTerm: "",
  filteredRecipes: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const term = searchTerm.toLowerCase();

    set({
      filteredRecipes: recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term)
      ),
    });
  },

  favorites: [],

  addFavorite: (recipeId) =>
    set((state) =>
      state.favorites.includes(recipeId)
        ? state
        : { favorites: [...state.favorites, recipeId] }
    ),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  recommendations: [],

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    const favRecipes = recipes.filter((r) => favorites.includes(r.id));

    const recommended = recipes.filter((recipe) =>
      favRecipes.some((fav) =>
        fav.ingredients?.some((ing) => recipe.ingredients?.includes(ing))
      )
    );

    set({ recommendations: recommended.slice(0, 5) });
  },
}));
