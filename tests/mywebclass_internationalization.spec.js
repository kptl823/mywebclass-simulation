// Define default language
const defaultLang = 'en';

// Load translations
function loadTranslations(lang) {
  fetch('package.json')
    .then(response => response.json())
    .then(translations => {
      // Update text content using translated strings
      document.getElementById('welcome-message').textContent = translations[lang].welcome_message;
      document.getElementById('about-us-link').textContent = translations[lang].about_us;
      document.getElementById('contact-us-link').textContent = translations[lang].contact_us;
    });
}

// Check for stored language preference or use default
let storedLang = localStorage.getItem('lang');
let lang = storedLang || defaultLang;

// Load translations for selected language
loadTranslations(lang);

// Update language preference
function updateLangPreference(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  loadTranslations(lang);
}
