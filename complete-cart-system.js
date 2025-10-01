// Sistema completo de carrito funcional
class CompleteCartSystem {
    constructor() {
        this.cart = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createCartHTML();
        this.bindAllEvents();
        this.loadCartFromStorage();
        this.updateCartCount();
        console.log('🛒 Sistema de carrito completo inicializado');
    }

    createCartHTML() {
        // Crear overlay del carrito
        const cartOverlay = document.createElement('div');
        cartOverlay.className = 'cart-overlay';
        cartOverlay.id = 'cartOverlay';

        // Crear contenedor del carrito
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        cartContainer.id = 'cartContainer';

        cartContainer.innerHTML = `
            <div class="cart-header">
                <h2 class="cart-title">🛒 Mi Carrito</h2>
                <button class="cart-close" id="cartClose">×</button>
            </div>
            
            <div class="cart-content">
                <div class="cart-items" id="cartItems">
                    <!-- Los items se añadirán aquí dinámicamente -->
                </div>
            </div>
            
            <div class="cart-footer">
                <div class="cart-summary" id="cartSummary">
                    <!-- El resumen se generará dinámicamente -->
                </div>
                <button class="checkout-btn" id="checkoutBtn">
                    💳 Proceder al Pago
                </button>
            </div>
        `;

        cartOverlay.appendChild(cartContainer);
        document.body.appendChild(cartOverlay);
    }

    bindAllEvents() {
        // Botón del carrito en el header
        this.bindCartButton();
        
        // Eventos del carrito
        this.bindCartEvents();
        
        // Eventos de productos
        this.bindProductEvents();
        
        // Eventos globales
        this.bindGlobalEvents();
    }

