window.addEventListener('load', function () {
    var loadingScreen = document.getElementById('loading-screen');
    var welcomeMessage = document.getElementById('welcome-message');
    var header = document.querySelector('.header');
    var textElement = document.querySelector('.multi-text');
    var texts = ["Hey, I'm Dyaa", "Software Engineering Student"];
    var currentIndex = 0;
    var isDeleting = false;
    var speed = 100; 

    
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;

    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', function () {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                modeToggleBtn.textContent = "dark_mode"; 
            } else {
                modeToggleBtn.textContent = "light_mode"; 
            }
        });
    }

    
    if (textElement) {
        function typeWriter() {
            var fullText = texts[currentIndex];
            var currentText = isDeleting
                ? fullText.substring(0, textElement.textContent.length - 1)
                : fullText.substring(0, textElement.textContent.length + 1);

            textElement.textContent = currentText;

            if (!isDeleting && currentText === fullText) {
                setTimeout(function () {
                    isDeleting = true;
                    typeWriter();
                }, 2000); 
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeWriter();
            } else {
                setTimeout(typeWriter, isDeleting ? speed / 2 : speed);
            }
        }

        
        function startTypeWriter() {
            typeWriter();
        }
    }
    
    
    function showLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('active');
        }
    }

    
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
                header.style.display = 'block';
                header.classList.add('show');
            }
            if (textElement) {
                startTypeWriter();
            }
        }, 1500); 
    }

    
    setTimeout(function () {
        if (welcomeMessage) {
            welcomeMessage.style.opacity = '0';
        }
    }, 800);

    
    hideLoadingScreen();

   
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetPage = this.href;
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';  
                showLoadingScreen(); 
            }

           
            setTimeout(function () {
                window.location.href = targetPage;
            }, 1000); 
        });
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
