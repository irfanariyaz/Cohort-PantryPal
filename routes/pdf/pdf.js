import express from 'express';
import PDFBuilder from '../../pdf/recipe.js';
const router = express.Router();

router.get("/recipe", (req, res) => {
    PDFBuilder(req, res);
});

export default router;