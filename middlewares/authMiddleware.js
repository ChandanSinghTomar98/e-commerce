import user from "../models/userModel.js"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

export const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers?.authorization?.startsWith('Bearer')){
    token=req.headers?.authorization?.split(" ")[1];
    console.log("tpdd",token)
    
        if(!token){
            throw new Error("token expired please login again")
        }
      
          const decode=jwt.verify(token,process.env.ACCESS_SECRETE)
         const User=await user.findById(decode.id)
         req.User=User
         next();
      
    }else{
        throw new Error("token not found")
    }
})

export const isAdmin=asyncHandler(async(req,res,next)=>{
    const {email}=req.User

    const admin=await user.findOne({email})
    if(admin.role !=="admin"){
        throw new Error("this is not admin")
    }else{
        next()
    }
    
})