// Sistema completo de autenticación y carrito funcional
class CompleteSystem {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.loadCartFromStorage();
        this.createCartSystem();
        this.bindEvents();
        this.updateUI();
        console.log('🚀 CompleteSystem inicializado - Solo carrito');
    }

    createAuthButtons() {
        // NO crear botones de autenticación automáticamente
        // Solo mantener funcionalidad si ya existen
        console.log('🔐 Botones de autenticación no creados automáticamente');
    }

    createCartSystem() {
        // Crear el sistema de carrito
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
            <div style="padding: 20px; border-bottom: 1px solid rgba(0, 255, 0, 0.2);">
                <h2 style="color: #00ff00; margin: 0; font-size: 24px;">🛒 Mi Carrito</h2>
                <button id="cartClose" style="background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; position: absolute; top: 20px; right: 20px;">×</button>
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
                <button id="checkoutBtn" style="width: 100%; padding: 15px; background: linear-gradient(135deg, #00ff00, #00cc00); border: none; border-radius: 8px; color: #000; font-weight: bold; font-size: 16px; cursor: pointer;">
                    💳 Proceder al Pago
                </button>
            </div>
        `;

        cartOverlay.appendChild(cartContainer);
        document.body.appendChild(cartOverlay);
    }

    bindEvents() {
        // Botones de autenticación
        document.addEventListener('click', (e) => {
            if (e.target.id === 'loginBtn') {
                this.showLoginModal();
            } else if (e.target.id === 'registerBtn') {
                this.showRegisterModal();
            } else if (e.target.id === 'userBtn') {
                this.showUserMenu();
            }
        });

        // Botón del carrito
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cartButton') {
                this.toggleCart();
            } else if (e.target.id === 'cartClose' || e.target.id === 'cartOverlay') {
                this.closeCart();
            } else if (e.target.id === 'checkoutBtn') {
                this.proceedToCheckout();
            }
        });

        // Botones de añadir al carrito
        document.addEventListener('click', (e) => {
            if (e.target.matches('button[onclick*="addToCart"]') || 
                e.target.matches('button[onclick*="addToCartWithQuantity"]')) {
                
                e.preventDefault();
                e.stopPropagation();
                
                const onclick = e.target.getAttribute('onclick');
                const productIdMatch = onclick.match(/addToCart(?:WithQuantity)?\((\d+)\)/);
                
                if (productIdMatch) {
                    const productId = parseInt(productIdMatch[1]);
                    this.addToCart(productId);
                }
            }
        });

        // Cerrar modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.close();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCart();
                document.querySelectorAll('dialog[open]').forEach(modal => modal.close());
            }
        });
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.showModal();
        } else {
            this.createLoginModal();
        }
    }

    showRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.showModal();
        } else {
            this.createRegisterModal();
        }
    }

    createLoginModal() {
        const modalHTML = `
            <dialog id="loginModal" class="modal" style="background: rgba(0, 0, 0, 0.8); border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 12px; color: #fff;">
                <div style="padding: 30px; max-width: 400px;">
                    <h2 style="color: #00ff00; margin: 0 0 20px 0; text-align: center;">🔐 Iniciar Sesión</h2>
                    <form id="loginForm">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Email:</label>
                            <input type="email" id="loginEmail" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Contraseña:</label>
                            <input type="password" id="loginPassword" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #00ff00, #00cc00); border: none; border-radius: 6px; color: #000; font-weight: bold; cursor: pointer;">
                            Iniciar Sesión
                        </button>
                    </form>
                    <p style="text-align: center; margin-top: 15px; color: #888;">
                        ¿No tienes cuenta? <a href="#" onclick="completeSystem.showRegisterModal(); document.getElementById('loginModal').close();" style="color: #00ff00;">Regístrate aquí</a>
                    </p>
                </div>
            </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupLoginForm();
    }

    createRegisterModal() {
        const modalHTML = `
            <dialog id="registerModal" class="modal" style="background: rgba(0, 0, 0, 0.8); border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 12px; color: #fff;">
                <div style="padding: 30px; max-width: 400px;">
                    <h2 style="color: #00ff00; margin: 0 0 20px 0; text-align: center;">📝 Crear Cuenta</h2>
                    <form id="registerForm">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Nombre:</label>
                            <input type="text" id="registerName" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Email:</label>
                            <input type="email" id="registerEmail" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Contraseña:</label>
                            <input type="password" id="registerPassword" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; color: #fff;">Confirmar Contraseña:</label>
                            <input type="password" id="confirmPassword" required style="width: 100%; padding: 10px; border: 2px solid rgba(0, 255, 0, 0.3); border-radius: 6px; background: rgba(0, 0, 0, 0.5); color: #fff;">
                        </div>
                        <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #00ff00, #00cc00); border: none; border-radius: 6px; color: #000; font-weight: bold; cursor: pointer;">
                            Crear Cuenta
                        </button>
                    </form>
                    <p style="text-align: center; margin-top: 15px; color: #888;">
                        ¿Ya tienes cuenta? <a href="#" onclick="completeSystem.showLoginModal(); document.getElementById('registerModal').close();" style="color: #00ff00;">Inicia sesión aquí</a>
                    </p>
                </div>
            </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupRegisterForm();
    }

    setupLoginForm() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Simular login (en una app real, esto sería una llamada a la API)
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    this.currentUser = user;
                    this.saveUserToStorage();
                    this.updateUI();
                    document.getElementById('loginModal').close();
                    this.showSuccessMessage('¡Bienvenido de nuevo!');
                } else {
                    alert('Email o contraseña incorrectos');
                }
            });
        }
    }

    setupRegisterForm() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (password !== confirmPassword) {
                    alert('Las contraseñas no coinciden');
                    return;
                }
                
                // Simular registro
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find(u => u.email === email)) {
                    alert('Este email ya está registrado');
                    return;
                }
                
                const newUser = { id: Date.now(), name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                this.currentUser = newUser;
                this.saveUserToStorage();
                this.updateUI();
                document.getElementById('registerModal').close();
                this.showSuccessMessage('¡Cuenta creada exitosamente!');
            });
        }
    }

    addToCart(productId) {
        const product = this.findProductById(productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCartToStorage();
        this.updateCartCount();
        this.showSuccessMessage(`${product.name} añadido al carrito`);
        
        if (this.isCartOpen) {
            this.updateCartDisplay();
        }
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
        if (this.isCartOpen) {
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
            this.isCartOpen = true;
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
            this.isCartOpen = false;
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        
        if (!cartItems || !cartSummary) return;

        cartItems.innerHTML = '';
        
        if (this.cart.length === 0) {
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

        this.cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.style.cssText = `
                display: flex;
                align-items: center;
                padding: 20px;
                margin-bottom: 15px;
                background: rgba(0, 255, 0, 0.08);
                border: 2px solid rgba(0, 255, 0, 0.3);
                border-radius: 12px;
            `;
            
            const itemTotal = item.price * item.quantity;
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 10px; margin-right: 20px;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg1MFY1MEgyMFYyMFoiIGZpbGw9IiNFNUU3RUIiLz4KPC9zdmc+'">
                <div style="flex: 1;">
                    <h3 style="color: #fff; margin: 0 0 8px 0; font-size: 18px;">${item.name}</h3>
                    <p style="color: #00ff00; margin: 0 0 5px 0; font-weight: bold;">${this.formatPrice(item.price)} cada uno</p>
                    <p style="color: #888; margin: 0; font-size: 14px;">Cantidad: ${item.quantity} | Total: <span style="color: #00ff00; font-weight: bold;">${this.formatPrice(itemTotal)}</span></p>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="completeSystem.updateQuantity(${item.id}, ${item.quantity - 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer;">-</button>
                        <span style="color: #fff; min-width: 30px; text-align: center; font-size: 18px; font-weight: bold; background: rgba(0, 255, 0, 0.1); padding: 5px 10px; border-radius: 6px;">${item.quantity}</span>
                        <button onclick="completeSystem.updateQuantity(${item.id}, ${item.quantity + 1})" style="background: rgba(0, 255, 0, 0.2); border: 2px solid rgba(0, 255, 0, 0.5); color: #fff; width: 35px; height: 35px; border-radius: 6px; cursor: pointer;">+</button>
                    </div>
                    <button onclick="completeSystem.removeFromCart(${item.id})" style="background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); color: #fff; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
            cartItems.appendChild(itemElement);
        });

        this.updateCartSummary();
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
                this.updateCartDisplay();
            }
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    updateCartSummary() {
        const cartSummary = document.getElementById('cartSummary');
        if (!cartSummary) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5.99;
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
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = total > 50 ? 0 : 5.99;
        const finalTotal = total + shipping;
        
        alert(`✅ Compra procesada con éxito!\n\n${this.getTotalItems()} productos por un total de ${this.formatPrice(finalTotal)}\n\n¡Gracias por tu compra!`);
        
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartCount();
        this.closeCart();
        this.updateCartDisplay();
    }

    showUserMenu() {
        // Implementar menú de usuario
        alert('Menú de usuario (en desarrollo)');
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
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
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    updateUI() {
        // Solo actualizar si los elementos existen
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        
        if (this.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'block';
                const userBtn = document.getElementById('userBtn');
                if (userBtn) {
                    userBtn.textContent = `👤 ${this.currentUser.name}`;
                }
            }
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
        
        // Actualizar contador del carrito
        this.updateCartCount();
    }

    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    loadUserFromStorage() {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            try {
                this.currentUser = JSON.parse(saved);
            } catch (e) {
                this.currentUser = null;
            }
        }
    }

    saveCartToStorage() {
        localStorage.setItem('completeSystemCart', JSON.stringify(this.cart));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('completeSystemCart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
            } catch (e) {
                this.cart = [];
            }
        }
    }
}

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando CompleteSystem...');
    window.completeSystem = new CompleteSystem();
});

// Añadir estilos CSS
const styles = `
<style>
@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
}

.modal {
    border: none;
    padding: 0;
}

.modal::backdrop {
    background: rgba(0, 0, 0, 0.8);
}

.button {
    transition: all 0.3s ease;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
