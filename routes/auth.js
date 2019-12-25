const express = require('express');
const router = express.Router();


// TESTING ROUTE ONLY!!!
// router.post('/signup', (req, res) => res.json({ name: req.body.name, email: req.body.emai, password: req.body.password }));



// @route           POST /api/auth/signup
// @description     signup new user
// @access          public
router.post('/signup')




module.exports = router;
