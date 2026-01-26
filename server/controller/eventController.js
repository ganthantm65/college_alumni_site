import Event from "../model/Event.js";

export const createEvents=async(req,res)=>{
    try {
        const event=req.body;

        await Event.createEvent(event);

        return res.status(200).json({message:"Event Created Successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }

}

export const getAllEvents=async(req,res)=>{
    try {
        const result=await Event.getAllEvents();

        return res.status(200).json({events:result});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}