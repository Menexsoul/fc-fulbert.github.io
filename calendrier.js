// ===== CALENDRIER - FILTRES MATCHS =====

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    const matchCards = document.querySelectorAll('.match-card-calendar');
    
    // Fonction pour filtrer les matchs
    function filterMatches(team) {
        matchCards.forEach(card => {
            if (team === 'all') {
                // Afficher tous les matchs
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                // Filtrer par équipe
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
            
            // Filtrer les matchs
            filterMatches(team);
            
            // Animation lors du changement de filtre
            matchCards.forEach((card, index) => {
                if (!card.classList.contains('hidden')) {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                    }, 10);
                }
            });
        });
    });
    
    // Initialiser avec tous les matchs visibles
    filterMatches('all');
});

// Animation CSS pour les matchs filtrés
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
`;
document.head.appendChild(style);