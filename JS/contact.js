/* ============================================
   CONTACT PAGE JAVASCRIPT - FC-FULBERT CHARTRES
   ============================================ */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // GESTION DU FORMULAIRE
    // ===========================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                consent: document.getElementById('consent').checked
            };
            
            // Validation basique
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!formData.consent) {
                showMessage('Vous devez accepter l\'utilisation de vos données.', 'error');
                return;
            }
            
            // Validation email
            if (!isValidEmail(formData.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simuler l'envoi du formulaire
            submitForm(formData);
        });
    }
    
    // Fonction pour valider l'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fonction pour afficher les messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll vers le message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Masquer le message après 5 secondes pour les erreurs
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Fonction pour soumettre le formulaire
    function submitForm(formData) {
        // Désactiver le bouton pendant l'envoi
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Simuler un délai d'envoi (dans la vraie vie, vous feriez un appel API ici)
        setTimeout(() => {
            // Succès simulé
            showMessage('✓ Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Log des données (à des fins de développement)
            console.log('Formulaire soumis:', formData);
            
            // Dans un environnement de production, vous feriez quelque chose comme :
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showMessage('✓ Merci ! Votre message a été envoyé avec succès.', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
            */
            
        }, 1500);
    }
    
    
    // ===========================
    // GESTION FAQ ACCORDÉON
    // ===========================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle l'item courant
            item.classList.toggle('active');
        });
    });
    
    
    // ===========================
    // VALIDATION EN TEMPS RÉEL
    // ===========================
    
    // Validation email en temps réel
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)') {
                if (isValidEmail(this.value)) {
                    this.style.borderColor = '#28a745';
                }
            }
        });
    }
    
    // Validation téléphone (optionnel mais améliore l'UX)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Autoriser uniquement les chiffres, espaces, points, tirets et parenthèses
            this.value = this.value.replace(/[^0-9\s\.\-\(\)\+]/g, '');
        });
    }
    
    
    // ===========================
    // ANIMATIONS AU SCROLL
    // ===========================
    
    // Intersection Observer pour les animations
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
    
    // Observer les cartes de contact
    document.querySelectorAll('.contact-card, .access-card, .social-box, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    
    // ===========================
    // COPIE DES COORDONNÉES
    // ===========================
    
    // Fonction pour copier dans le presse-papier
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(function() {
            // Afficher une notification
            const notification = document.createElement('div');
            notification.textContent = '✓ Copié !';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(notification);
            
            // Retirer la notification après 2 secondes
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }).catch(function(err) {
            console.error('Erreur de copie:', err);
        });
    }
    
    // Ajouter la fonctionnalité de copie aux emails et téléphones
    document.querySelectorAll('.contact-card a[href^="tel:"], .contact-card a[href^="mailto:"]').forEach(link => {
        link.style.cursor = 'pointer';
        link.setAttribute('title', 'Cliquer pour copier');
        
        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const text = this.textContent.trim();
                copyToClipboard(text, this);
            }
        });
    });
    
    
    // ===========================
    // COMPTEUR DE CARACTÈRES POUR LE MESSAGE
    // ===========================
    
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const maxLength = 1000;
        
        // Créer le compteur
        const counter = document.createElement('div');
        counter.style.cssText = `
            text-align: right;
            color: #999;
            font-size: 0.85rem;
            margin-top: 0.5rem;
        `;
        counter.textContent = `0 / ${maxLength} caractères`;
        messageTextarea.parentElement.appendChild(counter);
        
        // Mettre à jour le compteur
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / ${maxLength} caractères`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#ff6b35';
            } else {
                counter.style.color = '#999';
            }
        });
        
        // Limiter la longueur
        messageTextarea.setAttribute('maxlength', maxLength);
    }
    
    
    // ===========================
    // SMOOTH SCROLL POUR LES ANCRES
    // ===========================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});


// ===========================
// ANIMATIONS CSS KEYFRAMES
// ===========================

// Ajouter les animations au document
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
`;
document.head.appendChild(style);