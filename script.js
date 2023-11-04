
const menuToggle = document.getElementById('menu-toggle');
const navBarLink = document.getElementById('nav-bar-link');

menuToggle.addEventListener('click', () => {
    navBarLink.classList.toggle('active')
});