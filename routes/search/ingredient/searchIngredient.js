import express from 'express';
const router = express.Router();

router.post("/", (req, res) => {
    const {query} = req.query;
    const result = null;
    
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(500);
    }
});