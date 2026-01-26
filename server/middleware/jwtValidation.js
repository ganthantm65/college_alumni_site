import jwt from 'jsonwebtoken'

export const validateJWT=async(req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer ','');

    if(!token){
        return res.status(401).json({message:"Token is not provided"});
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user_id=decoded.user_id;

        next();
    } catch (error) {
        return res.status(401).json({message:"Token Invalid"})
    }
}