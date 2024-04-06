const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();
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

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
    } catch (err) {
        console.error(err);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler)

// Hide "create new post" container until user clicks on the "New Post" button
document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const formAdjustCreate = document.getElementById('form-adjust-create');

    if (newPostBtn && formAdjustCreate) {
        newPostBtn.addEventListener('click', () => {
            event.preventDefault();
            formAdjustCreate.classList.toggle('hidden');
        });
    }
});