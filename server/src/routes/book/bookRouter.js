const router = require("express").Router();
const bookController = require('../../controllers/bookController/bookController');

// router Home
router.post("/",bookController.addBookFree);
router.get("/",bookController.getBookFree);
router.get("/:id",bookController.getAnBookFree);
router.delete("/:id",bookController.deleteBook);
router.put("/:id",bookController.updateBook);




module.exports = router;