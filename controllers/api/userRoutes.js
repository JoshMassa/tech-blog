const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Check if the provided email matches a user in the database
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }
        // Check if the provided password matches the user's password in the database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect email or password' });
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

module.exports = router;