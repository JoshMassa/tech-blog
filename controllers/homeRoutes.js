const router = require('express').Router();
const { BlogPost, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blog posts and join with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        // Dynamically set the title
        const title = 'The Tech Blog';

        // Pass serialized data and session flag into template
        res.render('home', {
            blogPosts,
            logged_in: req.session.logged_in,
            title,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const blogPost = blogPostData.get({ plain: true });

        res.render('blogPost', {
            ...blogPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;