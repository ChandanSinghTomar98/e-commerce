import user from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import {jwtToken} from "../config/jwtToken.js"
import { validateMongoDbId } from "../utils/validateMongodbid.js"
import { generateRefreshToken } from "../config/refreshToken.js"
import jwt from "jsonwebtoken"
import  {sendEmail } from "../controller/email.Controller.js"
import crypto from "crypto"
//create a user
export const createUser=asyncHandler(
    async(req,res)=>{
   
        try {
          
          const email=req.body.email
          const User=await user.findOne({email})    
          
          if(!User){
             
            const newUser=user.create(req.body)
            return res.status(201).json({
                status:true,
                message:"New User Created Successfully"
            })
    
          }else{
    
            return res.status(200).json({
                status:false,
                message:"User alredy registered"
            })
          }
          
    
        } catch (error) {
            throw new Error("User Already exist")
        }
    
    
    }
)

//login user
export const loginUser= asyncHandler(async(req,res)=>{

    const {email,password}=req.body
  
    const User=await user.findOne({email})
 
    if(User){
      const match= await User.isPasswordMatch(password)
      if (!match) {
      throw new Error("incorrect password");
      }

        const id=User._id
        const token= await jwtToken(id) 
        const refreshToken=await generateRefreshToken(id)
              await user.findByIdAndUpdate(id,{
                refreshToken:refreshToken
              },{new:true}) 
        console.log(token)  
        res.status(200).cookie("refreshToken",refreshToken,{
          httpOnly:true,
          maxAge:72 * 60 * 60 * 1000
        }).json({
          _id:User._id,
          firstname:User.firstname,
          lastname:User.lastname,
          email:User.email,
          mobile:User.mobile,
          token:token
        })
     
       
    }else{
      throw new Error("Invalid credentials")
    }


})

//refresh token 

export const handleRefreshToken=asyncHandler(async(req,res)=>{
 
  const cookie=req.cookies
  
  if(!cookie.refreshToken) throw new Error("no refresh token in cookies")

  const refreshToken=cookie.refreshToken
  
  const User=await user.findOne({refreshToken})

  if(!User) throw new Error("Refresh token not present in database")
  console.log("sec",process.env.REFRESH_SECRETE)
  jwt.verify(refreshToken,process.env.REFRESH_SECRETE,(err,decode)=>{
   console.log("decode.i",decode)
  if(err || User.id !== decode.id){

    throw new Error("there is something rough with refresh token")

  }

  const accesstoken= jwtToken(User?._id)
  res.json({accesstoken})
  })
})

// logout use

export const logoutHandler=asyncHandler(async(req,res)=>{
  const cookie=req.cookies
  if(!cookie.refreshToken) throw new Error("no refresh token in cookies")
    const refreshToken=cookie.refreshToken
    const User=await user.findOne({refreshToken})
    
    if(!User){
      res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
      })
      return res.sendStatus(204)
    }

    await user.findOneAndUpdate({refreshToken},{
      refreshToken:""
    })

    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:true
    })

   return  res.sendStatus(204)
})
//get all user

export const getAllUser=asyncHandler(async(req,res)=>{
    try {
      
        const getallUser=await user.find({})
        res.status(200).json(getallUser)
    } catch (error) {
      throw new Error(error)
    }

})

//get single user
export const getUser=asyncHandler(async (req,res)=>{
  const {id}=req.params
  console.log(id)
  try {
     const User=await user.findById(id)
    

     res.status(200).json(User)
  } catch (error) {
    throw new Error(error)
  }
  })

// delete user  

  export const deleteUser=asyncHandler(async (req,res)=>{
    const {id}=req.params
    validateMongoDbId(id)
    try {
       const User=await user.findByIdAndDelete(id)
      
  
       res.status(200).json(User)
    } catch (error) {
      throw new Error(error)
    }
  })

  //updte a user


  export const updateUser=asyncHandler(async (req,res)=>{
    const {_id}=req.User

    validateMongoDbId(_id)
    try {
       const User=await user.findByIdAndUpdate(_id,{
        firstname:req?.body?.firstname,
        lastname:req?.body?.lastname,
        email:req?.body?.email,
        mobile:req?.body?.mobile,
       },{
        new:true
       })
       res.status(200).json(User)
    } catch (error) {
      throw new Error(error)
    }
  })


 export const blockUser=asyncHandler(async(req,res)=>{

  const {id} =req.params
  validateMongoDbId(id)
  try {
    const block=await user.findByIdAndUpdate(id,{
      isBlocked:true
    },{
      new:true
    }
  )
  res.status(200).json("user blocked")
  } catch (error) {
    throw new Error(error)
  }

  })

  export const unblockUser=asyncHandler(async(req,res)=>{

    const {id} =req.params
    validateMongoDbId(id)
    try {
      const block=await user.findByIdAndUpdate(id,{
        isBlocked:false
      },{
        new:true
      }
    )
    res.status(200).json("user unblocked")
    } catch (error) {
      throw new Error(error)
    }

  })  

  export const updatepassword=asyncHandler(async(req,res)=>{

    const {_id} = req.User
    const {password} =req.body
    validateMongoDbId(_id)
   // createPasswordResetToken()
    const User= await user.findById(_id)
  
    if(password){
      User.password=password;
     await User.createPasswordResetToken()
      const updatedPassword=await User.save()
      res.status(200).json({
        status:true,
        data:updatedPassword
      })
    }else{
      res.status(200).json(user)
    }

  })


  export const forgotPasswordToken=asyncHandler(async(req,res)=>{

    const {email}=req.body
    const User=await user.findOne({email})

    if(!User) throw new Error("User not found on data base")


    try {
      const token= await User.createPasswordResetToken()
      await User.save()
      const resetUrl=`hi ,please follow this link to reset your password,this link is valid till 10 minutes from now <a href="http://localhost:4001/api/v1/user/resetpassword/${token}">click here</a>`
      const data={
         to:email,
         subject:"Forgot Password",
         text:"Hey User",
         html:resetUrl
       }
       sendEmail(data)
       res.status(200).json(token)
    } catch (error) {
      throw new Error(error)
    }

  })


  export const resetPassword=asyncHandler(async(req,res)=>{

    const {password}=req.body
    const {token}=req.params
    const hashedToken= crypto.createHash('sha256').update(token).digest("hex")
    const User=await user.findOne({
      passwordResetToken:hashedToken,
      passwordResetExpires:{$gt:Date.now()}
    }
    )

    if(!user) throw new Error("token is expired ,please try again ")
      User.password=password
      User.passwordResetToken=undefined
      User.passwordResetExpires=undefined
      await User.save()

      res.status(200).json(User)
  })