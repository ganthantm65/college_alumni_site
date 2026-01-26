import express, { Router } from 'express';
import { validateJWT } from '../middleware/jwtValidation.js';
import { createEvents,getAllEvents } from '../controller/eventController.js';

const eventRoutes=Router();

eventRoutes.post("/create",validateJWT,createEvents);
eventRoutes.get("/get",validateJWT,getAllEvents);

export default eventRoutes;