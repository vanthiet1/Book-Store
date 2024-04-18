const router = require("express").Router();
const genresController = require('../../controllers/bookController/genresController');

router.get("/", genresController.getAllBookGenre);
router.post("/", genresController.addBookGenre);
router.delete("/:id", genresController.deleteBookGenres);
router.put("/:id", genresController.updateBookGenres);





module.exports = router;
