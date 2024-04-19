const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
      image: {
            type: String,
            required: true
      }
});
const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;

