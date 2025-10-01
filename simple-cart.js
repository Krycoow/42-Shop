// Sistema de carrito simple y funcional
class SimpleCart {
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
        console.log('🛒 SimpleCart inicializado');
    }

    createCartHTML() {
        // Crear overlay del carrito
        const cartOverlay = document.createElement('div');
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
            <div style="padding: 20px; border-bottom: 1px solid rgba(0, 255, 0, 0.2); position: relative;">
                <h2 style="color: #00ff00; margin: 0; font-size: 24px;">🛒 Mi Carrito</h2>
                <button id="cartClose" style="background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; position: absolute; top: 20px; right: 20px; transition: all 0.3s ease;">×</button>
            </div>
            
            <div style="padding: 20px;">
                <div id="cartItems">
                    <!-- Los items se añadirán aquí dinámicamente -->
                </div>
            </div>
            
            <div style="padding: 20px; border-top: 1px solid rgba(0, 255, 0, 0.2); position: sticky; bottom: 0; background: #0a0a0a;">
                <div id="cartSummary" style="margin-bottom: 20px;">
                    <!-- El resumen se generará dinámicamente -->
                </div>
                <button id="checkoutBtn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #00ff00, #00cc00); border: none; border-radius: 8px; color: #000; font-weight: bold; font-size: 16px; cursor: pointer; transition: all 0.3s ease;">
                    💳 Proceder al Pago
                </button>
            </div>
        `;

        cartOverlay.appendChild(cartContainer);
        document.body.appendChild(cartOverlay);
        
        // Añadir estilos CSS
        this.addCartStyles();
    }

    addCartStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
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
        document.head.appendChild(styles);
    }

    bindEvents() {
        // Botón del carrito - múltiples intentos
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
                console.log('✅ Botón del carrito vinculado');
            } else {
                console.log('❌ Botón del carrito no encontrado, reintentando...');
                setTimeout(bindCartButton, 200);
            }
        };
        
        // Intentar múltiples veces
        bindCartButton();
        setTimeout(bindCartButton, 500);
        setTimeout(bindCartButton, 1000);

        // Event listeners globales que no se rompan
        this.setupGlobalEventListeners();
    }

    setupGlobalEventListeners() {
        // Cerrar carrito
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cartClose') {
                this.closeCart();
            } else if (e.target.id === 'cartOverlay') {
                this.closeCart();
            } else if (e.target.id === 'checkoutBtn') {
                this.proceedToCheckout();
            }
        });

        // Botones de añadir al carrito - más robusto
        document.addEventListener('click', (e) => {
            if (e.target.matches('button[onclick*="addToCart"]') || 
                e.target.matches('button[onclick*="addToCartWithQuantity"]')) {
                
                e.preventDefault();
                e.stopPropagation();
                
                const onclick = e.target.getAttribute('onclick');
                const productIdMatch = onclick.match(/addToCart(?:WithQuantity)?\((\d+)\)/);
                
                if (productIdMatch) {
                    const productId = parseInt(productIdMatch[1]);
                    console.log('🛒 Intentando añadir producto:', productId);
                    this.addToCart(productId);
                }
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
    }

    addToCart(productId) {
        const product = this.findProductById(productId);
        if (!product) {
            console.log('❌ Producto no encontrado:', productId);
            return;
        }
        
        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCartToStorage();
        this.updateCartCount();
        this.showAddedAnimation(product.name);
        
        // Siempre actualizar la visualización del carrito si está abierto
        if (this.isOpen) {
            setTimeout(() => {
                this.updateCartDisplay();
            }, 100);
        }
        
        console.log('✅ Producto añadido:', product.name, 'Total items:', this.getTotalItems());
    }

    findProductById(id) {
        const products = [
            { id: 1, name: "Camiseta 42", price: 25.99, image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png" },
            { id: 2, name: "Taza 42", price: 15.99, image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/taza.png" },
            { id: 3, name: "Hoodie 42", price: 45.99, image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/hoodie.png" },
            { id: 4, name: "Sticker Pack", price: 8.99, image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/stickers.png" },
            { id: 5, name: "Laptop Sticker", price: 3.99, image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/laptop-sticker.png" }
        ];
        return products.find(p => p.id === id);
    }

    toggleCart() {
        console.log('🛒 Toggle cart - Estado actual:', this.isOpen);
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContainer = document.getElementById('cartContainer');
        
        console.log('🛒 Abriendo carrito...');
        
        if (cartOverlay && cartContainer) {
            cartOverlay.style.display = 'block';
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
                cartContainer.style.transform = 'translateX(0)';
            }, 10);
            this.isOpen = true;
            this.updateCartDisplay();
            console.log('✅ Carrito abierto');
        } else {
            console.log('❌ Elementos del carrito no encontrados');
        }
    }

    closeCart() {
        const cartOverlay = document.getElementById('cartOverlay');
        const cartContainer = document.getElementById('cartContainer');
        
        console.log('🛒 Cerrando carrito...');
        
        if (cartOverlay && cartContainer) {
            cartOverlay.style.opacity = '0';
            cartContainer.style.transform = 'translateX(100%)';
            setTimeout(() => {
                cartOverlay.style.display = 'none';
            }, 300);
            this.isOpen = false;
            console.log('✅ Carrito cerrado');
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        
        if (!cartItems || !cartSummary) {
            console.log('❌ Elementos del carrito no encontrados');
            return;
        }

        console.log('🛒 Actualizando carrito con', this.items.length, 'productos');
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

        this.items.forEach((item, index) => {
            console.log(`🛒 Renderizando producto ${index + 1}:`, item.name, 'Cantidad:', item.quantity);
            
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
                        <button onclick="simpleCart.updateQuantity(${item.id}, ${item.quantity - 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s ease;">-</button>
                        <span style="color: #fff; min-width: 30px; text-align: center; font-size: 18px; font-weight: bold; background: rgba(0, 255, 0, 0.1); padding: 5px 10px; border-radius: 6px;">${item.quantity}</span>
                        <button onclick="simpleCart.updateQuantity(${item.id}, ${item.quantity + 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; transition: all 0.3s ease;">+</button>
                    </div>
                    <button onclick="simpleCart.removeFromCart(${item.id})" style="background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); color: #fff; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold; transition: all 0.3s ease;">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        this.updateCartSummary();
        console.log('✅ Carrito actualizado correctamente');
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
                this.updateCartDisplay();
            }
        }
    }

    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        console.log('🗑️ Producto eliminado:', productId);
    }

    updateCartSummary() {
        const cartSummary = document.getElementById('cartSummary');
        if (!cartSummary) return;

        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const totalBeforeDiscount = subtotal + shipping;
        
        // Aplicar descuento si está disponible
        let discountAmount = 0;
        let finalTotal = totalBeforeDiscount;
        
        if (window.discountNotification && window.discountNotification.shouldApplyDiscount(totalBeforeDiscount)) {
            discountAmount = window.discountNotification.calculateDiscount(totalBeforeDiscount);
            finalTotal = totalBeforeDiscount - discountAmount;
        }

        cartSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #fff;">
                <span>Subtotal (${this.getTotalItems()} productos)</span>
                <span>${this.formatPrice(subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #fff;">
                <span>Envío</span>
                <span>${shipping === 0 ? 'Gratis' : this.formatPrice(shipping)}</span>
            </div>
            ${discountAmount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #00ff00;">
                    <span>🎉 Descuento (60%)</span>
                    <span>-${this.formatPrice(discountAmount)}</span>
                </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(0, 255, 0, 0.2); color: #00ff00; font-weight: bold; font-size: 18px;">
                <span>Total</span>
                <span>${this.formatPrice(finalTotal)}</span>
            </div>
        `;
    }

    updateCartCount() {
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            const count = this.getTotalItems();
            cartButton.style.position = 'relative';
            
            let countElement = cartButton.querySelector('.cart-count');
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

        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
        const totalBeforeDiscount = subtotal + shipping;
        
        // Aplicar descuento si está disponible
        let discountAmount = 0;
        let finalTotal = totalBeforeDiscount;
        
        if (window.discountNotification && window.discountNotification.shouldApplyDiscount(totalBeforeDiscount)) {
            discountAmount = window.discountNotification.calculateDiscount(totalBeforeDiscount);
            finalTotal = totalBeforeDiscount - discountAmount;
            
            // Mostrar notificación de descuento aplicado
            window.discountNotification.showDiscountApplied(totalBeforeDiscount, discountAmount, finalTotal);
        }
        
        const cartData = {
            totalItems: this.getTotalItems(),
            subtotal: this.formatPrice(subtotal),
            shipping: shipping === 0 ? 'Gratis' : this.formatPrice(shipping),
            discount: discountAmount > 0 ? this.formatPrice(discountAmount) : '0€',
            total: this.formatPrice(finalTotal)
        };
        
        // Cerrar carrito y abrir pantalla de pago
        this.closeCart();
        
        setTimeout(() => {
            if (window.paymentScreen) {
                window.paymentScreen.showPaymentModal(cartData);
            } else {
                // Fallback si no está disponible la pantalla de pago
                alert(`✅ Compra procesada con éxito!\n\n${this.getTotalItems()} productos por un total de ${this.formatPrice(total)}\n\n¡Gracias por tu compra!`);
                this.clearCart();
            }
        }, 300);
        
        console.log('💳 Procediendo al pago con datos:', cartData);
    }

    clearCart() {
        this.items = [];
        this.saveCartToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    saveCartToStorage() {
        localStorage.setItem('simpleCart', JSON.stringify(this.items));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('simpleCart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛒 Inicializando SimpleCart...');
    window.simpleCart = new SimpleCart();
});

// También inicializar después de un delay por si acaso
setTimeout(() => {
    if (!window.simpleCart) {
        console.log('🛒 Reintentando inicialización de SimpleCart...');
        window.simpleCart = new SimpleCart();
    }
}, 1000);
