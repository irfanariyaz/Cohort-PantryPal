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
    <div className="recipe-item p-3">
      <h1 className="recipe-title">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <div className="recipe-description">
      
      <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Ingredients</th>
          <th className="px-4 py-2">Measurements</th>
        </tr>
      </thead>
      <tbody>
        {recipe.ingredients?.map((ingredient, index) => (
          <tr key={index}className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="border px-4 py-2 capitalize">{ingredient}</td>
            <td className="border px-4 py-2">{recipe.measurements[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
     
      <h3 className="recipe-instruction">Instructions:</h3>
      <ol>
        {recipe.instructions}
      </ol>
      </div>
      
    </div>
  );
}

export default ShowRecipeItem;
