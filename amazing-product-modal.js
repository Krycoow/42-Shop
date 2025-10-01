// Modal de producto súper guapo y sorprendente

class AmazingProductModal {
    constructor() {
        this.isOpen = false;
        this.currentProduct = null;
        this.init();
    }

    init() {
        this.createModalHTML();
        this.setupEventListeners();
    }

    // Crear HTML del modal
    createModalHTML() {
        const modalHTML = `
            <div class="product-modal-overlay" id="amazingProductModalOverlay">
                <div class="product-modal-container" id="amazingProductModalContainer">
                    <div class="product-modal-particles">
                        <div class="product-modal-particle"></div>
                        <div class="product-modal-particle"></div>
                        <div class="product-modal-particle"></div>
                        <div class="product-modal-particle"></div>
                        <div class="product-modal-particle"></div>
                    </div>
                    
                    <div class="product-modal-header">
                        <button class="product-modal-close" onclick="amazingProductModal.closeModal()">
                            <span>✕</span>
                        </button>
                    </div>
                    
                    <div class="product-modal-content" id="amazingProductModalContent">
                        <!-- El contenido se genera dinámicamente -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Cerrar modal al hacer click en el overlay
        document.getElementById('amazingProductModalOverlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeModal();
            }
        });

        // Interceptar la función showProductModal original
        if (window.showProductModal) {
            const originalShowProductModal = window.showProductModal;
            window.showProductModal = (productId) => {
                this.showModal(productId);
            };
        }
    }

    // Mostrar modal
    showModal(productId) {
        if (!window.state || !window.state.products) return;

        const product = window.state.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProduct = product;
        this.isOpen = true;

        // Generar contenido del modal
        this.generateModalContent(product);

        // Mostrar modal con animación
        const overlay = document.getElementById('amazingProductModalOverlay');
        overlay.classList.add('active');

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';

        // Añadir efectos de partículas
        this.createParticleEffects();

        // Animación de entrada
        setTimeout(() => {
            this.animateModalEntrance();
        }, 100);
    }

    // Cerrar modal
    closeModal() {
        this.isOpen = false;
        const overlay = document.getElementById('amazingProductModalOverlay');
        overlay.classList.remove('active');

        // Restaurar scroll del body
        document.body.style.overflow = '';

        // Limpiar efectos
        this.clearParticleEffects();
    }

    // Generar contenido del modal
    generateModalContent(product) {
        const content = document.getElementById('amazingProductModalContent');
        
        const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
            ? window.currencyUtils.formatPrice(product.price)
            : `${product.price.toFixed(2)} €`;

        const stars = this.generateStars(product.averageRating || 0);
        const reviewCount = product.reviewCount || 0;

        content.innerHTML = `
            <div class="product-modal-image-section">
                <img src="${product.image}" alt="${product.name}" class="product-modal-image">
                <div class="product-modal-image-overlay"></div>
            </div>
            
            <div class="product-modal-info-section">
                <div>
                    <h1 class="product-modal-title">${product.name}</h1>
                    <div class="product-modal-description-section">
                        <h3 class="description-title">Descripción del Producto</h3>
                        <p class="product-modal-description">${product.description}</p>
                    </div>
                    
                    <div class="product-modal-rating">
                        <div class="product-modal-stars">${stars}</div>
                        <span class="product-modal-rating-text">(${reviewCount} reseñas)</span>
                    </div>
                    
                    <div class="product-modal-price-section">
                        <div class="product-modal-price">${formatted}</div>
                        <div class="product-modal-price-subtitle">Precio final • Envío incluido</div>
                    </div>
                    
                    <div class="product-modal-quantity-section">
                        <label class="product-modal-quantity-label">Cantidad:</label>
                        <div class="product-modal-quantity-controls">
                            <button class="product-modal-quantity-btn" onclick="amazingProductModal.changeQuantity(-1)">-</button>
                            <input type="number" class="product-modal-quantity-input" id="modalQuantityInput" value="1" min="1" max="10" onchange="amazingProductModal.validateQuantity()">
                            <button class="product-modal-quantity-btn" onclick="amazingProductModal.changeQuantity(1)">+</button>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="product-modal-actions">
                        <button class="product-modal-btn product-modal-btn-primary" onclick="amazingProductModal.addToCart()">
                            <span>🛒</span>
                            <span>Añadir al Carrito</span>
                        </button>
                        <button class="product-modal-btn product-modal-btn-secondary" onclick="amazingProductModal.buyNow()">
                            <span>⚡</span>
                            <span>Comprar Ahora</span>
                        </button>
                    </div>
                    
                    <div class="product-modal-reviews-section">
                        <h3 class="product-modal-reviews-title">
                            <span>⭐</span>
                            <span>Reseñas de Clientes</span>
                        </h3>
                        <button class="product-modal-reviews-btn" onclick="amazingProductModal.showReviews()">
                            <span>👀</span>
                            <span>Ver Todas las Reseñas</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Generar estrellas
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="product-modal-star">★</span>';
        }
        
