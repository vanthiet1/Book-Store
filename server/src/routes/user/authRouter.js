const router = require("express").Router();
const authControllers = require('../../controllers/userController/authController');

router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.loginUser);
router.post("/verify", authControllers.verifyCode);
router.post("/resendVerifi", authControllers.resendVerificationCode);
router.put("/resetpassword/:id", authControllers.resetPassword);
router.post("/login/google", authControllers.loginGoogle);





module.exports = router;