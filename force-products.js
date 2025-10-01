// Script para forzar la renderización de productos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Forzando renderización de productos...');
    
    // Esperar un poco para que todo se cargue
    setTimeout(() => {
        if (window.renderProducts) {
            console.log('Ejecutando renderProducts...');
            window.renderProducts();
        } else {
            console.log('renderProducts no está disponible, intentando renderizar manualmente...');
            
            // Renderizar manualmente si es necesario
            const catalog = document.getElementById('catalog');
            if (catalog && window.state && window.state.products) {
                console.log('Renderizando productos manualmente...');
                
                catalog.innerHTML = window.state.products.map(product => {
                    const formatted = `${product.price.toFixed(2)} €`;
                    const stars = generateStars(product.averageRating || 0);
                    const reviewCount = product.reviewCount || 0;
                    
                    return `
                    <article class="card" tabindex="0" data-product-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
                        <div class="card__content">
                            <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                            <p class="card__description">${product.description}</p>
                            
                            <!-- Rating y reseñas -->
                            <div class="product-rating">
                                <div class="stars-display">${stars}</div>
                                <span class="rating-text">${(product.averageRating || 0).toFixed(1)} (${reviewCount})</span>
                            </div>
                            
                            <div class="card__price" data-price="${product.price}">${formatted}</div>
                            
                            <!-- Selector de cantidad -->
                            <div class="quantity-selector">
                                <button type="button" class="quantity-btn minus" onclick="changeQuantity(${product.id}, -1)">-</button>
                                <input type="number" id="qty-${product.id}" value="1" min="1" max="99" class="quantity-input" 
                                       onchange="validateQuantity(${product.id})">
                                <button type="button" class="quantity-btn plus" onclick="changeQuantity(${product.id}, 1)">+</button>
                            </div>
                            
                            <div class="card__actions">
                                <button onclick="addToCartWithQuantity(${product.id})" class="button button--primary button--full">Añadir al carrito</button>
                                <button class="button button--secondary" data-action="view-reviews" data-product-id="${product.id}" style="margin-top: 10px; width: 100%;">
                                    <span>⭐</span> Ver Reseñas
                                </button>
                            </div>
                            
                            <!-- Contenedor de reseñas -->
                            <div class="reviews-container" id="reviews-${product.id}"></div>
                        </div>
                    </article>
                    `;
                }).join('');
                
                console.log('Productos renderizados manualmente');
            } else {
                console.log('No se pudo renderizar: catalog o state no disponibles');
            }
        }
    }, 500);
});

// Función para generar estrellas
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star filled">⭐</span>';
    }
    
    // Media estrella
    if (hasHalfStar) {
        starsHTML += '<span class="star half">⭐</span>';
    }
    
    // Estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">☆</span>';
    }
    
    return starsHTML;
}

// Funciones para el modal de presupuesto
function showCustomQuote() {
    const modal = document.getElementById('customQuoteModal');
    if (modal) {
        modal.showModal();
    }
}

function closeCustomQuoteModal() {
    const modal = document.getElementById('customQuoteModal');
    if (modal) {
        modal.close();
    }
}

// Manejar el formulario de presupuesto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customQuoteForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar datos del formulario
            const formData = new FormData(form);
            const data = {
                name: formData.get('customerName'),
                email: formData.get('customerEmail'),
                phone: formData.get('customerPhone'),
                productType: formData.get('productType'),
                quantity: formData.get('quantity'),
                designDescription: formData.get('designDescription'),
                budget: formData.get('budget'),
                timeline: formData.get('timeline'),
                additionalInfo: formData.get('additionalInfo'),
                timestamp: new Date().toISOString()
            };
            
            // Simular envío (aquí podrías enviar a un servidor)
            console.log('Solicitud de presupuesto:', data);
            
            // Mostrar mensaje de éxito
            alert('✅ ¡Solicitud enviada con éxito!\n\nTe contactaremos en las próximas 24 horas con tu presupuesto personalizado.');
            
            // Cerrar modal y limpiar formulario
            closeCustomQuoteModal();
            form.reset();
        });
    }
});

// Funciones para los botones de autenticación
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.showModal();
    } else {
        // Crear modal de login si no existe
        createLoginModal();
    }
}

