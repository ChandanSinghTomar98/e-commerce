import express from "express";
import { createUser ,loginUser,getAllUser,getUser,deleteUser,updateUser,blockUser,unblockUser,handleRefreshToken,logoutHandler,updatepassword,forgotPasswordToken,resetPassword} from "../controller/user.Controller.js";
import { authMiddleware ,isAdmin} from "../middlewares/authMiddleware.js";
const router=express.Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/resetpassword/:token",resetPassword)
router.put("/updatepassword",authMiddleware,updatepassword)
router.get("/refreshtoken",handleRefreshToken)
router.get("/logout",logoutHandler)
router.get("/all-users",getAllUser)
router.get("/:id",authMiddleware,isAdmin,getUser)
router.delete("/:id",deleteUser)
router.put("/update-user/:id",authMiddleware,updateUser)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)


export default router