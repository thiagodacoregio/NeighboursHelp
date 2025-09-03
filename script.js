// Modal functionality
const openModalBtns = document.querySelectorAll('#openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const helpForm = document.getElementById('helpForm');
const confirmation = document.getElementById('confirmation');
const progressFill = document.getElementById('progressFill');

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const contactConfirmation = document.getElementById('contactConfirmation');

// Function to update progress bar
function updateProgress() {
  const inputs = helpForm.querySelectorAll('input[required], select[required], textarea[required]');
  let filled = 0;
  
  inputs.forEach(input => {
    if (input.value.trim() !== '') filled++;
  });
  
  const progress = (filled / inputs.length) * 100;
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
}

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
      
      if (confirmation) {
        confirmation.style.display = 'none';
        confirmation.classList.remove('show');
      }
      if (helpForm) helpForm.style.display = 'block';
      if (progressFill) progressFill.style.width = '0%';
      
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
      }, 400);
    };
  }
});

if (closeModalBtn) {
  closeModalBtn.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 400);
  };
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 400);
  }
};

// Update progress in real time
if (helpForm) {
  const formInputs = helpForm.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', updateProgress);
    input.addEventListener('change', updateProgress);
  });
}

// Help form submission logic
if (helpForm) {
  helpForm.onsubmit = function(e) {
    e.preventDefault();
    
    // Animação do botão
    const btnText = document.getElementById('btnText');
    if (btnText) {
      btnText.textContent = 'Submitting...';
    }
    
    setTimeout(() => {
      helpForm.style.display = 'none';
      confirmation.style.display = 'block';
      setTimeout(() => {
        confirmation.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          helpForm.reset();
          if (btnText) btnText.textContent = 'Submit Post';
          updateProgress();
        }, 400);
      }, 2500);
    }, 1000);
  };
}

// Function to control floating labels
function handleFloatingLabels() {
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    const label = group.querySelector('label');

    if (input && label) {
      // Function to move label
      function moveLabel() {
        // For select, check if it has a selected value other than empty
        if (input.tagName === 'SELECT') {
          if (input.value !== '' && input.value !== 'Choose type...') {
            group.classList.add('has-value');
          } else {
            group.classList.remove('has-value');
          }
        } else {
          // To input and textarea
          if (input.value !== '' || input === document.activeElement) {
            label.style.top = '-8px';
            label.style.left = '15px';
            label.style.fontSize = '0.8em';
            label.style.color = '#40916c';
            label.style.background = '#fff';
            label.style.padding = '0 8px';
            label.style.fontWeight = '600';
          } else {
            label.style.top = '15px';
            label.style.left = '20px';
            label.style.fontSize = '1em';
            label.style.color = '#666';
            label.style.background = 'transparent';
            label.style.padding = '0';
            label.style.fontWeight = 'normal';
          }
        }
      }

      // Event listeners
      input.addEventListener('focus', moveLabel);
      input.addEventListener('blur', moveLabel);
      input.addEventListener('input', moveLabel);
      input.addEventListener('change', moveLabel);

      // Check initial status
      moveLabel();
    }
  });
}

// Call the function when the modal opens
openModalBtns.forEach(btn => {
  if (btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        handleFloatingLabels(); // ← ADICIONE ESTA LINHA
      }, 10);
      
      if (confirmation) {
        confirmation.style.display = 'none';
        confirmation.classList.remove('show');
      }
      if (helpForm) helpForm.style.display = 'block';
      if (progressFill) progressFill.style.width = '0%';
      
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
      }, 400);
    };
  }
});

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