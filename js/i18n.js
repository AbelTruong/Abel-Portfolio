'use strict';

class I18n {
  constructor() {
    this.currentLang = 'vi'; // Default language
    this.translations = {};
    this.init();
  }

  async init() {
    try {
      await this.loadTranslations();

      // Check localStorage for saved language preference
      const savedLang = localStorage.getItem('abtech_language');
      if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
        this.currentLang = savedLang;
      }

      // Render content
      this.render();

      // Bind events
      this.bindEvents();
    } catch (error) {
      console.error('Failed to initialize i18n:', error);
    }
  }

  async loadTranslations() {
    try {
      const [vi, en] = await Promise.all([
        fetch('./mocks/i18n/vi.json').then((r) => r.json()),
        fetch('./mocks/i18n/en.json').then((r) => r.json()),
      ]);
      this.translations = { vi, en };
    } catch (error) {
      console.error('Failed to load translations, using fallback:', error);
      // Fallback: keep default HTML content
      this.translations = { vi: {}, en: {} };
    }
  }

  render() {
    const data = this.translations[this.currentLang];
    if (!data || Object.keys(data).length === 0) {
      console.warn('No translation data available for', this.currentLang);
      return;
    }

    // Update all elements with [data-i18n] attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = this.getNestedValue(data, key);

      if (value !== undefined && value !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else {
          // Check if element should use innerHTML (has data-i18n-html attribute)
          if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = value;
          } else {
            el.textContent = value;
          }
        }
      }
    });

    // Render dynamic sections
    this.renderServices();
    this.renderProcess();
    this.renderFAQ();
    this.renderExperience();

    // Update meta tags
    this.updateMetaTags();

    // Update active state of language toggle
    this.updateLanguageToggle();
  }

  renderServices() {
    const data = this.translations[this.currentLang];
    if (!data || !data.services || !data.services.packages) return;

    const container = document.getElementById('services-packages-list');
    if (!container) return;

    container.innerHTML = data.services.packages
      .map(
        (pkg, index) => `
      <li class="service-item service-package" data-package="${index}">
        <div class="service-icon-box">
          <div class="package-number">${String(index + 1).padStart(2, '0')}</div>
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${pkg.name}</h4>
          <p class="service-item-description">${pkg.description}</p>
          <div class="package-details">
            <p class="package-price"><strong>${pkg.price}</strong></p>
            <p class="package-duration">⏱ ${pkg.duration}</p>
          </div>
          <ul class="package-features">
            ${pkg.features.map((feature) => `<li>✓ ${feature}</li>`).join('')}
          </ul>
          <button class="btn-cta" onclick="document.querySelector('[data-nav-link][href=\\'#contact\\']').click()">
            ${pkg.cta}
          </button>
        </div>
      </li>
    `
      )
      .join('');
  }

  renderProcess() {
    const data = this.translations[this.currentLang];
    if (!data || !data.process || !data.process.steps) return;

    const container = document.getElementById('process-steps-list');
    if (!container) return;

    container.innerHTML = data.process.steps
      .map(
        (step) => `
      <li class="process-item">
        <div class="process-number">${step.number}</div>
        <div class="process-content">
          <h4 class="h4 process-title">${step.title}</h4>
          <p class="process-description">${step.description}</p>
        </div>
      </li>
    `
      )
      .join('');
  }

  renderFAQ() {
    const data = this.translations[this.currentLang];
    if (!data || !data.faq || !data.faq.items) return;

    const container = document.getElementById('faq-list');
    if (!container) return;

    container.innerHTML = data.faq.items
      .map(
        (item, index) => `
      <li class="faq-item">
        <button class="faq-question" data-faq-toggle="${index}">
          <h4 class="h4">${item.question}</h4>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
        <div class="faq-answer" data-faq-answer="${index}">
          <p>${item.answer}</p>
        </div>
      </li>
    `
      )
      .join('');

    // Bind FAQ toggle events
    this.bindFAQEvents();
  }

  renderExperience() {
    const data = this.translations[this.currentLang];
    if (!data || !data.experience || !data.experience.work) return;

    const container = document.getElementById('experience-work-list');
    if (!container) return;

    container.innerHTML = data.experience.work.items
      .map(
        (company) => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${company.company}</h4>
        <span>${company.period}</span>
        <div class="timeline-content">
          ${company.projects
            .map(
              (project) => `
            <div class="project-item">
              ${
                project.url
                  ? `<a href="${project.url}" target="_blank" class="hover-link">
                   <p class="timeline-text"><strong>${project.name}</strong></p>
                 </a>`
                  : `<p class="timeline-text"><strong>${project.name}</strong></p>`
              }
              <p class="timeline-text">${project.description}</p>
              <p class="timeline-text">
                <span class="timeline-tech">${this.currentLang === 'vi' ? 'Công nghệ' : 'Technologies'}:</span>
                ${project.tech}
              </p>
            </div>
          `
            )
            .join('')}
        </div>
      </li>
    `
      )
      .join('');
  }

  bindFAQEvents() {
    document.querySelectorAll('[data-faq-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-faq-toggle');
        const answer = document.querySelector(`[data-faq-answer="${index}"]`);
        const icon = btn.querySelector('ion-icon');

        // Toggle answer visibility
        answer.classList.toggle('active');
        btn.classList.toggle('active');

        // Rotate icon
        if (answer.classList.contains('active')) {
          icon.style.transform = 'rotate(180deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  updateMetaTags() {
    const data = this.translations[this.currentLang];
    if (!data || !data.meta) return;

    // Update title
    document.title = data.meta.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = data.meta.description;

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = data.meta.keywords;

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = data.meta.ogTitle;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = data.meta.ogDescription;

    // Update Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.content = data.meta.ogTitle;

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.content = data.meta.ogDescription;
  }

  updateLanguageToggle() {
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
    });

    // Update toggle text if using single toggle button
    const toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
      toggleBtn.textContent = this.currentLang.toUpperCase();
    }
  }

  switchLanguage(lang) {
    if (lang !== 'vi' && lang !== 'en') {
      console.warn('Invalid language:', lang);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem('abtech_language', lang);
    this.render();
  }

  bindEvents() {
    // Language toggle buttons
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.switchLanguage(btn.getAttribute('data-lang'));
      });
    });

    // Single toggle button (if exists)
    const singleToggle = document.getElementById('lang-toggle-single');
    if (singleToggle) {
      singleToggle.addEventListener('click', () => {
        const newLang = this.currentLang === 'vi' ? 'en' : 'vi';
        this.switchLanguage(newLang);
      });
    }
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}

// Export for use in other modules
export { I18n };

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.abtechI18n = new I18n();
  });
} else {
  window.abtechI18n = new I18n();
}
