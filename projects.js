window.addEventListener('load', function () {
    console.log("Script loaded");

    const loadingScreen = document.getElementById('loading-screen');
    console.log("Loading Screen Element:", loadingScreen);

    const welcomeMessage = document.getElementById('welcome-message');
    console.log("Welcome Message Element:", welcomeMessage);

    const modeToggleBtn = document.getElementById('mode-toggle');
    console.log("Mode Toggle Button:", modeToggleBtn);

    const header = document.querySelector('.header');
    console.log("Header Element:", header);

    const body = document.body;

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

           
            const isInternalLink = targetHref.startsWith('#') || targetHref.startsWith(window.location.origin) || targetHref.startsWith('/');

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


    
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (event) {
            const targetHref = this.getAttribute('href');

           
            const isInternalLink = targetHref.startsWith('#') || targetHref.startsWith(window.location.origin) || targetHref.startsWith('/');

            if (isInternalLink) {
                event.preventDefault();

                if (targetHref.startsWith('#')) {
                    
                    document.querySelector(targetHref).scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                   
                    if (loadingScreen) {
                        loadingScreen.style.display = 'flex';
                        showLoadingScreen(); 
                    }

                    
                    setTimeout(function () {
                        window.location.href = targetHref;
                    }, 1000); 
                }
            }
            
        });
    });
});
