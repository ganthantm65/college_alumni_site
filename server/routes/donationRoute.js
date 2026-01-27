import { addDonations, getAllDonations } from "../controller/donationController.js";
import {validateJWT} from '../middleware/jwtValidation.js'
import express from 'express'

const donationRouter=express.Router();

donationRouter.post("/add",validateJWT,addDonations);
donationRouter.get("/",validateJWT,getAllDonations);

export default donationRouter;