function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.showModal();
    } else {
        // Crear modal de registro si no existe
        createRegisterModal();
    }
}

function createLoginModal() {
    const modalHTML = `
        <dialog id="loginModal" class="modal auth-modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h2>🔐 Iniciar Sesión</h2>
                    <button class="modal__close" onclick="closeLoginModal()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <form id="loginForm" class="modal__form">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Contraseña</label>
                        <input type="password" id="loginPassword" name="password" required>
                    </div>
                    <button type="submit" class="button button--primary button--full">Iniciar Sesión</button>
                </form>
                <div class="modal__footer">
                    <p>¿No tienes cuenta? <a href="#" onclick="showRegisterModal(); closeLoginModal();">Regístrate aquí</a></p>
                </div>
            </div>
        </dialog>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupLoginForm();
}

function createRegisterModal() {
    const modalHTML = `
        <dialog id="registerModal" class="modal auth-modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h2>📝 Crear Cuenta</h2>
                    <button class="modal__close" onclick="closeRegisterModal()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <form id="registerForm" class="modal__form">
                    <div class="form-group">
                        <label for="registerName">Nombre Completo</label>
                        <input type="text" id="registerName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" id="registerEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Contraseña</label>
                        <input type="password" id="registerPassword" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Contraseña</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required>
                    </div>
                    <button type="submit" class="button button--primary button--full">Crear Cuenta</button>
                </form>
                <div class="modal__footer">
                    <p>¿Ya tienes cuenta? <a href="#" onclick="showLoginModal(); closeRegisterModal();">Inicia sesión aquí</a></p>
                </div>
            </div>
        </dialog>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupRegisterForm();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.close();
    }
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.close();
    }
}

function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simular login exitoso
            const userData = {
                id: Date.now(),
                name: email.split('@')[0],
                email: email,
                phone: '',
                birthday: '',
                address: '',
                city: '',
                postalCode: '',
                country: 'ES',
                bio: '',
                avatar: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            // Guardar datos de usuario
            localStorage.setItem('userProfile', JSON.stringify(userData));
            localStorage.setItem('userSession', 'active');
            
            // Actualizar sistema de perfil si está disponible
            if (window.userProfileSystem) {
                window.userProfileSystem.currentUser = userData;
                window.userProfileSystem.updateUserUI();
            }
            
            // Mostrar mensaje de éxito
            showSuccessMessage(`¡Bienvenido, ${userData.name}!`);
            
            closeLoginModal();
            form.reset();
            
            // Actualizar UI para usuario logueado
            updateUserUI(email, userData.name);
        });
    }
}

function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('❌ Las contraseñas no coinciden');
                return;
            }
            
            // Simular registro
            alert(`✅ ¡Cuenta creada!\n\nNombre: ${name}\nEmail: ${email}\n\nTu cuenta ha sido creada exitosamente.`);
            closeRegisterModal();
            form.reset();
            
            // Actualizar UI para usuario logueado
            updateUserUI(email, name);
        });
    }
}

function updateUserUI(email, name = null) {
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const userArea = document.getElementById('userArea');
    
    if (loginButton && registerButton && userArea) {
        // Ocultar botones de login/registro
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        
        // Mostrar área de usuario
        userArea.hidden = false;
        
        // Actualizar nombre de usuario
        const userName = userArea.querySelector('#userName');
        if (userName) {
            userName.textContent = name || email.split('@')[0];
        }
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Event listeners para los botones de autenticación
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginBtn');
    const registerButton = document.getElementById('registerBtn');
    
    if (loginButton) {
        loginButton.addEventListener('click', showLoginModal);
    }
    
    if (registerButton) {
        registerButton.addEventListener('click', showRegisterModal);
    }
});

// Funcionalidad del carrito
function showCart() {
    const cart = document.getElementById('cart');
    const backdrop = document.getElementById('cartBackdrop');
    
    if (cart && backdrop) {
        cart.setAttribute('aria-hidden', 'false');
        cart.classList.add('cart--open');
        backdrop.classList.add('backdrop--active');
        document.body.style.overflow = 'hidden';
    }
}

