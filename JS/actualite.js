/* ============================================
   ACTUALITÉS PAGE JAVASCRIPT - FC-FULBERT CHARTRES
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // VARIABLES GLOBALES
    // ===========================
    
    const newsGrid = document.getElementById('newsGrid');
    const newsCards = document.querySelectorAll('.news-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchNews');
    const noResults = document.getElementById('noNewsResults');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const featuredArticle = document.querySelector('.featured-article');
    
    let currentFilter = 'all';
    let currentSearch = '';
    let visibleCount = 9; // Nombre d'articles visibles initialement
    
    
    // ===========================
    // FILTRAGE PAR CATÉGORIE
    // ===========================
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie
            currentFilter = this.getAttribute('data-category');
            
            // Réinitialiser le compteur
            visibleCount = 9;
            
            // Filtrer les articles
            filterNews();
        });
    });
    
    
    // ===========================
    // RECHERCHE
    // ===========================
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase().trim();
            
            // Réinitialiser le compteur
            visibleCount = 9;
            
            // Filtrer les articles
            filterNews();
        });
    }
    
    
    // ===========================
    // FONCTION DE FILTRAGE
    // ===========================
    
    function filterNews() {
        let visibleCards = 0;
        let matchingCards = 0;
        
        // Filtrer l'article à la une
        if (featuredArticle) {
            const featuredCategory = featuredArticle.getAttribute('data-category');
            const featuredText = featuredArticle.textContent.toLowerCase();
            
            if ((currentFilter === 'all' || featuredCategory === currentFilter) &&
                (currentSearch === '' || featuredText.includes(currentSearch))) {
                featuredArticle.parentElement.style.display = 'block';
            } else {
                featuredArticle.parentElement.style.display = 'none';
            }
        }
        
        // Filtrer les cartes d'actualités
        newsCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const text = card.textContent.toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = currentSearch === '' || text.includes(currentSearch);
            
            if (matchesFilter && matchesSearch) {
                matchingCards++;
                
                if (matchingCards <= visibleCount) {
                    card.style.display = 'flex';
                    visibleCards++;
                    
                    // Animation d'apparition
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        // Afficher/masquer le message "Aucun résultat"
        if (visibleCards === 0 && (!featuredArticle || featuredArticle.parentElement.style.display === 'none')) {
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
        }
        
        // Afficher/masquer le bouton "Charger plus"
        if (matchingCards > visibleCount) {
            loadMoreBtn.classList.remove('hidden');
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    }
    
    
    // ===========================
    // BOUTON CHARGER PLUS
    // ===========================
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleCount += 6; // Charger 6 articles de plus
            filterNews();
            
            // Scroll vers les nouveaux articles
            setTimeout(() => {
                const firstHiddenCard = Array.from(newsCards).find(card => 
                    card.style.display === 'none' && 
                    (currentFilter === 'all' || card.getAttribute('data-category') === currentFilter)
                );
                
                if (firstHiddenCard) {
                    firstHiddenCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
    }
    
    
    // ===========================
    // NEWSLETTER FORM
    // ===========================
    
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simuler l'inscription
                showNotification('✓ Merci ! Vous êtes maintenant inscrit à notre newsletter.', 'success');
                emailInput.value = '';
            } else {
                showNotification('⚠ Veuillez entrer une adresse email valide.', 'error');
            }
        });
    }
    
    // Validation email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    
    // ===========================
    // NOTIFICATIONS
    // ===========================
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Retirer la notification après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    
    // ===========================
    // ANIMATIONS AU SCROLL
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments
    document.querySelectorAll('.news-card, .archive-card, .featured-article').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    
    // ===========================
    // TEMPS DE LECTURE ESTIMÉ
    // ===========================
    
    function calculateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }
    
    // Ajouter le temps de lecture à chaque carte
    newsCards.forEach(card => {
        const content = card.querySelector('.news-content p');
        if (content) {
            const readingTime = calculateReadingTime(content.textContent);
            const readingSpan = card.querySelector('.news-reading');
            if (readingSpan && readingTime > 0) {
                readingSpan.textContent = `⏱️ ${readingTime} min`;
            }
        }
    });
    
    
    // ===========================
    // PARTAGE SUR RÉSEAUX SOCIAUX
    // ===========================
    
    // Ajouter des boutons de partage aux articles (optionnel)
    function addShareButtons() {
        newsCards.forEach(card => {
            const content = card.querySelector('.news-content');
            const title = card.querySelector('h3').textContent;
            const url = window.location.href;
            
            // Créer conteneur de partage
            const shareContainer = document.createElement('div');
            shareContainer.className = 'share-buttons';
            shareContainer.style.cssText = `
                display: flex;
                gap: 0.5rem;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #e0e0e0;
            `;
            
            // Bouton Facebook
            const fbBtn = createShareButton('📘', 'Facebook', 
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
            
            // Bouton Twitter
            const twitterBtn = createShareButton('🐦', 'Twitter', 
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
            
            // Bouton WhatsApp
            const whatsappBtn = createShareButton('💬', 'WhatsApp', 
                `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
            
            shareContainer.appendChild(fbBtn);
            shareContainer.appendChild(twitterBtn);
            shareContainer.appendChild(whatsappBtn);
            
            // Insérer avant le lien "Lire l'article"
            const newsLink = content.querySelector('.news-link');
            if (newsLink) {
                content.insertBefore(shareContainer, newsLink);
            }
        });
    }
    
    function createShareButton(emoji, platform, url) {
        const btn = document.createElement('a');
        btn.href = url;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.textContent = emoji;
        btn.title = `Partager sur ${platform}`;
        btn.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background: var(--bg-light);
            border-radius: 50%;
            text-decoration: none;
            font-size: 1.2rem;
            transition: var(--transition);
        `;
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.background = 'var(--orange)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = 'var(--bg-light)';
        });
        
        return btn;
    }
    
    // Activer les boutons de partage (décommentez si souhaité)
    // addShareButtons();
    
    
    // ===========================
    // TRI PAR DATE
    // ===========================
    
    function sortNewsByDate(ascending = false) {
        const cardsArray = Array.from(newsCards);
        
        cardsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            
            return ascending ? dateA - dateB : dateB - dateA;
        });
        
        // Réorganiser les cartes dans le DOM
        cardsArray.forEach(card => newsGrid.appendChild(card));
    }
    
    // Par défaut, trier par date décroissante (plus récent en premier)
    sortNewsByDate(false);
    
    
    // ===========================
    // INITIALISATION
    // ===========================
    
    // Appliquer le filtre initial
    filterNews();
    
});


// ===========================
// ANIMATIONS CSS
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);