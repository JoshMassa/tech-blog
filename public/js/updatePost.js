const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.pathname.split('/').pop();

    const formData = new FormData(document.querySelector('.update-post-form'));
    const body = {}
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
        body[key] = value
    }
    console.log('body', body)
    try {
        console.log('postId:', postId);
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            // window.location.reload();
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update post');
        }
    } catch (err) {
        console.error(err);
        alert('Failed to update post. Please try again later.');
    }
};

document.querySelector('.update-post-form').addEventListener('submit', updatePostFormHandler)

document.addEventListener('DOMContentLoaded', () => {
    const updatePostLink = document.getElementById('update-post-link');
    const formAdjustUpdate = document.getElementById('form-adjust-update');

    console.log('updatePostLink:', updatePostLink);
    if (updatePostLink && formAdjustUpdate) {
        updatePostLink.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Update post link clicked');
            formAdjustUpdate.classList.toggle('hidden');
        });
    }
});