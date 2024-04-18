const router = require("express").Router();
const commentController = require('../../controllers/bookController/commentController');

router.post("/:id",commentController.addComment);
router.get("/:id",commentController.getCommentsByBookId);
router.get("/",commentController.getAllComment);
router.delete("/:id",commentController.deleteComment);

module.exports = router;
