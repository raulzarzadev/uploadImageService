const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

// initializations

const app = express();
require('./database');


//settings

app.set('port', process.env.UPLOAD_IMAGE_PORT || 4042);

// Middlewares

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname) );
    }
});
app.use(multer({storage: storage}).single('image'));

//Routes

app.use(require('./routes'))

module.exports = app;