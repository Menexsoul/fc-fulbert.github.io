// ===== JOUEURS FC-FULBERT - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    const playersContainer = document.getElementById('playersContainer');
    const searchInput = document.getElementById('searchPlayer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewToggles = document.querySelectorAll('.view-toggle');
    const modal = document.getElementById('playerModal');
    const modalBody = document.getElementById('playerModalBody');
    const closeModal = document.querySelector('.player-modal-close');
    const noResults = document.getElementById('noResults');
    
    let currentView = 'grid';
    let currentFilter = 'all';
    let searchTerm = '';
    
    // Initialisation
    renderPlayers();
    
    // Recherche
    searchInput.addEventListener('input', function(e) {
        searchTerm = e.target.value.toLowerCase();
        renderPlayers();
    });
    
    // Filtres par poste
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-position');
            renderPlayers();
        });
    });
    
    // Toggle Vue
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            viewToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentView = this.getAttribute('data-view');
            playersContainer.className = currentView === 'grid' ? 'players-grid-view' : 'players-list-view';
            renderPlayers();
        });
    });
    
    // Fermer le modal
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    // Fonction de filtrage
    function filterPlayers() {
        return playersData.filter(player => {
            const matchesPosition = currentFilter === 'all' || player.position === currentFilter;
            const matchesSearch = player.nom.toLowerCase().includes(searchTerm) || 
                                  player.prenom.toLowerCase().includes(searchTerm) ||
                                  player.nomComplet.toLowerCase().includes(searchTerm) ||
                                  player.poste.toLowerCase().includes(searchTerm);
            return matchesPosition && matchesSearch;
        });
    }
    
    // Fonction de rendu
    function renderPlayers() {
        const filteredPlayers = filterPlayers();
        
        if (filteredPlayers.length === 0) {
            playersContainer.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        playersContainer.innerHTML = '';
        
        filteredPlayers.forEach(player => {
            const playerCard = currentView === 'grid' ? createPlayerCardGrid(player) : createPlayerCardList(player);
            playersContainer.appendChild(playerCard);
        });
    }
    
    // Créer carte joueur - Vue Grille
    function createPlayerCardGrid(player) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="player-card-header">
                <div class="player-avatar">${player.avatar}</div>
                <div class="player-number-badge">${player.numero}</div>
                <div class="player-position-badge position-${player.position}">${player.poste}</div>
            </div>
            <div class="player-card-body">
                <h3 class="player-name">${player.nom}</h3>
                <div class="player-info">
                    <div class="player-info-item">
                        <div class="player-info-value">${player.age}</div>
                        <div class="player-info-label">ans</div>
                    </div>
                    <div class="player-info-item">
                        <div class="player-info-value">${player.taille}</div>
                        <div class="player-info-label">Taille</div>
                    </div>
                    <div class="player-info-item">
                        <div class="player-info-value">${player.nationalite.split(' ')[0]}</div>
                        <div class="player-info-label">Nat.</div>
                    </div>
                </div>
                <div class="player-stats">
                    <div class="player-stat-item">
                        <div class="player-stat-value">${player.matchs}</div>
                        <div class="player-stat-label">Matchs</div>
                    </div>
                    <div class="player-stat-item">
                        <div class="player-stat-value">${player.buts}</div>
                        <div class="player-stat-label">Buts</div>
                    </div>
                    <div class="player-stat-item">
                        <div class="player-stat-value">${player.passes}</div>
                        <div class="player-stat-label">Passes</div>
                    </div>
                </div>
            </div>
            <div class="player-card-footer">
                <a href="#${player.id}" class="player-view-profile">Voir le profil →</a>
            </div>
        `;
        
        card.addEventListener('click', () => openPlayerModal(player));
        return card;
    }
    
    // Créer carte joueur - Vue Liste
    function createPlayerCardList(player) {
        const card = document.createElement('div');
        card.className = 'player-card-list';
        card.innerHTML = `
            <div class="player-list-number">${player.numero}</div>
            <div class="player-list-avatar">${player.avatar}</div>
            <div class="player-list-info">
                <h3 class="player-list-name">${player.nomComplet}</h3>
                <div class="player-list-details">
                    <span><strong>Poste:</strong> ${player.poste}</span>
                    <span><strong>Âge:</strong> ${player.age} ans</span>
                    <span><strong>Taille:</strong> ${player.taille}</span>
                    <span><strong>Nat.:</strong> ${player.nationalite}</span>
                </div>
            </div>
            <div class="player-list-stats">
                <div class="player-list-stat">
                    <div class="player-list-stat-value">${player.matchs}</div>
                    <div class="player-list-stat-label">Matchs</div>
                </div>
                <div class="player-list-stat">
                    <div class="player-list-stat-value">${player.buts}</div>
                    <div class="player-list-stat-label">Buts</div>
                </div>
                <div class="player-list-stat">
                    <div class="player-list-stat-value">${player.passes}</div>
                    <div class="player-list-stat-label">Passes D.</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openPlayerModal(player));
        return card;
    }
    
    // Ouvrir le modal joueur
    function openPlayerModal(player) {
        window.location.hash = player.id;
        
        modalBody.innerHTML = `
            <div class="player-modal-header">
                <div class="player-modal-avatar">${player.avatar}</div>
                <div class="player-modal-number">${player.numero}</div>
            </div>
            <div class="player-modal-body">
                <h2 class="player-modal-name">${player.nomComplet}</h2>
                <div class="player-modal-position position-${player.position}">${player.poste}</div>
                
                <div class="player-modal-details">
                    <div class="player-detail-item">
                        <div class="player-detail-label">Âge</div>
                        <div class="player-detail-value">${player.age} ans</div>
                    </div>
                    <div class="player-detail-item">
                        <div class="player-detail-label">Date de naissance</div>
                        <div class="player-detail-value">${player.dateNaissance}</div>
                    </div>
                    <div class="player-detail-item">
                        <div class="player-detail-label">Nationalité</div>
                        <div class="player-detail-value">${player.nationalite}</div>
                    </div>
                    <div class="player-detail-item">
                        <div class="player-detail-label">Taille</div>
                        <div class="player-detail-value">${player.taille}</div>
                    </div>
                    <div class="player-detail-item">
                        <div class="player-detail-label">Poids</div>
                        <div class="player-detail-value">${player.poids}</div>
                    </div>
                    <div class="player-detail-item">
                        <div class="player-detail-label">Pied fort</div>
                        <div class="player-detail-value">${player.piedFort}</div>
                    </div>
                </div>
                
                <div class="player-modal-stats-section">
                    <h3 class="player-modal-stats-title">Statistiques 2024/2025</h3>
                    <div class="player-modal-stats-grid">
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.matchs}</div>
                            <div class="player-modal-stat-label">Matchs Joués</div>
                        </div>
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.buts}</div>
                            <div class="player-modal-stat-label">Buts Marqués</div>
                        </div>
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.passes}</div>
                            <div class="player-modal-stat-label">Passes Décisives</div>
                        </div>
                        ${player.cleanSheets > 0 ? `
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.cleanSheets}</div>
                            <div class="player-modal-stat-label">Clean Sheets</div>
                        </div>
                        ` : ''}
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.cartonsJaunes}</div>
                            <div class="player-modal-stat-label">Cartons Jaunes</div>
                        </div>
                        <div class="player-modal-stat-card">
                            <div class="player-modal-stat-value">${player.cartonsRouges}</div>
                            <div class="player-modal-stat-label">Cartons Rouges</div>
                        </div>
                    </div>
                </div>
                
                <div class="player-bio">
                    <h4 style="color: var(--orange); font-size: 1.2rem; margin-bottom: 1rem;">📖 Biographie</h4>
                    <p style="line-height: 1.8; margin-bottom: 1rem;">${player.bio}</p>
                    <h5 style="color: var(--black); font-weight: 600; margin-bottom: 0.5rem;">Parcours :</h5>
                    <ul style="padding-left: 1.5rem; line-height: 1.8;">
                        ${player.parcours.map(club => `<li>${club}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    // Ouvrir modal depuis URL hash
    if (window.location.hash) {
        const playerId = window.location.hash.substring(1);
        const player = playersData.find(p => p.id === playerId);
        if (player) {
            setTimeout(() => openPlayerModal(player), 500);
        }
    }
    
    // Navigation via hash
    window.addEventListener('hashchange', function() {
        if (!window.location.hash) {
            modal.style.display = 'none';
        } else {
            const playerId = window.location.hash.substring(1);
            const player = playersData.find(p => p.id === playerId);
            if (player) {
                openPlayerModal(player);
            }
        }
    });
    
    console.log('✅ Système de gestion des joueurs initialisé');
    console.log(`📊 ${playersData.length} joueurs chargés`);
});