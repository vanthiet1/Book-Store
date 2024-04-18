const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    labelBook: {
        type: String,
        required: true
    },
   
    imgBook: {
        type: String,
        required: true
    },
    nameBook: {
        type: String,
        required: true
    },
    descriptionBook: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    isFree:{
        type: Boolean,
        required: true
    },
    author: [{
        name: {
            type: String,
            required: true
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    }],
    publishingCompany: {
        type: String,
        required: true
    },
    genres: [{
        name: {
            type: String,
            required: true
        },
        genresId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    categoryProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Books = mongoose.model('Book', bookSchema);

module.exports = Books;
