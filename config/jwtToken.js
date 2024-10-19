import jwt from "jsonwebtoken"


export const jwtToken=(id)=>{
    console.log(process.env.ACCESS_SECRETE)
    return jwt.sign({id},process.env.ACCESS_SECRETE,{expiresIn:process.env.ACCESS_EXPIRED})
} 