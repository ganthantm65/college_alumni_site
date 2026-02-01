import express, { Router } from "express";
import { validateJWT } from "../middleware/jwtValidation.js";
import {
  createEvents,
  getUpcomingEvents,
  getCompletedEvents,
  updateEventCoverPhoto,
  updateStatus,
} from "../controller/eventController.js";
import uploadFile from "../middleware/uploadFile.js";

const eventRoutes = Router();

eventRoutes.post("/create", validateJWT, uploadFile.single("cover_photo"), createEvents);
eventRoutes.put("/update/cover", validateJWT, uploadFile.single("cover_photo"), updateEventCoverPhoto);
eventRoutes.post("/update/status", validateJWT, updateStatus);
eventRoutes.get("/get/upcoming", getUpcomingEvents);
eventRoutes.get("/get/completed", getCompletedEvents);

export default eventRoutes;
