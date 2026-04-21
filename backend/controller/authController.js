import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const signupUser = async(req , res)=>{
    try {
        const{ name , email , password} = req.body ;
        const userExists = await User.findOne(email);

        if(userExists){
            res.status(500).json({message:"User alrady Exists " })
        }
        const hashPassword = await bcrypt.hash(password , 10);

        User.create({
            name,
            email,
            password : hashPassword,
        });

        res.json({message:"User register successfully"});

    }catch(error){
        res.status(500).json({message:"Server error" , error:error.message})
    }
 
}