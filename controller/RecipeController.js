import mongoose from "mongoose";
import Recipe from "./../model/recipe.js";
import Ingredient from "./../model/ingredient.js";
import "dotenv/config";
import{ObjectId} from "mongodb";
import meal from "../model/meal.js";

const apiKey = process.env.API_KEY;

//function to return 10 ingredient based on the name you type in the search bar
export const getIngredient = async (ingredientName) => {
  const ingredientList = [];
  //get the ingredient id from the database
  //get 10 recipes with that ingredient
  //return the recipes
  mongoose.connect(process.env.DB_URL).catch((error) => {
    console.error(error);
  });

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
export const getRecipesByName = async(name) => {
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
export const getAllIngredientNames = async(list ) => {  
  const ingredients = (list.split(","));
  const result=[];
  mongoose.connect(process.env.DB_URL);
  for(const name of ingredients){{
    if(name){
      const ingredientList = await Ingredient.find({name:new RegExp(`\\b${name}\\w*`, "i")})
      .then((res)=>{
        console.log("results ",res.length);
        const names = res.map(el => el.name);
        console.log("names",names);
        const namesLow = names.map(el => el.toLowerCase());
          if(!namesLow.includes(name.toLowerCase())){
            names.push(name);
           }
           return names;
        
       })
      .catch((error)=>{
          console.log("error when returning ingredient results based on name:", error,);
      }
      );
      result.push(ingredientList);
      }
   console.log(result);
  
    }
    
    }
return result;
}

// Controller method to get a recipe by its ID
export const getRecipeById = async (id) => {
    try {
        mongoose.connect(process.env.DB_URL);
        const recipe = await Recipe.findById(id);
        //get all the Ingredients by name
        const names=[];
        const totalNutrients= {
          calories: 0,
          carbohydrates: 0,
          cholesterol: 0,
          protein: 0,
          total_fat: 0,
          total_saturated_fats: 0,
          total_trans_fats:0,
          total_monosaturated_fats:0
        } 
        for(const [index, id] of recipe.ingredients.entries()){
          const ingredients = await Ingredient.findOne({ _id: id });
          names.push(ingredients.name);
          console.log(ingredients.name,recipe.measurements[index]);
          //get the measurements
          //const convertedNutrients = convertNutrient(ingredients.nutrients,recipe.measurements[index]);
          const convertedNutrients = ingredients.nutrients;
         console.log("convertedNutrients",convertedNutrients);
          totalNutrients.calories += Math.floor(convertedNutrients.calories);
          totalNutrients.carbohydrates += Math.floor(convertedNutrients.carbohydrates);
          totalNutrients.cholesterol += Math.floor(convertedNutrients.cholesterol);
          totalNutrients.protein += Math.floor(convertedNutrients.protein);
          totalNutrients.total_fat += Math.floor(convertedNutrients.total_fat);
          totalNutrients.total_saturated_fats += Math.floor(convertedNutrients.total_saturated_fats);
          totalNutrients.total_trans_fats += Math.floor(convertedNutrients.total_trans_fats);
          totalNutrients.total_monosaturated_fats += Math.floor(convertedNutrients.total_monosaturated_fats);
                     
        }
        
        console.log("names",names);
        const recipeWithNames = {
          "_id": recipe._id,
          "name": recipe.name,
          "category": recipe.category,
          "ingredients": names,
          "instructions": recipe.instructions,
          "image": recipe.image,
          "measurements": recipe.measurements,
          "totalNutrients": totalNutrients,
         };
       // console.log( recipe);
   
        console.log(recipeWithNames);
       
       return recipeWithNames;
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        throw error;
    }
};

//function to return the recipe based on the users selected ingredients
export const getRecipesByIngredientList = async(list,select)=>{
 const result = await  mongoose.connect(process.env.DB_URL);
 console.log("connected to database",list);
 const ingredientIds = [];
//loop through the list of ingredients
 for(const ingredient of list){
      //get the ingredient id from the database
      const ingredientId = await Ingredient.findOne({ name: new RegExp(`\\b${ingredient}\\w*`, "i") });
       //add the ingredient id to the list
      if(ingredientId){
          ingredientIds.push(ingredientId._id);
      }
  }
  console.log(ingredientIds);
  if (ingredientIds.length === 0) {
    return [];
  }else{
    console.log("true or false",select);
   //returns 20 recipes 
   if(select==="true"){
    console.log("reached if");
    console.log(select);
    const recipes = await Recipe.find({ ingredients: { $all: ingredientIds } }).limit(20);
    console.log(recipes.length);
    return recipes;
   }else{
    console.log("reached else");
    console.log(select);
    const recipes = await Recipe.find({ingredients:{$in: ingredientIds}}).limit(20);
    console.log(recipes.length);
   // mongoose.disconnect();
    console.log("disconnected from database")
    return recipes;
   }  
   //console.log(recipes.length);
  // mongoose.disconnect;
    
  }
  
}
const convertNutrient = (nutrients,measurements) => {
  const split = measurements.split(" ");
  console.log(" before convert",nutrients);
  //get thevalue
  const unit = split[1];
  console.log("value",parseFloat(split[0]),"unit",unit);
  if(parseFloat(split[0])!==NaN && unit){
    const value = parseFloat(split[0]); 
    let c;
    if(value && (unit==="g"||unit==='gram'|| unit ==='grams'||unit ==='gms')){
      c = 1;
    }else if(value && unit==="cup"||unit=='Cup'){
      c = 250;
    }else if(value && unit==="oz"||unit=='Oz'||unit ==='ounce'||unit ==='ounces'||unit =='Ounce'){
      c = 28.3495;
    }else if(value && unit==="lb"||unit=='Lb'||unit ==='pound'||unit ==='pounds'||unit == 'Pound'||unit=='lbs'|| unit==='Lbs'){
      c = 453.592;
    }else if(value && unit==="ml"||unit=='Ml'||unit ==='milliliter'||unit ==='milliliters'||unit == 'Milliliter'){
      c = 1;
    }else if(value && unit==="l"||unit=='L'||unit ==='liter'||unit ==='liters'||unit == 'Liter'){
      c = 1000;
    }else if(value && unit==="tsp"||unit=='Tsp'||unit ==='teaspoon'||unit ==='teaspoons'||unit == 'Teaspoon'){
      c = 4.92892;
    }else if(value && unit==="tbsp"||unit=='Tbsp'||unit ==='tablespoon'||unit ==='tablespoons'||unit == 'Tablespoon'){
      c = 14.7868;
    }
    nutrients.calories = (nutrients.calories/100) *value*c;
    nutrients.carbohydrates = (nutrients.carbohydrates/100) *value*c;
    nutrients.cholesterol = (nutrients.cholesterol/100) *value*c;
    nutrients.protein = (nutrients.protein/100) *value*c;
    nutrients.total_fat = (nutrients.total_fat/100) *value*c;
    nutrients.total_saturated_fats = (nutrients.total_saturated_fats/100) *value*c;
    nutrients.total_trans_fats = (nutrients.total_trans_fats/100) *value*c;
    nutrients.total_monosaturated_fats = (nutrients.total_monosaturated_fats/100) *value*c;
    return nutrients;  
  }else{
    return nutrients;
  }
 
}
 
  // mongoose.connection.close();
  // console.log("disconnected from database");
  // return res;
  

 
  //get the ingredient ids from the database
 
  //return the recipes
 

// export default {getRecipeByName,getRecipeByIngredient};
