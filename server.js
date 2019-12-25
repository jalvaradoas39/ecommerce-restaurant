const express = require('express');
const app = express();
const cors = require('cors');
const { port } = require('./config/keys');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');



// connect database
connectDB();


// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// routes
app.use('/api/auth', authRoutes);




if (process.env.NODE_ENV === 'production') {
    // serve static files (js, css, ext.)
    app.use(express.static('client/build'));

    // serve index.html if any route not recognized by Express server
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




// listen for incoming requests to backend server
app.listen(port, () => console.log(`Backend Server listening on port ${port}`));

