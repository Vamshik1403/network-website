/*=============== PRODUCT PAGE FUNCTIONALITY ===============*/
document.addEventListener("DOMContentLoaded", function() {
    // Fix testimonial image paths for product pages
    function fixTestimonialImagePaths() {
        // Check if we're in a product page (in the files subfolder)
        const isProductPage = window.location.pathname.includes('/files/');
        
        if (isProductPage) {
            // Directly update the image source to ensure it's using the correct path
            const testimonialImgs = document.querySelectorAll('.testimonial__img');
            
            testimonialImgs.forEach(img => {
                // Set the correct path for each image
                img.src = "../assets/img/favicon.png";
                
                // Add onerror handler in case the image still fails to load
                img.onerror = function() {
                    // Try an alternative image if the first one fails
                    this.src = "../assets/img/network-booster.jpg";
                    
                    // If that also fails, use a placeholder or text
                    this.onerror = function() {
                        const userDiv = this.closest('.testimonial__user');
                        if (userDiv) {
                            // Replace image with initials in a circle
                            const name = userDiv.querySelector('.testimonial__name')?.textContent || 'User';
                            const initials = name.split(' ').map(n => n[0]).join('');
                            
                            // Create a span to replace the image
                            const span = document.createElement('span');
                            span.style.width = '50px';
                            span.style.height = '50px';
                            span.style.borderRadius = '50%';
                            span.style.backgroundColor = '#6c5ce7';
                            span.style.color = 'white';
                            span.style.display = 'flex';
                            span.style.alignItems = 'center';
                            span.style.justifyContent = 'center';
                            span.style.fontWeight = 'bold';
                            span.textContent = initials;
                            
                            // Replace the image with the span
                            this.parentNode.replaceChild(span, this);
                        }
                    };
                };
            });
            
            // Also ensure all future testimonial changes have the correct path
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Find any new testimonial images and fix their paths
                        const newImgs = document.querySelectorAll('.testimonial__img');
                        newImgs.forEach(img => {
                            if (img.src.includes('assets/img/') && !img.src.includes('../assets/img/')) {
                                img.src = "../assets/img/favicon.png";
                            }
                        });
                    }
                });
            });
            
            // Start observing the testimonial section for changes
            const testimonialActive = document.getElementById("testimonial-active");
            if (testimonialActive) {
                observer.observe(testimonialActive, { childList: true, subtree: true });
            }
        }
    }
    
    // Run the fix immediately
    fixTestimonialImagePaths();
    
    // Tab functionality with faster transitions
    const tabButtons = document.querySelectorAll('.product-details__tab');
    const tabContents = document.querySelectorAll('.product-details__tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        // Apply faster transitions to tab content
        tabContents.forEach(content => {
            content.style.transition = 'opacity 0.2s ease';
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding content
                const targetId = button.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // FAQ Accordion functionality with faster animations
    const faqItems = document.querySelectorAll('.product-details__faq');
    
    if (faqItems.length > 0) {
        // Apply faster transitions to FAQ answers
        faqItems.forEach(item => {
            const answer = item.querySelector('.product-details__faq-answer');
            if (answer) {
                answer.style.transition = 'all 0.2s ease';
            }
            
            const question = item.querySelector('.product-details__faq-question');
            if (question) {
                const icon = question.querySelector('i');
                if (icon) {
                    icon.style.transition = 'transform 0.2s ease';
                }
            }
            
            question.addEventListener('click', () => {
                // Toggle active class on the clicked FAQ item
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items first
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open the clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Open first FAQ by default
        if (faqItems[0]) {
            faqItems[0].classList.add('active');
        }
    }
}); 