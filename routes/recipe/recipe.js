
import express from 'express';
import  {getIngredient, getRecipesById,
        getRecipesByCategory,getRecipesByName,
        getAllIngredientNames,getRecipesByIngredientList
      }  
        from '../../controller/RecipeController.js';
const router = express.Router();


// router.get('/findByName', async(req, res) =>{
//     //destructure the query parameters for name of the recipe
//     const {name}=req.query;    
//     console.log(name);
//     //const data = await getRecipeByName(name);
//     console.log(data);
//     res.json(data);
// });
router.get('/findByName', async(req, res) =>{
    const {name}=req.query;
    console.log(name);

   const data = await getRecipeByName(name).then(
        (response) => {
            console.log(response.length, "elemts to add");
            res.json(response);
            })   
});
//recipe based on  one ingredient
router.get('/getIngredient', async(req, res) =>{
    const { ingredient}=req.query;
    console.log(ingredient);
    const response = await getIngredient(ingredient);
    res.json(response);
});
//endpoint to get recipes based on ingredient id
router.get('/getRecipes/:id',async(req,res)=>{
    const id = req.params.id;
    const recipes = await getRecipesById(id)
    .then((response)=>{
        res.json(response);
    });
   
})

//endpoint to get recipes based on  category
router.get('/category/:category',async(req, res)=>{
    const category = req.params.category;    
    //get recipes from db based on category
    const recipes = await getRecipesByCategory(category)
        .then((response)=>{
            res.json(response)
        });
});

//endpoint to get recipes based on user searched term
router.get('/search/:search',async(req, res)=>{
    const search = req.params.search;
    //get recipes from db based on  the search term
    const recipes = await getRecipesByName(search)
        .then((response)=>{
            res.json(response)
        });
});
//endpoint to retuen list of  all the ingredients(comma seperated)that user searched 
router.get('/ingredients/:list',async(req, res)=>{
    console.log("request reached");
    const ingredients = req.params.list;
    console.log(ingredients);
    const recipes = await getAllIngredientNames(ingredients)
        .then((response)=>{
            res.json(response)
        }
        );
    
});

//endpoint to return the recipes after selecting the ingredients 
router.get('/recipeList',async(req, res)=>{
    console.log("request reached");
    const {values,selected} = req.query;
    console.log(values,selected);
    const recipes = await getRecipesByIngredientList(values,selected)
   res.json(recipes);
});


export default router;