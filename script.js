const menuToggle = document.getElementById('menu-toggle');
const navBarLink = document.getElementById('nav-bar-link');

menuToggle.addEventListener('click', () => {
    navBarLink.classList.toggle("active")
});

document.addEventListener("DOMContentLoaded", function () {
    const navLink = document.querySelectorAll('.nav-bar-link a');

    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId)

            if(targetSection){
                targetSection.scrollIntoView({behavior: "smooth"});

                navBarLink.classList.remove("active");
            }
        });
    });
});
