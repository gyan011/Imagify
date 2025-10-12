import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existUser = await userModel.findOne({email});
        if(existUser){
            return res.status(403).json({
                success: false,
                message: "User already registerd!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            success: true,
            message: "User register successfully!",
            user
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(403).jsson({
                success: false,
                message: "All fields are reuired!"
            })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(403).json({
                success: false,
                message: "User doesn't registered!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(403).json({
                success: false,
                message: "Password is incorrect!"
            })
        }

        const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userCredits = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId)

        res.status(200).json({
            success: true,
            credits: user.creditBalance, 
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}