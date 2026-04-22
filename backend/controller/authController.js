import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//Signup User
export const signupUser = async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Login User

export const loginUser =  async(req , res)=>{
  try{
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const {email , password} = req.body ;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User do not exists" });
    }

    const comparePass = bcrypt.compare(password , user.password);

    if(!comparePass){
      res.status(400).json({message:"Invalid Password"})
    }

    //Create JWT token
    const token = jwt.sign(
      {id: user.__id},
      process.env.JWT_SECRET,
      {expiresIn : "1d"},
    );

    res.json({
      message: "Login sucssesfull!",
      token ,
      user:{
        id : user__id ,
        name : user.name ,
        email: user.email,
      }
    });



     
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}