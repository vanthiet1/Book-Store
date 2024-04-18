const Comment = require('../../models/book/CommentModel');
const Book = require('../../models/book/BookModel');

const commentController = {
    addComment: async (req, res) => {
        try {
            const { content, user, bookId } = req.body;
            const newComment = new Comment({ content, user, book: bookId });
            await newComment.save();

            await Book.findByIdAndUpdate(bookId, { $push: { comments: newComment._id } });

            res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getCommentsByBookId: async (req, res) => {
        try {
            const { id } = req.params;
            // Tìm các comments dựa trên danh sách ID
            const comments = await Comment.find({ book: id }).populate('book')
            if (!comments) {
                return res.status(404).json({ error: "not found" })
            }
            res.json(comments);
        } catch (error) {
            console.error('Error getting comments:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllComment: async (req, res) => {
        try {
            const allComments = await Comment.find()
            if (!allComments) {
                return res.status(404).json({ error: "not found" })
            }
            res.status(200).json(allComments)
        } catch (error) {
            console.error('Error getting comments:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            await Comment.findByIdAndDelete(id);
            // Cập nhật trường 'comments' trong collection 'book'
            const bookId = comment.book;
            await Book.findByIdAndUpdate(bookId, { $pull: { comments: id } });

            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },





};

module.exports = commentController;
