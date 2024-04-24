import mongoose from 'mongoose';
import Recipe from '../../model/recipe.js';
import Ingredient from '../../model/ingredient.js';
import "dotenv/config";

async function getRecipe(req, res) {
    const ID = req.query.ID;

    //We only use res to return possible errors.
    //Function should not return data.
    await mongoose.connect(process.env.DB_URL).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });

    const recipe = await Recipe.findById(ID).then(async (resp) => {
        if (typeof resp !== "null" || typeof resp !== "undefined") {
            const names = [];
            
            for await (const [i, id] of resp.ingredients.entries()) {
                await Ingredient.findById(id).then((val) => {
                    names.push(resp.measurements[i] + " of " + val.name.split(", ").slice(0, 2).join(', '));
                }).catch((error) => {
                    console.error(error);
                    res.status(500).send(error);
                });
            }

            const recipeObj = resp.toObject();
            recipeObj.ingredientNames = names;
            return recipeObj;
        } else {
            res.status(404).send();
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });

    return recipe;
}

export default getRecipe;