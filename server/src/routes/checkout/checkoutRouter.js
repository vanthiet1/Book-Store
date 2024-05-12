const router = require('express').Router();
const checkoutController = require('../../controllers/checkoutController/checkoutController');

router.post('/',checkoutController.checkoutUser);
router.get('/:userId', checkoutController.getCheckoutByUserId);
router.get('/', checkoutController.getAllCheckoutUser);
router.delete('/:id', checkoutController.deleteCheckoutUser);
router.put('/:id', checkoutController.updateOrderCheckout);



module.exports = router;