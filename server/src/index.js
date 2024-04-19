const express = require('express')
// const multer  = require('multer');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const connectDB = require('./db/server');
connectDB()
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());


// const upload = multer({ dest: 'uploads/' });

// app.post('/api/upload', upload.single('image'), (req, res) => {
//     const imagePath = path.join(__dirname, req.file.path);
//     res.send('File uploaded successfully.');
// });


// API BOOKS 
const bookRouter = require('./routes/book/bookRouter');
const searchRouter = require('./routes/book/searchRouter');
const bookGenreRouter = require('./routes/book/bookGenreRouter');
const commentRouter = require('./routes/book/commentRouter')
const categoryRouter = require('./routes/book/categoryRouter');
// API BANNER
const bannerRouter = require('./routes/book/bannerRouter');

// API AUTHOR
const authorRouter = require('./routes/author/authorRouter')
// AUTH
const authRouter = require('./routes/user/authRouter');
const userRouter = require('./routes/user/userRouter');
const detailUserRouter = require('./routes/user/deltailUserRouter');

// CHECKOUT
const checkoutRouter = require('./routes/checkout/checkoutRouter');

//ADMIN
const allUserRouter = require('./routes/admin/userManagerRouter')
// const adminRouter = require('./routes/adminRouter')



app.get('/', (req, res) => {
    res.send("Wellcome To Api ")
});

// API BOOK
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/search/book', searchRouter
);
app.use('/api/v1/genre/book', bookGenreRouter)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/comment/book', commentRouter);
app.use('/api/v1/category/book', categoryRouter);

// API BANNER

app.use('/api/v1/banner/book', bannerRouter);

// AUTHOR
app.use('/api/v1/author/book', authorRouter)
// AUTH
app.use('/api/v1/user', userRouter);
// CHECKOUT
app.use('/api/v1/user/book/checkout', checkoutRouter);
app.use('/api/v1/user/detail/user', detailUserRouter);



// ADMIN
app.use('/api/v1/admin/users', allUserRouter);


// create port
const PORT = process.env.PORT || 4000
// start
app.listen(PORT, () => {
    console.log(`server đang chạy trên cổng ${PORT}`);
});
