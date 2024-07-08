// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
// const contactButton = document.getElementById('contact-button');
// const modal = document.getElementById('contact-modal');
// const closeModal = document.querySelector('.close-modal');

// registerLink.addEventListener('click', () => {
//     wrapper.classList.add('active');
// });

// loginLink.addEventListener('click', () => {
//     wrapper.classList.remove('active');
// });

// contactButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     modal.style.display = 'block';
// });

// closeModal.addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// window.addEventListener('click', (event) => {
//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
// });
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

document.querySelector('.login form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = '/index2';
    } else {
        alert(result.message);
    }
});

document.querySelector('.register form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Registration successful. Please log in.');
        wrapper.classList.remove('active');
    } else {
        alert(result.message);
    }
});

