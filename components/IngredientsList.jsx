import { forwardRef } from 'react';

const IngredientsList = forwardRef(function IngredientsList({ ingredients, getRecipe, removeIngredient, clearIngredients, isLoading }, ref) {
    return (
        <div ref={ref}>
            <h2>Your Ingredients:</h2>
            <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                        <button 
                            className="delete-ingredient" 
                            onClick={() => removeIngredient(index)}
                            aria-label={`Remove ${ingredient}`}
                        >
                            ×
                        </button>
                        <span className="ingredient-text">{ingredient}</span>
                    </li>
                ))}
            </ul>
            
            <div className="list-actions">
                {ingredients.length > 0 && (
                    <button 
                        className="clear-all-btn" 
                        onClick={clearIngredients}
                        aria-label="Clear all ingredients"
                        disabled={isLoading}
                    >
                        Clear All
                    </button>
                )}
            </div>
            
            <div className="get-recipe-container">
                <div>
                    <h3>Ready for a little culinary magic?</h3>
                    <p>Click the button to get a recipe with your ingredients!</p>
                </div>
                <button 
                    onClick={getRecipe} 
                    disabled={ingredients.length < 3 || isLoading}
                    className={isLoading ? "loading" : ""}
                >
                    {isLoading ? "Cooking..." : "Get Recipe"}
                </button>
            </div>
        </div>
    );
});

export default IngredientsList;