const router = require("express").Router();
const getAllUserController = require('../../controllers/admin/userManagerControler');
// const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');
router.get("/", getAllUserController.getAllUsers);
router.delete("/:id", getAllUserController.deleteUser);


module.exports = router;
