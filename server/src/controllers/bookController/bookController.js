const Book = require('../../models/book/BookModel');
const Author = require('../../models/book/AuthorModel')
const BookGenre = require('../../models/book/GenresModel');
const Category = require('../../models/book/CategoryBookModel')
// const  generateSlug = require('../slug/slugController');
const bookController = {
    addBookFree: async (req, res) => {
        try {
            const { categories, author, categoryProduct } = req.body;
            const newBookFree = new Book(req.body);
            const savedBook = await newBookFree.save();
            if (req.body.author) {
                let authorObject = await Author.findOne({ name: author.name });
                if (authorObject) {
                    authorObject.books.push(savedBook._id);
                    await authorObject.save();
                } else {
                    authorObject = await Author.create({
                        name: author.name,
                        books: [savedBook._id]
                    });
                }
                savedBook.author = authorObject;
            }
            // Thêm sách vào các thể loại sách như truyện ngắn
            for (const category of categories) {
                const genre = await BookGenre.findOneAndUpdate(
                    { name: category.name },
                    { $push: { books: savedBook._id } },
                    { new: true, upsert: true }
                );
                savedBook.genres.push({ _id: genre._id, name: genre.name });
            }

            //  thêm 1 cuốn sách vào trong category
            const categoryObj = await Category.findById(categoryProduct);
            if (categoryObj) {
                categoryObj.books.push(savedBook._id);
                await categoryObj.save();
            } else {
                console.error("Category not found");
                return res.status(400).json({ error: "Category not found" });
            }

            await savedBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            console.error("Error adding book:", error);
            res.status(500).json("Internal Server Error");
        }
    },

    getBookFree: async (req, res) => {
        try {
            const getAllBooks = await Book.find();
            res.status(200).json(getAllBooks);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAnBookFree: async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Book.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteBook: async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ error: 'Book not found' });
            }

            await Author.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            );
            
            await BookGenre.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            );

            // Lấy danh mục của cuốn sách đã xóa 
            await Category.updateOne(
                { _id: deletedBook.categoryProduct },
                { $pull: { books: deletedBook._id } }
            );
            
            res.status(200).json(`đã xóa thành công`);
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }
    },

    updateBook: async (req, res) => {
        try {
            const bookId = req.params.id;
            const { labelBook, imgBook, nameBook, descriptionBook, price, isFree, publishingCompany, categoryProduct, categoriesInput } = req.body;
            const updatedBook = await Book.findByIdAndUpdate(
                bookId,
                { labelBook, imgBook, nameBook, descriptionBook, price, isFree, publishingCompany, categoryProduct, categories: [{ name: categoriesInput }]},
                { new: true }
            );
            if (!updatedBook) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy sách' });
            }
       
            
        
            await Category.findByIdAndUpdate(
                categoryProduct,
                { $addToSet: { books: updatedBook._id } } 
            );
                 await Author.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            );
              await BookGenre.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } }
            );
            res.status(200).json({ success: true, message: 'Cập nhật sách thành công', updatedBook });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi nội bộ máy chủ', error: error.message });
        }
    }
    
};

module.exports = bookController;