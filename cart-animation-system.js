// Sistema de animación del carrito mejorado

class CartAnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Interceptar clicks en botones de añadir al carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="addToCartWithQuantity"]')) {
                e.preventDefault();
                e.stopPropagation();
                
                const button = e.target.closest('[onclick*="addToCartWithQuantity"]');
                const onclick = button.getAttribute('onclick');
                const productId = parseInt(onclick.match(/\d+/)[0]);
                
                this.animateAddToCart(productId);
            }
        });
    }

    // Animación del producto yendo al carrito
    animateAddToCart(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        // Verificar login
        if (!state.isLoggedIn) {
            this.showLoginRequired();
            return;
        }

        // Crear elemento de animación
        const animationElement = this.createAnimationElement(product);
        document.body.appendChild(animationElement);

        // Obtener posición del botón y del carrito
        const button = document.querySelector(`[onclick*="addToCartWithQuantity(${productId})"]`);
        const cartButton = document.getElementById('cartButton');
        
        if (!button || !cartButton) return;

        const buttonRect = button.getBoundingClientRect();
        const cartRect = cartButton.getBoundingClientRect();

        // Posicionar elemento de animación
        animationElement.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
        animationElement.style.top = buttonRect.top + buttonRect.height / 2 + 'px';

        // Animar hacia el carrito
        setTimeout(() => {
            animationElement.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(0.3)`;
            animationElement.style.opacity = '0';
        }, 50);

        // Limpiar después de la animación
        setTimeout(() => {
            document.body.removeChild(animationElement);
            this.addToCart(product);
        }, 800);
    }

    // Crear elemento de animación
    createAnimationElement(product) {
        const element = document.createElement('div');
        element.className = 'cart-animation-element';
        element.innerHTML = `
            <div class="cart-animation-content">
                <img src="${product.image}" alt="${product.name}" class="cart-animation-image">
                <div class="cart-animation-text">${product.name}</div>
            </div>
        `;
        
        element.style.cssText = `
            position: fixed;
            z-index: 10000;
            pointer-events: none;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        `;

        return element;
    }

    // Añadir al carrito
    addToCart(product) {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartUI();
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const newCount = state.cart.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = newCount;
            cartCount.style.display = newCount > 0 ? 'block' : 'none';
        }

        // Actualizar carrito si está abierto
        if (window.updateCartUI) {
            window.updateCartUI();
        }
    }

    // Mostrar mensaje de login requerido
    showLoginRequired() {
        const modal = document.getElementById('authModal');
        if (modal && window.openModal) {
            window.openModal(modal);
        }
    }
}

// Estilos para la animación
const cartAnimationStyles = `
<style>
.cart-animation-element {
    position: fixed;
    z-index: 10000;
    pointer-events: none;
}

.cart-animation-content {
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid rgba(0, 255, 0, 0.5);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
    backdrop-filter: blur(10px);
}

.cart-animation-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
}

.cart-animation-text {
    color: #00ff00;
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

@keyframes cartFly {
    0% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(0.8) rotate(180deg);
        opacity: 0.8;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
        opacity: 0;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', cartAnimationStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.cartAnimationSystem = new CartAnimationSystem();
});

// Hacer disponible globalmente
window.CartAnimationSystem = CartAnimationSystem;

class CartAnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Interceptar clicks en botones de añadir al carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="addToCartWithQuantity"]')) {
                e.preventDefault();
                e.stopPropagation();
                
                const button = e.target.closest('[onclick*="addToCartWithQuantity"]');
                const onclick = button.getAttribute('onclick');
                const productId = parseInt(onclick.match(/\d+/)[0]);
                
                this.animateAddToCart(productId);
            }
        });
    }

    // Animación del producto yendo al carrito
    animateAddToCart(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        // Verificar login
        if (!state.isLoggedIn) {
            this.showLoginRequired();
            return;
        }

        // Crear elemento de animación
        const animationElement = this.createAnimationElement(product);
        document.body.appendChild(animationElement);

        // Obtener posición del botón y del carrito
        const button = document.querySelector(`[onclick*="addToCartWithQuantity(${productId})"]`);
        const cartButton = document.getElementById('cartButton');
        
        if (!button || !cartButton) return;

        const buttonRect = button.getBoundingClientRect();
        const cartRect = cartButton.getBoundingClientRect();

        // Posicionar elemento de animación
        animationElement.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
        animationElement.style.top = buttonRect.top + buttonRect.height / 2 + 'px';

        // Animar hacia el carrito
        setTimeout(() => {
            animationElement.style.transform = `translate(${cartRect.left - buttonRect.left}px, ${cartRect.top - buttonRect.top}px) scale(0.3)`;
            animationElement.style.opacity = '0';
        }, 50);

        // Limpiar después de la animación
        setTimeout(() => {
            document.body.removeChild(animationElement);
            this.addToCart(product);
        }, 800);
    }

    // Crear elemento de animación
    createAnimationElement(product) {
        const element = document.createElement('div');
        element.className = 'cart-animation-element';
        element.innerHTML = `
            <div class="cart-animation-content">
                <img src="${product.image}" alt="${product.name}" class="cart-animation-image">
                <div class="cart-animation-text">${product.name}</div>
            </div>
        `;
        
        element.style.cssText = `
            position: fixed;
            z-index: 10000;
            pointer-events: none;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        `;

        return element;
    }

    // Añadir al carrito
    addToCart(product) {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartUI();
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const newCount = state.cart.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = newCount;
            cartCount.style.display = newCount > 0 ? 'block' : 'none';
        }

        // Actualizar carrito si está abierto
        if (window.updateCartUI) {
            window.updateCartUI();
        }
    }

    // Mostrar mensaje de login requerido
    showLoginRequired() {
        const modal = document.getElementById('authModal');
        if (modal && window.openModal) {
            window.openModal(modal);
        }
    }
}

// Estilos para la animación
const cartAnimationStyles = `
<style>
.cart-animation-element {
    position: fixed;
    z-index: 10000;
    pointer-events: none;
}

.cart-animation-content {
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid rgba(0, 255, 0, 0.5);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
    backdrop-filter: blur(10px);
}

.cart-animation-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
}

.cart-animation-text {
    color: #00ff00;
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

@keyframes cartFly {
    0% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(0.8) rotate(180deg);
        opacity: 0.8;
    }
    100% {
        transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
        opacity: 0;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', cartAnimationStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.cartAnimationSystem = new CartAnimationSystem();
});

// Hacer disponible globalmente
window.CartAnimationSystem = CartAnimationSystem;
