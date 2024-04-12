import mongoose from 'mongoose';
import Recipe from './../model/recipe.js';
import Ingredient from './../model/ingredient.js';
import data from './placeholder_data/recipes.js';
import 'dotenv/config';

// Function to fetch MongoDB ObjectIds of ingredients
const getOrCreateIngredientIds =async function (ingredientNames) {
  let ingredientIds = [];
  try {
        // Loop through each ingredient name
    for (const name of ingredientNames) {
      // Query the database to find the ingredient
      let ingredient = await Ingredient.findOne({ name });

      // If ingredient not found, create a new one
      if (!ingredient) {
        ingredient = await Ingredient.create({ 
          name: name,
          calories:10,
          vitamin_A:20,
          vitamin_B:30,
          vitamin_C:40,
          cholesterol:50,
          carbohydrates:60,
          image_url:""
         });
         await ingredient.save();
      }

      // Add the ingredient's ObjectId to the list
      ingredientIds.push(ingredient._id);
      console.log("ingredient saved to db and its id is",ingredient._id);
    }
    return   ingredientIds;
  } catch (error) {
    console.error('Error fetching or creating ingredient IDs:', error);
    throw error;
  }
}

const RecipeController = function() {
  function readRecipe(req, res) {
    const ID = req.query.id;

    for (const key of Object.keys(data)) {
      const recipe = data[key];
      console.log(recipe);
      if (recipe.route_id === ID) {
        res.json(JSON.stringify(recipe));
      }
    }
    res.status(500).send();
  }

  function readAll(req, res) {
    res.json(data);
  }

  function createRecipe(req, res) {
    
  }

  function deleteRecipe(req, res) {

  }

  return {
    create: createRecipe,
    readAll: readAll,
    read: readRecipe,
    delete: deleteRecipe
  }
}



export default RecipeController();