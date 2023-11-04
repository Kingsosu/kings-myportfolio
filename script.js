
const menuToggle = document.getElementById('menu-toggle');
const navBarLink = document.getElementById('nav-bar-link');

menuToggle.addEventListener('click', () => {
    navBarLink.classList.toggle("active")
});


const navLink = document.querySelectorAll('.nav-bar-link a');

navLink.forEach(link => {
    link.addEventListener('click', () => {
        navBarLink.classList.remove("active")
    });
});

