import blog from "../models/blogModel.js"
import user from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import { validateMongoDbId } from "../utils/validateMongodbid.js"

export const createBlog= asyncHandler(async(req,res)=>{
    try {
        

        const newBlog = await blog.create(req.body);
     
        res.status(201).json({
           status:true,
           data:newBlog,
           message:"blog created successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

export const updateBlog= asyncHandler(async(req,res)=>{
    try {
        const {id}= req.params
        validateMongoDbId(id)
        const updateBlog = await blog.findByIdAndUpdate(id,req.body,{
            new:true
        });
      
        res.status(200).json({
           status:true,
           data:updateBlog,
           message:"blog updated successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})


export const getBlog= asyncHandler(async(req,res)=>{
    try {
        const {id}= req.params
        validateMongoDbId(id)
        const getBlog = await blog.findById(id).populate('likes');
      const update=await blog.findByIdAndUpdate(id,
            {
            $inc:{numViews:1},
            },{
            new:true
            })
      
            console.log('u',update)
        res.status(200).json({
           status:true,
           data:update,
           message:"fetch blog successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

export const getAllBlog= asyncHandler(async(req,res)=>{
    try {
        const {id}= req.params
        validateMongoDbId(id)
        const getAllBlog = await blog.find();
      
        res.status(200).json({
           status:true,
           data:getAllBlog ,
           message:"fetch All blog successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

export const deleteBlog= asyncHandler(async(req,res)=>{
    try {
        const {id}= req.params
        validateMongoDbId(id)
        const deleteBlog = await blog.findByIdAndDelete(id);
      
        res.status(200).json({
           status:true,
           data:deleteBlog,
           message:"blog deleted successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})

export const likedBlog= asyncHandler(async(req,res)=>{
    try {
        const {blogId}= req.body
        validateMongoDbId(blogId)
        const Blog= await blog.findById(blogId) 
        
        // find the login user
        const loginUserId= req?.User?._id
        //find if user is like  the post
        const isLiked=Blog?.isLiked
        // find the user if he disliked the post
        const alreadyDisliked=Blog?.dislikes.find(((userId)=>userId?.toString()===loginUserId.toString()))

       if(alreadyDisliked){
          const Blog=await blog.findByIdAndUpdate(blogId,{
            $pull:{
                dislikes:loginUserId

            },
            isDisliked:false
          },{new:true})
       }

       if(isLiked){
         const Blog=await blog.findByIdAndUpdate(blogId,{
            $pull:{
                likes:loginUserId
            },
            isLiked:false
         })

       }else{
        const Blog=await blog.findByIdAndUpdate(blogId,{
            $push:{
                likes:loginUserId
            },
            isLiked:true
         })
       }
        console.log("loginUserId",loginUserId)
        res.status(200).json({
           status:true,
        //    data:deleteBlog,
           message:"liked successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})


export const dislikedBlog= asyncHandler(async(req,res)=>{
    try {
        const {blogId}= req.body
        validateMongoDbId(blogId)
        const Blog= await blog.findById(blogId) 
        
        // find the login user
        const loginUserId= req?.User?._id
        //find if user is like  the post
        const isdisLiked=Blog?.isDisliked
        // find the user if he disliked the post
        const alreadyliked=Blog?.likes.find(((userId)=>userId?.toString()===loginUserId.toString()))

       if(alreadyliked){
          const Blog=await blog.findByIdAndUpdate(blogId,{
            $pull:{
                likes:loginUserId

            },
            isLiked:false
          },{new:true})
       }

       if(isdisLiked){
         const Blog=await blog.findByIdAndUpdate(blogId,{
            $pull:{
                dislikes:loginUserId
            },
            isDisliked:false
         })

       }else{
        const Blog=await blog.findByIdAndUpdate(blogId,{
            $push:{
                dislikes:loginUserId
            },
            isDisliked:true
         })
       }
        console.log("loginUserId",loginUserId)
        res.status(200).json({
           status:true,
        //    data:deleteBlog,
           message:"disliked successfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
})