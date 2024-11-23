import asyncHandler from "express-async-handler"
import BlogCategory from "../models/blogCategoryModel.js"
import { validateMongoDbId } from "../utils/validateMongodbid.js"


export const createCategory=asyncHandler(async(req,res)=>{
    try {
        
       const newblogCategory=await BlogCategory.create(req.body)

        return res.status(201).json({
                status:true,
                message:"New blog Category Created Successfully"
            })

    } catch (error) {
        throw new Error(error)
    }

})


export const updateCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const updatedblogCategory=await BlogCategory.findByIdAndUpdate(id,req.body,{new:true})

        return res.status(201).json({
                status:true,
                message:"blog Category updated Successfully",
                data:updatedblogCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})



export const deleteCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const deleteblogCategory=await BlogCategory.findByIdAndDelete(id)

        return res.status(201).json({
                status:true,
                message:" blog Category deleted Successfully",
                data:deleteblogCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})

export const getCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const getblogCategory=await BlogCategory.findById(id)

        return res.status(201).json({
                status:true,
                message:"get blog Category Successfully",
                data:getblogCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})

export const getAllCategory=asyncHandler(async(req,res)=>{
    try {
        
       
       const getAllblogCategory=await BlogCategory.find()

        return res.status(201).json({
                status:true,
                message:"get blog Category Successfully",
                data:getAllblogCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})