const BookGenre = require('../../models/book/GenresModel');
// const Book = require('../../models/book/BookModel');

const genresController = {
    getAllBookGenre: async (req, res) => {
        try {
            const getBookGenre = await BookGenre.find();
            res.status(200).json(getBookGenre);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addBookGenre: async (req, res) => {
        try {
            const { name } = req.body
            const addNewGrenres = new BookGenre({ name })
            await addNewGrenres.save(name);
            res.status(201).json(addNewGrenres);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteBookGenres: async (req, res) => {
        try {
            const id = req.params.id;
            // const booksInGenres = await Book.find({ genres: id });
            // if (booksInGenres.length > 0) {
            //     return res.status(400).json({ message: 'Không thể xóa thể loại vì nó chứa sách' });
            // }
            
            const deleteGenresId = await BookGenre.findByIdAndDelete(id);
            if (!deleteGenresId) {
                return res.status(404).json({ message: "Không có id thể loại" });
            }
            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
        }
    },

    updateBookGenres: async (req, res) => {
        try {
            const genresId = req.params.id;
            const { name } = req.body;
            const updatedGenres = await BookGenre.findByIdAndUpdate(
                genresId,
                { name },
                { new: true }
            );
            if (!updatedGenres) {
                return { success: false, message: 'Không tìm thấy thể loại' };
            }
            res.status(200).json(updatedGenres)
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" })
        }
    },
    

}
module.exports = genresController
