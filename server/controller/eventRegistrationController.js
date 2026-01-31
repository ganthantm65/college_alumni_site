import express from 'express';
import Event from '../model/Event.js';
import EventRegistration from '../model/EventRegistration.js'

export const registerEvent=async(req,res)=>{
    try {
        const {event_name}=req.body;

        const event=await Event.getEventWithEventName(event_name);

        if(!event){
            return res.status(404).json({message:"Event Not Found"});
        }

        const registrationDeadline = new Date(event.registration_deadline);
        const today = new Date();

        registrationDeadline.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (today > registrationDeadline) {
            return res.status(403).json({ message: "Registration is Closed" });
        }

        await EventRegistration.registerEvent(event.event_id,req.user.user_id);

        return res.status(201).json({message:"Registered successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

export const getAllRegistrations=async(req,res)=>{
    try {
        const registrations=await EventRegistration.getListOfRegistrations();
        if (registrations.length<1) {
            res.status(400).json({message:"No Registrations for event"});
        }
        res.status(200).json({registrations:registrations});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}