import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Invalid Header Format"
        })
    }

    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(error) {
         res.status(401).json({
            success: false,
            message: "Invalid/Expired Token"
        })
       
    }
    
}