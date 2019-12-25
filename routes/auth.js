const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');




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
(req, res) => {
    // validation results
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const firstError = validationErrors.errors.map(err => err.msg)[0];

        return res.status(422).json({
            errorMsg: firstError
        });
    }

    


    return res.json({
        successMsg: 'Easy day Hooyah!!!'
    });
    
});




module.exports = router;
