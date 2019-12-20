const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true
            // useUnifiedTopology: false, (Note: Bug when setting to true; "MongoTimeoutError" on Heroku )
            
        });
        console.log('Database connection success!!!');
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;