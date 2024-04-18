const AuthorModel = require('../../models/book/AuthorModel')

const authorController = {
    getAllAuthor: async (req, res) => {
        try {
            const getBookGenre = await AuthorModel.find();
            res.status(200).json(getBookGenre);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteAuthor= await AuthorModel.findByIdAndDelete(id);   if (!deleteAuthor) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' });
            }
            res.status(200).json('Đã xóa thành công');
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = authorController

