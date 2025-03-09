import { useState, useEffect, useRef } from "react";

import IngredientsList from "./IngredientsList";
import AIChefRecipe from "./AIChefRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recipeSection = useRef(null);

  // Scroll to recipe section once recipe is available
  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      const yCoord =
        recipeSection.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  // Update error message based on the number of ingredients
  useEffect(() => {
    if (ingredients.length < 3) {
      setErrorMessage(
        "🧞 Please add at least 3 ingredients to activate the get a recipe feature  ✨."
      );
    } else {
      setErrorMessage("");
    }
  }, [ingredients]);

  // Get recipe based on ingredients
  async function getRecipe() {
    setIsLoading(true);
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setErrorMessage(
        "Oops! Something went wrong while conjuring your recipe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Add ingredient to the list
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  // Remove a single ingredient
  function removeIngredient(indexToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove)
    );
  }

  // Clear all ingredients
  function clearIngredients() {
    setIngredients([]);
    setRecipe("");
  }

  return (
    <main className="container">
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="What's in your kitchen? (e.g., shrimp, tomatoes)"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button>Add ingredient</button>
      </form>

      {/* Display the error message with a CSS class */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
          clearIngredients={clearIngredients}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Conjuring your recipe...</p>
        </div>
      )}

      {!isLoading && recipe && <AIChefRecipe recipe={recipe} />}
      <footer className="footer">
        <p>
          <a
            href="https://www.flaticon.com/free-icons/aladdin"
            target="_blank"
            title="aladdin icons"
          >
            Aladdin icons created by amoghdesign - Flaticon
          </a>
        </p>
        <p>© 2025 All Rights Reserved | Severine Louis</p>
      </footer>
    </main>
  );
}
