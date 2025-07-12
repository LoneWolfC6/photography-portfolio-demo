// =============================
// Solstice Lens Photography Portfolio Scripts
// =============================

// =============================
// Home Page Slideshow (index.html)
// =============================

// Check if we're on the homepage (hero section exists)
if (document.querySelector('.hero-section')) {
  const heroSection = document.querySelector('.hero-section');

  // Array of background image paths for slideshow
  const backgrounds = [
    'images/gallery1.jpg',
    'images/gallery2.jpg',
    'images/gallery4.jpg',
    'images/gallery14.jpg',
    'images/gallery15.jpg'
  ];

  let current = 0;

  // Preload all background images before starting slideshow
  const preloadImages = (srcArray, callback) => {
    let loaded = 0;
    srcArray.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === srcArray.length) {
          callback();
        }
      };
    });
  };

  // Start the slideshow once all images are loaded
  preloadImages(backgrounds, () => {
    function changeBackground() {
      heroSection.style.backgroundImage = `url('${backgrounds[current]}')`;
      current = (current + 1) % backgrounds.length;
    }

    changeBackground(); // Show first image immediately
    setInterval(changeBackground, 5000); // Rotate every 5 seconds
  });
}


// =============================
// Gallery Lightbox (gallery.html)
// =============================

// Check if gallery section exists before running lightbox script
if (document.querySelector('.gallery-section')) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const closeBtn = document.querySelector('.close-btn');
  const galleryImages = document.querySelectorAll('.gallery-grid img');

  const images = Array.from(galleryImages);
  let currentIndex = 0;

  // Open lightbox with selected image
  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
    lightbox.classList.add('active');
  }

  // Click event for each gallery image
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  // Close button functionality
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Click outside image closes lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Previous / Next Buttons
  document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
  });

  // Basic swipe support for touch devices
  let startX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % images.length;
      } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      lightboxImage.src = images[currentIndex].src;
      lightboxImage.alt = images[currentIndex].alt;
    }
  });
}


// =============================
// Contact Form Submission (contact.html)
// =============================

// Check for contact form before running script
if (document.querySelector('#contact-form')) {
  const contactForm = document.querySelector('#contact-form');
  const confirmationMessage = document.querySelector('.confirmation-message');

  // Fake form submission for demo purposes
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual submission
    contactForm.style.display = 'none'; // Hide form
    confirmationMessage.style.display = 'block'; // Show confirmation
  });
}