function hideCart() {
    const cart = document.getElementById('cart');
    const backdrop = document.getElementById('cartBackdrop');
    
    if (cart && backdrop) {
        cart.setAttribute('aria-hidden', 'true');
        cart.classList.remove('cart--open');
        backdrop.classList.remove('backdrop--active');
        document.body.style.overflow = '';
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount && window.state && window.state.cart) {
        const totalItems = window.state.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function addToCart(productId, quantity = 1) {
    if (!window.state) {
        window.state = { cart: [], products: [] };
    }
    
    const product = window.state.products.find(p => p.id == productId);
    if (!product) return;
    
    // Obtener cantidad del input si existe
    const quantityInput = document.getElementById(`qty-${productId}`);
    if (quantityInput) {
        quantity = parseInt(quantityInput.value) || 1;
    }
    
    // Usar el nuevo sistema de carrito funcional
    if (window.functionalCart) {
        window.functionalCart.addProduct(product, quantity);
    } else {
        // Fallback al sistema anterior si el nuevo no está disponible
        const existingItem = window.state.cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            window.state.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCartCount();
        updateCartUI();
    }
    
    // Mostrar animación de éxito
    showCartAnimation();
    
    // Mostrar carrito automáticamente
    setTimeout(() => {
        showCart();
    }, 1000);
}

function removeFromCart(productId) {
    if (!window.state) return;
    
    window.state.cart = window.state.cart.filter(item => item.id != productId);
    updateCartCount();
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal || !window.state) return;
    
    if (window.state.cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
        cartTotal.textContent = '0.00 €';
        return;
    }
    
    cartItems.innerHTML = window.state.cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item__image">
            <div class="cart-item__content">
                <h3 class="cart-item__name">${item.name}</h3>
                <div class="cart-item__price">${item.price.toFixed(2)} €</div>
                <div class="cart-item__quantity">
                    <button onclick="changeCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart(${item.id})">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `).join('');
    
    const total = window.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} €`;
}

function changeCartQuantity(productId, change) {
    if (!window.state) return;
    
    const item = window.state.cart.find(item => item.id == productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        updateCartUI();
    }
}

function showCartAnimation() {
    // Crear elemento de animación
    const animation = document.createElement('div');
    animation.className = 'cart-animation';
    animation.innerHTML = '✅ Añadido al carrito';
    animation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00ff00, #00cc00);
        color: #000000;
        padding: 1rem 2rem;
        border-radius: 15px;
        font-weight: 700;
        font-size: 1.1rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 255, 0, 0.5);
        animation: cartAnimationPop 2s ease-out forwards;
    `;
    
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
    }, 2000);
}

// Event listeners para el carrito
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartBackdrop = document.getElementById('cartBackdrop');
    
    if (cartButton) {
        cartButton.addEventListener('click', showCart);
    }
    
    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', hideCart);
    }
    
    // Inicializar carrito
    updateCartCount();
    updateCartUI();
});

// Funcionalidad de productos destacados
function initFeaturedProducts() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const categoryContents = document.querySelectorAll('.category-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado y su contenido
            this.classList.add('active');
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Hacer botones "Ver Detalles" funcionales
    const featuredBtns = document.querySelectorAll('.featured-btn');
    featuredBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.featured-item');
            const title = item.querySelector('h3').textContent;
            const price = item.querySelector('.featured-price').textContent;
            
            alert(`🛍️ ${title}\n💰 Precio: ${price}\n\n¿Te interesa este producto?`);
        });
    });
}

// Event listeners para productos destacados
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar productos destacados
    setTimeout(() => {
        initFeaturedProducts();
    }, 500);
});

// Hacer funciones disponibles globalmente
window.showCustomQuote = showCustomQuote;
window.closeCustomQuoteModal = closeCustomQuoteModal;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.showCart = showCart;
window.hideCart = hideCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeCartQuantity = changeCartQuantity;
window.initFeaturedProducts = initFeaturedProducts;

// Funciones para manejar cantidades de productos
function changeQuantity(productId, change) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        let currentValue = parseInt(input.value) || 1;
        let newValue = currentValue + change;
        
        if (newValue < 1) newValue = 1;
        if (newValue > 99) newValue = 99;
        
        input.value = newValue;
    }
}

function validateQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        let value = parseInt(input.value) || 1;
        
        if (value < 1) value = 1;
        if (value > 99) value = 99;
        
        input.value = value;
    }
}

function showProductModal(productId) {
    const product = window.state?.products.find(p => p.id == productId);
    if (!product) return;
    
    alert(`🛍️ ${product.name}\n💰 Precio: ${product.price.toFixed(2)} €\n⭐ Rating: ${product.averageRating}/5\n📝 ${product.description}\n\n¿Quieres añadir este producto al carrito?`);
}

// Hacer funciones disponibles globalmente
window.changeQuantity = changeQuantity;
window.validateQuantity = validateQuantity;
window.showProductModal = showProductModal;

// Función para renderizar productos manualmente
function renderProductsManually() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;
    
    // Productos básicos para mostrar
    const products = [
        {
            id: 1,
            name: "Sudadera 42",
            description: "Sudadera negra con logo de 42. Algodón premium, edición limitada.",
            price: 39.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.8,
            reviewCount: 127
        },
        {
            id: 2,
            name: "Taza 42",
            description: "Taza negra con logo de 42. Ideal para café o té.",
            price: 14.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.6,
            reviewCount: 89
        },
        {
            id: 3,
            name: "Gorra 42",
            description: "Gorra negra con logo de 42. Ajustable y transpirable.",
            price: 24.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.5,
            reviewCount: 94
        },
        {
            id: 4,
            name: "Camiseta 42",
            description: "Camiseta blanca con logo de 42 en verde neón.",
            price: 19.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.7,
            reviewCount: 156
        },
        {
            id: 5,
            name: "Mochila 42",
            description: "Mochila negra resistente con detalles verdes y logo 42.",
            price: 49.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.9,
            reviewCount: 203
        },
        {
            id: 6,
            name: "Llavero 42",
            description: "Llavero metálico con logo de 42. Pequeño y elegante.",
            price: 6.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOTk5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.4,
            reviewCount: 67
        },
        {
            id: 7,
            name: "Pantalón 42",
            description: "Pantalón negro con detalles verdes. Cómodo y moderno.",
            price: 59.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.6,
            reviewCount: 134
        },
        {
            id: 8,
            name: "Zapatillas 42",
            description: "Zapatillas deportivas con logo 42. Perfectas para el día a día.",
            price: 79.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.8,
            reviewCount: 189
        },
        {
            id: 9,
            name: "Chaqueta 42",
            description: "Chaqueta negra con capucha. Ideal para el invierno.",
            price: 89.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.7,
            reviewCount: 156
        },
        {
            id: 10,
            name: "Reloj 42",
            description: "Reloj digital con logo 42. Tecnología avanzada.",
            price: 129.99,
            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0OCIgZmlsbD0iIzAwZmYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkYQ8L3RleHQ+PC9zdmc+",
            averageRating: 4.9,
            reviewCount: 98
        }
    ];
    
    // Crear estado global si no existe
    if (!window.state) {
        window.state = { products: products, cart: [] };
    } else {
        window.state.products = products;
    }
    
    catalog.innerHTML = products.map(product => {
        const stars = generateStars(product.averageRating || 0);
        const reviewCount = product.reviewCount || 0;
        
        return `
        <article class="card" tabindex="0" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
            <div class="card__content">
                <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                <p class="card__description">${product.description}</p>
                
                <!-- Rating y reseñas -->
                <div class="product-rating">
                    <div class="stars-display">${stars}</div>
                    <span class="rating-text">${(product.averageRating || 0).toFixed(1)} (${reviewCount})</span>
                </div>
                
                <div class="card__price" data-price="${product.price}">${product.price.toFixed(2)} €</div>
                
                <!-- Selector de cantidad -->
                <div class="quantity-selector">
                    <button type="button" class="quantity-btn minus" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <input type="number" id="qty-${product.id}" value="1" min="1" max="99" class="quantity-input" 
                           onchange="validateQuantity(${product.id})">
                    <button type="button" class="quantity-btn plus" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                
                <div class="card__actions">
                    <button onclick="addToCart(${product.id})" class="button button--primary button--full">Añadir al carrito</button>
                </div>
            </div>
        </article>
        `;
    }).join('');
}

// Asegurar que los productos se rendericen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.renderProducts) {
            window.renderProducts();
        } else {
            renderProductsManually();
        }
    }, 100);
});
