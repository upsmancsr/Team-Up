const express = require('express');
const router = express.Router();

// Import req validation functions:
const validateSignUpInput = require('../reqValidation/validateSignUp');
const validateSignInInput = require('../reqValidation/validateSignIn');

// Import User model for db:
const User = require('../schemas/User');

// POST endpoint to sign up a new user:
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, uid } = req.body;
    console.log('/signup req.body:', req.body);

    // // Run the req.body through the validateSignUpInput function
    // // and get any errors and isValid boolean the function returns:
    // const { errors, isValid } = validateSignUpInput(req.body);

    // // If validate function returns false for isValid, return a status 400 response:
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    // Use the .findOne method from MongoDB 
    // (available through the User model)
    // to check if user already exists:
    const existingUser = await User.findOne({ uid });
    console.log('existingUser:', existingUser);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists', existingUser });
    } else {
        const newUser = new User({
            firstName,
            lastName,
            email,
            uid
        });

        // save newUser in db using MongoDB .save() method, (available through the User model)
        // and send appropriate response:
        newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(error => {
                console.log(err);
                res.status(500).json(error);
            });
    }
});

// POST endpoint to sign in a user after authenticating credentials'
router.post('/signin', async (req, res) => {

    const { uid } = req.body;
    // // Run the req.body through the validateSignUpInput function
    // // and get any errors and isValid boolean the function returns:
    // const { errors, isValid } = validateSignInInput(req.body);

    // // If validate function returns false for isValid, return a status 400 response:
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    // Use the .findOne method from MongoDB 
    // (available through the User model)
    // to check if user already exists:
    const existingUser = await User.findOne({ uid });
    if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist' });  // return to exit and avoid sending multiple responses
    } else {
        res.status(200).json({ message: 'Signed in', existingUser });
    }
    
});

// GET endpoint to get all users:
// Uses passport as authentication middleware:
router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find({}).select('firstName lastName email');
        res.status(200).json(users);
    }
    catch(error) {
        res.status(500).json(error);
    }
});

// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/', session: false }),
//     function(req, res) {
//         var token = req.user.token;
//         res.redirect('http://localhost:3000?token=' + token);
//     }
// );

module.exports = router;