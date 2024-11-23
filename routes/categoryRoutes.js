import express from "express";
import { createCategory,updateCategory,deleteCategory,getCategory,getAllCategory} from "../controller/category.Controller.js"
import { isAdmin,authMiddleware } from "../middlewares/authMiddleware.js";
const router=express.Router()

router.post("/register",authMiddleware ,isAdmin,createCategory)
router.put("/update/:id",authMiddleware ,isAdmin,updateCategory)
router.delete("/delete/:id",authMiddleware ,isAdmin,deleteCategory)
router.get("/getsinglecategory/:id",authMiddleware ,isAdmin,getCategory)
router.get("/getallcategory",authMiddleware ,isAdmin,getAllCategory)
export default router