import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodSchema.js";
import hashing from '../Validation/passwordHashing.js';
import { ZodError } from "zod";

export const showAllUsers = async(req,res) => {
    try{
        const allUsers = await userModel.find();
        if(allUsers.length === 0) {
           return res.status(404).json({
                success: false,
                message: "No users listed"
            });
        } else {
            res.status(200).json({
                success: true,
                users: allUsers
            });
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const createNewUser = async(req,res) => {
    try{
        const validUser = await validationSchema.parseAsync(req.body);
        const hashPassword = await hashing(validUser.password);

        const existingUser = await userModel.findOne({email: validUser.email}) ; 
        //findOne expects object
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email Id already exists"
            })
        } 
        const newUser = await userModel.create({
            ...validUser,
            password: hashPassword
        });

            res.status(201).json({
                success: true,
                message: "new user created",
                user: newUser
            })
    }catch(error) {
        if(error instanceof ZodError) {
            res.status(400).json({
                success: false,
                message: "Request Error",
                error: error.issues
            })
        } else {
           res.status(500).json({
            success: false,
            message: "Internal Server Error"
        }); 
        }
    }
}

export const findUserById = async(req,res) => {
    try {
        const {id} = req.params;
    const userId = await userModel.findById(id);

    if(!userId) {
        res.status(404).json({
            success: false,
            message: "Id does not exist"
        })
    } else {
        res.status(200).json({
            success: true,
            user: userId
        })
    }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
    
}

export const updateUsers = async(req,res) => {
    try{
        const {id} = req.params;
        const userInfo = await validationSchema.parseAsync(req.body);

         
    if(userInfo.password) {
        userInfo.password = await hashing(userInfo.password);
    }

        const updateInfo = await userModel.findByIdAndUpdate(id, {
            ...userInfo,
        }, {new: true}
    );
   

       if(!updateInfo) {
        return res.status(404).json({
            success: false,
            message: "user Id does not exist"
        })
       } else {
        res.status(200).json({
            success: true,
            user: updateInfo
        })
       }
    
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Info hasn't been updated"
        })
    }
}