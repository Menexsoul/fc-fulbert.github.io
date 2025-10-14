// ===== DONNÉES PRODUITS BOUTIQUE FC-FULBERT =====

const productsData = [
    // MAILLOTS
    {
        id: 'maillot-domicile',
        nom: 'Maillot Domicile 2024/2025',
        categorie: 'maillots',
        prix: 59.99,
        prixAncien: null,
        image: '👕',
        description: 'Maillot officiel domicile aux couleurs orange et rose du club',
        badge: 'NOUVEAU',
        note: 5,
        stock: 50
    },
    {
        id: 'maillot-exterieur',
        nom: 'Maillot Extérieur 2024/2025',
        categorie: 'maillots',
        prix: 59.99,
        prixAncien: null,
        image: '👕',
        description: 'Maillot officiel extérieur blanc avec détails orange',
        badge: 'NOUVEAU',
        note: 5,
        stock: 45
    },
    {
        id: 'maillot-third',
        nom: 'Maillot Third 2024/2025',
        categorie: 'maillots',
        prix: 54.99,
        prixAncien: 59.99,
        image: '👕',
        description: 'Maillot third noir avec bandes orange et rose',
        badge: 'PROMO',
        note: 5,
        stock: 30
    },
    {
        id: 'maillot-gardien',
        nom: 'Maillot Gardien',
        categorie: 'maillots',
        prix: 49.99,
        prixAncien: null,
        image: '🧤',
        description: 'Maillot spécial gardien avec renforts',
        badge: null,
        note: 4,
        stock: 20
    },
    {
        id: 'maillot-entrainement',
        nom: 'Maillot Entraînement',
        categorie: 'maillots',
        prix: 39.99,
        prixAncien: null,
        image: '👕',
        description: 'Maillot technique pour les entraînements',
        badge: null,
        note: 4,
        stock: 60
    },
    {
        id: 'short-domicile',
        nom: 'Short Domicile',
        categorie: 'maillots',
        prix: 29.99,
        prixAncien: null,
        image: '🩳',
        description: 'Short officiel domicile',
        badge: null,
        note: 5,
        stock: 40
    },

    // ACCESSOIRES
    {
        id: 'echarpe-officielle',
        nom: 'Écharpe Officielle',
        categorie: 'accessoires',
        prix: 23.99,
        prixAncien: 29.99,
        image: '🧣',
        description: 'Écharpe tissée aux couleurs du club',
        badge: 'PROMO',
        note: 5,
        stock: 100
    },
    {
        id: 'bonnet-hiver',
        nom: 'Bonnet d\'Hiver',
        categorie: 'accessoires',
        prix: 19.99,
        prixAncien: null,
        image: '🧢',
        description: 'Bonnet chaud avec logo brodé',
        badge: null,
        note: 4,
        stock: 75
    },
    {
        id: 'casquette',
        nom: 'Casquette FC-Fulbert',
        categorie: 'accessoires',
        prix: 24.99,
        prixAncien: null,
        image: '🧢',
        description: 'Casquette ajustable avec logo',
        badge: null,
        note: 5,
        stock: 80
    },
    {
        id: 'gourde',
        nom: 'Gourde Officielle',
        categorie: 'accessoires',
        prix: 14.99,
        prixAncien: null,
        image: '🥤',
        description: 'Gourde isotherme 750ml',
        badge: null,
        note: 4,
        stock: 50
    },
    {
        id: 'sac-sport',
        nom: 'Sac de Sport',
        categorie: 'accessoires',
        prix: 39.99,
        prixAncien: null,
        image: '🎒',
        description: 'Grand sac de sport avec compartiments',
        badge: null,
        note: 5,
        stock: 35
    },
    {
        id: 'serviette',
        nom: 'Serviette Microfibre',
        categorie: 'accessoires',
        prix: 17.99,
        prixAncien: null,
        image: '🧼',
        description: 'Serviette microfibre 100x50cm',
        badge: null,
        note: 4,
        stock: 60
    },
    {
        id: 'mug',
        nom: 'Mug FC-Fulbert',
        categorie: 'accessoires',
        prix: 12.99,
        prixAncien: null,
        image: '☕',
        description: 'Mug céramique avec logo',
        badge: null,
        note: 4,
        stock: 100
    },
    {
        id: 'porte-cles',
        nom: 'Porte-clés',
        categorie: 'accessoires',
        prix: 7.99,
        prixAncien: null,
        image: '🔑',
        description: 'Porte-clés métal avec blason',
        badge: null,
        note: 4,
        stock: 150
    },

    // ÉQUIPEMENT
    {
        id: 'veste-survêtement',
        nom: 'Veste de Survêtement',
        categorie: 'equipement',
        prix: 79.99,
        prixAncien: null,
        image: '🧥',
        description: 'Veste technique d\'entraînement',
        badge: 'POPULAIRE',
        note: 5,
        stock: 40
    },
    {
        id: 'pantalon-survêtement',
        nom: 'Pantalon de Survêtement',
        categorie: 'equipement',
        prix: 49.99,
        prixAncien: null,
        image: '👖',
        description: 'Pantalon d\'entraînement confortable',
        badge: null,
        note: 5,
        stock: 45
    },
    {
        id: 'sweat-capuche',
        nom: 'Sweat à Capuche',
        categorie: 'equipement',
        prix: 54.99,
        prixAncien: null,
        image: '🎽',
        description: 'Sweat capuche molleton épais',
        badge: null,
        note: 5,
        stock: 55
    },
    {
        id: 'chaussettes',
        nom: 'Chaussettes Officielles',
        categorie: 'equipement',
        prix: 12.99,
        prixAncien: null,
        image: '🧦',
        description: 'Pack de 3 paires de chaussettes',
        badge: null,
        note: 4,
        stock: 100
    },
    {
        id: 'gants-entrainement',
        nom: 'Gants d\'Entraînement',
        categorie: 'equipement',
        prix: 19.99,
        prixAncien: null,
        image: '🧤',
        description: 'Gants techniques pour l\'hiver',
        badge: null,
        note: 4,
        stock: 40
    },
    {
        id: 'ballon-officiel',
        nom: 'Ballon Officiel',
        categorie: 'equipement',
        prix: 29.99,
        prixAncien: null,
        image: '⚽',
        description: 'Ballon taille 5 aux couleurs du club',
        badge: null,
        note: 5,
        stock: 70
    },

    // ENFANTS
    {
        id: 'maillot-enfant',
        nom: 'Maillot Enfant',
        categorie: 'enfants',
        prix: 39.99,
        prixAncien: null,
        image: '👶',
        description: 'Maillot domicile tailles enfant',
        badge: null,
        note: 5,
        stock: 60
    },
    {
        id: 'short-enfant',
        nom: 'Short Enfant',
        categorie: 'enfants',
        prix: 19.99,
        prixAncien: null,
        image: '🩳',
        description: 'Short officiel tailles enfant',
        badge: null,
        note: 5,
        stock: 55
    },
    {
        id: 'survêtement-enfant',
        nom: 'Survêtement Enfant',
        categorie: 'enfants',
        prix: 49.99,
        prixAncien: null,
        image: '🧥',
        description: 'Ensemble survêtement enfant',
        badge: null,
        note: 5,
        stock: 35
    },
    {
        id: 'casquette-enfant',
        nom: 'Casquette Enfant',
        categorie: 'enfants',
        prix: 17.99,
        prixAncien: null,
        image: '🧢',
        description: 'Casquette ajustable pour enfant',
        badge: null,
        note: 4,
        stock: 50
    },
    {
        id: 'sac-dos-enfant',
        nom: 'Sac à Dos Enfant',
        categorie: 'enfants',
        prix: 29.99,
        prixAncien: null,
        image: '🎒',
        description: 'Petit sac à dos avec logo',
        badge: null,
        note: 5,
        stock: 45
    },
    {
        id: 'ballon-enfant',
        nom: 'Ballon Taille 3',
        categorie: 'enfants',
        prix: 19.99,
        prixAncien: null,
        image: '⚽',
        description: 'Ballon adapté aux enfants',
        badge: null,
        note: 4,
        stock: 60
    }
];