import express from "express";
import {signupUser} from '../controller/authController.js';

const router = express.Router();

router.get('/signup' , signupUser)

export default router;