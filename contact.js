window.addEventListener('load', function () {
    console.log("Contact Script loaded");
    
    const loadingScreen = document.getElementById('loading-screen');
    console.log("Loading Screen Element:", loadingScreen);

    const welcomeMessage = document.getElementById('welcome-message');
    console.log("Welcome Message Element:", welcomeMessage);

    const modeToggleBtn = document.getElementById('mode-toggle');
    console.log("Mode Toggle Button:", modeToggleBtn);

    const header = document.querySelector('.header');
    console.log("Header Element:", header);

    const body = document.body;

    const contactForm = document.getElementById('contact-form');
    console.log("Contact Form Element:", contactForm);

   
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS SDK not loaded. Please include the EmailJS script in your HTML.");
        return; 
    }

    
    emailjs.init('qK9QmzDLdhPbeHkky');

    
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        console.log("Saved theme:", savedTheme); 

        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            modeToggleBtn.textContent = 'dark_mode'; 
        } else {
            modeToggleBtn.textContent = 'light_mode'; 
        }
    }

   
    function toggleLightMode() {
        body.classList.toggle('light-mode');
        console.log("Current class list:", body.classList); 

        if (body.classList.contains('light-mode')) {
            modeToggleBtn.textContent = 'dark_mode'; 
            localStorage.setItem('theme', 'light'); 
            console.log("Switched to light mode"); 
        } else {
            modeToggleBtn.textContent = 'light_mode'; 
            localStorage.setItem('theme', 'dark');
            console.log("Switched to dark mode"); 
        }
    }

   
    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', toggleLightMode);
        console.log("Event listener added to mode toggle button"); 
    }

    initializeTheme();

    
    function hideLoadingScreen() {
       
        setTimeout(function () {
            if (loadingScreen) {
                loadingScreen.classList.add('split');
            }
        }, 500); 

       
        setTimeout(function () {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            if (header) {
                header.classList.remove('hidden'); 
                header.classList.add('show'); 
            }
            if (welcomeMessage) {
                welcomeMessage.classList.add('hidden'); 
            }
        }, 1500); 
    }


    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
    }
    if (welcomeMessage) {
        welcomeMessage.style.opacity = '1';
    }

  
    hideLoadingScreen();

    

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

          
            emailjs.sendForm('service_y8lupug', 'template_99d3pf2', contactForm)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Your message has been sent successfully!');
                    contactForm.reset(); 
                }, function (error) {
                    console.log('FAILED...', error);
                    alert('There was an error sending your message. Please try again later.');
                });
        });
    }

   
    const projects = document.querySelectorAll('.project');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
                console.log("Project shown:", entry.target);
            }
        });
    }, observerOptions);

    projects.forEach(project => observer.observe(project));

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (event) {
            const targetHref = this.getAttribute('href');

            
            const isInternalLink = targetHref.startsWith('#') ||
                targetHref.startsWith(window.location.origin) ||
                targetHref.startsWith('/');

            if (isInternalLink) {
                event.preventDefault();

                if (targetHref.startsWith('#')) {
                   
                    const targetElement = document.querySelector(targetHref);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                } else {
                    
                    if (loadingScreen) {
                        loadingScreen.style.display = 'flex'; 
                        loadingScreen.classList.add('active'); 
                    }

                   
                    setTimeout(function () {
                        window.location.href = targetHref;
                    }, 1000);
                }
            }
            
        });
    });
});
