document.addEventListener('DOMContentLoaded', function() {
    const deletePostLink = document.getElementById('delete-post-link');

    if (deletePostLink) {
        deletePostLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior of the link

            if (confirm("Are you sure you want to delete this post?")) {
                const postId = window.location.pathname.split('/').pop();
                deletePost(postId); // Call the function to delete the post
            }
        });
    }
});

function deletePost(postId) {
    console.log('postId:', postId)
    fetch('/api/posts/' + postId, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(() => {
        window.location.replace('/dashboard');
    })
    .catch(error => {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
    });
}