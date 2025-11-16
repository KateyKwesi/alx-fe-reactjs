// src/components/EditRecipeForm.jsx
import React, { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ initialRecipe = {}, onSuccess }) => {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState(initialRecipe.title || "");
  const [description, setDescription] = useState(initialRecipe.description || "");
  const [ingredients, setIngredients] = useState((initialRecipe.ingredients || []).join(", "));
  const [instructions, setInstructions] = useState(initialRecipe.instructions || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updated = {
      id: initialRecipe.id,
      title,
      description,
      ingredients: ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      instructions,
    };

    updateRecipe(updated);
    if (onSuccess) onSuccess(updated);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Ingredients (comma separated)</label>
        <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </div>

      <div>
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </div>

      <button type="submit">Save changes</button>
    </form>
  );
};

export default EditRecipeForm;