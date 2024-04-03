const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('click', newPostFormHandler)

// Hide "create new post" container until user clicks on the "New Post" button
document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const formAdjust = document.getElementById('form-adjust');

    newPostBtn.addEventListener('click', () => {
        formAdjust.classList.remove('hidden');
    });
});