// Modal functionality
const openModalBtns = document.querySelectorAll('#openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const helpForm = document.getElementById('helpForm');
const confirmation = document.getElementById('confirmation');
const progressFill = document.getElementById('progressFill');

// Login/Register functionality
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toggleText = document.getElementById('toggleText');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');

// Contact form functionality
const contactForm = document.getElementById('contactForm');
const contactConfirmation = document.getElementById('contactConfirmation');

// Password toggle functionality
const togglePassword = document.getElementById('togglePassword');
const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');

// Sample data for posts (in a real app, this would come from a database)
let posts = [
  {
    id: 1,
    name: "Joseph J.",
    type: "request",
    description: "Need help moving furniture to my new apartment this weekend. Heavy items like sofa and wardrobe.",
    contact: "joseph.j@email.com",
    date: "2025-01-08"
  },
  {
    id: 2,
    name: "Daniel J. Harrigan",
    type: "offer",
    description: "Offering free tutoring in mathematics for high school students. Available weekday evenings.",
    contact: "+1 (555) 123-4567",
    date: "2025-01-07"
  },
  {
    id: 3,
    name: "Larry B. Ryals",
    type: "request",
    description: "Looking for someone to walk my dog while I'm recovering from surgery. Small friendly dog.",
    contact: "larry.ryals@email.com",
    date: "2025-01-06"
  },
  {
    id: 4,
    name: "Bernard G. Smith",
    type: "offer",
    description: "Professional plumber offering free minor repairs for elderly neighbors. Basic fixes only.",
    contact: "+1 (555) 987-6543",
    date: "2025-01-05"
  },
  {
    id: 5,
    name: "Angela L. Vogel",
    type: "request",
    description: "Need babysitting help for my 5-year-old daughter on Saturday evening. Experienced sitter preferred.",
    contact: "angela.vogel@email.com",
    date: "2025-01-04"
  }
];

// ======= UTILITY FUNCTIONS =======
// Function to update progress bar
function updateProgress() {
  if (!helpForm || !progressFill) return;
  
  const inputs = helpForm.querySelectorAll('input[required], select[required], textarea[required]');
  let filled = 0;
  
  inputs.forEach(input => {
    if (input.value.trim() !== '') filled++;
  });
  
  const progress = (filled / inputs.length) * 100;
  progressFill.style.width = progress + '%';
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
          // For input and textarea
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

// ======= MODAL FUNCTIONALITY =======
// Modal open/close logic
openModalBtns.forEach(btn => {
  if (btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        handleFloatingLabels(); // Initialize floating labels
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
  
  if (event.target === authModal) {
    authModal.classList.remove('show');
    setTimeout(() => {
      authModal.style.display = 'none';
    }, 300);
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
    
    // Get form data
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const contact = document.getElementById('contact').value;
    
    // Add new post to array
    const nextId = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost = {
      id: nextId,
      name: name,
      type: type,
      description: description,
      contact: contact,
      date: new Date().toISOString().split('T')[0]
    };
    
    posts.unshift(newPost); // Add to beginning of array
    
    // Update dashboard if we're on dashboard page
    if (document.getElementById('postsGrid')) {
      updateStats();
      renderPosts();
    }
    
    // Show loading animation
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
          helpForm.style.display = 'block';
          confirmation.style.display = 'none';
          if (btnText) btnText.textContent = 'Submit Post';
          updateProgress();
        }, 400);
      }, 2500);
    }, 1000);
  };
}

// ======= LOGIN/REGISTER FUNCTIONALITY =======
// Function to show register form
function showRegisterForm() {
  if (loginForm && registerForm) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    toggleText.innerHTML = 'Already have an account? <a href="#" id="showLogin">Sign in here</a>';
    
    // Attach event to go back to login
    const showLoginLink = document.getElementById('showLogin');
    if (showLoginLink) {
      showLoginLink.addEventListener('click', showLoginForm);
    }
  }
}

// Function to show login form
function showLoginForm(e) {
  if (e) e.preventDefault();
  
  if (loginForm && registerForm) {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="showRegister">Sign up here</a>';
    
    // Attach event to go to register
    const showRegisterLink = document.getElementById('showRegister');
    if (showRegisterLink) {
      showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
      });
    }
  }
}

// Password toggle functionality
if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
  });
}

