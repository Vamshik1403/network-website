/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Show menu
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// Hide menu
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50
        ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
// Initialize EmailJS
emailjs.init('zz49T4v5RaMFL8gli') // Replace with your actual EmailJS public key

const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

if (contactForm) {
    const showMessage = (message, type = 'success') => {
        contactMessage.textContent = message
        contactMessage.className = 'contact__message show-message ' + type
        
        setTimeout(() => {
            contactMessage.className = 'contact__message'
        }, 5000)
    }

    const sendEmail = (e) => {
        e.preventDefault()

        // Get form data
        const userName = contactForm.querySelector('input[name="user_name"]').value;
        const userMobile = contactForm.querySelector('input[name="user_mobile"]').value;
        const userMessage = contactForm.querySelector('textarea[name="user_message"]').value;
        const subject = contactForm.querySelector('input[name="subject"]')?.value || 'General Inquiry';
        
        // Add loading state to button
        const submitBtn = contactForm.querySelector('.contact__button')
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending...'
        submitBtn.disabled = true
        
        // Create template parameters object
        const templateParams = {
            from_name: userName,
            mobile_number: userMobile,
            message: userMessage,
            subject: subject
        };
        
        // Send email using EmailJS
        emailjs.send('service_f4cha7k', 'template_plmv7dy', templateParams)
            .then(() => {
                showMessage('Message sent successfully ✅')
                contactForm.reset()
            }, (error) => {
                console.error('EmailJS error:', error);
                showMessage('Message not sent (service error) ❌', 'error')
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText
                submitBtn.disabled = false
            })
    }

    contactForm.addEventListener('submit', sendEmail)

    // Add input animations
    const inputs = contactForm.querySelectorAll('.contact__input')
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused')
        })

        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused')
            }
        })
    })
}

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    if (scrollUp) {
        this.scrollY >= 350
            ? scrollUp.classList.add('show-scroll')
            : scrollUp.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 75,
              sectionId = current.getAttribute('id'),
              sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (sectionClass) {
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionClass.classList.add('active-link')
            } else {
                sectionClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal(`.home__data, .education, .skills, .contact__container`)
sr.reveal(`.home__img`, {delay: 600})
sr.reveal(`.home__scroll`, {delay: 800})
sr.reveal(`.work__card, .services__card`, {interval: 100})
sr.reveal(`.about__content`, {origin: 'right'})
sr.reveal(`.about__img`, {origin: 'left'})
sr.reveal(`.testimonials`, {origin: 'bottom', distance: '50px', duration: 1500, reset: true})
sr.reveal(`.testimonial__card`, {delay: 300, duration: 1500, reset: true})
sr.reveal(`.testimonial__controls`, {delay: 500, duration: 1000, reset: true})
sr.reveal(`#info`);
sr.reveal(`#company-profile`);
sr.reveal(`#core-values`);

/*=============== HOME SECTION SLIDE (ENTIRE SECTION) ===============*/
const slides = document.querySelectorAll('.home-slide');
const carouselTrack = document.querySelector('.carousel-track');
const paginationLinesContainer = document.querySelector('.carousel-pagination-lines');
let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5 seconds per slide

function createPaginationLines() {
  if (!paginationLinesContainer || !slides.length) return;
  slides.forEach((_, index) => {
    const line = document.createElement('div');
    line.classList.add('carousel-pagination-line');
    if (index === 0) line.classList.add('active');
    line.addEventListener('click', () => {
      goToHeroSlide(index);
      resetSlideInterval();
    });
    paginationLinesContainer.appendChild(line);
  });
}

function updatePaginationLines(activeIndex) {
  if (!paginationLinesContainer) return;
  const lines = paginationLinesContainer.querySelectorAll('.carousel-pagination-line');
  lines.forEach((line, index) => {
    if (index === activeIndex) {
      line.classList.add('active');
    } else {
      line.classList.remove('active');
    }
  });
}

function showHeroSlide(index) {
  if (!slides.length || !carouselTrack) return;
  slides.forEach((slide, i) => {
    const homeScroll = slide.querySelector('.home__scroll'); // Get scroll element for this slide
    if (i === index) {
      slide.classList.add('active');
      // Show scroll arrow ONLY on the FIRST slide (index 0)
      if (homeScroll) {
        if (i === 0) {
          homeScroll.classList.remove('home__scroll--hidden');
        } else {
          homeScroll.classList.add('home__scroll--hidden');
        }
      }
    } else {
      slide.classList.remove('active');
      // Ensure scroll is hidden for non-active slides if it exists
      if (homeScroll) {
        homeScroll.classList.add('home__scroll--hidden');
      }
    }
  });
  updatePaginationLines(index);
  currentSlide = index;
}

function nextHeroSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showHeroSlide(currentSlide);
}

function goToHeroSlide(index) {
  if (!slides.length) return;
  showHeroSlide(index);
}

function startSlideInterval() {
  if (!slides.length || slides.length <= 1) return; // Don't start if no slides or only one
  slideInterval = setInterval(nextHeroSlide, slideDuration);
}

function resetSlideInterval() {
  if (!slides.length || slides.length <= 1) return;
  clearInterval(slideInterval);
  startSlideInterval();
}

// Initialize Hero Slider
if (slides.length > 0) {
  createPaginationLines();
  showHeroSlide(0);
  startSlideInterval();
}

/*=============== TESTIMONIAL CAROUSEL ===============*/
document.addEventListener("DOMContentLoaded", function() {
    // Get testimonial elements
    const testimonialActive = document.getElementById("testimonial-active");
    const testimonialStore = document.querySelector(".testimonial-store");
    const prevBtn = document.getElementById("testimonial-prev");
    const nextBtn = document.getElementById("testimonial-next");
    const paginationContainer = document.getElementById("testimonial-pagination");
    
    // Only proceed if we have the required elements
    if (testimonialStore && testimonialActive && paginationContainer) {
        // Get all stored testimonial data
        const testimonials = testimonialStore.querySelectorAll(".testimonial-data");
        let currentIndex = 0;
        
        console.log("Total testimonials found:", testimonials.length);
        
        // Create pagination dots
        paginationContainer.innerHTML = '';
        testimonials.forEach((testimonial, index) => {
            const dot = document.createElement("div");
            dot.classList.add("testimonial__dot");
            if (index === 0) dot.classList.add("active");
            
            dot.addEventListener("click", () => {
                goToTestimonial(index);
            });
            
            paginationContainer.appendChild(dot);
        });
        
        // Initialize first testimonial
        updateActiveTestimonial();
        
        // Navigation buttons
        let isAnimating = false; // Flag to prevent rapid clicking

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (isAnimating) return; // Prevent rapid clicking
                isAnimating = true;
                
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = testimonials.length - 1; // Loop to last testimonial
                }
                updateActiveTestimonial();
                
                // Reset animation flag after transition completes
                setTimeout(() => {
                    isAnimating = false;
                }, 200);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (isAnimating) return; // Prevent rapid clicking
                isAnimating = true;
                
                if (currentIndex < testimonials.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop to first testimonial
                }
                updateActiveTestimonial();
                
                // Reset animation flag after transition completes
                setTimeout(() => {
                    isAnimating = false;
                }, 200);
            });
        }
        
        // Update active testimonial based on current index
        function updateActiveTestimonial() {
            const activeData = testimonials[currentIndex];
            if (!activeData) return;
            
            // Get data from the store
            const content = activeData.querySelector(".content").textContent;
            const name = activeData.querySelector(".name").textContent;
            const role = activeData.querySelector(".role").textContent;
            const rating = parseFloat(activeData.querySelector(".rating").textContent);
            
            // Create star rating HTML
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    starsHTML += '<i class="ri-star-fill"></i>';
                } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                    starsHTML += '<i class="ri-star-half-line"></i>';
                } else {
                    starsHTML += '<i class="ri-star-line"></i>';
                }
            }
            
            // Determine correct image path based on page location
            const isProductPage = window.location.pathname.includes('/files/');
            const imgPath = isProductPage ? "../assets/img/favicon.png" : "assets/img/favicon.png";
            
            // Get initials for placeholder
            const initials = name.split(' ').map(n => n[0]).join('');
            
            // Fade out current testimonial
            const currentCard = testimonialActive.querySelector('.testimonial__card');
            if (currentCard) {
                currentCard.style.opacity = '0';
                currentCard.style.transform = 'translateY(20px)';
                
                // Wait for fade out, then update content and fade in
                setTimeout(() => {
                    // Update the active testimonial
                    testimonialActive.innerHTML = `
                        <div class="testimonial__card" style="opacity: 0; transform: translateY(20px);">
                            <div class="testimonial__content">
                                <i class="ri-double-quotes-l testimonial__icon"></i>
                                <p class="testimonial__description">${content}</p>
                            </div>
                            <div class="testimonial__user">
                                <img src="${imgPath}" alt="testimonial image" class="testimonial__img"
                                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div class="testimonial__img-placeholder" style="display:none;">${initials}</div>
                                <div class="testimonial__details">
                                    <h3 class="testimonial__name">${name}</h3>
                                    <p class="testimonial__role">${role}</p>
                                </div>
                                <div class="testimonial__rating">
                                    ${starsHTML}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Fade in new testimonial
                    const newCard = testimonialActive.querySelector('.testimonial__card');
                    setTimeout(() => {
                        newCard.style.opacity = '1';
                        newCard.style.transform = 'translateY(0)';
                    }, 10);
                }, 80);
            } else {
                // No current card, just update content
                testimonialActive.innerHTML = `
                    <div class="testimonial__card">
                        <div class="testimonial__content">
                            <i class="ri-double-quotes-l testimonial__icon"></i>
                            <p class="testimonial__description">${content}</p>
                        </div>
                        <div class="testimonial__user">
                            <img src="${imgPath}" alt="testimonial image" class="testimonial__img"
                              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="testimonial__img-placeholder" style="display:none;">${initials}</div>
                            <div class="testimonial__details">
                                <h3 class="testimonial__name">${name}</h3>
                                <p class="testimonial__role">${role}</p>
                            </div>
                            <div class="testimonial__rating">
                                ${starsHTML}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Update pagination dots
            const dots = paginationContainer.querySelectorAll(".testimonial__dot");
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }
        
        // Go to specific testimonial
        function goToTestimonial(index) {
            currentIndex = index;
            updateActiveTestimonial();
        }
        
        // Auto-advance every 3 seconds
        let autoAdvance = setInterval(() => {
            if (currentIndex < testimonials.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateActiveTestimonial();
        }, 3000);
        
        // Pause auto-advance on hover
        testimonialActive.addEventListener("mouseenter", () => {
            clearInterval(autoAdvance);
        });
        
        testimonialActive.addEventListener("mouseleave", () => {
            autoAdvance = setInterval(() => {
                if (currentIndex < testimonials.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateActiveTestimonial();
            }, 3000);
        });
    }
});

