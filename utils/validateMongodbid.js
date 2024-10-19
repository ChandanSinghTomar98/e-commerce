import mongoose from "mongoose";

export const validateMongoDbId=(id)=>{
  const isValid=mongoose.Types.ObjectId.isValid(id)
  if(!isValid){
    throw new Error("this id not valid or not found")
  }
}