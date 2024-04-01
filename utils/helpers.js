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

module.exports = { format_date, format_time };