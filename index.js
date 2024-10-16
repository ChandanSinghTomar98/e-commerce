import express from "express"
import dotenv from "dotenv"
import {DBConnection} from "./config/dbConnect.js"


dotenv.config({
    path:".env"
})

const PORT = process.env.PORT || 7000
DBConnection()
const app=express()

app.use("/",(req,res)=>{

})
app.listen(PORT,()=>{
    console.log(`Your server is connected on port ${PORT}`)
})
