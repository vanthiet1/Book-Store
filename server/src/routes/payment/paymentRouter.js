const router = require('express').Router();
const paymentController = require('../../controllers/paymentController/paymentController');

router.post('/',paymentController.paymentUser)



module.exports = router;