    bindCartButton() {
        const bindButton = () => {
            const cartButton = document.getElementById('cartButton');
            if (cartButton) {
                // Remover event listeners existentes
                cartButton.replaceWith(cartButton.cloneNode(true));
                const newCartButton = document.getElementById('cartButton');
                
                newCartButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🛒 Botón del carrito clickeado');
                    this.toggleCart();
                });
                
                console.log('✅ Botón del carrito vinculado correctamente');
            } else {
                console.log('❌ Botón del carrito no encontrado, reintentando...');
                setTimeout(bindButton, 100);
            }
        };
        bindButton();
    }

    bindCartEvents() {
        // Cerrar carrito
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', (e) => {
                if (e.target === cartOverlay) {
                    this.closeCart();
                }
            });
        }

        // Botón de checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
        }
    }

    bindProductEvents() {
        // Vincular todos los botones de "Añadir al carrito" - SOLO los botones específicos
        document.addEventListener('click', (e) => {
            // Solo procesar botones que NO sean de cantidad
            if (!e.target.classList.contains('quantity-btn') && 
                !e.target.classList.contains('minus') && 
                !e.target.classList.contains('plus') &&
                (e.target.matches('button[onclick*="addToCart"]') || 
                 e.target.matches('button[onclick*="addToCartWithQuantity"]'))) {
                
                e.preventDefault();
                e.stopPropagation();
                
                // Extraer el ID del producto del onclick
                const onclick = e.target.getAttribute('onclick');
                const productIdMatch = onclick.match(/addToCart(?:WithQuantity)?\((\d+)\)/);
                
                if (productIdMatch) {
                    const productId = parseInt(productIdMatch[1]);
                    this.addProductToCart(productId);
                }
            }
        });
    }

    bindGlobalEvents() {
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
    }

    addProductToCart(productId, quantity = 1) {
        // Buscar el producto en los datos disponibles
        let product = null;
        
        // Buscar en window.state.products
        if (window.state && window.state.products) {
            product = window.state.products.find(p => p.id == productId);
        }
        
        // Si no se encuentra, buscar en el DOM
        if (!product) {
            const productElement = document.querySelector(`[data-product-id="${productId}"]`) || 
                                 document.querySelector(`article[data-id="${productId}"]`);
            if (productElement) {
                const name = productElement.querySelector('h3')?.textContent || `Producto ${productId}`;
                const priceText = productElement.querySelector('.price')?.textContent || '0€';
                const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
                const image = productElement.querySelector('img')?.src || '';
                
                product = {
                    id: productId,
                    name: name,
                    price: price,
                    image: image
                };
            }
        }
        
        if (!product) {
            console.error('❌ Producto no encontrado:', productId);
            return;
        }

        // Obtener cantidad del input si existe
        const quantityInput = document.getElementById(`qty-${productId}`);
        if (quantityInput) {
            quantity = parseInt(quantityInput.value) || 1;
        }

        // Añadir al carrito
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCartToStorage();
        this.updateCartCount();
        this.showAddedAnimation(product.name);
        
        // Si el carrito está abierto, actualizar la visualización
        if (this.isOpen) {
            this.updateCartDisplay();
        }
        
        console.log('✅ Producto añadido al carrito:', product.name);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
        
        if (this.isOpen) {
            this.updateCartDisplay();
        }
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartCount();
                
                if (this.isOpen) {
                    this.updateCartDisplay();
                }
            }
        }
    }

    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContainer = document.getElementById('cartContainer');
        
        if (cartOverlay && cartContainer) {
            cartOverlay.classList.add('active');
            cartContainer.classList.add('active');
            this.isOpen = true;
            this.updateCartDisplay();
        }
    }

    closeCart() {
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContainer = document.getElementById('cartContainer');
        
        if (cartOverlay && cartContainer) {
            cartOverlay.classList.remove('active');
            cartContainer.classList.remove('active');
            this.isOpen = false;
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        
        if (!cartItems || !cartSummary) return;

        // Limpiar contenido
        cartItems.innerHTML = '';
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <div class="cart-empty-text">Tu carrito está vacío</div>
                    <div class="cart-empty-subtext">Añade algunos productos para comenzar</div>
                </div>
            `;
            cartSummary.innerHTML = '';
            return;
        }

        // Mostrar items
        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-header">
                    <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxOCIgeT0iMTgiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEyIDIwQzcuNTkgMjAgNCAxNi40MSA0IDEyUzcuNTkgNCAxMiA0UzIwIDcuNTkgMjAgMTJTMTYuNDEgMjAgMTIgMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMiA2QzEwLjM0IDYgOSA3LjM0IDkgOVMxMC4zNCAxMiAxMiAxMlMxNSAxMC42NiAxNSA5UzEzLjY2IDYgMTIgNloiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI2IiB5PSIxNCI+CjxwYXRoIGQ9Ik02IDhDNC45IDggNCA4LjkgNCAxMFYxMkM0IDEzLjEgNC45IDE0IDYgMTRTOCAxMy4xIDggMTJWMTBDOCA4LjkgNy4xIDggNiA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPgo='">
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">${this.formatPrice(item.price)}</p>
                    </div>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="completeCartSystem.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="completeCartSystem.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="completeCartSystem.removeFromCart(${item.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        // Actualizar resumen
        this.updateCartSummary();
    }

    updateCartSummary() {
        const cartSummary = document.getElementById('cartSummary');
        if (!cartSummary) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99; // Envío gratis a partir de 50€
        const total = subtotal + shipping;

        cartSummary.innerHTML = `
            <div class="summary-row">
                <span>Subtotal (${this.getTotalItems()} productos)</span>
                <span>${this.formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Envío</span>
                <span>${shipping === 0 ? 'Gratis' : this.formatPrice(shipping)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span class="amount">${this.formatPrice(total)}</span>
            </div>
        `;
    }

    updateCartCount() {
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            const count = this.getTotalItems();
            const countElement = cartButton.querySelector('.cart-count');
            
            if (countElement) {
                countElement.textContent = count;
                countElement.style.display = count > 0 ? 'block' : 'none';
            } else if (count > 0) {
                const countSpan = document.createElement('span');
                countSpan.className = 'cart-count';
                countSpan.textContent = count;
                countSpan.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    font-size: 12px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                cartButton.style.position = 'relative';
                cartButton.appendChild(countSpan);
            }
        }
    }

    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    showAddedAnimation(productName) {
        const animation = document.createElement('div');
        animation.className = 'product-added-animation';
        animation.textContent = `✅ ${productName} añadido al carrito`;
        document.body.appendChild(animation);

        setTimeout(() => {
            animation.remove();
        }, 2000);
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Redirigir a la página de checkout
        const totalPrice = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Guardar datos del carrito para el checkout
        localStorage.setItem('checkoutCart', JSON.stringify(this.cart));
        localStorage.setItem('checkoutTotal', totalPrice.toString());
        
        // Redirigir a checkout.html
        window.location.href = 'checkout.html';
    }

    getTotalPrice() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        return subtotal + shipping;
    }

    saveCartToStorage() {
        localStorage.setItem('completeCart', JSON.stringify(this.cart));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('completeCart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
            } catch (e) {
                this.cart = [];
            }
        }
    }
}

// Inicializar el sistema completo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛒 Inicializando sistema completo de carrito...');
    try {
        window.completeCartSystem = new CompleteCartSystem();
        console.log('✅ Sistema completo de carrito inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando sistema completo de carrito:', error);
    }
});

// También inicializar después de un delay por si acaso
setTimeout(() => {
    if (!window.completeCartSystem) {
        console.log('🛒 Reintentando inicialización del sistema completo...');
        try {
            window.completeCartSystem = new CompleteCartSystem();
            console.log('✅ Sistema completo inicializado en segundo intento');
        } catch (error) {
            console.error('❌ Error en segundo intento:', error);
        }
    }
}, 1000);

// Funciones globales para compatibilidad
window.addToCart = function(productId, quantity = 1) {
    if (window.completeCartSystem) {
        window.completeCartSystem.addProductToCart(productId, quantity);
    }
};

window.addToCartWithQuantity = function(productId) {
    if (window.completeCartSystem) {
        window.completeCartSystem.addProductToCart(productId, 1);
    }
};

window.openCart = function() {
    if (window.completeCartSystem) {
        window.completeCartSystem.openCart();
    }
};

window.closeCart = function() {
    if (window.completeCartSystem) {
        window.completeCartSystem.closeCart();
    }
};

window.toggleCart = function() {
    if (window.completeCartSystem) {
        window.completeCartSystem.toggleCart();
    }
};

// Función para navegación entre secciones
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Calcular la posición considerando el header fijo
        const headerHeight = 64; // Altura del header
        const sectionTop = section.offsetTop - headerHeight - 20; // 20px de margen
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
        
        console.log(`📍 Navegando a la sección: ${sectionId}`);
    } else {
        console.error(`❌ Sección no encontrada: ${sectionId}`);
    }
};
