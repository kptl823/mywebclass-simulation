// ga.js - Google Analytics tracking code

function loadGA() {
  // Load Google Analytics script
  var gaScript = document.createElement('script');
  gaScript.setAttribute('async', '');
  gaScript.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID');
  document.head.appendChild(gaScript);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', {
    'anonymize_ip': true, // Enable IP anonymization
    'cookie_expires': 31536000, // Set data retention period to 1 year
    'cookie_prefix': 'ga', // Customize cookie name prefix
    'allow_google_signals': false, // Disable advertising features
    'send_page_view': false // Manually trigger pageview events
  });
}

function initGA() {
  // Check if user has already given consent
  var consentCookie = getCookie('ga_consent');
  if (consentCookie == 'true') {
    loadGA();
  } else {
    // Show confirmation modal for user consent
    showConsentModal();
  }
}

function getCookie(name) {
  // Helper function to get cookie value by name
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
}

function setCookie(name, value, days) {
  // Helper function to set cookie value with expiration date
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function showConsentModal() {
  // Show confirmation modal for user consent
  // ...
  // Handle user clicks on "Accept" or "Decline" buttons
  var acceptButton = document.getElementById('accept-button');
  acceptButton.addEventListener('click', function() {
    setCookie('ga_consent', 'true', 365); // Set cookie for 1 year
    loadGA();
    // Hide confirmation modal
  });
  var declineButton = document.getElementById('decline-button');
  declineButton.addEventListener('click', function() {
    setCookie('ga_consent', 'false', 365); // Set cookie for 1 year
    // Hide confirmation modal
  });
}

initGA();
