const mongoose = require('mongoose');
const { mongoURI,useUnifiedTopology } = require('../config/keys');


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology
        });
        console.log('Database connection success!!!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
