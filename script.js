// Modal open/close logic
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const helpForm = document.getElementById('helpForm');
const confirmation = document.getElementById('confirmation');

openModalBtn.onclick = function(e) {
  e.preventDefault();
  modal.style.display = 'block';
  confirmation.style.display = 'none';
  helpForm.style.display = 'block';
};

closeModalBtn.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Form submission logic
helpForm.onsubmit = function(e) {
  e.preventDefault();
  // Here you could send the data to a server or save it in localStorage
  helpForm.style.display = 'none';
  confirmation.style.display = 'block';
  setTimeout(() => {
    modal.style.display = 'none';
    helpForm.reset();
  }, 1800);
};