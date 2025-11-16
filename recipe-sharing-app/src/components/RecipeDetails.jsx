// src/components/RecipeDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from './FavouriteButton'


const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Select recipe from store
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id == id) // `==` handles string/number safely
  );

  // Optional: Add loading state if recipes load async later
  // const recipes = useRecipeStore((state) => state.recipes);
  // if (!recipes.length) return <p>Loading recipes...</p>;

  if (!recipe) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Recipe List
        </button>
      </main>
    );
  }

  return (
    <article
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <header>
        <h1 style={{ margin: "0 0 0.5rem", fontSize: "2rem" }}>
          {recipe.title}
        </h1>
        {recipe.description && (
          <p style={{ color: "#555", fontStyle: "italic", marginBottom: "1rem" }}>
            {recipe.description}
          </p>
        )}
      </header>

      <section style={{ margin: "1.5rem 0" }}>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h3 style={{ margin: "0 0 0.5rem" }}>Ingredients</h3>
            <p>{recipe.ingredients.join(", ")}</p>
          </div>
        )}

        {recipe.instructions && (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ margin: "0 0 0.5rem" }}>Instructions</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
          </div>
        )}
      </section>

      <hr style={{ border: "1px solid #eee", margin: "2rem 0" }} />

      {/* Edit Form */}
      <section>
        <h3 style={{ marginBottom: "1rem" }}>Edit Recipe</h3>
        <EditRecipeForm
          initialRecipe={recipe}
          onSuccess={() => {
            alert("Recipe updated successfully!");
            // Optional: scroll to top or refresh
            window.scrollTo(0, 0);
          }}
        />
      </section>

      <hr style={{ border: "1px solid #eee", margin: "2rem 0" }} />
      <FavoriteButton recipeId={recipe.id} />

      {/* Delete Button */}
      <section style={{ textAlign: "right" }}>
        <DeleteRecipeButton
          recipeId={recipe.id}
          onDelete={() => navigate("/")}
        />
      </section>
    </article>
  );
};

export default RecipeDetails;

