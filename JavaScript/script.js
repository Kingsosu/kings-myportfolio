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


// modal and form validation
document.getElementById('submit-message').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (fullname === '' || email === '' || message === '') {
        window.alert('You can\'t submit an empty form');
    } else {
        submitForm();
    }
});

function submitForm() {
    var form = document.getElementById('submit-message');
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            displaySuccessModal();
            form.reset();
        } else {
            return response.json(); // Parse response body as JSON
        }
    })
    .then(data => {
        if (data && data.error) {
            displayErrorModal(data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        displayErrorModal();
    });
}

function displaySuccessModal() {
    var modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var closeButton = document.querySelector('.close');
    var backButton = document.getElementById('backButton');

    closeButton.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    backButton.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function displayErrorModal(errorMessage) {
    var modal = document.getElementById('errorModal');
/*  var errorText = document.getElementById('errorText');
    errorText.textContent = errorMessage;  */

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var closeButton = document.querySelector('.close-error');

    closeButton.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

