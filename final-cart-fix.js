// Script final para arreglar el carrito definitivamente
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 ARREGLO FINAL DEL CARRITO - Iniciando...');
    
    // Esperar un poco para que se carguen todos los scripts
    setTimeout(() => {
        console.log('🔧 Ejecutando arreglo final...');
        
        // Destruir cualquier sistema de carrito anterior
        if (window.newCart) {
            console.log('🔧 Destruyendo sistema anterior...');
            delete window.newCart;
        }
        
        // Crear el sistema de carrito final
        window.newCart = {
            items: [],
            isOpen: false,
            
            addCustomProduct: function(productData) {
                console.log('🛒 FINAL - Añadiendo producto:', productData.name);
                
                const existingItem = this.items.find(item => item.id === productData.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    this.items.push({ ...productData, quantity: 1 });
                }
                
                this.updateCartCount();
                this.showNotification(productData.name);
                this.saveToStorage();
                
                // IMPORTANTE: NO abrir automáticamente el carrito
                console.log('✅ FINAL - Producto añadido SIN abrir carrito automáticamente');
            },
            
            updateCartCount: function() {
                const cartButton = document.getElementById('cartButton');
                if (cartButton) {
                    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
                    let countElement = cartButton.querySelector('.cart-count');
                    
                    if (!countElement) {
                        countElement = document.createElement('span');
                        countElement.className = 'cart-count';
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
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border: 2px solid #0a0a0a;
                            z-index: 1000;
                        `;
                        cartButton.appendChild(countElement);
                        cartButton.style.position = 'relative';
                    }
                    
                    countElement.textContent = count;
                    countElement.style.display = count > 0 ? 'flex' : 'none';
                    console.log('✅ FINAL - Contador actualizado:', count);
                }
            },
            
            showNotification: function(productName) {
                console.log('🛒 FINAL - Mostrando notificación para:', productName);
                
                // Remover notificaciones anteriores
                const existingNotifications = document.querySelectorAll('.final-cart-notification');
                existingNotifications.forEach(n => n.remove());
                
                const notification = document.createElement('div');
                notification.className = 'final-cart-notification';
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 24px;">✅</div>
                        <div>
                            <div style="font-weight: bold;">${productName}</div>
                            <div style="font-size: 14px; opacity: 0.8;">añadido al carrito</div>
                        </div>
                    </div>
                `;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #00ff00, #00cc00);
                    color: #000000;
                    padding: 15px 20px;
                    border-radius: 15px;
                    font-weight: 600;
                    font-size: 16px;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(0, 255, 0, 0.5);
                    animation: finalCartSlideIn 0.3s ease-out;
                    max-width: 300px;
                `;
                
                // Añadir animación CSS
                if (!document.getElementById('final-cart-styles')) {
                    const style = document.createElement('style');
                    style.id = 'final-cart-styles';
                    style.textContent = `
                        @keyframes finalCartSlideIn {
                            from { opacity: 0; transform: translateX(100%); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        @keyframes finalCartSlideOut {
                            from { opacity: 1; transform: translateX(0); }
                            to { opacity: 0; transform: translateX(100%); }
                        }
                        @keyframes finalCartModalSlideIn {
                            from { opacity: 0; transform: scale(0.8); }
                            to { opacity: 1; transform: scale(1); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(notification);
                console.log('✅ FINAL - Notificación añadida');
                
                setTimeout(() => {
                    notification.style.animation = 'finalCartSlideOut 0.3s ease-out';
                    setTimeout(() => {
                        notification.remove();
                        console.log('✅ FINAL - Notificación removida');
                    }, 300);
                }, 3000);
            },
            
            saveToStorage: function() {
                localStorage.setItem('finalCart', JSON.stringify(this.items));
            },
            
            loadFromStorage: function() {
                const saved = localStorage.getItem('finalCart');
                if (saved) {
                    try {
                        this.items = JSON.parse(saved);
                        this.updateCartCount();
                    } catch (e) {
                        this.items = [];
                    }
                }
            },
            
            openCart: function() {
                console.log('🛒 FINAL - Abriendo carrito...');
                this.createCartModal();
            },
            
            toggleCart: function() {
                this.openCart();
            },
            
            createCartModal: function() {
                // Remover modal anterior si existe
                const existingModal = document.getElementById('finalCartModal');
                if (existingModal) {
                    existingModal.remove();
                }
                
                const modal = document.createElement('div');
                modal.id = 'finalCartModal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 20000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(5px);
                `;
                
                const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                modal.innerHTML = `
                    <div style="
                        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                        border: 3px solid rgba(0, 255, 0, 0.5);
                        border-radius: 20px;
                        width: 90%;
                        max-width: 500px;
                        max-height: 80vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 60px rgba(0, 255, 0, 0.3);
                        animation: finalCartModalSlideIn 0.3s ease-out;
                    ">
                        <div style="
                            padding: 25px;
                            border-bottom: 2px solid rgba(0, 255, 0, 0.3);
                            background: rgba(0, 255, 0, 0.05);
                            position: sticky;
                            top: 0;
                            z-index: 10;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h2 style="color: #00ff00; margin: 0; font-size: 28px; font-weight: bold;">
                                    🛒 Mi Carrito
                                </h2>
                                <button id="finalCartClose" style="
                                    background: rgba(239, 68, 68, 0.2);
                                    border: 2px solid rgba(239, 68, 68, 0.5);
                                    color: #fff;
                                    font-size: 24px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    transition: all 0.3s ease;
                                ">×</button>
                            </div>
                            <div style="color: #888; margin-top: 8px; font-size: 14px;">
                                ${this.items.length} producto${this.items.length !== 1 ? 's' : ''} en tu carrito
                            </div>
                        </div>
                        
                        <div style="padding: 25px;">
                            ${this.items.length === 0 ? `
                                <div style="text-align: center; padding: 40px; color: #888;">
                                    <div style="font-size: 80px; margin-bottom: 20px; opacity: 0.5;">🛒</div>
                                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #fff;">
                                        Tu carrito está vacío
                                    </div>
                                    <div style="font-size: 16px; color: #888;">
                                        Añade algunos productos para comenzar
                                    </div>
                                </div>
                            ` : `
                                <div id="finalCartItems">
                                    ${this.items.map(item => `
                                        <div style="
                                            display: flex;
                                            align-items: center;
                                            padding: 15px;
                                            margin-bottom: 15px;
                                            background: rgba(255, 255, 255, 0.05);
                                            border: 1px solid rgba(0, 255, 0, 0.2);
                                            border-radius: 12px;
                                            transition: all 0.3s ease;
                                        ">
                                            <img src="${item.image}" alt="${item.name}" style="
                                                width: 60px;
                                                height: 60px;
                                                object-fit: cover;
                                                border-radius: 8px;
                                                margin-right: 15px;
                                            ">
                                            <div style="flex: 1;">
                                                <h3 style="color: #fff; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">
                                                    ${item.name}
                                                </h3>
                                                <div style="color: #00ff00; font-size: 18px; font-weight: bold;">
                                                    €${item.price.toFixed(2)}
                                                </div>
                                            </div>
                                            <div style="display: flex; align-items: center; gap: 10px;">
                                                <button class="final-quantity-decrease" data-item-id="${item.id}" style="
                                                    background: rgba(239, 68, 68, 0.2);
                                                    border: 1px solid rgba(239, 68, 68, 0.5);
                                                    color: #fff;
                                                    width: 30px;
                                                    height: 30px;
                                                    border-radius: 50%;
                                                    cursor: pointer;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    font-weight: bold;
                                                ">-</button>
                                                <span class="final-quantity-display" data-item-id="${item.id}" style="color: #fff; font-weight: bold; min-width: 30px; text-align: center;">
                                                    ${item.quantity}
                                                </span>
                                                <button class="final-quantity-increase" data-item-id="${item.id}" style="
                                                    background: rgba(0, 255, 0, 0.2);
                                                    border: 1px solid rgba(0, 255, 0, 0.5);
                                                    color: #fff;
                                                    width: 30px;
                                                    height: 30px;
                                                    border-radius: 50%;
                                                    cursor: pointer;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    font-weight: bold;
                                                ">+</button>
                                                <button class="final-remove-item" data-item-id="${item.id}" style="
                                                    background: rgba(239, 68, 68, 0.2);
                                                    border: 1px solid rgba(239, 68, 68, 0.5);
                                                    color: #fff;
                                                    padding: 5px 10px;
                                                    border-radius: 6px;
                                                    cursor: pointer;
                                                    font-size: 12px;
                                                ">Eliminar</button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                        
                        ${this.items.length > 0 ? `
                            <div style="
                                padding: 25px;
                                border-top: 2px solid rgba(0, 255, 0, 0.3);
                                background: rgba(0, 0, 0, 0.8);
                                position: sticky;
                                bottom: 0;
                                backdrop-filter: blur(10px);
                            ">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                    <span style="color: #fff; font-size: 18px; font-weight: 600;">Total:</span>
                                    <span id="finalCartTotal" style="color: #00ff00; font-size: 24px; font-weight: bold;">€${total.toFixed(2)}</span>
                                </div>
                                <button id="finalCartCheckout" style="
                                    width: 100%;
                                    padding: 18px;
                                    background: linear-gradient(135deg, #00ff00, #00cc00);
                                    border: none;
                                    border-radius: 12px;
                                    color: #000;
                                    font-weight: bold;
                                    font-size: 18px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
                                ">
                                    💳 Proceder al Pago
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Event listeners
                document.getElementById('finalCartClose').addEventListener('click', () => {
                    this.closeCartModal();
                });
                
                if (this.items.length > 0) {
                    document.getElementById('finalCartCheckout').addEventListener('click', () => {
                        this.proceedToCheckout();
                    });
                    
                    // Event listeners para botones de cantidad - VERSIÓN FINAL
                    const decreaseButtons = modal.querySelectorAll('.final-quantity-decrease');
                    decreaseButtons.forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const itemId = button.getAttribute('data-item-id');
                            console.log('🛒 FINAL - Disminuyendo cantidad para:', itemId);
                            this.updateQuantityFinal(itemId, -1);
                        });
                    });
                    
                    const increaseButtons = modal.querySelectorAll('.final-quantity-increase');
                    increaseButtons.forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const itemId = button.getAttribute('data-item-id');
                            console.log('🛒 FINAL - Aumentando cantidad para:', itemId);
                            this.updateQuantityFinal(itemId, 1);
                        });
                    });
                    
                    const removeButtons = modal.querySelectorAll('.final-remove-item');
                    removeButtons.forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const itemId = button.getAttribute('data-item-id');
                            console.log('🛒 FINAL - Eliminando item:', itemId);
                            this.removeItemFinal(itemId);
                        });
                    });
                }
                
                // Cerrar al hacer clic fuera del modal
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeCartModal();
                    }
                });
            },
            
            closeCartModal: function() {
                const modal = document.getElementById('finalCartModal');
                if (modal) {
                    modal.style.animation = 'finalCartModalSlideIn 0.3s ease-out reverse';
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            },
            
            updateQuantityFinal: function(itemId, change) {
                console.log('🛒 FINAL - updateQuantityFinal llamado:', itemId, change);
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    const oldQuantity = item.quantity;
                    item.quantity += change;
                    
                    if (item.quantity <= 0) {
                        console.log('🛒 FINAL - Cantidad llegó a 0, eliminando item');
                        this.removeItemFinal(itemId);
                    } else {
                        console.log('🛒 FINAL - Cantidad actualizada:', oldQuantity, '->', item.quantity);
                        this.updateCartCount();
                        this.saveToStorage();
                        
                        // Actualizar solo el número en el modal
                        const modal = document.getElementById('finalCartModal');
                        if (modal) {
                            const quantitySpan = modal.querySelector(`.final-quantity-display[data-item-id="${itemId}"]`);
                            if (quantitySpan) {
                                quantitySpan.textContent = item.quantity;
                            }
                            
                            // Actualizar el total
                            const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                            const totalElement = modal.querySelector('#finalCartTotal');
                            if (totalElement) {
                                totalElement.textContent = `€${total.toFixed(2)}`;
                            }
                        }
                    }
                } else {
                    console.log('❌ FINAL - Item no encontrado:', itemId);
                }
            },
            
            removeItemFinal: function(itemId) {
                console.log('🛒 FINAL - removeItemFinal llamado:', itemId);
                this.items = this.items.filter(item => item.id !== itemId);
                this.updateCartCount();
                this.saveToStorage();
                
                // Si no quedan items, cerrar el modal
                if (this.items.length === 0) {
                    this.closeCartModal();
                } else {
                    // Recrear modal con los items restantes
                    this.createCartModal();
                }
            },
            
            proceedToCheckout: function() {
                console.log('💳 FINAL - Procediendo al pago...');
                this.closeCartModal();
                
                // Usar el sistema de pago existente
                if (window.paymentScreen) {
                    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
                    const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    
                    const cartData = {
                        items: this.items,
                        totalItems: totalItems,
                        total: `€${total.toFixed(2)}`,
                        subtotal: `€${total.toFixed(2)}`,
                        shipping: '€0.00'
                    };
                    
                    console.log('💳 FINAL - Datos del carrito para pago:', cartData);
                    window.paymentScreen.showPaymentModal(cartData);
                } else {
                    // Fallback simple
                    alert(`Procediendo al pago por €${this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
                }
            },
            
            clearCart: function() {
                console.log('🛒 FINAL - Limpiando carrito...');
                this.items = [];
                this.updateCartCount();
                this.saveToStorage();
                console.log('✅ FINAL - Carrito limpiado');
            }
        };
        
        // Cargar datos guardados
        window.newCart.loadFromStorage();
        
        // Sobrescribir funciones globales - VERSIÓN FINAL
        window.addToCart = function(product) {
            console.log('🛒 FINAL - addToCart global llamado para:', product.name);
            if (window.newCart) {
                const cartProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png'
                };
                window.newCart.addCustomProduct(cartProduct);
            }
        };
        
        window.addCustomToCart = function(productType, price) {
            console.log('🛒 FINAL - addCustomToCart llamado para:', productType, price);
            if (window.newCart) {
                const cartProduct = {
                    id: `custom-${productType}-${Date.now()}`,
                    name: `${productType.charAt(0).toUpperCase() + productType.slice(1)} Custom`,
                    price: price,
                    image: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/custom-product.png'
                };
                window.newCart.addCustomProduct(cartProduct);
            }
        };
        
        window.addToCartWithQuantity = function(productId, quantity = 1) {
            console.log('🛒 FINAL - addToCartWithQuantity llamado para:', productId, quantity);
            if (window.state && window.state.products) {
                const product = window.state.products.find(p => p.id === productId);
                if (product) {
                    for (let i = 0; i < quantity; i++) {
                        window.addToCart(product);
                    }
                }
            }
        };
        
        // Vincular botón del carrito - VERSIÓN FINAL
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            // Remover event listeners anteriores
            const newCartButton = cartButton.cloneNode(true);
            cartButton.replaceWith(newCartButton);
            
            newCartButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🛒 FINAL - Botón del carrito clickeado');
                if (window.newCart) {
                    window.newCart.toggleCart();
                }
            });
            console.log('✅ FINAL - Botón del carrito vinculado');
        }
        
        console.log('✅ FINAL - Sistema de carrito final completado');
        
        // Función de prueba final
        window.testFinalCart = function() {
            console.log('🧪 FINAL - Probando carrito final...');
            if (window.newCart) {
                window.newCart.addCustomProduct({
                    id: 'final-test-' + Date.now(),
                    name: 'Producto Final Test',
                    price: 19.99,
                    image: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png'
                });
            }
        };
        
        // Función para probar el sistema de pago
        window.testPayment = function() {
            console.log('🧪 FINAL - Probando sistema de pago...');
            if (window.newCart && window.newCart.items.length > 0) {
                window.newCart.proceedToCheckout();
            } else {
                console.log('❌ No hay items en el carrito para probar el pago');
                // Añadir un producto de prueba
                window.testFinalCart();
                setTimeout(() => {
                    window.newCart.proceedToCheckout();
                }, 1000);
            }
        };
        
    }, 3000); // Esperar más tiempo para asegurar que todo se carga
});
