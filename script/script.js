document.addEventListener("DOMContentLoaded", function () {
  const profilePhoto = document.getElementById('profilePhoto');

  // Check if the profile photo element is present
  if (profilePhoto) {
    document.addEventListener('mousemove', (event) => {
      // Get the position of the mouse relative to the window
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Get the center position of the profile photo
      const rect = profilePhoto.getBoundingClientRect();
      const photoX = rect.left + rect.width / 2;
      const photoY = rect.top + rect.height / 2;

      // Calculate the shadow direction based on mouse position
      const deltaX = mouseX - photoX;
      const deltaY = mouseY - photoY;

      // Calculate shadow offset
      const shadowOffsetX = deltaX / 10; // Increased X-offset for more noticeable movement
      const shadowOffsetY = deltaY / 30; // Adjust Y-offset accordingly

      // Apply the drop-shadow to the profile photo
      profilePhoto.style.filter = `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 20px rgba(255, 206, 0, 0.8))`;
    });
  } else {
    console.error("Profile photo not found!");
  }
});



window.onload = function () {
  console.log('Page fully loaded, checking the loader...');
  const loaderWrapper = document.getElementById('loader');
  if (loaderWrapper) {
    loaderWrapper.classList.add('hidden');
    console.log('Loader hidden because page is fully loaded.');
  }
};

// Ensure loader hides after 5 seconds regardless of page load status
setTimeout(function () {
  const loaderWrapper = document.getElementById('loader');
  if (loaderWrapper) {
    loaderWrapper.classList.add('hidden');
    console.log('Loader hidden after 2 seconds, even if page is not fully loaded.');
  }
}, 5000); // 5-second delay


document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const baseSrc = img.src.split('.')[0]; // Base path without extension
    const extension = img.src.split('.').pop(); // File extension

    // img.srcset = `
    //   ${baseSrc}-small.${extension} 400w,
    //   ${baseSrc}-medium.${extension} 800w,
    //   ${baseSrc}-large.${extension} 1200w
    // `;

    // img.sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw";
    img.loading = "lazy"; // Lazy loading
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the back-to-top button
  const backToTopButton = document.getElementById("back-to-top-button");

  // Function to check scroll position and show/hide the button
  function checkScrollPosition() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block"; // Show the button when scrolling past the threshold
    } else {
      backToTopButton.style.display = "none"; // Hide the button when scroll position is under threshold
    }
  }

  // Check the scroll position on page load
  checkScrollPosition();

  // Show or hide the button based on scroll position when user scrolls
  window.onscroll = function () {
    checkScrollPosition();
  };

  // Smooth scroll to the top when button is clicked
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollDownButton = document.querySelector('.scroll-down');

  // Scroll down action
  scrollDownButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetSection = document.querySelector('section.hero-section');
    
    // Smooth scroll to the target section
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Hide button on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) { // Change '100' to your preferred scroll distance
      scrollDownButton.style.display = 'none'; // Hide the button
    } else {
      scrollDownButton.style.display = 'block'; // Show the button if scrolled back up
    }
  });
});