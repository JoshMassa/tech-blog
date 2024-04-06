const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.pathname.split('/').pop();
    const formData = new FormData(document.querySelector('.update-post-form'));
    const body = {}
    const titleInput = document.getElementById('post-title');
    const postTitleContent = titleInput.value.trim();
    const postTitleCharLimit = 30;

    if (!postTitleContent) {
        alert('Error: Title cannot be empty.');
        return;
    }

    if (postTitleContent.length > postTitleCharLimit) {
        alert('Error: Title cannot exceed ' + postTitleCharLimit + ' characters.');
    }

    for (let [key, value] of formData.entries()) {
        body[key] = value
    }

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update post');
        }
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('.update-post-form').addEventListener('submit', updatePostFormHandler)

document.addEventListener('DOMContentLoaded', () => {
    const updatePostLink = document.getElementById('update-post-link');
    const formAdjustUpdate = document.getElementById('form-adjust-update');

    if (updatePostLink && formAdjustUpdate) {
        updatePostLink.addEventListener('click', (event) => {
            event.preventDefault();
            formAdjustUpdate.classList.toggle('hidden');
        });
    }
});