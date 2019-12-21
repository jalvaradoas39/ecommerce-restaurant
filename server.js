const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database/db');



// connect database
connectDB();


// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// initial testing route ONLY!!!
// app.get('/', (req, res) => res.send('Hello world!!!'));
// app.get('/', (req, res) => res.json({ successMsg: 'Hello world from backend!!!' }));




if (Process.env.NODE_ENV === 'production') {
    // serve static files (js, css, ext.)
    app.use(express.static('client/build'));

    // Serve index.html if any route not recognized by Express server
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




// create port to listen for incoming requests to backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server listening on port ${PORT}`));

