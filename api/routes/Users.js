const express=require('express')
const userRouter=express.Router();
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const auth=require('../Auth/auth')
const jwt = require('jsonwebtoken'); // Corrected typo from 'jasonwebtoken' to 'jsonwebtoken'

function getSecretKey() {
  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not configured');
  }

  return process.env.SECRET_KEY;
}

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}


// register
userRouter.post('/',
    async (req, res) => {
        const { name, email, password } = req.body;
      
        try {
          // Check if user already exists
          const existingUser = await userModel.findOne({ email: email });
          if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
      
          // Validate password strength
          if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user
          const user = await userModel.create({
            name: name,
            email: email,
          
            password: hashedPassword,
          });
      
          // Generate JWT token
          const token = jwt.sign({ email: user.email, id: user._id }, getSecretKey());
      
          res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: sanitizeUser(user),
          });
      
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
)

//login 
userRouter.post('/login',async(req,res) => {

    const {email, password} = req.body;
    
    try {
      // Check if user exists
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    
      // Generate JWT token with expiration time
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, getSecretKey());
    
      // Send response
      res.status(200).json({ user: sanitizeUser(existingUser), token: token });
    } catch (error) {
      res.status(500).json({ message: "Error during sign-in" });
    }
    
    }) 

// get user profile 
userRouter.get('/profile',auth,async(req,res)=>{
  try{
const user=await  userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: sanitizeUser(user)});
  }catch(error){
    res.status(500).json({ message: "Error fetching user profile" });
  }
})

module.exports =userRouter;








