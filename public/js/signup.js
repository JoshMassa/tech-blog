const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log('Hello')
    // Collect values from the login form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (name && email && password) {
        console.log ('name', name, 'email', email, 'password', password)
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
        } else {
        const data = await response.json();
        alert(data.message);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);