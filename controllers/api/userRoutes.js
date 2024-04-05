const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // Attempt to create a new user
        const userData = await User.create(req.body);
        // If successful, save session and send response
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        // If an error occurs during user creation
        if (error.errors) {
            // Check if the error is related to the username validation rule
            const usernameError = error.errors.find(err => err.path === 'username');
            if (usernameError && usernameError.validatorKey === 'usernameRestrictions') {
                // Handle the specific case of a username validation error
                res.status(400).json({ message: 'Username can only contain letters, numbers, and underscores.' });
                // Return to  avoid executing other error handling logic
                return;
            }
            // Check if the error is due to a unique contraint violation on the username
            if (error.name === 'SequelizeUniqueConstraintError') {
                if (error.fields.hasOwnProperty('username')) {
                    return res.status(400).json({ message: 'Username is already in use.' })
                }
            }
            // Check if the error is related to the password length validation rule
            const passwordError = error.errors.find(err => err.path === 'password');
            if (passwordError && passwordError.validatorKey === 'len') {
                res.status(400).json({ message: 'Password must be between 8 and 32 characters long.' });
                // Return to avoid executing other error handling logic
                return;
            }
        }
        // If it's not a username or password validation error, handle other errors. This error handler verifies that an email is unique, and if not will display the following error
        if (error.errors && error.errors[0].path === 'email' && error.errors[0].type === 'unique violation') {
            res.status(400).json({ message: 'Email address is already in use.' });
        } else {
            res.status(500).json('An error occured while creating your account. Please try again.');
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        // Check if the provided email matches a user in the database
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(401).json({ message: 'Incorrect username or password' });
            return;
        }
        // Check if the provided password matches the user's password in the database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect username or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Login Successful' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;