        // Media estrella
        if (hasHalfStar) {
            stars += '<span class="product-modal-star">★</span>';
        }
        
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="product-modal-star">☆</span>';
        }
        
        return stars;
    }

    // Cambiar cantidad
    changeQuantity(change) {
        const input = document.getElementById('modalQuantityInput');
        if (!input) return;

        const currentValue = parseInt(input.value);
        const newValue = currentValue + change;

        if (newValue >= 1 && newValue <= 10) {
            input.value = newValue;
            this.animateQuantityChange(input);
        }
    }

    // Validar cantidad
    validateQuantity() {
        const input = document.getElementById('modalQuantityInput');
        if (!input) return;

        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }

        input.value = value;
        this.animateQuantityChange(input);
    }

    // Añadir al carrito
    addToCart() {
        if (!this.currentProduct || !window.state) return;

        const input = document.getElementById('modalQuantityInput');
        const quantity = parseInt(input.value) || 1;

        // Usar la función existente de añadir al carrito
        if (window.addToCartWithQuantity) {
            window.addToCartWithQuantity(this.currentProduct.id, quantity);
        } else {
            // Fallback si no existe la función
            for (let i = 0; i < quantity; i++) {
                window.addToCart(this.currentProduct.id);
            }
        }

        // Animación de éxito
        this.showSuccessAnimation();
        
        // Cerrar modal después de un breve delay
        setTimeout(() => {
            this.closeModal();
        }, 1500);
    }

    // Comprar ahora
    buyNow() {
        if (!this.currentProduct || !window.state) return;

        const input = document.getElementById('modalQuantityInput');
        const quantity = parseInt(input.value) || 1;

        // Añadir al carrito
        this.addToCart();

        // Ir al checkout
        setTimeout(() => {
            if (window.goToCheckout) {
                window.goToCheckout();
            } else {
                window.location.href = 'checkout.html';
            }
        }, 1000);
    }

    // Mostrar reseñas
    showReviews() {
        if (!this.currentProduct) return;

        // Cerrar este modal
        this.closeModal();

        // Abrir modal de reseñas profesional
        setTimeout(() => {
            if (window.professionalReviews) {
                window.professionalReviews.showReviewsModal(this.currentProduct.id);
            } else if (window.showReviewModal) {
                window.showReviewModal(this.currentProduct.id);
            }
        }, 300);
    }

    // Crear efectos de partículas
    createParticleEffects() {
        const container = document.getElementById('amazingProductModalContainer');
        const particles = container.querySelectorAll('.product-modal-particle');
        
        particles.forEach((particle, index) => {
            particle.style.animationDelay = `${index * 0.5}s`;
            particle.style.opacity = '1';
        });
    }

    // Limpiar efectos de partículas
    clearParticleEffects() {
        const container = document.getElementById('amazingProductModalContainer');
        const particles = container.querySelectorAll('.product-modal-particle');
        
        particles.forEach(particle => {
            particle.style.opacity = '0';
        });
    }

    // Animación de entrada del modal
    animateModalEntrance() {
        const container = document.getElementById('amazingProductModalContainer');
        container.style.animation = 'modalSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }

    // Animación de cambio de cantidad
    animateQuantityChange(input) {
        input.classList.add('number-change');
        setTimeout(() => {
            input.classList.remove('number-change');
        }, 200);
    }

    // Animación de éxito
    showSuccessAnimation() {
        const button = document.querySelector('.product-modal-btn-primary');
        if (button) {
            button.innerHTML = '<span>✅</span><span>¡Añadido!</span>';
            button.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
            
            // Crear efecto de confeti
            this.createConfettiEffect();
        }
    }

    // Crear efecto de confeti
    createConfettiEffect() {
        const container = document.getElementById('amazingProductModalContainer');
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${['#00ff00', '#00cc00', '#ffd700', '#ff6b6b'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 2s ease-out forwards;
            `;
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '0%';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }
}

// CSS adicional para animaciones
const additionalModalStyles = `
<style>
@keyframes numberChange {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

@keyframes confettiFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

.number-change {
    animation: numberChange 0.2s ease-out;
}
</style>
`;

// Añadir estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalModalStyles);

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.amazingProductModal = new AmazingProductModal();
    }, 500);
});

