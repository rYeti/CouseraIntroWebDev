/**
 * Portfolio Interactive Features
 * Includes: Menu toggle, smooth scrolling, project filtering, form validation
 */

// ========================================
// MENU TOGGLE FUNCTIONALITY
// ========================================

const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

/**
 * Toggle mobile navigation menu visibility
 */
function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  menuToggle.classList.toggle('active');
  mainNav.classList.toggle('active');
  console.log('Menu toggled. Expanded:', !isExpanded);
}

// Event listener for menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
  console.log('Menu toggle initialized');
}

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    mainNav.classList.remove('active');
    console.log('Navigation link clicked, menu closed');
  });
});

// ========================================
// SMOOTH SCROLLING (ENHANCED)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('Scrolled to:', href);
    }
  });
});

// ========================================
// PROJECT FILTERING
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

/**
 * Filter projects by category
 * @param {string} category - The category to filter by ('all', 'responsive', 'interactive')
 */
function filterProjects(category) {
  console.log('Filtering projects by category: ' + category);
  
  // Update button states
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      console.log('Button ' + category + ' activated');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Show/hide projects
  projects.forEach(project => {
    const projectCategory = project.getAttribute('data-category');
    
    if (category === 'all' || projectCategory === category) {
      project.classList.remove('hidden');
      console.log('Project ' + projectCategory + ' shown');
    } else {
      project.classList.add('hidden');
      console.log('Project ' + projectCategory + ' hidden');
    }
  });
}

// Event listeners for filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const category = e.target.getAttribute('data-filter');
    filterProjects(category);
  });
});

console.log('Project filtering initialized');

// ========================================
// FORM VALIDATION
// ========================================

const contactForm = document.querySelector('form');
const nameInput = document.getElementById('contact-name');
const emailInput = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Display validation error message
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message text
 */
function showError(input, errorElement, message) {
  input.classList.add('invalid');
  errorElement.textContent = message;
  errorElement.classList.add('show');
  console.log('Validation error for ' + input.id + ': ' + message);
}

/**
 * Clear validation error message
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 */
function clearError(input, errorElement) {
  input.classList.remove('invalid');
  errorElement.textContent = '';
  errorElement.classList.remove('show');
  console.log('Error cleared for ' + input.id);
}

/**
 * Validate form fields in real-time
 * @param {HTMLElement} input - Input element being validated
 */
function validateField(input) {
  const errorElement = document.getElementById(input.id + '-error');
  
  if (!errorElement) {
    console.warn('Error element not found for ' + input.id);
    return true;
  }

  if (input.id === 'contact-name') {
    if (input.value.trim().length < 2) {
      showError(input, errorElement, 'Name must be at least 2 characters long');
      return false;
    } else {
      clearError(input, errorElement);
      return true;
    }
  }

  if (input.id === 'contact-email') {
    if (!isValidEmail(input.value.trim())) {
      showError(input, errorElement, 'Please enter a valid email address');
      return false;
    } else {
      clearError(input, errorElement);
      return true;
    }
  }

  if (input.id === 'contact-message') {
    if (input.value.trim().length < 10) {
      showError(input, errorElement, 'Message must be at least 10 characters long');
      return false;
    } else {
      clearError(input, errorElement);
      return true;
    }
  }

  return true;
}

// Real-time validation on input
if (nameInput) {
  nameInput.addEventListener('blur', () => validateField(nameInput));
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('invalid')) {
      validateField(nameInput);
    }
  });
}

if (emailInput) {
  emailInput.addEventListener('blur', () => validateField(emailInput));
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) {
      validateField(emailInput);
    }
  });
}

if (messageInput) {
  messageInput.addEventListener('blur', () => validateField(messageInput));
  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('invalid')) {
      validateField(messageInput);
    }
  });
}

// Form submission validation
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submission attempted');

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
      console.log('Form validation passed. Submitting...');
      console.log({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      });
      
      // Here you would typically send the form data to a server
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
      
      // Clear any error states
      clearError(nameInput, document.getElementById('name-error'));
      clearError(emailInput, document.getElementById('email-error'));
      clearError(messageInput, document.getElementById('message-error'));
    } else {
      console.log('Form validation failed. Please correct errors.');
    }
  });

  console.log('Form validation initialized');
}