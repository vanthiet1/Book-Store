const Banner = require('../../models/book/BannerModel');

const bannerContrller = {
    getAllBaner: async (req, res) => {
        try {
            const allBanner = await Banner.find();
            if (!allBanner) {
                return res.status(404).json("Không lấy được")
            }
            res.status(200).json(allBanner)
        } catch (error) {
            res.status(500).json({ message: "lỗi server" })
        }
    },
    addBanner: async (req, res) => {
        try {
            const { image } = req.body
            const newImage = new Banner({ image });
            await newImage.save();
            res.status(200).json(newImage)
        } catch (error) {
            res.status(500).json({ message: "lỗi server" })
        }
    },
    deleteBanner: async (req, res) => {
        try {
            const { id } = req.params
            const deleteImage = await Banner.findByIdAndDelete(id)
            if (!deleteImage) {
                return res.status(404).json({ message: 'Không tìm thấy banner để xóa' });
            }
            res.status(200).json({ message: 'Banner đã được xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: "lỗi server" })
        }
    },


}
module.exports = bannerContrller;