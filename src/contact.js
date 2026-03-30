// ==========================================
// CONTACT PAGE FUNCTIONALITY
// ==========================================

// Analytics tracking
class ContactAnalytics {
  constructor() {
    this.stats = {
      totalVisits: 0,
      whatsappClicks: 0,
      emailClicks: 0,
      formSubmissions: 0,
      referralSources: {},
      visitorInfo: {}
    };
    this.init();
  }

  init() {
    this.loadStats();
    this.trackVisit();
    this.setupEventTracking();
    this.updateDashboard();
  }

  loadStats() {
    const saved = localStorage.getItem('contactAnalytics');
    if (saved) {
      this.stats = { ...this.stats, ...JSON.parse(saved) };
    }
  }

  saveStats() {
    localStorage.setItem('contactAnalytics', JSON.stringify(this.stats));
  }

  trackVisit() {
    this.stats.totalVisits++;
    
    // Track visitor info
    this.stats.visitorInfo = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenSize: `${screen.width}x${screen.height}`,
      referrer: document.referrer || 'direct',
      url: window.location.href
    };

    // Track referral source
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source') || urlParams.get('ref') || 'direct';
    this.stats.referralSources[source] = (this.stats.referralSources[source] || 0) + 1;

    this.saveStats();
    this.updateDashboard();
  }

  trackEvent(eventType, data = {}) {
    switch (eventType) {
      case 'whatsapp-click':
        this.stats.whatsappClicks++;
        break;
      case 'email-click':
        this.stats.emailClicks++;
        break;
      case 'form-submit':
        this.stats.formSubmissions++;
        break;
    }
    
    this.saveStats();
    this.updateDashboard();
    
    // Send to external analytics (optional)
    this.sendToAnalytics(eventType, data);
  }

  sendToAnalytics(eventType, data) {
    // You can integrate with Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
      gtag('event', eventType, {
        event_category: 'contact',
        event_label: data.source || 'unknown',
        value: 1
      });
    }
  }

  setupEventTracking() {
    // Track WhatsApp clicks
    document.querySelectorAll('[data-track="whatsapp-click"]').forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('whatsapp-click', { source: 'contact-page' });
      });
    });

    // Track email clicks
    document.querySelectorAll('[data-track="email-click"]').forEach(link => {
      link.addEventListener('click', () => {
        this.trackEvent('email-click', { source: 'contact-page' });
      });
    });

    // Track form submissions
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.trackEvent('form-submit', { 
          source: 'contact-form',
          formData: new FormData(form)
        });
      });
    }
  }

  updateDashboard() {
    document.getElementById('total-visits').textContent = this.stats.totalVisits;
    document.getElementById('whatsapp-clicks').textContent = this.stats.whatsappClicks;
    document.getElementById('email-clicks').textContent = this.stats.emailClicks;
    document.getElementById('form-submissions').textContent = this.stats.formSubmissions;
  }

  showDashboard() {
    const dashboard = document.getElementById('analytics-dashboard');
    dashboard.style.display = 'block';
  }

  hideDashboard() {
    const dashboard = document.getElementById('analytics-dashboard');
    dashboard.style.display = 'none';
  }
}

// Form handling
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.setupValidation();
    }
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
      this.showError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }
    }

    this.clearError(field);
    return true;
  }

  showError(field, message) {
    this.clearError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--accent)';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '4px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--accent)';
  }

  clearError(field) {
    const errorDiv = field.parentNode.querySelector('.form-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    field.style.borderColor = '';
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    const submitButton = this.form.querySelector('.form-submit');
    const originalText = submitButton.querySelector('.form-submit__text').textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.querySelector('.form-submit__text').textContent = 'Sending...';
    submitButton.querySelector('.form-submit__icon').style.display = 'none';

    try {
      // Collect form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());
      
      // Add visitor info
      data.visitorInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href
      };

      // Send to your backend (replace with your actual endpoint)
      const response = await this.sendFormData(data);
      
      if (response.ok) {
        this.showSuccess();
        this.form.reset();
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError('Failed to send message. Please try again.');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.querySelector('.form-submit__text').textContent = originalText;
      submitButton.querySelector('.form-submit__icon').style.display = 'block';
    }
  }

  async sendFormData(data) {
    // Replace with your actual backend endpoint
    return fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }

  showSuccess() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
      <div style="background: #d4edda; color: #155724; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #c3e6cb;">
        <strong>Message sent successfully!</strong><br>
        I'll get back to you within 24 hours.
      </div>
    `;
    
    this.form.parentNode.insertBefore(successDiv, this.form.nextSibling);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
      <div style="background: #f8d7da; color: #721c24; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #f5c6cb;">
        <strong>Error:</strong> ${message}
      </div>
    `;
    
    this.form.parentNode.insertBefore(errorDiv, this.form.nextSibling);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize analytics
  window.contactAnalytics = new ContactAnalytics();
  
  // Initialize form
  window.contactForm = new ContactForm();
  
  // Show analytics dashboard with keyboard shortcut (Ctrl+Shift+A)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      window.contactAnalytics.showDashboard();
    }
  });
  
  console.log('🎯 Contact page loaded with analytics tracking');
  console.log('📊 Press Ctrl+Shift+A to view analytics dashboard');
});
