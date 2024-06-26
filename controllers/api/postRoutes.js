const router = require('express').Router();
const { BlogPost, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to allow a user to add comments to a post
router.post('/:blogpostId/comments', withAuth, async (req, res) => {
    try {
        // Check that the requested post exists
        const requestedPost = await BlogPost.findByPk(req.params.blogpostId);
        if (!requestedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Add the comment to the assiociated post
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            blogpost_id: req.params.blogpostId
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:blogpostId/comments', async (req, res) => {
    try {
        const postId = req.params.blogpostId;
        const comments = await Comment.findAll({ where: { blogpost_id: postId } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:blogpostId', withAuth, async (req, res) => {
    try {
        console.log('req.body', req.body)
        console.log('req.session', req.session)
        console.log('req.params.blogpostId', req.params.blogpostId)
        const updatedPost = await BlogPost.update(req.body, 
            {
                where: {
                    id: req.params.blogpostId,
                },
            }
        );
            console.log('updated post', updatedPost)
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found or you are not authorized to update this post.' });
        }
        
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:blogpostId', withAuth, async (req, res) => {
    try {
        const deletedPost = await BlogPost.destroy({
            where: {
                id: req.params.blogpostId,
            },
        });

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found or you are not authorized to delete this post.' });
        }

        // res.status(200).json({ message: 'Post deleted successfully' });
        res.redirect('/dashboard')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;