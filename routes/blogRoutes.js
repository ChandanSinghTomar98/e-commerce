import express from "express"
import {createBlog,updateBlog,getBlog,getAllBlog,deleteBlog,likedBlog,dislikedBlog} from "../controller/blog.Controller.js"
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js"
const router=express.Router()


router.post("/createblog",authMiddleware,isAdmin,createBlog)
router.put("/updateblog/:id",authMiddleware,isAdmin,updateBlog)
router.get("/getblog/:id",getBlog)
router.get("/getallblog",getAllBlog)
router.delete("/deleteblog/:id",deleteBlog)
router.put("/likes",authMiddleware,likedBlog)
router.put("/dislikes",authMiddleware,dislikedBlog)


export default router
