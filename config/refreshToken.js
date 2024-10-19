import jwt from "jsonwebtoken"


export const generateRefreshToken=(id)=>{
   
    return jwt.sign({id},process.env.REFRESH_SECRETE,{expiresIn:process.env.REFRESH_EXPIRED})
} 