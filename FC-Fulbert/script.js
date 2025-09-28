// ===== FC-FULBERT CHARTRES - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIABLES GLOBALES =====
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // ===== HEADER SCROLL EFFECT =====
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ===== MENU MOBILE TOGGLE =====
    function initMobileMenu() {
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
            });

            // Fermer le menu mobile en cliquant sur un lien
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });

            // Fermer le menu mobile en cliquant à l'extérieur
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // ===== SMOOTH SCROLLING =====
    function initSmoothScrolling() {
        // Smooth scrolling pour les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== NAVIGATION ACTIVE =====
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Pour les pages, vérifier si on est sur la bonne page
            if (href && !href.startsWith('#')) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                if (href === currentPage || (href === 'index.html' && currentPage === '')) {
                    link.classList.add('active');
                }
            }
            // Pour les ancres
            else if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== ANIMATION AU SCROLL (INTERSECTION OBSERVER) =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        const elementsToAnimate = document.querySelectorAll(
            '.team-card, .news-card, .youth-card, .hero-content'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== CORRECTION SIMPLIFIÉE POUR LES SOUS-CATÉGORIES JEUNES =====
    function fixYouthCategoriesDisplay() {
        const youthSection = document.querySelector('.youth-section');
        if (youthSection && youthSection.style.display === 'none') {
            youthSection.style.display = 'block';
        }
        
        const youthCategories = document.querySelector('.youth-categories');
        if (youthCategories && youthCategories.style.display === 'none') {
            youthCategories.style.display = 'grid';
        }
        
        const youthCards = document.querySelectorAll('.youth-card');
        youthCards.forEach(card => {
            if (card && card.style.display === 'none') {
                card.style.display = 'block';
            }
        });
    }

    // ===== GESTION DES FORMULAIRES =====
    function initForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation basique
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    showNotification('Merci pour votre message ! L\'équipe du FC-Fulbert Chartres vous recontactera bientôt.', 'success');
                    form.reset();
                } else {
                    showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                }
            });
        });
    }

    // ===== SYSTÈME DE NOTIFICATIONS =====
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Fermer la notification
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        });
        
        // Auto-fermeture après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }

    // ===== LAZY LOADING DES IMAGES =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== PARALLAX EFFECT =====
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero, .stats');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('hero')) {
                    element.style.transform = `translateY(${scrolled * 0.5}px)`;
                } else if (element.classList.contains('stats')) {
                    element.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            });
        });
    }

    // ===== GESTION DES BOUTONS SOCIAUX =====
    function initSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Animation de clic simple
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 150);
                
                // Analytics (si nécessaire)
                const platform = this.className.split(' ').find(cls => cls !== 'social-btn');
                console.log(`Clic sur le bouton social: ${platform}`);
            });
        });
    }

    // ===== GESTION DE LA RECHERCHE (si applicable) =====
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();
                
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (query.length >= 2) {
                        performSearch(query);
                    } else {
                        hideSearchResults();
                    }
                }, 300);
            });
        }
    }

    function performSearch(query) {
        // Simulation d'une recherche
        const searchableContent = [
            { title: 'Équipe Senior FC-Fulbert', url: 'equipe-senior.html', type: 'page' },
            { title: 'Équipe Féminine FC-Fulbert', url: 'equipe-feminine.html', type: 'page' },
            { title: 'Formation Jeunes', url: 'equipe-jeune.html', type: 'page' },
            { title: 'Actualités du club', url: 'actualite.html', type: 'page' },
            { title: 'Contact FC-Fulbert Chartres', url: 'contact.html', type: 'page' }
        ];
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Aucun résultat trouvé</div>';
        } else {
            const resultsHTML = results.map(result => `
                <div class="search-result-item">
                    <a href="${result.url}">${result.title}</a>
                    <span class="result-type">${result.type}</span>
                </div>
            `).join('');
            searchResults.innerHTML = resultsHTML;
        }
        
        searchResults.style.display = 'block';
    }

    function hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    // ===== GESTION DES COOKIES (RGPD) =====
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('fc-fulbert-cookie-consent');
        
        if (!cookieConsent) {
            showCookieConsent();
        }
    }

    function showCookieConsent() {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>🍪 Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant, vous acceptez notre utilisation des cookies.</p>
                <div class="cookie-buttons">
                    <button class="cookie-accept">Accepter</button>
                    <button class="cookie-decline">Refuser</button>
                    <a href="politique-confidentialite.html">En savoir plus</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(cookieBanner);
        
        // Gestion des boutons
        cookieBanner.querySelector('.cookie-accept').addEventListener('click', () => {
            localStorage.setItem('fc-fulbert-cookie-consent', 'accepted');
            cookieBanner.remove();
        });
        
        cookieBanner.querySelector('.cookie-decline').addEventListener('click', () => {
            localStorage.setItem('fc-fulbert-cookie-consent', 'declined');
            cookieBanner.remove();
        });
    }

    // ===== AMÉLIORATION DE L'ACCESSIBILITÉ =====
    function initAccessibility() {
        // Gestion de la navigation au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Fermer le menu mobile
                if (navLinks && navLinks.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Fermer les notifications
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notif => notif.remove());
            }
        });
    }

    // ===== PERFORMANCE MONITORING =====
    function initPerformanceMonitoring() {
        // Mesurer le temps de chargement
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`FC-Fulbert Chartres - Page chargée en ${Math.round(loadTime)}ms`);
        });
        
        // Observer les métriques Core Web Vitals si disponible
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        console.log(`FC-Fulbert Performance - ${entry.name}: ${Math.round(entry.value)}ms`);
                    });
                });
                
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                console.log('Performance Observer non supporté');
            }
        }
    }

    // ===== INITIALISATION SIMPLIFIÉE =====
    function init() {
        console.log('🏆 FC-Fulbert Chartres - Initialisation du site web');
        
        // Correction simple au démarrage
        setTimeout(() => {
            fixYouthCategoriesDisplay();
        }, 500);
        
        // Initialiser tous les modules
        initMobileMenu();
        initSmoothScrolling();
        initScrollAnimations();
        initForms();
        initLazyLoading();
        initParallaxEffect();
        initSocialButtons();
        initSearch();
        initCookieConsent();
        initAccessibility();
        initPerformanceMonitoring();
        
        // Événements de scroll optimisés sans conflits
        window.addEventListener('scroll', throttle(function() {
            handleHeaderScroll();
            updateActiveNavigation();
        }, 16));
        
        // Gestion du redimensionnement
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            // Correction légère au redimensionnement
            fixYouthCategoriesDisplay();
        }, 250));
        
        // Initialisation de la navigation active
        updateActiveNavigation();
        
        console.log('✅ FC-Fulbert Chartres - Site initialisé avec succès !');
    }

    // ===== DÉMARRAGE SIMPLE =====
    init();

// ===== SUPPRESSION DES FONCTIONS PROBLÉMATIQUES =====
// Section chiffres maintenant en CSS pur

// ===== CORRECTION FINALE SIMPLE =====
window.addEventListener('load', function() {
    setTimeout(() => {
        const youthSection = document.querySelector('.youth-section');
        if (youthSection && youthSection.style.display === 'none') {
            youthSection.style.display = 'block';
        }
        
        console.log('🎯 Correction finale appliquée');
    }, 1000);
});

});

// ===== FONCTIONS UTILITAIRES GLOBALES =====

// Fonction pour débounce (optimisation performance)
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Fonction pour throttle (optimisation performance)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Fonction pour détecter si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Fonction pour formater les dates
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
}

// Fonction pour valider les emails
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Console log stylé pour le développement
console.log('%c🏆 FC-Fulbert Chartres', 'color: #1a1a1a; font-size: 20px; font-weight: bold;');
console.log('%c⚽ Club de football en Eure-et-Loir', 'color: #ff6b35; font-size: 14px;');
console.log('%cSite web développé avec passion pour le FC-Fulbert ! 💙', 'color: #666; font-style: italic;');