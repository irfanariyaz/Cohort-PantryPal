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
//get recipes based on category
export const getRecipesByCategory = async(category)=>{
  mongoose.connect(process.env.DB_URL);
  const recipeList  = await Recipe.find({category:category})
    .then((response)=>{
        console.log(response.length);
        return response;       
        }).catch((error)=>{ 
            console.log("error when returning recipe results based on category:",error,);
        })
       
  return recipeList;
}

//get recipes based on name
export const getRecipesByName = async(name)=>{
    await mongoose.connect(process.env.DB_URL).catch((error) => {
      console.error(error);
      res.status(500).send(error);
  });
  const recipeList = await Recipe.find({name: new RegExp(`\\b${name}\\w*`, "i")})
    .then((response)=>{
        console.log(response.length);
        return response;
        } 
    ).catch((error)=>{
        console.log("error when returning recipe results based on name:", error,);
    } 
    )
    return recipeList;

}

// Controller method to get a recipe by its ID
export const getRecipeById = async (id) => {
    try {
        mongoose.connect(process.env.DB_URL);
        const recipe = await Recipe.findById(id);
        return recipe;
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        throw error;
    }
};
// export default {getRecipeByName,getRecipeByIngredient};
