
const router = require("express").Router();
const authorController = require('../../controllers/bookController/authorController');

router.get("/",authorController.getAllAuthor);
router.delete("/:id",authorController.deleteAuthor);



module.exports = router;