const { userRegistration, userLogin } = require("../controller/authController");
const validateMiddleware=require("../middleware/validator")

const router=require("express").Router();


router.post("/user/signup",validateMiddleware,userRegistration);
router.post("/user/login",userLogin);

module.exports=router