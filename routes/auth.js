const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');



// @route           POST /api/auth/signup
// @description     signup new user
// @access          public
router.post('/signup', 
// validation
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




module.exports = router;
