/* ---------- Configuration ---------- */
const BUSINESS_NAME = "BRIJ ART'S";
const PHONE = '+91 7354095636'; 
const WHATSAPP_PHONE = '917354095636'; // Country code included, no '+'
const EMAIL = 'brijartssjr@gmail.com';
const ADDRESS = 'H-82, Punjabi Bagh Colony, Ashoka Garden, Bhopal 462023';

// Replace this with your actual Formspree or server endpoint
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; 

/* ---------- Initialization ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // Populate text placeholders
    document.querySelector('.brand h1').textContent = BUSINESS_NAME;
    
    // Update Phone numbers
    const phoneDisplay = document.getElementById('phone-display');
    if(phoneDisplay) phoneDisplay.textContent = PHONE;
    
    const phone2 = document.getElementById('phone-2');
    if(phone2) phone2.textContent = PHONE;

    // Update Email
    const emailEl = document.getElementById('email');
    if(emailEl) emailEl.textContent = EMAIL;

    // Update Address (Top and Footer)
    const addrEl = document.getElementById('address-display');
    if(addrEl) addrEl.textContent = ADDRESS;

    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------- Functions ---------- */

// Open WhatsApp
function openWhatsApp() {
  const text = encodeURIComponent('Hi, I want a quote for a sign. My details:');
  // Using a universal link that works on mobile and desktop
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  window.open(url, '_blank');
}

// Handle Enquiry Form Submission
async function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('enquiry-form');
  const msgBox = document.getElementById('form-msg');
  
  const payload = {
    name: form.name.value,
    phone: form.phone.value,
    service: form.service.value,
    size: form.size.value,
    message: form.message.value
  };

  // Basic validation
  if (!payload.phone || !payload.name) {
    showMsg('Please provide name & phone.', 'error');
    return;
  }

  showMsg('Sending...', 'pending');

  try {
    // If the user hasn't set up a real endpoint yet, simulate success
    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
        setTimeout(() => {
            showMsg('Thank you! We received your enquiry (Demo Mode).', 'success');
            form.reset();
        }, 1000);
        return;
    }

    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok || res.status === 0) {
      showMsg('Thank you! We received your enquiry. We will contact you shortly.', 'success');
      form.reset();
    } else {
      showMsg('Failed to send. Please try WhatsApp or call.', 'error');
    }
  } catch (err) {
    console.error(err);
    showMsg('Unable to send form. Use WhatsApp or call us.', 'error');
  }
}

// Helper to show messages
function showMsg(text, type) {
  const el = document.getElementById('form-msg');
  el.style.display = 'block';
  el.textContent = text;
  
  // Reset classes
  el.className = '';
  
  if (type === 'success') {
      el.classList.add('msg-success');
      el.style.color = '#b9ffda';
  } else if (type === 'error') {
      el.classList.add('msg-error');
      el.style.color = '#ffb9b9';
  } else {
      el.style.color = 'var(--muted)';
  }
}
