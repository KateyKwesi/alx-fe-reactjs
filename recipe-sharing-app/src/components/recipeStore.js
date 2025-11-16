import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],

  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  updateRecipe: (id, updatedData) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, ...updatedData } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
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
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
      ),
    });
  },

  favorites: [],

  addFavorite: (id) =>
    set((state) =>
      state.favorites.includes(id)
        ? state
        : { favorites: [...state.favorites, id] }
    ),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  recommendations: [],

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    const favRecipes = recipes.filter((r) => favorites.includes(r.id));

    const recommended = recipes.filter((recipe) => {
      return favRecipes.some((fav) =>
        fav.ingredients?.some((ing) => recipe.ingredients?.includes(ing))
      );
    });

    set({ recommendations: recommended.slice(0, 5) });
  },
}));
