import mongoose from "mongoose";

export const DBConnection=async()=>{
    try {
        const connectionDB= await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`)
        console.log("databse connected successfully !!!")
    } catch (error) {
        console.log("DATABASE ERROR",error)
    }
}