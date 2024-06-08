const Book = require('../../models/book/BookModel');

const searchProduct = {
    searchBook: async (req, res) => {
        try {
            const { keyword } = req.query;
            const results = await Book.find({
                $or: [
                    { nameBook: { $regex: keyword, $options: 'i' } },
                    { 'author.name': { $regex: keyword, $options: 'i' } },
                    { 'genres.name': { $regex: keyword, $options: 'i' } },
                    { publishingCompany: { $regex: keyword, $options: 'i' } }
                ]
            })
            res.json(results);
        } catch (error) {
            res.status(500).json({ message: "Không tìm thấy" })
        }
    }



}
module.exports = searchProduct;