const Category = require('../../models/book/CategoryBookModel');


const categoryController = {
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = new Category({ name });
            await newCategory.save();
            res.status(201).json({ message: 'Danh mục đã được tạo thành công', category: newCategory });
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình tạo danh mục' });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const { name } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(
                categoryId,
                { name },
                { new: true }
            );
            if (!updatedCategory) {
                return { success: false, message: 'Không tìm thấy danh mục' };
            }
            res.status(200).json(updatedCategory)
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const {id} = req.params;
            const deletedCategory = await Category.findByIdAndDelete(id);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục để xóa' });
            }

            res.status(200).json({ message: 'Danh mục đã được xóa thành công' });
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xóa danh mục' });
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const allCategory = await Category.find();
            res.status(200).json(allCategory)
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình tạo danh mục' });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const idCategory = req.params.id;
            const findCategoryById = await Category.findById(idCategory);
            if (!findCategoryById) {
                return res.status(404).json({ message: "Không tìm thấy danh mục" })
            }
            res.status(200).json(findCategoryById);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" })
        }
    }

};
module.exports = categoryController;
