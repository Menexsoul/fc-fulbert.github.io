// ===== RÉSULTATS - FILTRES =====

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    const matchCards = document.querySelectorAll('.match-card-calendar');
    const classementCards = document.querySelectorAll('.classement-card');
    
    // Fonction pour filtrer les résultats
    function filterResults(team) {
        // Filtrer les cartes de matchs
        matchCards.forEach(card => {
            if (team === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                if (card.classList.contains(team)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
        
        // Filtrer les cartes de classement
        classementCards.forEach(card => {
            if (team === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                if (card.classList.contains(team)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // Ajouter les événements de clic sur les boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Obtenir l'équipe à filtrer
            const team = this.getAttribute('data-team');
            
            // Filtrer les résultats
            filterResults(team);
            
            // Animation lors du changement de filtre
            const visibleCards = document.querySelectorAll('.match-card-calendar:not(.hidden), .classement-card:not(.hidden)');
            visibleCards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                }, 10);
            });
        });
    });
    
    // Initialiser avec tous les résultats visibles
    filterResults('all');
});

// Animation CSS pour les résultats filtrés
const style = document.createElement('style');
style.textContent = `
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
    
    .match-card-calendar.hidden,
    .classement-card.hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);