
//import axios from "axios";
//import { set } from "mongoose";
import React from "react";
import "./ShowRecipeItem.css";
import { useParams } from "react-router-dom";

function ShowRecipeItem() {

  const { id } = useParams();
  console.log(id)

  const title = "Chicken Alfredo"
  const image= "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg"
  const macros = ["20g protein", "5gm sugar"]
  const instructions = ["cook the chicken", "pour the sauce"]
  return (
    <div className="recipe-item">
      <h1 className="recipe-title">{title}</h1>
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-description">
      <h3 className="recipe-ingredient">Ingredients:</h3>
      <ul>
       <p>chicken</p>
       <p>sauce</p>
      </ul>
      <h3 className=".recipe-macros">Macros:</h3>
      <p>{macros}</p>
      <h3 className="recipe-instruction">Instructions:</h3>
      <ol>
        {instructions}
      </ol>
      </div>
      
    </div>
  );
}

export default ShowRecipeItem;
