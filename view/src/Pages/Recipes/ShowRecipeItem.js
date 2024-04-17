import React, { useEffect, useState } from "react";
import "./ShowRecipeItem.css";
import { useParams } from "react-router-dom";

function ShowRecipeItem() {

  const { id } = useParams();
  console.log(id)

  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recipe details when the component mounts
    fetch(`/recipes/findById/${id}`)//`http://localhost:3001/recipes/findById/${id}`
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipe(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]); // Re-fetch recipe details if recipeId changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <div className="recipe-item">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <div className="recipe-description">
      <h3 className="recipe-ingredient">Ingredients:</h3>
      <ul>
       <p>chicken</p>
       <p>sauce</p>
      </ul>
      <h3 className="recipe-macros">Measurements:</h3>
      <p>{recipe.measurements}</p>
      <h3 className="recipe-instruction">Instructions:</h3>
      <ol>
        {recipe.instructions}
      </ol>
      </div>
      
    </div>
  );
}

export default ShowRecipeItem;
