function format_date (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

function format_time(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US');
};

function validateTitle(titleInput) {
    const postTitleContent = titleInput.value.trim();
    const postTitleCharLimit = 30;

    if (!postTitleContent) {
        alert('Error: Title cannot be empty.');
        return false;
    }

    if (postTitleContent.length > postTitleCharLimit) {
        alert('Error: Title cannot exceed ' + postTitleCharLimit + ' characters.');
        return false;
    }

    return true;
}

module.exports = { format_date, format_time, validateTitle };