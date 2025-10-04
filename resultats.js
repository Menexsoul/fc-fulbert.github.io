// ===== RÉSULTATS - FILTRES (VERSION CORRIGÉE) =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script résultats chargé');
    
    // Sélectionner tous les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Boutons trouvés:', filterButtons.length);
    
    // Sélectionner toutes les cartes
    const matchCards = document.querySelectorAll('.match-card-calendar');
    const classementCards = document.querySelectorAll('.classement-card');
    console.log('Cartes de matchs trouvées:', matchCards.length);
    console.log('Cartes de classement trouvées:', classementCards.length);
    
    // Fonction pour filtrer les résultats
    function filterResults(team) {
        console.log('Filtrage pour:', team);
        
        // Filtrer les cartes de matchs
        matchCards.forEach(card => {
            if (team === 'all') {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                if (card.classList.contains(team)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            }
        });
        
        // Filtrer les cartes de classement
        classementCards.forEach(card => {
            if (team === 'all') {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                if (card.classList.contains(team)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            }
        });
    }
    
    // Ajouter les événements de clic sur les boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Bouton cliqué');
            
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'white';
                btn.style.color = 'var(--black)';
                btn.style.border = '2px solid var(--orange)';
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            this.style.background = 'linear-gradient(45deg, var(--orange), var(--pink))';
            this.style.color = 'white';
            this.style.border = 'none';
            
            // Obtenir l'équipe à filtrer
            const team = this.getAttribute('data-team');
            console.log('Team sélectionnée:', team);
            
            // Filtrer les résultats
            filterResults(team);
        });
    });
    
    // Initialiser le premier bouton comme actif
    if (filterButtons.length > 0) {
        const firstButton = filterButtons[0];
        firstButton.style.background = 'linear-gradient(45deg, var(--orange), var(--pink))';
        firstButton.style.color = 'white';
        firstButton.style.border = 'none';
    }
    
    // Initialiser avec tous les résultats visibles
    filterResults('all');
    
    console.log('Initialisation terminée');
});