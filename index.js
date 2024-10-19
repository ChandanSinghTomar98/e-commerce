import express from "express"
import dotenv from "dotenv"
import {DBConnection} from "./config/dbConnect.js"
import authRouter from "./routes/authRoutes.js"
import bodyParser from "body-parser"
import {notfound,errorHandler} from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"
dotenv.config({
    path:".env"
})

const PORT = process.env.PORT || 7000

DBConnection()
const app=express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/v1",authRouter)


app.use(notfound)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Your server is connected on port ${PORT}`)
})
