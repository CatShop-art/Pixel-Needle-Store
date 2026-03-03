// ============================================
// JAVASCRIPT - Grilles Points de Croix
// ============================================

// Gestion du Panier
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addItem(product, price) {
        const existingItem = this.items.find(item => item.product === product);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                product: product,
                price: price,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Produit ajouté au panier !');
    }

    removeItem(product) {
        this.items = this.items.filter(item => item.product !== product);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(product, quantity) {
        const item = this.items.find(item => item.product === product);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(product);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }

    showNotification(message) {
        // Créer et afficher une notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialiser le panier
const cart = new ShoppingCart();

// Fonction globale pour ajouter au panier
function addToCart(product, price) {
    cart.addItem(product, price);
}

// Abonnement Newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simuler l'inscription
    console.log('Inscription newsletter:', email);
    
    // Afficher message de succès
    alert('Merci pour votre inscription ! Vous recevrez bientôt nos grilles gratuites.');
    event.target.reset();
}

// Validation de formulaire
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Animation de chargement
function showLoading(button) {
    const originalText = button.textContent;
    button.textContent = 'Chargement...';
    button.disabled = true;
    button.classList.add('loading');
    
    return function hideLoading() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Formatage du prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Recherche de produits
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    query = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filtrage par catégorie
function filterByCategory(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .advantage-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialiser les filtres si on est sur la page catalogue
    if (window.location.pathname.includes('catalogue.html')) {
        initCatalogue();
    }
    
    // Initialiser le panier si on est sur la page panier
    if (window.location.pathname.includes('panier.html')) {
        initCartPage();
    }
});

// Initialisation du catalogue
function initCatalogue() {
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        filterByCategory(category);
    }
}

// Initialisation de la page panier
function initCartPage() {
    renderCart();
    
    // Bouton vider le panier
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment vider votre panier ?')) {
                cart.clearCart();
                renderCart();
            }
        });
    }
    
    // Formulaire de commande
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

// Afficher le panier
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    if (cart.items.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        totalElement.textContent = formatPrice(0);
        return;
    }
    
    let html = '';
    cart.items.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.product}</h4>
                    <p>Prix unitaire: ${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" 
                           value="${item.quantity}" 
                           min="1" 
                           onchange="cart.updateQuantity('${item.product}', this.value); renderCart();">
                </div>
                <div class="cart-item-total">
                    ${formatPrice(item.price * item.quantity)}
                </div>
                <button class="btn-remove" onclick="cart.removeItem('${item.product}'); renderCart();">✕</button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    totalElement.textContent = formatPrice(cart.getTotal());
}

// Traitement de la commande
function handleCheckout(event) {
    event.preventDefault();
    
    if (!validateForm('checkout-form')) {
        alert('Veuillez remplir tous les champs requis');
        return;
    }
    
    const button = event.target.querySelector('button[type="submit"]');
    const hideLoading = showLoading(button);
    
    // Simuler le traitement du paiement
    setTimeout(() => {
        hideLoading();
        
        // Rediriger vers une page de succès
        alert('Commande confirmée ! Vous allez recevoir un email avec vos liens de téléchargement.');
        cart.clearCart();
        window.location.href = 'index.html';
    }, 2000);
}

// Styles CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: #7f8c8d;
    }
    
    .cart-item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item input[type="number"] {
        width: 60px;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .btn-remove {
        background: none;
        border: none;
        color: #e74c3c;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .btn-remove:hover {
        color: #c0392b;
    }
`;
document.head.appendChild(style);