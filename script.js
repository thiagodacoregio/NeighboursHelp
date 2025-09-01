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

// Função para atualizar barra de progresso
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

// Atualizar progresso em tempo real
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

// Função para controlar labels flutuantes
function handleFloatingLabels() {
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    const label = group.querySelector('label');

    if (input && label) {
      // Função para mover label
      function moveLabel() {
        // Para select, verificar se tem valor selecionado diferente de vazio
        if (input.tagName === 'SELECT') {
          if (input.value !== '' && input.value !== 'Choose type...') {
            group.classList.add('has-value');
          } else {
            group.classList.remove('has-value');
          }
        } else {
          // Para input e textarea
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

      // Verificar estado inicial
      moveLabel();
    }
  });
}

// Chamar a função quando o modal abrir
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