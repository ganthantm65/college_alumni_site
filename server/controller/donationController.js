import Donations from "../model/Donation.js";

export const addDonations=async(req,res)=>{
    try {
        const {amount,upi_id}=req.body;

        if(!amount && !upi_id){
            return res.status(400).json({message:"Amount/UPI ID is not provided"});
        }

        const payment_date=new Date().toISOString().split('T')[0];

        await Donations.addDonations(
            req.user.user_id,
            amount,
            upi_id,
            payment_date
        )

        return res.status(201).json({message:"Details added successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

export const getAllDonations=async(req,res)=>{
    try {
        const donations=await Donations.getAllDonations();

        if(donations.length<1){
            return res.status(404).json({message:'No Donations Found'});
        }

        return res.status(200).json({donations});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}