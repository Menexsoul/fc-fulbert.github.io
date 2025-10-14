// ===== BOUTIQUE FC-FULBERT - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchProduct');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noProducts = document.getElementById('noProducts');
    const cartFloat = document.getElementById('cartFloat');
    const cartModal = document.getElementById('cartModal');
    const cartModalClose = document.querySelector('.cart-modal-close');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    let currentFilter = 'all';
    let searchTerm = '';
    let cart = [];
    
    // Vérifier que les données existent
    if (typeof productsData === 'undefined') {
        console.error('❌ productsData non trouvé !');
        return;
    }
    
    // Initialisation
    loadCart();
    renderProducts();
    updateCartUI();
    
    // Recherche
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase();
            renderProducts();
        });
    }
    
    // Filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            renderProducts();
        });
    });
    
    // Ouvrir/Fermer panier
    cartFloat.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart();
    });
    
    cartModalClose.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        alert('Merci pour votre commande ! Cette fonctionnalité sera bientôt disponible.');
    });
    
    // Fonction de filtrage
    function filterProducts() {
        return productsData.filter(product => {
            const matchesCategory = currentFilter === 'all' || product.categorie === currentFilter;
            const matchesSearch = product.nom.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
    }
    
    // Rendu des produits
    function renderProducts() {
        const filteredProducts = filterProducts();
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '';
            noProducts.classList.add('show');
            return;
        }
        
        noProducts.classList.remove('show');
        productsGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }
    
    // Créer carte produit
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const stars = '⭐'.repeat(product.note);
        const badgeHTML = product.badge ? `<div class="product-badge ${product.badge === 'PROMO' ? 'promo' : ''}">${product.badge}</div>` : '';
        
        card.innerHTML = `
            <div class="product-card-image">
                ${badgeHTML}
                <div class="product-image">${product.image}</div>
            </div>
            <div class="product-card-content">
                <div class="product-category">${getCategoryName(product.categorie)}</div>
                <h3>${product.nom}</h3>
                <div class="product-card-price">
                    ${product.prixAncien ? `<span class="price-old">${product.prixAncien.toFixed(2)} €</span>` : ''}
                    <span class="price-current">${product.prix.toFixed(2)} €</span>
                </div>
                <div class="product-rating">${stars}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Ajouter au panier 🛒
                </button>
            </div>
        `;
        
        const addBtn = card.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', () => addToCart(product));
        
        return card;
    }
    
    // Nom de catégorie
    function getCategoryName(cat) {
        const names = {
            'maillots': 'Maillots',
            'accessoires': 'Accessoires',
            'equipement': 'Équipement',
            'enfants': 'Enfants'
        };
        return names[cat] || cat;
    }
    
    // Ajouter au panier
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantite++;
        } else {
            cart.push({
                ...product,
                quantite: 1
            });
        }
        
        saveCart();
        updateCartUI();
        showNotification(`✅ ${product.nom} ajouté au panier !`);
    }
    
    // Retirer du panier
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        renderCart();
    }
    
    // Modifier quantité
    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantite += change;
            if (item.quantite <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartUI();
                renderCart();
            }
        }
    }
    
    // Rendu du panier
    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Votre panier est vide</p>
                </div>
            `;
            return;
        }
        
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nom}</div>
                    <div class="cart-item-price">${item.prix.toFixed(2)} €</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantite}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">Retirer</button>
            `;
            
            // Event listeners
            const decreaseBtn = cartItem.querySelector('[data-action="decrease"]');
            const increaseBtn = cartItem.querySelector('[data-action="increase"]');
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            
            decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
            increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
            removeBtn.addEventListener('click', () => removeFromCart(item.id));
            
            cartItems.appendChild(cartItem);
        });
        
        updateCartTotal();
    }
    
    // Mettre à jour le total
    function updateCartTotal() {
        const subtotal = cart.reduce((sum, item) => sum + (item.prix * item.quantite), 0);
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        
        document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2) + ' €';
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' €';
        document.getElementById('cartTotal').textContent = total.toFixed(2) + ' €';
    }
    
    // Mettre à jour l'UI du panier
    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantite, 0);
        cartCount.textContent = totalItems;
    }
    
    // Sauvegarder le panier
    function saveCart() {
        // En production, on utiliserait l'API ou un backend
        // Ici on simule juste la sauvegarde
        console.log('Panier sauvegardé:', cart);
    }
    
    // Charger le panier
    function loadCart() {
        // En production, on chargerait depuis l'API
        // Ici on part d'un panier vide
        cart = [];
    }
    
    // Notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    console.log('✅ Boutique FC-Fulbert initialisée');
    console.log(`📦 ${productsData.length} produits disponibles`);
});

// Animations
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