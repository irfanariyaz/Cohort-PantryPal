import express from 'express';
import UserController from '../controller/UserController.js';
const router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res) {
  console.log("request from /profile",req.params,"session",req.session,req)
  UserController.readProfile(req, res);
});

router.get('/fridge', function(req, res) {
  UserController.readFridge(req, res);
});

export default router;
