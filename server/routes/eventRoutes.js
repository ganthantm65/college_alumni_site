import express, { Router } from 'express';
import { validateJWT } from '../middleware/jwtValidation.js';
import { createEvents,getAllEvents } from '../controller/eventController.js';
import { getAllRegistrations, registerEvent } from '../controller/eventRegistrationController.js';

const eventRoutes=Router();

eventRoutes.post("/create",validateJWT,createEvents);
eventRoutes.get("/get",getAllEvents);
eventRoutes.post("/register",validateJWT,registerEvent);
eventRoutes.get("/get/registrations",validateJWT,getAllRegistrations);

export default eventRoutes;