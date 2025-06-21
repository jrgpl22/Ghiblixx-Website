
async function loadSharedNavbar() {
    try {
        const response = await fetch('shared-navbar.html');
        const navbarHTML = await response.text();
        document.getElementById('navbar-container').innerHTML = navbarHTML;
        
        setActiveNavPage();
        
        setTimeout(() => {
            initializeNavbarFunctions();
        }, 100);
        
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

function setActiveNavPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.navbar a:not(.watchlist-btn)');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
           (currentPage === 'index.html' && href === 'home.html') ||
           (currentPage === '' && href === 'home.html')) {
            link.classList.add('active');
        }
    });
}

function initializeNavbarFunctions() {
    window.toggleDropdown = function() {
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    };

    document.addEventListener('click', function(event) {
        const profileSection = document.querySelector('.profile-section');
        const dropdown = document.getElementById('profileDropdown');
        
        if (profileSection && dropdown && !profileSection.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    const savedUser = localStorage.getItem('currentGhibliUser');
    const savedUsers = JSON.parse(localStorage.getItem('ghibliUsers')) || {};
    
    if (savedUser && savedUsers[savedUser]) {
        window.currentUser = savedUser;
        window.users = savedUsers;
        updateProfileDisplayLocal();
    }
    window.logoutUser = function() {
        window.currentUser = null;
        localStorage.removeItem('currentGhibliUser');
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        updateProfileDisplayLocal();
        alert('Logged out successfully!');
        window.location.reload();
    };
    if (document.getElementById('authModal')) {
        initAuthSystemShared();
    }
}

function updateProfileDisplayLocal() {
    const profileImg = document.querySelector('.profile-img');
    const authAction = document.getElementById('authAction');

    if (window.currentUser) {
        if (profileImg) {
            profileImg.src = 'img/totoro-avatar.png';
            profileImg.classList.add('logged-in');
        }
        if (authAction) {
            authAction.textContent = 'LOGOUT';
        }
    } else {
        if (profileImg) {
            profileImg.src = 'img/defaultpfp.jpg';
            profileImg.classList.remove('logged-in');
        }
        if (authAction) {
            authAction.textContent = 'SIGN UP';
        }
    }
    
    if (typeof window.updateWatchlistCount === 'function') {
        window.updateWatchlistCount();
    }
}

function initAuthSystemShared() {
    const authModal = document.getElementById('authModal');
    const authClose = document.querySelector('.auth-close');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    const authAction = document.getElementById('authAction');
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');

    if (!authModal || !authAction) return;

    function showAuthModal(type) {
        authModal.style.display = 'block';
        switchAuthForm(type);
    }

    function switchAuthForm(type) {
        if (type === 'signup') {
            if (signupForm) signupForm.style.display = 'block';
            if (loginForm) loginForm.style.display = 'none';
        } else {
            if (signupForm) signupForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
        }
    }

    authAction.addEventListener('click', function(e) {
        e.preventDefault();
        if (window.currentUser) {
            window.logoutUser();
        } else {
            if (authModal && typeof showAuthModal === 'function') {
                showAuthModal('signup');
            }
        }
    });

    if (authClose) {
        authClose.addEventListener('click', function() {
            authModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('login');
        });
    }

    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('signup');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignupLocal();
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLoginLocal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && authModal.style.display === 'block') {
            if (signupForm && signupForm.style.display !== 'none') {
                handleSignupLocal();
            } else {
                handleLoginLocal();
            }
        }
    });

    function handleSignupLocal() {
        const username = document.getElementById('signupUsername').value.trim();
        const password = document.getElementById('signupPassword').value.trim();

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (username.length < 8) {
            alert('Username must be at least 8 characters long');
            return;
        }

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        window.users = JSON.parse(localStorage.getItem('ghibliUsers')) || {};

        if (window.users[username]) {
            alert('Username already exists!');
            return;
        }

        window.users[username] = {
            password: password,
            watchlist: [],
            avatar: 'totoro-avatar.png'
        };

        localStorage.setItem('ghibliUsers', JSON.stringify(window.users));
        window.currentUser = username;
        localStorage.setItem('currentGhibliUser', username);
        updateProfileDisplayLocal();
        authModal.style.display = 'none';
        alert('Account created successfully!');
        window.location.reload();
    
        document.getElementById('signupUsername').value = '';
        document.getElementById('signupPassword').value = '';
    }

    function handleLoginLocal() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (username.length < 8 || password.length < 8) {
            alert('Username and password must be at least 8 characters long');
            return;
        }

        window.users = JSON.parse(localStorage.getItem('ghibliUsers')) || {};
        
        if (!window.users[username] || window.users[username].password !== password) {
            alert('Invalid username or password!');
            return;
        }

        window.currentUser = username;
        localStorage.setItem('currentGhibliUser', username);
        updateProfileDisplayLocal();
        
        authModal.style.display = 'none';
        alert('Logged in successfully!');
        window.location.reload();
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    }

    window.showAuthModal = showAuthModal;
    window.switchAuthForm = switchAuthForm;
}

document.addEventListener('DOMContentLoaded', loadSharedNavbar);