import Ingredient from "../../model/ingredient.js";
import "dotenv/config";
import mongoose from "mongoose";
import Recipe from "../../model/recipe.js";
import createnewIngredient from "../ingredientUtils/createNewIngresient.js"

async function createRecipe(data) {
    //create recipe object
    try {
      for (const recipeItem of data) {
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log("open connection");
              //check if recipe exists in database
        await Recipe.findOne({ route_id: recipeItem.idMeal })
          .then(async(recipe) => {
            if (recipe) {
              console.log("Recipe already exists in database:", recipe.name);
            } else {
              const ingredients = Object.keys(recipeItem)
                .filter(
                  (key) => key.startsWith("strIngredient") && recipeItem[key] && recipeItem[key]!=" "
                )
                .map((key) => recipeItem[key]);
             // console.log("ingredients::", ingredients);
              // get the ingredient ids from the database
              await findIngredientIds(ingredients)
                .then(async (ingredientIds) => {
                 // console.log("Ingredient IDs:", ingredientIds);
                  //get the instructions from the recipeItem.strInstructions
                
                  const instructions = recipeItem.strInstructions.split(/\r?\n\r?\n|\r?\n/);
                
                  //get the measuerements
                  const measurements = Object.keys(recipeItem)
                .filter((key) => key.startsWith("strMeasure") && recipeItem[key] &&  recipeItem[key]!=' ')
                .map((key) => recipeItem[key]);
             // console.log("measurements::", measurements);
                  const recipe = await Recipe.create({
                    route_id: recipeItem.idMeal,
                    name: recipeItem.strMeal,
                    ingredients: ingredientIds,
                    measurements: measurements,
                    instructions: instructions,
                    category: recipeItem.strCategory,
                    image: recipeItem.strMealThumb,
                  });
                  console.log(
                    "saving to database ",
                    recipe.name
                  );
                 
                })
                .catch((error) => {
                  console.error("Errorin creating findIngredient:", error);
                  //mongoose.connection.close();
                });
            }
          })
          .then(() => {
          
            //  mongoose.connection.close();
            //   console.log("connection closed");
          });
      }
    } catch (error) {
      console.log("error in creating recipe", error);
    } finally {
      // mongoose.connection.close();
      console.log("connection closed");
    }
  }


  
  async function findIngredientIds(ingredients) {
    try {
      const ingredientIds = [];

      // Loop through each ingredient
      for (const ingredientName of ingredients) {
        // Search for the ingredient in the collection

        await Ingredient.findOne({name: new RegExp(`\\b${ingredientName}\\b`, "i") })
           .then(async (ingredient) => {
          if (ingredient) {
            // If ingredient found, push its ID to the array
          //  console.log(ingredientName, " found in database");
            ingredientIds.push(ingredient._id);
          } else {
            //create a new ingredient object  item function
            await createnewIngredient(ingredientName).then((res) => {
              ingredientIds.push(res._id);
            });
          }
        });
      }
      //close the db connection
      // conn.close();
      return ingredientIds;
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error occurred while searching for ingredients:", error);
      return []; // Return an empty array in case of error
    } finally {
      //close the db connection
      // mongoose.connection.close();
      // console.log("db connection closed");
    }
}
  export default createRecipe;