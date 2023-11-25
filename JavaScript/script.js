

// Set footer date
function footerDate(){
    const date = document.getElementById('date');
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    date.innerHTML = currentYear;
}

// Preload
const hideContent = document.querySelectorAll('hide-content')
hideContent.forEach((item)=>{
    item.style.display = 'none'
})

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-page').style.display = 'none';
        hideContent.forEach((item)=>{
            item.style.display = 'block'
        }) 
      }, 8000);
});

//text effecting
function textEffecting(){
    const typed = new Typed('.developer-skills', {
        strings : ['Full-Stack Developer', 'UI/UX Developer', 'Graphic Designer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 2000,
        loop: true,
        //showCursor: false // Hides the cursor
    });
}

//function that handles nav-bar
const menuToggle = document.querySelector('nav button.bars');
const closeToggle = document.querySelector('nav button.cancel');
const menu = document.querySelector('nav ul');

function handleClick(){
    menuToggle.addEventListener('click', ()=>{

        menu.classList.add('active');

        if(menu.classList.contains('active')){
            // menu.style.display = 'block';
            
            closeToggle.style.display = 'block';
            // menuToggle.style.display = 'none';
        }
    });

    closeToggle.addEventListener('click', ()=>{
        
        menu.classList.remove('active');

        if(menu.classList.contains('active')){
        }
        else{
            // menu.style.display = 'none';
            closeToggle.style.display = 'none';
            // menuToggle.style.display = 'block';
        }
    });
}


// Function that handles links
function callLinks(link){
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId)

        if(targetSection){
            targetSection.scrollIntoView({behavior: "smooth"});
        }            
    });
}

// Handle nav-bar links 
// function navBarLinks(){
//     const navLink = document.querySelectorAll('nav ul li a');
//     navLink.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();

//             const targetId = link.getAttribute("href").substring(1);
//             const targetSection = document.getElementById(targetId)

//             if(targetSection){
//                 targetSection.scrollIntoView({behavior: "smooth"});
//                 if(menu.classList.contains("active")){
//                     menu.classList.remove("active");
//                     menu.style.display = 'none';

//                     menuToggle.style.display = 'block';

//                 }
//             }
//         });
//     });
// }



function handleSmoothScrollLinks() {
    const smoothScrollLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
                if(menu.classList.contains("active")){
                    menu.classList.remove("active");
                    menu.style.display = 'none';
                    menuToggle.style.display = 'block';
                    
                }
            }
        });
    });
}

function initializeNavigation() {
    // Call function to handle smooth scrolling for links
    handleSmoothScrollLinks();
}


document.addEventListener("DOMContentLoaded", function () {
  
    //function that handles nav-bar
    handleClick();

    initializeNavigation();

    //Handle nav-bar links
    // navBarLinks();

    //set footer date
    footerDate();

    //text effecting
    textEffecting();

    // Handle links
    const contactLink = document.querySelectorAll('.message-name div a');
    contactLink.forEach(link => {
        callLinks(link);
    });

    // Handle footer links
    const footerLink = document.querySelectorAll('.footer div a');
    footerLink.forEach(link => {
        callLinks(link)
    });

    //Handle submit message
    handleSubmitMessage();

});


function handleSubmitMessage(){
    const submitMessage = document.forms['submit-message'];


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
    
        var submitButton = document.getElementById('submitButton');
        var loadingIcon = document.getElementById('loadingIcon');
        var originalButtonText = submitButton.textContent;
    
        submitButton.textContent = 'Loading...';
        loadingIcon.style.display = 'inline-block'; // Show the loading spinner
    
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
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            loadingIcon.style.display = 'none'; // Hide the loading spinner
        });
    }
    

    function displaySuccessModal(){
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
}
