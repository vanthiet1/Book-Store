const router = require("express").Router();
const userController = require('../../controllers/userController/userController');
const authMiddleware = require('../../middleware/authMiddleware');
router.get("/", authMiddleware, userController.getUserInfo);
router.get("/:id", userController.getUserByid);


module.exports = router;
