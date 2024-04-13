import mongoose from "mongoose";
import Recipe from "./../model/recipe.js";
import Ingredient from "./../model/ingredient.js";
import "dotenv/config";
import conn from '../DbConnect/conn.js'
import createnewIngredient from "./ingredientUtils/createNewIngresient.js";
import createRecipe from "./recipeUtils/createNewRecipe.js";

const apiKey = process.env.API_KEY;
// const getRecipeByName = async(name)=>{
//    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=10&apiKey=${apiKey}`;
//    const response = await fetch(url);
//    const data = await response.json();
//   return data.results;
// };


export const getRecipeByName = async (name) => {  
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      //const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
     // const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
      const response = await fetch(url);
      const res = await response.json();
      if (res.meals === null) {
        return [];
      } else {
       // createRecipe(res.meals);//this is a method to create a recipe if you have a list of recipe response
        return res.meals;
      }
};

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
    //recipeList.push(res);
    return res;
})
return recipeList;
}


// export default {getRecipeByName,getRecipeByIngredient};
