import express from "express"
import { createProduct ,getProduct,getAllProduct,updateProduct,deleteProduct} from "../controller/product.Controller.js";
import { authMiddleware ,isAdmin} from "../middlewares/authMiddleware.js";
const router=express.Router();

router.post("/create",authMiddleware,isAdmin,createProduct)
router.get("/singleproduct/:id",getProduct)
router.get("/allproducts",getAllProduct)
router.put("/updateproduct/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/deleteproduct/:id",authMiddleware,isAdmin,deleteProduct)
export default router