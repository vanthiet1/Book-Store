const router = require('express').Router();
const bannerContrller = require('../../controllers/bookController/bannerController')
router.get('/',bannerContrller.getAllBaner);
router.post('/',bannerContrller.addBanner);
router.put('/:id',bannerContrller.updateCategory);
router.delete('/:id',bannerContrller.deleteBanner);



module.exports = router;