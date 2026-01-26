import { Router } from "express";
import { createAlumniProfile } from "../controller/alumniProfileController.js";
import { validateJWT } from "../middleware/jwtValidation.js";

const alumniProfileRoute=Router();

alumniProfileRoute.post("/add/profile",validateJWT,createAlumniProfile);

export default alumniProfileRoute;