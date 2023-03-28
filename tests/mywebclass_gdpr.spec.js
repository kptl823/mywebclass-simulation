// Check if user has given consent for cookies
function checkConsent() {
  return localStorage.getItem('cookieConsent');
}

// Set consent for cookies
function setConsent() {
  localStorage.setItem('cookieConsent', 'true');
}

// Show cookie consent banner if consent has not been given
if (!checkConsent()) {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div class="cookie-banner">
      <p>This website uses cookies to improve your experience. Click "Accept" to consent to the use of cookies.</p>
      <button class="cookie-accept" onclick="setConsent()">Accept</button>
    </div>
  `;
  document.body.appendChild(banner);
}

