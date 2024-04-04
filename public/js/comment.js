document.addEventListener('DOMContentLoaded', () => {
    const commentLink = document.getElementById('comment-link');
    const commentForm = document.querySelector('.comment-form');
    const commentCharLimit = 1000;

    if (commentLink && commentForm) {
        // Add click event listener to the "Comment" link
        commentLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Remove the 'hidden' class to display the comment form
            commentForm.classList.toggle('hidden');
        });
    }

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const commentInput = document.getElementById('comment');
        const commentContent = commentInput.value.trim();

        if (!commentContent) {
            // Handle case where comment content is empty
            return;
        }

        // Check if comment content exceeds character limit
        if (commentContent.length > commentCharLimit) {
            alert('Error: Comment cannot exceed ' + commentCharLimit + ' characters');
            return;
        }

        try {
            // Extract the post ID from the URL
            const postId = window.location.pathname.split('/').pop();

            // Adjust the URL to match the route and send a POST request to the server to add the comment
            const response = await fetch(`/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: commentContent })
            });

            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to add comment');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while adding the comment. Please try again.');
        }
    });
});