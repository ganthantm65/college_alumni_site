import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import bcrypt from 'bcrypt'

export const registerUser=async(req,res)=>{
    try {
        const {user_name,pass_word,user_role}=req.body;

        const existing=await User.findUser(user_name);

        if(existing){
            return res.status(404).json({message:"username is already found"});
        }

        const hashedPassword=bcrypt.hashSync(pass_word,10);

        await User.createUser([user_name,hashedPassword,user_role]);

        return res.status(200).json({message:"User Registred Successfully"});
    } catch (error) {
        console.log(error);
        
        return res.status(404).json({message:error.message});
    }
}

export const loginUser=async(req,res)=>{
    try {
        const {user_name,pass_word}=req.body;

        const existing=await User.findUser(user_name);

        if (existing.length==0) {
            return res.status(404).json({message:"Invalid Username"});
        }

        const isPassWordVerified=await bcrypt.compare(pass_word,existing.pass_word);

        if (!isPassWordVerified) {
            return res.status(400).json({message:"Invalid Password"});
        }        

        const token=jwt.sign({id:existing.user_id,user_name:existing.user_name},process.env.JWT_SECRET,{expiresIn:'1h'});

        return res.status(200).json({
            token:token,
            user:{user_id:existing.user_id,user_name:existing.user_name},
            message:'Login Successfully'
        })
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

export const loginAdmin=async(req,res)=>{
    try {
        const {user_name,pass_word,user_role}=req.body

        if(user_role!="ADMIN" || !user_role){
            return res.status(403).json({message:"Invalid User Role"});
        }

        const existing=await User.findAdmin(user_name);

        if (existing.length==0) {
            return res.status(404).json({message:"Invalid Username"});
        }

        const isPassWordVerified=await bcrypt.compare(pass_word,existing.pass_word);

        if (!isPassWordVerified) {
            return res.status(400).json({message:"Invalid Password"});
        }
        

        const token=jwt.sign({id:existing.user_id,user_name:existing.user_name},process.env.JWT_SECRET,{expiresIn:'1h'});

        return res.status(200).json({
            token:token,
            user:{user_id:existing.user_id,user_name:existing.user_name},
            message:'Login Successfully'
        })
    } catch (error) {
            return res.status(400).json({message:error.message});
    }
}