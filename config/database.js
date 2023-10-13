const mongoose = require('mongoose')
require("dotenv").config()

DATABASE_URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('DB connected'))
        .catch(err => console.log(err))
}

module.exports = dbConnect