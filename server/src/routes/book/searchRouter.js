const router = require('express').Router();
const searchController = require('../../controllers/bookController/searchController');

router.get("/",searchController.searchBook);

module.exports = router;

