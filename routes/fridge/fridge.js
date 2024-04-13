/**@module router/fridge*/
import express from 'express';
import FridgeController from '../../controller/FridgeController.js';
const router = express.Router();

router.get("/ingredient", (req, res) => {
    FridgeController.readIngredient(req, res);
});

router.post("/ingredient", (req, res) => {
    FridgeController.addIngredient(req, res);
});

router.post("/ingredient/delete", (req, res) => {
    FridgeController.removeIngredient(req, res);
});

router.get("/meal", (req, res) => {
    FridgeController.readMeals(req, res);
});

router.post("/meal", (req, res) => {
    FridgeController.addMeal(req, res);
});

router.post("/meal/delete", (req, res) => {
    FridgeController.deleteMeal(req, res); 
});

export default router;
