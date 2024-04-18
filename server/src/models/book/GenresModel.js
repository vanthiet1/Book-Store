const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    books: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Book' 
        }
    ]
});
const BookGenre = mongoose.model('Genre', genreSchema);
module.exports = BookGenre;
