import express from 'express'
import { loginAdmin, loginUser, registerUser } from '../controller/authController.js'

const authRoutes=express.Router();

authRoutes.post('/register',registerUser);
authRoutes.post('/login',loginUser);
authRoutes.post('/admin/login',loginAdmin);

export default authRoutes;