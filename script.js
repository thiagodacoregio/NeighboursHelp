// Modal functionality
const openModalBtns = document.querySelectorAll('#openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const helpForm = document.getElementById('helpForm');
const confirmation = document.getElementById('confirmation');

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const contactConfirmation = document.getElementById('contactConfirmation');

// Modal open/close logic
openModalBtns.forEach(btn => {
  if (btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
      }, 10);
      if (confirmation) confirmation.style.display = 'none';
      if (helpForm) helpForm.style.display = 'block';
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
      }, 300);
    };
  }
});

if (closeModalBtn) {
  closeModalBtn.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 300);
  };
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none'; 
      document.body.classList.remove('modal-open');
    }, 300);
  }
};

// Help form submission logic
if (helpForm) {
  helpForm.onsubmit = function(e) {
    e.preventDefault();
    helpForm.style.display = 'none';
    confirmation.style.display = 'block';
    setTimeout(() => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        helpForm.reset();
      }, 300);
    }, 2000);
  };
}

// Contact form submission logic
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    contactConfirmation.style.display = 'block';
    setTimeout(() => {
      contactForm.style.display = 'block';
      contactConfirmation.style.display = 'none';
      contactForm.reset();
    }, 3000);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});