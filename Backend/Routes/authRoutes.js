const express=require("express");
const router=express.Router();
const Controller=require("../Controllers/authController")

router.post("/register",Controller.registerController)
router.post("/login",Controller.loginController)

module.exports=router;