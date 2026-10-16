
import userModel from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req,res)=>{
try {
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User doesn't exists"})
        }
     const isMatch = await bcrypt.compare(password, user.password) 
     if(isMatch){
      const token = createToken (user._id)
        res.json({success:true, token})
        }
    else{res.json({success:false, message:'Invalid credential password'})}

} catch (error) {
    console.log(error);
    res.json({success :false, message:'Error occur in login backend'})
    
}
}

// Route for register
const registerUser = async (req,res)=>{
// res.json({smg:'Register Api Working'})
try {
 
   const {name, email,password}  = req.body

   //checking user exists or not
   const exists = await userModel.findOne({email})
   if(exists){
    return res.json({success:false,message:'User Already exists'})
   }
   // Validator email format and strong password
   if(!validator.isEmail(email)){
       return res.json({ success: false, message: "Please enter valid email" });
   }

 if (!password || password.length < 4) {
   return res.json({ success: "Password must be at least 4 characters long." });
 }
   // hashing user password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password,salt)
   const newUser = new userModel({
    name,
    email,
    password:hashedPassword
   })
   const user = await newUser.save()

   const token = createToken(user._id)
             res.json({success:true,token})

} catch (error) {
    console.log(error);
     res.json({ success: false, message: "Error catch" });
}
}

//route admin login
const adminLogin = async (req, res) => {
    
    try {
      const { email,password } = req.body;
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const token = jwt.sign(email+password,process.env.JWT_SECRET)
         res.json({ success: "true", token });
      }
      else{
              res.json({ success: "false", message: "Invalid Credential"});
      }
 

    } catch (error) {
      console.log(error);
      res.json({ success: "false", message: error.message });
    }
};

export {loginUser,registerUser,adminLogin}