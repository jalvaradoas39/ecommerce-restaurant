const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys');
const User = require('../models/User');



// @route               POST /api/auth/signup
// @description         signup new user
// @return              new user object
// @access              public
router.post('/signup', 
[
    check('name', 'Name must be at least 2 characters long')
        .trim()
        .escape()
        .isLength({ min: 2 }),
    check('email', 'Invalid email')
        .isEmail(),
    check('password', 'Password must be at least 6 characters long dude')
        .isLength({ min: 6 })
], 
async (req, res) => {

    // validation results
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const firstError = validationErrors.errors.map(err => err.msg)[0];

        return res.status(422).json({
            errorMsg: firstError
        });
    }


    const { name, email, password } = req.body;

    try {
        // check if email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errorMsg: 'Email already exists'
            });
        }
        // salt password
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        user = new User({ name, email, hashedPassword });
        // save new user
        const newUser = await user.save();
        // send back newly created user
        res.json(newUser);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: auth');
    }
    
});




// @route               POST /api/auth/signin
// @description         signin user
// @return              { token, user: { _id, name, email, role } }
// @access              public
router.post('/signin',
[
    check('email', 'Invalid email')
        .isEmail()
],
async (req, res) => {
    // destructure incoming data via client
    const { email, password } = req.body;

    try {
        // check if user exists with email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMsg: 'Invalid credentials'
            });
        }

        // check if password provided by user matches the one in database
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({
                errorMsg: 'Invalid credentials'
            });
        }


        // create payload for jwt
        const payload = {
            _id: user._id
        }

        // sign jwt
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: jwtExpire },
            (err, token) => {
                if (err) throw err;

                // make serverside HTTP Response to client
                res.json({
                    token,
                    user: { 
                        _id: user._id, 
                        name: user.name, 
                        email: user.email,
                        role: user.role  
                    }
                });
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error: auth');
    }

});






module.exports = router;
