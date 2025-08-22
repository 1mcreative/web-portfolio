// Custom Mouse Pointer Script
document.addEventListener('DOMContentLoaded', function() {
   try {
     const pointer = document.getElementById('custom-pointer');
     if (!pointer) {
       console.warn('Custom pointer element not found');
       return;
     }

     // Toggle between proximity (A) and hover (B) mode
     let mode = 'B'; // Change to 'B' for hover-only

     // Only run pointer and shadow animation on desktop browsers
     function isDesktopBrowser() {
       return window.matchMedia('(pointer: fine) and (min-width: 992px)').matches;
     }

     if (isDesktopBrowser()) {
       document.addEventListener('mousemove', function(e) {
         const profilePhoto = document.getElementById('profilePhoto');
         if (profilePhoto && pointer) {
           pointer.style.display = '';
           const rect = profilePhoto.getBoundingClientRect();
           const mouseX = e.clientX;
           const mouseY = e.clientY;
           const photoX = rect.left + rect.width / 2;
           const photoY = rect.top + rect.height / 2;
           const dist = Math.sqrt(Math.pow(mouseX - photoX, 2) + Math.pow(mouseY - photoY, 2));

           // Animate shadow if pointer is within 200px of the center
           if (dist < 200) {
             pointer.style.opacity = '0';
             const offsetX = (mouseX - photoX) / 4;
             const offsetY = (mouseY - photoY) / 8;
             profilePhoto.style.filter = `drop-shadow(${offsetX}px ${offsetY}px 32px rgba(255, 206, 0, 1))`;
           } else {
             pointer.style.opacity = '1';
             profilePhoto.style.filter = 'drop-shadow(0px 0px 16px rgba(255, 206, 0, 0.7))';
             pointer.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
           }
         }
       });
     } else {
       // On mobile/touch, always show static shadow and hide pointer
       const profilePhoto = document.getElementById('profilePhoto');
       if (profilePhoto) {
         profilePhoto.style.filter = 'drop-shadow(0px 0px 16px rgba(255, 206, 0, 0.7))';
       }
       if (pointer) {
         pointer.style.display = 'none';
       }
     }

     // Highlight when hovering over header
     const header = document.querySelector('header');
     if (header && pointer) {
       header.addEventListener('mouseenter', function() {
         pointer.classList.add('highlight');
       });
       header.addEventListener('mouseleave', function() {
         pointer.classList.remove('highlight');
       });
     }

     // Animate pointer when hovering over interactive elements
     const interactiveSelectors = 'a, button, .social-icon, .card, .resume-button';
     document.querySelectorAll(interactiveSelectors).forEach(el => {
       if (el && pointer) {
         el.addEventListener('mouseenter', () => pointer.classList.add('highlight'));
         el.addEventListener('mouseleave', () => pointer.classList.remove('highlight'));
       }
     });

     // Hide pointer when mouse leaves browser window
     document.addEventListener('mouseleave', function() {
       if (pointer) pointer.style.opacity = '0';
     });
     document.addEventListener('mouseenter', function() {
       if (pointer) pointer.style.opacity = '1';
     });

   } catch (error) {
     console.error('Error initializing custom pointer:', error);
   }
 });



// Loader functionality (consolidated)
function initLoader() {
   try {
     const loaderWrapper = document.getElementById('loader');
     if (!loaderWrapper) {
       console.warn('Loader element not found');
       return;
     }

     // Hide loader after 3 seconds (reduced from 5 seconds)
     setTimeout(function () {
       if (loaderWrapper && !loaderWrapper.classList.contains('hidden')) {
         loaderWrapper.classList.add('hidden');
       }
     }, 3000);

   } catch (error) {
     console.error('Error initializing loader:', error);
   }
 }

// Initialize loader on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initLoader);

// Also initialize on window load as fallback
window.addEventListener('load', initLoader);


// Consolidated DOMContentLoaded event listener for all features
document.addEventListener('DOMContentLoaded', function() {
   try {
     // Initialize lazy loading for images
     initLazyLoading();

     // Initialize back to top button
     initBackToTopButton();

     // Initialize scroll down button
     initScrollDownButton();

     // Initialize skip link functionality
     initSkipLink();

   } catch (error) {
     console.error('Error initializing features:', error);
   }
});

function initLazyLoading() {
   try {
     const images = document.querySelectorAll("img");
     images.forEach((img) => {
       if (img.id !== 'profilePhoto') { // Don't lazy load the main profile photo
         img.loading = "lazy";
       }
     });
   } catch (error) {
     console.error('Error initializing lazy loading:', error);
   }
}

function initBackToTopButton() {
   try {
     const backToTopButton = document.getElementById("back-to-top-button");
     if (!backToTopButton) return;

     function checkScrollPosition() {
       const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
       backToTopButton.style.display = scrollTop > 100 ? "block" : "none";
     }

     // Throttle scroll events for better performance
     let ticking = false;
     function onScroll() {
       if (!ticking) {
         requestAnimationFrame(function() {
           checkScrollPosition();
           ticking = false;
         });
         ticking = true;
       }
     }

     window.addEventListener('scroll', onScroll, { passive: true });
     checkScrollPosition();

     backToTopButton.addEventListener("click", function (e) {
       e.preventDefault();
       window.scrollTo({
         top: 0,
         behavior: "smooth"
       });
     });
   } catch (error) {
     console.error('Error initializing back to top button:', error);
   }
}

function initScrollDownButton() {
   try {
     const scrollDownButton = document.querySelector('.scroll-down');
     if (!scrollDownButton) return;

     scrollDownButton.addEventListener('click', function (event) {
       event.preventDefault();
       const targetSection = document.querySelector('section.hero-section');
       if (targetSection) {
         targetSection.scrollIntoView({ behavior: 'smooth' });
       }
     });

     // Throttle scroll events for better performance
     let ticking = false;
     function onScroll() {
       if (!ticking) {
         requestAnimationFrame(function() {
           scrollDownButton.style.display = window.scrollY > 100 ? 'none' : 'block';
           ticking = false;
         });
         ticking = true;
       }
     }

     window.addEventListener('scroll', onScroll, { passive: true });
     scrollDownButton.style.display = window.scrollY > 100 ? 'none' : 'block';
   } catch (error) {
     console.error('Error initializing scroll down button:', error);
   }
}

function initSkipLink() {
   try {
     const skipLink = document.querySelector('.skip-link');
     if (!skipLink) return;

     skipLink.addEventListener('click', function(e) {
       const target = document.getElementById('main-content');
       if (target) {
         target.focus();
         target.scrollIntoView();
       }
     });
   } catch (error) {
     console.error('Error initializing skip link:', error);
   }
}