if (toggleRegisterPassword) {
  toggleRegisterPassword.addEventListener('click', () => {
    const passwordInput = document.getElementById('registerPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleRegisterPassword.textContent = type === 'password' ? '👁️' : '🙈';
  });
}

// Login form submission
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btnText = document.getElementById('loginBtnText');
    const loader = loginForm.querySelector('.btn-loader');
    
    // Show loading
    btnText.style.display = 'none';
    loader.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
      btnText.style.display = 'block';
      loader.style.display = 'none';
      
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', document.getElementById('loginEmail').value);
      
      // Show success modal briefly then redirect
      authModal.style.display = 'block';
      setTimeout(() => {
        authModal.classList.add('show');
        document.getElementById('authSuccess').style.display = 'block';
      }, 10);
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
      
    }, 2000);
  });
}

// Register form submission
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }
    
    if (password.length < 6) {
      alert('❌ Password must be at least 6 characters long!');
      return;
    }
    
    const btnText = document.getElementById('registerBtnText');
    const loader = registerForm.querySelector('.btn-loader');
    
    // Show loading
    btnText.style.display = 'none';
    loader.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
      btnText.style.display = 'block';
      loader.style.display = 'none';
      
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', document.getElementById('registerEmail').value);
      localStorage.setItem('userName', document.getElementById('registerName').value);
      
      // Show success modal briefly then redirect
      authModal.style.display = 'block';
      setTimeout(() => {
        authModal.classList.add('show');
        document.getElementById('registerSuccess').style.display = 'block';
      }, 10);
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
      
    }, 2000);
  });
}

// Close auth modal
if (closeAuthModal) {
  closeAuthModal.addEventListener('click', () => {
    authModal.classList.remove('show');
    setTimeout(() => {
      authModal.style.display = 'none';
      // Reset modal content
      document.getElementById('authSuccess').style.display = 'none';
      document.getElementById('registerSuccess').style.display = 'none';
    }, 300);
  });
}

