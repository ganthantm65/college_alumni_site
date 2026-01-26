import Announcements from "../model/Announcements.js";

export const createAnnouncement = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    await Announcements.createAnnounce({
        title,
        content,
        created_by: req.user.user_id
    });

    res.status(201).json({ message: "Announcement created successfully" });
};


export const getAllAnnouncements=async(req,res)=>{
    try {
        const announcements=await Announcements.getAllAnnouncements();
        if (announcements.length<1) {
            return res.status(404).json({message:"No Announcement Found"});
        }
        res.status(200).json({announcements:announcements});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}