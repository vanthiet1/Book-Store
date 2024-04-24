const router = require('express').Router();
const userController = require('../../controllers/userController/userController');

router.post('/',userController.forgotPassword);

module.exports = router;