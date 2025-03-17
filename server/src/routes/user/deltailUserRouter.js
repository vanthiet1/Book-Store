const router = require("express").Router();
const userDetailController = require('../../controllers/userController/detailUserController');
router.post("/", userDetailController.postUserDetails);
router.get("/:userId",userDetailController.getUserDetailsByUserId);
router.get('/',userDetailController.getAllUserDetails)
router.put('/:id',userDetailController.updateUserDetails)
router.get('/google/:id',userDetailController.getUserDetailsByGoogle)



module.exports = router;
