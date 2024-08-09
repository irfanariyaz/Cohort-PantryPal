import express from 'express';
import GuestUserController from '../controller/GuestUserController.js';
const router = express.Router();

/* GET guest users listing. */
router.get('/profile', function(req, res) {
    GuestUserController.readProfile(req, res);
  });
  export default router;