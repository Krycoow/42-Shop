// Sistema de carrito completamente funcional y simple
class FunctionalCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createCartHTML();
        this.bindEvents();
        this.loadCartFromStorage();
        this.updateCartCount();
        console.log('🛒 FunctionalCart inicializado');
    }

    createCartHTML() {
        // Crear overlay del carrito
        const cartOverlay = document.createElement('div');
        cartOverlay.className = 'cart-overlay';
        cartOverlay.id = 'cartOverlay';
        cartOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Crear contenedor del carrito
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-container';
        cartContainer.id = 'cartContainer';
        cartContainer.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 400px;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            border-left: 2px solid rgba(0, 255, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
            z-index: 10001;
        `;

        cartContainer.innerHTML = `
            <div class="cart-header" style="padding: 20px; border-bottom: 1px solid rgba(0, 255, 0, 0.2);">
                <h2 style="color: #00ff00; margin: 0; font-size: 24px;">🛒 Mi Carrito</h2>
                <button id="cartClose" style="background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; position: absolute; top: 20px; right: 20px; transition: all 0.3s ease;">×</button>
            </div>
            
            <div class="cart-content" style="padding: 20px;">
                <div id="cartItems">
                    <!-- Los items se añadirán aquí dinámicamente -->
                </div>
            </div>
            
            <div class="cart-footer" style="padding: 20px; border-top: 1px solid rgba(0, 255, 0, 0.2); position: sticky; bottom: 0; background: #0a0a0a;">
                <div id="cartSummary" style="margin-bottom: 20px;">
                    <!-- El resumen se generará dinámicamente -->
                </div>
                <button id="checkoutBtn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #00ff00, #00cc00); border: none; border-radius: 8px; color: #000; font-weight: bold; font-size: 16px; cursor: pointer; transition: all 0.3s ease;">
                    💳 Proceder al Pago
                </button>
            </div>
        `;
        
        // Añadir estilos CSS para efectos hover
        const cartStyles = document.createElement('style');
        cartStyles.textContent = `
            #cartClose:hover {
                color: #00ff00 !important;
                transform: scale(1.2);
            }
            
            #checkoutBtn:hover {
                background: linear-gradient(135deg, #00cc00, #009900) !important;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 255, 0, 0.3);
            }
            
            .cart-item:hover {
                background: rgba(0, 255, 0, 0.12) !important;
                border-color: rgba(0, 255, 0, 0.5) !important;
                transform: translateY(-2px);
            }
            
            .cart-item button:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
            }
            
            .cart-item button[onclick*="removeFromCart"]:hover {
                background: rgba(239, 68, 68, 0.4) !important;
                border-color: rgba(239, 68, 68, 0.8) !important;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            }
        `;
        document.head.appendChild(cartStyles);

        cartOverlay.appendChild(cartContainer);
        document.body.appendChild(cartOverlay);
    }

    bindEvents() {
        // Botón del carrito en el header - con múltiples intentos
        const bindCartButton = () => {
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
                setTimeout(bindCartButton, 200);
            }
        };
        
        // Intentar múltiples veces
        bindCartButton();
        setTimeout(bindCartButton, 500);
        setTimeout(bindCartButton, 1000);

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

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
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
            cartOverlay.style.display = 'block';
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
                cartContainer.style.transform = 'translateX(0)';
            }, 10);
            this.isOpen = true;
            this.updateCartDisplay();
        }
    }

    closeCart() {
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContainer = document.getElementById('cartContainer');
        
        if (cartOverlay && cartContainer) {
            cartOverlay.style.opacity = '0';
            cartContainer.style.transform = 'translateX(100%)';
            setTimeout(() => {
                cartOverlay.style.display = 'none';
            }, 300);
            this.isOpen = false;
        }
    }

    addToCart(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
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
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
        
        if (this.isOpen) {
            this.updateCartDisplay();
        }
        
        console.log('🗑️ Producto eliminado del carrito:', productId);
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
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

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        
        if (!cartItems || !cartSummary) return;

        // Limpiar contenido
        cartItems.innerHTML = '';
        
        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #fff;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🛒</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Tu carrito está vacío</div>
                    <div style="color: #888;">Añade algunos productos para comenzar</div>
                </div>
            `;
            cartSummary.innerHTML = '';
            return;
        }

        // Mostrar items
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.style.cssText = `
                display: flex;
                align-items: center;
                padding: 20px;
                margin-bottom: 15px;
                background: rgba(0, 255, 0, 0.08);
                border: 2px solid rgba(0, 255, 0, 0.3);
                border-radius: 12px;
                transition: all 0.3s ease;
            `;
            
            // Calcular precio total del item
            const itemTotal = item.price * item.quantity;
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px; margin-right: 20px; border: 2px solid rgba(0, 255, 0, 0.3);" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg1MFY1MEgyMFYyMFoiIGZpbGw9IiNFNUU3RUIiLz4KPC9zdmc+'">
                <div style="flex: 1;">
                    <h3 style="color: #fff; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${item.name}</h3>
                    <p style="color: #00ff00; margin: 0 0 5px 0; font-weight: bold; font-size: 16px;">${this.formatPrice(item.price)} cada uno</p>
                    <p style="color: #888; margin: 0; font-size: 14px;">Cantidad: ${item.quantity} | Total: <span style="color: #00ff00; font-weight: bold;">${this.formatPrice(itemTotal)}</span></p>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="functionalCart.updateQuantity(${item.id}, ${item.quantity - 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s ease;">-</button>
                        <span style="color: #fff; min-width: 30px; text-align: center; font-size: 18px; font-weight: bold; background: rgba(0, 255, 0, 0.1); padding: 5px 10px; border-radius: 6px;">${item.quantity}</span>
                        <button onclick="functionalCart.updateQuantity(${item.id}, ${item.quantity + 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s ease;">+</button>
                    </div>
                    <button onclick="functionalCart.removeFromCart(${item.id})" style="background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); color: #fff; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; transition: all 0.3s ease;">
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

        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99; // Envío gratis a partir de 50€
        const total = subtotal + shipping;

        cartSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #fff;">
                <span>Subtotal (${this.getTotalItems()} productos)</span>
                <span>${this.formatPrice(subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #fff;">
                <span>Envío</span>
                <span>${shipping === 0 ? 'Gratis' : this.formatPrice(shipping)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(0, 255, 0, 0.2); color: #00ff00; font-weight: bold; font-size: 18px;">
                <span>Total</span>
                <span>${this.formatPrice(total)}</span>
            </div>
        `;
    }

    updateCartCount() {
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            const count = this.getTotalItems();
            let countElement = cartButton.querySelector('.cart-count');
            
            // Asegurar que el botón tenga posición relativa
            cartButton.style.position = 'relative';
            
            if (countElement) {
                countElement.textContent = count;
                countElement.style.display = count > 0 ? 'flex' : 'none';
            } else {
                countElement = document.createElement('span');
                countElement.className = 'cart-count';
                countElement.textContent = count;
                countElement.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 22px;
                    height: 22px;
                    font-size: 11px;
                    font-weight: 700;
                    display: ${count > 0 ? 'flex' : 'none'};
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #0a0a0a;
                    z-index: 10;
                    min-width: 22px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                `;
                cartButton.appendChild(countElement);
            }
            
            // Actualizar el texto del botón si tiene span
            const cartText = cartButton.querySelector('span');
            if (cartText && !cartText.classList.contains('cart-count')) {
                cartText.textContent = count > 0 ? `Carrito (${count})` : 'Carrito';
            }
        }
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    showAddedAnimation(productName) {
        const animation = document.createElement('div');
        animation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.9);
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10002;
            animation: fadeInOut 2s ease-in-out;
        `;
        animation.textContent = `✅ ${productName} añadido al carrito`;
        document.body.appendChild(animation);

        // Añadir animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            animation.remove();
            style.remove();
        }, 2000);
    }

    proceedToCheckout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        const total = this.getTotalPrice();
        const totalItems = this.getTotalItems();
        
        // Mostrar mensaje de éxito
        alert(`✅ Compra procesada con éxito!\n\n${totalItems} productos por un total de ${this.formatPrice(total)}\n\n¡Gracias por tu compra!`);
        
        // Limpiar carrito
        this.items = [];
        this.saveCartToStorage();
        this.updateCartCount();
        this.closeCart();
        this.updateCartDisplay();
        
        console.log('✅ Compra procesada exitosamente');
    }

    getTotalPrice() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        return subtotal + shipping;
    }

    saveCartToStorage() {
        localStorage.setItem('functionalCart', JSON.stringify(this.items));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('functionalCart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
    }

    // Método público para añadir productos desde otros scripts
    addProduct(product, quantity = 1) {
        this.addToCart(product, quantity);
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛒 Inicializando FunctionalCart...');
    try {
        window.functionalCart = new FunctionalCart();
        console.log('✅ FunctionalCart inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando FunctionalCart:', error);
    }
});

// También inicializar después de un delay por si acaso
setTimeout(() => {
    if (!window.functionalCart) {
        console.log('🛒 Reintentando inicialización de FunctionalCart...');
        try {
            window.functionalCart = new FunctionalCart();
            console.log('✅ FunctionalCart inicializado en segundo intento');
        } catch (error) {
            console.error('❌ Error en segundo intento:', error);
        }
    }
}, 1000);

// Funciones globales para el carrito (compatible con otros scripts)
window.addToCart = function(product, quantity = 1) {
    if (window.functionalCart) {
        window.functionalCart.addProduct(product, quantity);
    }
};

window.openCart = function() {
    if (window.functionalCart) {
        window.functionalCart.openCart();
    }
};

window.closeCart = function() {
    if (window.functionalCart) {
        window.functionalCart.closeCart();
    }
};

window.toggleCart = function() {
    if (window.functionalCart) {
        window.functionalCart.toggleCart();
    }
};
