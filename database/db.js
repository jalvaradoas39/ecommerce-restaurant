const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: false
        });
        console.log('Database connection success!!!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