// ======= DASHBOARD FUNCTIONALITY =======
function updateStats() {
  const totalRequestsEl = document.getElementById('totalRequests');
  const totalOffersEl = document.getElementById('totalOffers');
  const totalActiveEl = document.getElementById('totalActive');
  
  if (totalRequestsEl && totalOffersEl && totalActiveEl) {
    const totalRequests = posts.filter(post => post.type === 'request').length;
    const totalOffers = posts.filter(post => post.type === 'offer').length;
    const totalActive = posts.length;
    
    totalRequestsEl.textContent = totalRequests;
    totalOffersEl.textContent = totalOffers;
    totalActiveEl.textContent = totalActive;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

function createPostCard(post) {
  const typeIcon = post.type === 'request' ? '🙋‍♀️' : '🤝';
  const typeText = post.type === 'request' ? 'Help Request' : 'Help Offer';
  return `
    <div class="post-card" id="post-${post.id}">
      <div class="post-header">
        <span class="post-type">${typeIcon} ${typeText}</span>
        <span class="post-date">${formatDate(post.date)}</span>
      </div>
      <h3 class="post-name">${post.name}</h3>
      <p class="post-desc">${post.description}</p>
      <p class="post-contact">📞 Contact: ${post.contact}</p>
      <div class="post-actions">
        <button class="btn btn-contact" onclick="contactPerson('${post.contact}')">💬 Contact</button>
        <button class="btn btn-share" onclick="sharePost(${post.id})">📤 Share</button>
        <button class="btn btn-delete" onclick="deletePost(${post.id})" title="Delete post">🗑️ Delete</button>
      </div>
    </div>
  `;
}

function renderPosts(postsToRender = posts) {
  const postsGrid = document.getElementById('postsGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (!postsGrid || !emptyState) return;
  
  if (postsToRender.length === 0) {
    postsGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    postsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    postsGrid.innerHTML = postsToRender.map(post => createPostCard(post)).join('');
  }
}

function deletePost(postId) {
  if (!confirm('Tem certeza que deseja deletar este post?')) return;

  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) return;

  posts.splice(index, 1); // remove do array

  // Atualiza UI
  updateStats();
  renderPosts();
}

function filterPosts(filterType) {
  let filteredPosts = posts;
  
  if (filterType !== 'all') {
    filteredPosts = posts.filter(post => post.type === filterType);
  }
  
  renderPosts(filteredPosts);
}

function searchPosts(searchTerm) {
  const filteredPosts = posts.filter(post => 
    post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  renderPosts(filteredPosts);
}

function contactPerson(contact) {
  if (contact.includes('@')) {
    window.location.href = `mailto:${contact}`;
  } else {
    window.location.href = `tel:${contact}`;
  }
}

function sharePost(postId) {
  const post = posts.find(p => p.id === postId);
  if (post) {
    const shareText = `Check out this ${post.type} from ${post.name}: ${post.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'NeighboursHelp Post',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('📋 Post details copied to clipboard!');
      });
    }
  }
}

// ======= USER AUTHENTICATION & NAVIGATION =======
function updateNavigation(isLoggedIn, userInfo) {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  if (isLoggedIn) {
    // Replace login link with user info and logout
    const loginLink = nav.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.innerHTML = `👤 ${userInfo.split('@')[0]}`;
      loginLink.href = '#';
      loginLink.onclick = showUserMenu;
    }
  }
}

function showUserMenu(e) {
  e.preventDefault();
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  
  const menu = `
    <div class="user-menu" id="userMenu">
      <div class="user-info">
        <strong>${userName || userEmail.split('@')[0]}</strong>
        <small>${userEmail}</small>
      </div>
      <hr>
      <a href="dashboard.html">📊 Dashboard</a>
      <a href="#" onclick="logout()">🚪 Logout</a>
    </div>
  `;
  
  // Remove existing menu
  const existingMenu = document.getElementById('userMenu');
  if (existingMenu) {
    existingMenu.remove();
    return;
  }
  
  // Add menu to page
  document.body.insertAdjacentHTML('beforeend', menu);
  
  // Position menu
  const menuEl = document.getElementById('userMenu');
  const rect = e.target.getBoundingClientRect();
  menuEl.style.position = 'fixed';
  menuEl.style.top = (rect.bottom + 10) + 'px';
  menuEl.style.right = '20px';
  menuEl.style.zIndex = '1001';
  
  // Close menu when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menuEl.contains(e.target)) {
        menuEl.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 100);
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  alert('👋 You have been logged out successfully!');
  window.location.href = 'index.html';
}

function personalizeWelcome(userInfo) {
  const welcomeMessage = document.querySelector('.welcome-message h1');
  if (welcomeMessage) {
    const firstName = userInfo.split('@')[0].split('.')[0];
    welcomeMessage.innerHTML = `🏠 Welcome back, ${firstName}!`;
  }
  
  const welcomeDesc = document.querySelector('.welcome-message p');
  if (welcomeDesc) {
    welcomeDesc.textContent = 'Here are all the help requests and offers in your neighborhood';
  }
}

// ======= CONTACT FORM =======
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

// ======= SMOOTH SCROLLING =======
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

// ======= INITIALIZATION =======
// Check login status and protect pages
document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');
  const currentPage = window.location.pathname.split('/').pop();
  
  // Update navigation based on login status
  updateNavigation(isLoggedIn, userName || userEmail);
  
  // Protect dashboard page
  if (currentPage === 'dashboard.html' && !isLoggedIn) {
    alert('🔒 Please login to access the dashboard');
    window.location.href = 'login.html';
    return;
  }
  
  // Redirect logged-in users from login page to dashboard
  if (currentPage === 'login.html' && isLoggedIn) {
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Personalize dashboard welcome message
  if (currentPage === 'dashboard.html' && isLoggedIn) {
    personalizeWelcome(userName || userEmail);
  }
  
  // Initialize dashboard
  if (document.getElementById('postsGrid')) {
    updateStats();
    renderPosts();
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPosts(btn.dataset.filter);
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
      });
    }
    
    // Add post buttons for dashboard
    const dashboardModalBtns = document.querySelectorAll('#openModalBtn, #openModalBtn2');
    dashboardModalBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const modal = document.getElementById('modal');
          if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
              modal.classList.add('show');
              document.body.classList.add('modal-open');
              handleFloatingLabels();
            }, 10);
          }
        });
      }
    });
  }
  
  // Initialize toggle between login/register forms
  const initialShowRegister = document.getElementById('showRegister');
  if (initialShowRegister) {
    initialShowRegister.addEventListener('click', function(e) {
      e.preventDefault();
      showRegisterForm();
    });
  }
  
  // Handle floating labels for auth forms
  if (document.querySelector('.auth-form')) {
    const authInputs = document.querySelectorAll('.auth-form input');
    authInputs.forEach(input => {
      const label = input.nextElementSibling;
      
      if (label && label.tagName === 'LABEL') {
        function handleLabel() {
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
        
        input.addEventListener('focus', handleLabel);
        input.addEventListener('blur', handleLabel);
        input.addEventListener('input', handleLabel);
        
        // Check initial state
        handleLabel();
      }
    });
  }
});