import { Router } from "express";
import { createAlumniProfile,getAlumniDetails } from "../controller/alumniProfileController.js";
import { validateJWT } from "../middleware/jwtValidation.js";

const alumniProfileRoute=Router();

alumniProfileRoute.post("/add/profile",validateJWT,createAlumniProfile);
alumniProfileRoute.get("/get/profiles",validateJWT,getAlumniDetails)

export default alumniProfileRoute;