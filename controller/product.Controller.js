import asyncHandler from "express-async-handler"
import product from "../models/productModel.js"
import slugify from "slugify"


export const createProduct=asyncHandler(async(req,res)=>{
    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title)

        }
       const newProduct= await product.create(req.body)

       res.status(201).json({newProduct})


    } catch (error) {
        console.log(error)
        
    } 
})

export const getProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params
   try {
     
     const oneProduct=await product.findById(id)
  console.log(oneProduct)
     return res.status(200).json(
        {
            status:true,
            message:"getting product data succesfully",
            data:oneProduct
        }
     )
   } catch (error) {
    
   }
})

export const getAllProduct=asyncHandler(async(req,res)=>{

    try {
  // filtering
        const queryObj={...req.query}
        const excludeFields=['page','sort','limit','fields']
        excludeFields.forEach((el)=> delete queryObj[el])
 
        let queryStr= JSON.stringify(queryObj)
        
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`)
       
      // let query=await product.find(JSON.parse(queryStr))
       let query = product.find(JSON.parse(queryStr));

        //sorting

        if(req.query.sort){

            const sortBy=req.query.sort.split(",").join(" ")
            query= query.sort(sortBy)

        }else{
            query = query.sort("-createdAt")
        }

        // limiting the fields

        if(req.query.fields){
            const fileds=req.query.fields.split(",").join(" ")
            query= query.select(fileds)
        }else{
            query= query.select('-__v')
        }
       
        // pagination
    
        const page=req.query.page
        const limit=req.query.limit 
        const skip=(page-1)*limit
        query=query.skip(skip).limit(limit)

        if(req.query.page){
           const productCount=await product.countDocuments() 
           if(skip>=productCount) throw new Error("this page  not exist")
        }


        console.log(page,limit,skip)


        const Product=await query
        return res.status(200).json({
            status:true,
            message:"getting all product data successfully",
            data:Product
        })
    } catch (error) {
        console.log(error)
    }
})

export const updateProduct=asyncHandler(async(req,res)=>{
    const id=req.params.id

    try {
        if(req.body.title){
            req.body.slug=slugify(req.body.title)

         }

         const updateProduct= await product.findOneAndUpdate({_id:id},req.body,{new:true})
  console.log("updateProduct",updateProduct)
         return res.status(200).json({
            status:true,
            message:"product updated successfully",
            data:updateProduct
         })

    } catch (error) {
        console.log(error)
    }
})

export const deleteProduct=asyncHandler(async(req,res)=>{
    const id=req.params.id
 
    try {
        
         const deleteProduct= await product.findByIdAndDelete(id)

         return res.status(200).json({
            status:true,
            message:"product deleted successfully",
            data:deleteProduct
         })

    } catch (error) {
        console.log(error)
    }
})