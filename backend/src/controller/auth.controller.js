import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinary.js";
import { serializeUser } from "../lib/userResponse.js";



export const signup = async (req, res) => {

  const { fullName, email, password } = req.body


  // for [password]
  try {

    if(!fullName || !email || !password){
     return res.status(400).json({ message: "All fields are required " })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }


// for email
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Email already exists" })


// for keep the password private and safe
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const newUser = new User({
      fullName,
      email,
      password:hashedPassword
    })


    //JWT token
    if (newUser){
      // generate JWT token here
      await newUser.save();
       generateToken(newUser._id, res)
       

       res.status(201).json(serializeUser(newUser))


    }else{
      res.status(400).json({message: "Invalid user data"})
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {

  const {email , password} = req.body

 try {
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(user._id, res);

  res.status(200).json(serializeUser(user));

 } catch (error) {
  console.log("Error in login controller", error.message);
  res.status(500).json({ message: "Internal Server Error" }); 
 }
};

export const logout = (req, res) => {
 try {
   res.cookie("jwt", "", {maxAge: 0, httpOnly: true});
   res.status(200).json({ message: "Logged out successfully" });

 } catch (error) {
  console.log("Error in logout controller", error.message);
  res.status(500).json({ message: "Internal Server Error" });
 }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;

    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
      folder: "chat-app-profiles",
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(serializeUser(updatedUser));
  } catch (error) {
    console.log("Error in updateProfile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(serializeUser(req.user));
    
  
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

