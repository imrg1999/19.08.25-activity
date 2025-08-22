import { userModel } from "../Model/userModel.js";
import { validationSchema } from "../Validation/zodSchema.js";
import { ZodError } from "zod";
import hashing from "../Validation/passwordHashing.js";


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
                user: registerNewUser
            })
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