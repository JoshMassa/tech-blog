document.addEventListener('DOMContentLoaded', () => {
    const updatePostLink = document.getElementById('update-post-link');
    const updatePostForm = document.querySelector('.update-post-form');

    if (updatePostLink && updatePostForm) {
        updatePostLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Remove the 'hidden' class to display the update post form
            updatePostForm.classList.toggle('hidden');
        });
    }

    updatePostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(updatePostForm);
        // Extract postId from form action
        const postId = updatePostForm.action.split('/').pop();

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update post');
            }
        } catch (err) {
            alert('Failed to update post. Please try again later.');
        }
    });
});