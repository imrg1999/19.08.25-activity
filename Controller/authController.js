import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodSchema.js";
import { ZodError } from "zod";
import hashing from "../Validation/passwordHashing.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async(req,res) => {
    try{
        const newUserReq = await validationSchema.parseAsync(req.body);

        const alreadyRegistered = await userModel.findOne({
            email: newUserReq.email
        });

        if(alreadyRegistered) {
            return res.status(409).json({
                success: false,
                message: "Already registered user"
            })
        }

        const safePassword = await hashing(newUserReq.password);

        const registerNewUser = await userModel.create({
            ...newUserReq,
            password: safePassword
        });

        if(!registerNewUser){
            return res.status(500).json({
                success: false,
                message: "User could not be created"
            })
        } else {
           res.status(201).json({
              success: true,
              message: "Registered Successfully"
           });
        }

    } catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Invalid Request",
                error: error.issues
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server Error"
            })
        }
    }
}

export const loginUser = async(req,res) => {
    try{
        const {email, password} = req.body;
        const registeredUser = await userModel.findOne({email});

        if(!registeredUser){
            return res.status(401).json({
                success: false,
                message: "Mail Id or Password isn't valid"
            })
        } 

        const isValid = await bcrypt.compare(password, registeredUser.password);
        if(!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {
               email: registeredUser.email,
               id: registeredUser._id
            },
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        );

            res.status(200).json({
            success: true,
            message: "Login successful",
            token: token
        });

    }catch(error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Invalid Request",
                error: error.issues
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server Error"
            })
        }
    }
}

export const userProfile = async(req,res) => {
   try{
    const profileData = await userModel.findById(req.user.id).select("-password");

    if(!profileData) {
         return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
    } else {
         res.status(200).json({
                success: true,
                data: {
                    _id: profileData._id,
                    name: profileData.name,
                    email: profileData.email,
                    age: profileData.age,
                    contact: profileData.contact
                }
            })
    }
   } catch(error) {
     return res.status(500).json({
                success: false,
                message: "Internal server Error"
            });
   }
}