// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); // This should be the container, not the links
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Task 4: Interactive Button - Background Color Change
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    
    // Define an array of background colors to cycle through
    const colors = [
        '#f5f5f5',  // Light gray (default)
        '#e8f4f8',  // Light blue
        '#f0f8e8',  // Light green
        '#f8f0e8',  // Light orange
        '#f8e8f4'   // Light purple
    ];
    
    // Keep track of the current color index
    let currentColorIndex = 0;
    
    // Add click event listener to the button
    if (colorChangeBtn) {
        colorChangeBtn.addEventListener('click', function() {
            // Move to the next color in the array
            currentColorIndex = (currentColorIndex + 1) % colors.length;
            
            // Apply the new background color to the body
            document.body.style.backgroundColor = colors[currentColorIndex];
            
            // Add a subtle animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }

    // Task 5: API Integration
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const apiDataContainer = document.getElementById('apiData');

    // Add click event listener to the fetch data button
    if (fetchDataBtn && apiDataContainer) {
        fetchDataBtn.addEventListener('click', function() {
            // Show loading message
            apiDataContainer.innerHTML = '<p class="loading-text">Loading data... <span class="spinner"></span></p>';

            // Fetch data from JSONPlaceholder API
            fetch('[https://jsonplaceholder.typicode.com/posts?_limit=5')](https://jsonplaceholder.typicode.com/posts?_limit=5'))
                .then(response => {
                    // Check if the response is ok (status in the range 200-299)
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Replace the Lorem ipsum content with more realistic English content
                    const englishPosts = [
                        {
                            id: 1,
                            title: "Getting Started with Web Development",
                            body: "Web development is an exciting field that combines creativity and technical skills. To get started, learn the basics of HTML, CSS, and JavaScript. These three technologies form the foundation of modern web development."
                        },
                        {
                            id: 2,
                            title: "The Importance of Responsive Design",
                            body: "In today's world where people access websites from various devices, responsive design is crucial. It ensures your website looks and functions well on desktops, tablets, and mobile phones, providing a seamless user experience across all platforms."
                        },
                        {
                            id: 3,
                            title: "JavaScript Frameworks: A Comparison",
                            body: "There are several popular JavaScript frameworks like React, Angular, and Vue.js. Each has its strengths and weaknesses. React is known for its virtual DOM, Angular for its comprehensive structure, and Vue for its simplicity and flexibility."
                        },
                        {
                            id: 4,
                            title: "Best Practices for Web Accessibility",
                            body: "Web accessibility ensures that websites are usable by people with disabilities. Some best practices include using semantic HTML, providing alt text for images, ensuring sufficient color contrast, and making your site keyboard navigable."
                        },
                        {
                            id: 5,
                            title: "Introduction to API Integration",
                            body: "APIs allow your website to communicate with other services and fetch dynamic data. Understanding how to use fetch() or axios to make API calls, handle responses, and update your UI accordingly is an essential skill for modern web developers."
                        }
                    ];
                    
                    // Process the data and update the DOM with our English posts
                    displayPosts(englishPosts);
                })
                .catch(error => {
                    // Handle any errors that occurred during fetch
                    apiDataContainer.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
                    console.error('Fetch error:', error);
                });
        });
    }

    // Function to display posts in the DOM
    function displayPosts(posts) {
        // Clear the container
        apiDataContainer.innerHTML = '';

        // Check if we have posts
        if (posts.length === 0) {
            apiDataContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        // Create a heading
        const heading = document.createElement('h3');
        heading.textContent = 'Posts from API';
        apiDataContainer.appendChild(heading);

        // Create a container for the posts
        const postsContainer = document.createElement('div');
        postsContainer.className = 'posts-container';

        // Loop through the posts and create elements for each
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.style.animationDelay = `${index * 0.1}s`; // Staggered animation

            const titleElement = document.createElement('h4');
            titleElement.className = 'post-title';
            titleElement.textContent = post.title;

            const bodyElement = document.createElement('p');
            bodyElement.className = 'post-body';
            bodyElement.textContent = post.body;

            // Append the elements to the post container
            postElement.appendChild(titleElement);
            postElement.appendChild(bodyElement);

            // Append the post to the posts container
            postsContainer.appendChild(postElement);
        });

        // Append the posts container to the API data container
        apiDataContainer.appendChild(postsContainer);
    }

    // Task 6: Form Validation
    const contactForm = document.getElementById('contactForm');
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const termsCheckbox = document.getElementById('terms');
    
    // Get error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const termsError = document.getElementById('termsError');
    
    // Add submit event listener to the form
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Reset previous error messages
            resetErrors();
            
            // Flag to track validation status
            let isValid = true;
            
            // Validate name (required, min length 2)
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Name is required');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            // Validate email (required, valid format)
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (optional, but if provided, must be valid)
            if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
                showError(phoneInput, phoneError, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate subject (required)
            if (!subjectInput.value) {
                showError(subjectInput, subjectError, 'Please select a subject');
                isValid = false;
            }
            
            // Validate message (required, min length 10)
            if (!messageInput.value.trim()) {
                showError(messageInput, messageError, 'Message is required');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // Validate terms (must be checked)
            if (!termsCheckbox.checked) {
                showError(termsCheckbox, termsError, 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            // If the form is valid, process it
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                // For this example, we'll just show a success message and reset the form
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Form submitted successfully! Thank you for your message.';
                successMessage.style.display = 'block';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Reset the form
                contactForm.reset();
                
                // Hide the success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 500);
                }, 5000);
            }
        });
    }
    
    // Helper function to show error messages
    function showError(inputElement, errorElement, message) {
        // Add error class to the form group
        inputElement.parentElement.classList.add('error');
        // Set the error message
        errorElement.textContent = message;
    }
    
    // Helper function to reset all error messages
    function resetErrors() {
        // Remove error class from all form groups
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
        
        // Clear all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate phone format
    function isValidPhone(phone) {
        // This is a simple validation for demonstration
        // In a real application, you might want to use a more sophisticated validation
        // or a library like libphonenumber-js
        const phoneRegex = /^[\d\s\-()+]{10,15}$/;
        return phoneRegex.test(phone);
    }
    
    // Add smooth scrolling for navigation links
    const navLinkElements = document.querySelectorAll('.nav-links a');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links with hash
            if (this.hash !== '') {
                e.preventDefault();
                
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash after scrolling
                    setTimeout(() => {
                        window.location.hash = hash;
                    }, 800);
                }
            }
        });
    });
});