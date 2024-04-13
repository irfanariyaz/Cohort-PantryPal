import mongoose from "mongoose";
import Recipe from "./../model/recipe.js";
import Ingredient from "./../model/ingredient.js";
import "dotenv/config";



const apiKey = process.env.API_KEY;

//function to return 10 ingredient based on the name you type in the search bar
export const getIngredient = async (ingredientName) => {
  const ingredientList = [];
  //get the ingredient id from the database
  //get 10 recipes with that ingredient
  //return the recipes
  mongoose.connect(process.env.DB_URL)
  await Ingredient.find({ name: new RegExp(`\\b${ingredientName}\\w*`, "i") }).limit(10)
        .then((res)=>{
          //get the ingredient names
          for(const ingredient of res){
            const obj = {};
            obj[ingredient.name] = ingredient._id;
            ingredientList.push(obj);
          }
          console.log(ingredientList);   
  })
  return ingredientList;
}

//get a recipe based on ingredient/ingredients
export const getRecipesById = async (id) => {
  //let recipeList ;
  mongoose.connect(process.env.DB_URL);
 const recipeList =  await Recipe.find({ ingredients: { $in: [id] } })
  .then((res)=>{
    console.log(res.length);
    
    return res;
})
return recipeList;
}




// export default {getRecipeByName,getRecipeByIngredient};
