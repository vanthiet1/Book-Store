const Author = require('../../models/book/AuthorModel')

const authorController = {
    getAllAuthor: async (req, res) => {
        try {
            const getBookGenre = await Author.find();
            res.status(200).json(getBookGenre);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteAuthor= await Author.findByIdAndDelete(id);  
             if (!deleteAuthor) {
                return res.status(404).json({ message: 'Không tìm thấy tác giả để xóa' });
            }
            res.status(200).json('Đã xóa thành công');
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addAuthor: async (req, res) => {
        try {
            const { name } = req.body;
            const existingAuthor = await Author.findOne({ name });
            if (existingAuthor) {
                return res.status(400).json({ message: 'Tác giả đã tồn tại trong cơ sở dữ liệu' });
            }
            const newAuthor = new Author({ name });
            await newAuthor.save();
            res.status(200).json(newAuthor);
        } catch (error) {
            console.error('Lỗi khi thêm tác giả:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình thêm tác giả' });
        }
    }
    
}
module.exports = authorController

