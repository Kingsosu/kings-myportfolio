const menuToggle = document.querySelector('nav button.bars');
const closeToggle = document.querySelector('nav button.cancel');
const menu = document.querySelector('nav ul');

const submitMessage = document.forms['submit-message'];

// Set footer date
const date = document.getElementById('date');
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
date.innerHTML = currentYear;



//Function that handles nav-bar
function handleClick(){
    menuToggle.addEventListener('click', ()=>{
        menu.classList.add('active');

        if(menu.classList.contains('active')){
            menu.style.display = 'block';
            
            closeToggle.style.display = 'block';
            menuToggle.style.display = 'none';
        }
    });

    closeToggle.addEventListener('click', ()=>{
        
        menu.classList.remove('active');

        if(menu.classList.contains('active')){
        }
        else{
            menu.style.display = 'none';
            closeToggle.style.display = 'none';
            menuToggle.style.display = 'block';
        }
    });
}


// Function that handles links
function calllinks(link){
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId)

        if(targetSection){
            targetSection.scrollIntoView({behavior: "smooth"});
        }            
    });
} 


document.addEventListener("DOMContentLoaded", function () {

    handleClick();

    // Handle message from user
    submitMessage.addEventListener('submit', function(event){
        event.preventDefault();
        fullname = submitMessage.elements['fullname'].value;
        email = submitMessage.elements['email'].value;
        message = submitMessage.elements['message'].value;
    
        if(fullname === '' || email === '' || message === ''){
            window.alert('You can\'t submit empty form');
        }    

    }) 

    // Handle nav-bar links 
    const navLink = document.querySelectorAll('nav ul li a');

    navLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId)

            if(targetSection){
                targetSection.scrollIntoView({behavior: "smooth"});
                if(menu.classList.contains("active")){
                    menu.classList.remove("active");
                    menu.style.display = 'none';

                    menuToggle.style.display = 'block';

                }
            }
        });
    });

    // Handle links
    const contactLink = document.querySelectorAll('.message-name div a');

    contactLink.forEach(link => {
        calllinks(link);
    });

    const footerLink = document.querySelectorAll('.footer div a');

    footerLink.forEach(link => {
        calllinks(link)
    });

});

