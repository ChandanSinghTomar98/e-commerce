import asyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"
import { validateMongoDbId } from "../utils/validateMongodbid.js"


export const createCategory=asyncHandler(async(req,res)=>{
    try {
        
       const newCategory=await Category.create(req.body)

        return res.status(201).json({
                status:true,
                message:"New Category Created Successfully"
            })

    } catch (error) {
        throw new Error(error)
    }

})


export const updateCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const updatedCategory=await Category.findByIdAndUpdate(id,req.body,{new:true})

        return res.status(201).json({
                status:true,
                message:"Category updated Successfully",
                data:updatedCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})



export const deleteCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const deleteCategory=await Category.findByIdAndDelete(id)

        return res.status(201).json({
                status:true,
                message:"Category deleted Successfully",
                data:deleteCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})

export const getCategory=asyncHandler(async(req,res)=>{
    try {
        
        const {id}=req.params;
       const getCategory=await Category.findById(id)

        return res.status(201).json({
                status:true,
                message:"get Category Successfully",
                data:getCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})

export const getAllCategory=asyncHandler(async(req,res)=>{
    try {
        
       
       const getAllCategory=await Category.find()

        return res.status(201).json({
                status:true,
                message:"get Category Successfully",
                data:getAllCategory
            })

    } catch (error) {
        throw new Error(error)
    }

})