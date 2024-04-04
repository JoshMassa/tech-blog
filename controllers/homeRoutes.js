const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all blog posts and join with user data
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
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

// Find a specific blogpost via its id
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [User]
                }
            ],
        });

        if (!blogPostData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Serialize blogPostData
        const blogPost = blogPostData.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render('blogPost', {
            ...blogPost,
            specificPost: true,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });
        res.render('dashboard', {
            id: user.id,
            username: user.username,
            blogPosts: user.blogposts,
            logged_in: true,
            title: 'Your Dashboard'
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieve login page
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

// Retrieve signup page
router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
});

module.exports = router;