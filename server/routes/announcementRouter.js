import express from 'express';
import { validateJWT } from '../middleware/jwtValidation.js';
import { createAnnouncement, getAllAnnouncements } from '../controller/announcementController.js';

const announcementRouter=express.Router();

announcementRouter.post("/create",validateJWT,createAnnouncement);
announcementRouter.get("/get",getAllAnnouncements);

export default announcementRouter;