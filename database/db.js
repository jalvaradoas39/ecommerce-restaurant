const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection success!!!');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;