import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });

    const { filterRecipes } = get();
    filterRecipes();
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const term = searchTerm.toLowerCase();

    const filtered = recipes.filter((recipe) => {
      const matchesTitle = recipe.title.toLowerCase().includes(term);
      const matchesIngredients = recipe.ingredients?.some((ing) =>
        ing.toLowerCase().includes(term)
      );
      const matchesTime =
        typeof recipe.prepTime === "number" &&
        recipe.prepTime.toString().includes(term);

      return matchesTitle || matchesIngredients || matchesTime;
    });

    set({ filteredRecipes: filtered });
  },

  addRecipe: (newRecipe) =>
    set((state) => {
      const updated = [...state.recipes, newRecipe];
      return { recipes: updated };
    }),
}));
