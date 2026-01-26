import AlumniProfile from '../model/AlumniProfile.js';
import User from '../model/User.js';

export const createAlumniProfile=async(req,res)=>{
    try {
        const alumniProfile=req.body;

        const existing=await User.findUserById(alumniProfile.user_id);

        if (!existing) {
            return res.status(404).json({message:"User ID not found"});
        }

        const createAlumni=await AlumniProfile.createAlumniProfile(alumniProfile);

        res.status(201).json({message:"Alumni Profile is created successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}