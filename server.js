const express = require('express');
const app = express();
const cors = require('cors');






// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// initial testing route ONLY!!!
// app.get('/', (req, res) => res.send('Hello world!!!'));
app.get('/', (req, res) => {
    res.json({
        successMsg: 'Hello world from backend!!!'
    });
});



// create port to listen for incoming requests to backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server listening on port ${PORT}`));

