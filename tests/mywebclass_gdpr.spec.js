// gdpr.js - GDPR compliance code

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

function deleteCookies() {
  // Delete all cookies with domain and path
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf('=') != -1) {
      var name = cookie.split('=')[0];
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }
  }
}

function showConsentModal() {
  // Show confirmation modal for user consent
  // ...
  // Handle user clicks on "Accept" or "Decline" buttons
  var acceptButton = document.getElementById('accept-button');
  acceptButton.addEventListener('click', function() {
    setCookie('gdpr_consent', 'true', 365); // Set cookie for 1 year
    // Hide confirmation modal
  });
  var declineButton = document.getElementById('decline-button');
  declineButton.addEventListener('click', function() {
    deleteCookies(); // Delete all cookies
    // Hide confirmation modal
  });
}

function initGDPR() {
  // Check if user has already given consent
  var consentCookie = getCookie('gdpr_consent');
  if (consentCookie != 'true') {
    // Show confirmation modal for user consent
    showConsentModal();
  }
}

initGDPR();
