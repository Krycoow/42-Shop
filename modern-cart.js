// Carrito moderno y guapo

class ModernCart {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createCartHTML();
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    // Crear HTML del carrito moderno
    createCartHTML() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.id = 'cartOverlay';
        document.body.appendChild(overlay);

        // Crear sidebar del carrito
        const cartSidebar = document.createElement('div');
        cartSidebar.className = 'cart-sidebar';
        cartSidebar.id = 'modernCartSidebar';
        
        cartSidebar.innerHTML = `
            <div class="cart-header">
                <div class="cart-title">
                    <span class="cart-icon">🛒</span>
                    <h2 data-i18n="cart-title">Mi Carrito</h2>
                </div>
                <p class="cart-subtitle" data-i18n="cart-subtitle">Tu selección de productos 42</p>
                <button class="cart-close" onclick="modernCart.closeCart()">
                    <span>✕</span>
                </button>
            </div>
            
            <div class="cart-content">
                <div class="cart-items" id="modernCartItems">
                    <!-- Los items se generan dinámicamente -->
                </div>
            </div>
            
            <div class="cart-footer">
                <div class="cart-summary" id="modernCartSummary">
                    <!-- El resumen se genera dinámicamente -->
                </div>
                <div class="cart-actions">
                    <button class="cart-btn cart-btn-primary" onclick="modernCart.proceedToCheckout()">
                        <span>🚀</span>
                        <span data-i18n="proceed-checkout">Proceder al Pago</span>
                    </button>
                    <button class="cart-btn cart-btn-secondary" onclick="modernCart.clearCart()">
                        <span>🗑️</span>
                        <span data-i18n="clear-cart">Vaciar Carrito</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cartSidebar);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Cerrar carrito al hacer click en el overlay
        document.getElementById('cartOverlay').addEventListener('click', () => {
            this.closeCart();
        });

        // Cerrar carrito con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });

        // Actualizar carrito cuando cambie el estado
        if (window.state) {
            this.observeCartChanges();
        }
    }

    // Observar cambios en el carrito
    observeCartChanges() {
        // Interceptar la función updateCartUI original
        const originalUpdateCartUI = window.updateCartUI;
        window.updateCartUI = () => {
            originalUpdateCartUI();
            this.updateCartDisplay();
        };
    }

    // Abrir carrito
    openCart() {
        this.isOpen = true;
        document.getElementById('modernCartSidebar').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateCartDisplay();
        
        // Animación de entrada
        setTimeout(() => {
            this.animateCartItems();
        }, 100);
    }

    // Cerrar carrito
    closeCart() {
        this.isOpen = false;
        document.getElementById('modernCartSidebar').classList.remove('active');
        document.getElementById('cartOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }

    // Actualizar display del carrito
    updateCartDisplay() {
        this.updateCartItems();
        this.updateCartSummary();
    }

    // Actualizar items del carrito
    updateCartItems() {
        const cartItems = document.getElementById('modernCartItems');
        if (!cartItems || !window.state) return;

        if (window.state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <div class="cart-empty-text" data-i18n="empty-cart">Tu carrito está vacío</div>
                    <div class="cart-empty-subtext" data-i18n="empty-cart-sub">Añade algunos productos para comenzar</div>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = window.state.cart.map(item => {
            const product = window.state.products.find(p => p.id === item.id);
            if (!product) {
                console.error('Producto no encontrado:', item.id);
                return '';
            }

            const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
                ? window.currencyUtils.formatPrice(item.price || product.price)
                : `${(item.price || product.price).toFixed(2)} €`;

            return `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-content">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100x100/00ff00/000000?text=42'">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${product.name}</div>
                            <div class="cart-item-price">${formatted}</div>
                            <div class="cart-item-controls">
                                <button class="cart-quantity-btn" onclick="modernCart.updateQuantity(${item.id}, -1)">-</button>
                                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="10" onchange="modernCart.setQuantity(${item.id}, this.value)">
                                <button class="cart-quantity-btn" onclick="modernCart.updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="modernCart.removeItem(${item.id})">
                        <span>✕</span>
                    </button>
                </div>
            `;
        }).join('');
    }

    // Actualizar resumen del carrito
    updateCartSummary() {
        const cartSummary = document.getElementById('modernCartSummary');
        if (!cartSummary || !window.state) return;

        const subtotal = window.state.cart.reduce((total, item) => {
            const product = window.state.products.find(p => p.id === item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);

        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + shipping;

        const formattedSubtotal = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(subtotal)
            : `${subtotal.toFixed(2)} €`;

        const formattedShipping = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(shipping)
            : `${shipping.toFixed(2)} €`;

        const formattedTotal = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(total)
            : `${total.toFixed(2)} €`;

        cartSummary.innerHTML = `
            <div class="cart-summary-item">
                <span data-i18n="subtotal">Subtotal</span>
                <span>${formattedSubtotal}</span>
            </div>
            <div class="cart-summary-item">
                <span data-i18n="shipping">Envío</span>
                <span>${shipping === 0 ? 'Gratis' : formattedShipping}</span>
            </div>
            <div class="cart-summary-item total">
                <span data-i18n="total">Total</span>
                <span>${formattedTotal}</span>
            </div>
        `;
    }

    // Actualizar cantidad de un item
    updateQuantity(productId, change) {
        if (!window.state) return;

        const item = window.state.cart.find(item => item.id === productId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }

        if (newQuantity > 10) return;

        item.quantity = newQuantity;
        window.updateCartUI();
        this.showQuantityAnimation(productId);
    }

    // Establecer cantidad específica
    setQuantity(productId, quantity) {
        if (!window.state) return;

        const item = window.state.cart.find(item => item.id === productId);
        if (!item) return;

        const newQuantity = parseInt(quantity);
        if (newQuantity < 1 || newQuantity > 10) return;

        item.quantity = newQuantity;
        window.updateCartUI();
        this.showQuantityAnimation(productId);
    }

    // Remover item del carrito
    removeItem(productId) {
        if (!window.state) return;

        window.state.cart = window.state.cart.filter(item => item.id !== productId);
        window.updateCartUI();
        this.showRemoveAnimation(productId);
    }

    // Limpiar carrito
    clearCart() {
        if (!window.state) return;

        if (window.state.cart.length === 0) return;

        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            window.state.cart = [];
            window.updateCartUI();
            this.showClearAnimation();
        }
    }

    // Proceder al checkout
    proceedToCheckout() {
        if (!window.state || window.state.cart.length === 0) {
            this.showToast('Tu carrito está vacío', 'warning');
            return;
        }

        this.closeCart();
        
        // Usar la función de checkout existente
        if (window.goToCheckout) {
            window.goToCheckout();
        } else {
            window.location.href = 'checkout.html';
        }
    }

    // Animaciones
    showQuantityAnimation(productId) {
        const input = document.querySelector(`input[onchange*="${productId}"]`);
        if (input) {
            input.classList.add('number-change');
            setTimeout(() => {
                input.classList.remove('number-change');
            }, 200);
        }
    }

    showRemoveAnimation(productId) {
        const item = document.querySelector(`[data-product-id="${productId}"]`);
        if (item) {
            item.style.animation = 'cartItemSlideOut 0.3s ease-out forwards';
            setTimeout(() => {
                item.remove();
            }, 300);
        }
    }

    showClearAnimation() {
        const items = document.querySelectorAll('.cart-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'cartItemSlideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    item.remove();
                }, 300);
            }, index * 100);
        });
    }

    animateCartItems() {
        const items = document.querySelectorAll('.cart-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Mostrar toast
    showToast(message, type = 'info') {
        if (window.showToast) {
            window.showToast(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// CSS adicional para animaciones
const additionalStyles = `
<style>
@keyframes cartItemSlideOut {
    to {
        opacity: 0;
        transform: translateX(30px);
    }
}

.number-change {
    animation: numberChange 0.2s ease-out;
}

@keyframes numberChange {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
</style>
`;

// Añadir estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inicializar carrito moderno cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que otros scripts se inicialicen
    setTimeout(() => {
        window.modernCart = new ModernCart();
        
        // Interceptar la función toggleCart original
        if (window.toggleCart) {
            const originalToggleCart = window.toggleCart;
            window.toggleCart = () => {
                window.modernCart.openCart();
            };
        }
    }, 200);
});
