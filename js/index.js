'use strict';
import { showModalTestimonial } from './showModalTestimonial.js';
import { showModalAvatar } from './showModalAvatar.js';

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle('active');
};

// sidebar variables
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener('click', function () {
  elementToggleFunc(sidebar);
});

// contact form variables
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled');
    } else {
      formBtn.setAttribute('disabled', '');
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add('active');
        navigationLinks[i].classList.add('active');
        window.scrollTo(0, 0);
        const element = document.querySelector('[show-more-actions]');
        if (element.classList.contains('active')) {
          setTimeout(() => {
            element.classList.remove('active');
          }, 200);
        }
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active');
      }
    }
  });
}

/**
 * Scroll Top Func
 */
window.addEventListener('scroll', function () {
  let scrollTopBtn = document.querySelector('.scroll-to-top');
  if (!scrollTopBtn) return;

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

/**
 * Show Modal Testimonial
 */
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', showModalTestimonial.bind(null, testimonialsItem[i]));
}

/**
 * Show Modal Avatar
 */
const modalAvatar = document.querySelector('[modal-avatar]');
modalAvatar.addEventListener('click', showModalAvatar.bind(null, modalAvatar));

/**
 * Handle page content display when reload
 */
window.addEventListener('load', function () {
  if (!location.hash) return;
  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].href.includes(location.hash)) {
      for (let i = 0; i < pages.length; i++) {
        if (location.hash.includes(pages[i].dataset.page.split(' ').join('-'))) {
          pages[i].classList.add('active');
          navigationLinks[i].classList.add('active');
        } else {
          pages[i].classList.remove('active');
          navigationLinks[i].classList.remove('active');
        }
      }
      break;
    }
  }
});
