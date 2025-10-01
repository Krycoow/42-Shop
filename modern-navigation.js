// Sistema de navegación moderna

class ModernNavigation {
    constructor() {
        this.currentSection = 'inicio';
        this.init();
    }

    init() {
        this.createNavigation();
        this.setupScrollEffects();
        this.setupNavigationHandlers();
        this.createWelcomeSection();
        this.setupScrollIndicator();
    }

    // Crear navegación moderna
    createNavigation() {
        const header = document.querySelector('.header');
        if (!header) return;

        header.innerHTML = `
            <div class="modern-header" id="modernHeader">
                <div class="header-content">
                    <div class="logo-section">
                        <div class="logo-text">42Shop</div>
                    </div>
                    
                    <div class="navigation-buttons">
                        <button class="nav-button active" data-section="inicio">
                            <span class="nav-icon">🏠</span>
                            <span data-i18n="home">Inicio</span>
                        </button>
                        <button class="nav-button" data-section="productos">
                            <span class="nav-icon">🛍️</span>
                            <span data-i18n="products">Productos</span>
                        </button>
                    </div>
                    
                    <div class="user-area-modern" id="userAreaModern" style="display: none;">
                        <button class="user-button-modern" id="userButtonModern">
                            <img class="user-avatar-modern" id="userAvatarModern" src="https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png" alt="Avatar">
                            <span id="userNameModern">Usuario</span>
                        </button>
                        <div class="dropdown-modern" id="userDropdownModern" style="display: none;">
                            <div class="dropdown-item-modern" data-action="settings">
                                <span>⚙️</span>
                                <span>Ajustes</span>
                            </div>
                            <div class="dropdown-item-modern" data-action="orders">
                                <span>📋</span>
                                <span>Mis Pedidos</span>
                            </div>
                            <div class="dropdown-item-modern" data-action="logout">
                                <span>🚪</span>
                                <span>Cerrar Sesión</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="cart-button-modern" id="cartButtonModern">
                        <span class="nav-icon">🛒</span>
                        <span class="cart-badge" id="cartBadgeModern">0</span>
                    </button>
                    
                    <div class="language-currency-modern">
                        <div class="selector-modern" id="languageSelectorModern">
                            <span>🇪🇸</span>
                            <span>ES</span>
                        </div>
                        <div class="selector-modern" id="currencySelectorModern">
                            <span>🇪🇺</span>
                            <span>EUR</span>
                        </div>
                    </div>
                    
                    <div id="authButtonsModern">
                        <button class="nav-button" id="loginBtnModern" data-i18n="login">Iniciar Sesión</button>
                        <button class="nav-button" id="registerBtnModern" data-i18n="register">Crear Cuenta</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Crear sección de bienvenida
    createWelcomeSection() {
        const main = document.querySelector('.main');
        if (!main) return;

        // Solo añadir la sección de bienvenida si no existe
        if (!document.getElementById('welcomeSection')) {
            const welcomeHTML = `
                <div class="welcome-section" id="welcomeSection">
                <div class="welcome-content">
                    <div id="textPressureContainer"></div>
                </div>
                    
                    <div class="welcome-decoration">
                        <div class="floating-element"></div>
                        <div class="floating-element"></div>
                        <div class="floating-element"></div>
                    </div>
                    
                    <div class="welcome-particles">
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                    </div>
                    
                    <div class="scroll-indicator" onclick="modernNav.scrollToSection('productos')">
                        <span>⬇️</span>
                    </div>
                </div>
            `;
            
            main.insertAdjacentHTML('afterbegin', welcomeHTML);
        }

        // Asegurar que la sección de productos tenga el header correcto
        const productsSection = document.getElementById('productsSection') || document.querySelector('.products-section');
        if (productsSection && !productsSection.querySelector('.section-header')) {
            const headerHTML = `
                <div class="section-header">
                    <h2>Nuestros Productos</h2>
                    <p>Descubre nuestra colección exclusiva</p>
                </div>
            `;
            productsSection.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    // Configurar efectos de scroll
    setupScrollEffects() {
        let ticking = false;

        const updateHeader = () => {
            const header = document.getElementById('modernHeader');
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Configurar manejadores de navegación
    setupNavigationHandlers() {
        // Botones de navegación
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-button[data-section]')) {
                const section = e.target.closest('.nav-button[data-section]').dataset.section;
                this.navigateToSection(section);
            }
        });

        // Botón de carrito
        document.getElementById('cartButtonModern')?.addEventListener('click', () => {
            this.toggleCart();
        });

        // Botones de autenticación
        document.getElementById('loginBtnModern')?.addEventListener('click', () => {
            this.openLoginModal();
        });

        document.getElementById('registerBtnModern')?.addEventListener('click', () => {
            this.openRegisterModal();
        });

        // Dropdown de usuario
        document.getElementById('userButtonModern')?.addEventListener('click', () => {
            this.toggleUserDropdown();
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('userDropdownModern');
            const userButton = document.getElementById('userButtonModern');
            
            if (dropdown && userButton && !userButton.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Navegar a sección
    navigateToSection(section) {
        this.currentSection = section;
        
        // Actualizar botones activos
        document.querySelectorAll('.nav-button[data-section]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Scroll a la sección
        this.scrollToSection(section);
    }

    // Scroll a sección
    scrollToSection(section) {
        if (section === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'productos') {
            const productsSection = document.getElementById('productsSection');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Configurar indicador de scroll
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        const hideIndicator = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };

        window.addEventListener('scroll', hideIndicator);
    }

    // Toggle carrito
    toggleCart() {
        // Implementar lógica del carrito existente
        if (window.toggleCart) {
            window.toggleCart();
        }
    }

    // Abrir modal de login
    openLoginModal() {
        if (window.openModal && window.authModal) {
            window.openModal(window.authModal);
        }
    }

    // Abrir modal de registro
    openRegisterModal() {
        if (window.openModal && window.registerModal) {
            window.openModal(window.registerModal);
        }
    }

    // Toggle dropdown de usuario
    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdownModern');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Actualizar UI de usuario
    updateUserUI(user) {
        const userArea = document.getElementById('userAreaModern');
        const authButtons = document.getElementById('authButtonsModern');
        const userName = document.getElementById('userNameModern');
        const userAvatar = document.getElementById('userAvatarModern');

        if (user) {
            userArea.style.display = 'flex';
            authButtons.style.display = 'none';
            userName.textContent = user.name;
            if (user.avatar) {
                userAvatar.src = user.avatar;
            }
        } else {
            userArea.style.display = 'none';
            authButtons.style.display = 'flex';
        }
    }

    // Actualizar contador del carrito
    updateCartCount(count) {
        const badge = document.getElementById('cartBadgeModern');
        if (badge) {
            badge.textContent = count;
        }
    }

    // Asegurar que los productos se muestren
    ensureProductsDisplay() {
        // Verificar que existe el catálogo
        let catalog = document.getElementById('catalog');
        if (!catalog) {
            // Crear el catálogo si no existe
            const main = document.querySelector('.main');
            if (main) {
                catalog = document.createElement('section');
                catalog.id = 'catalog';
                catalog.className = 'catalog';
                main.appendChild(catalog);
            }
        }

        // Verificar que el catálogo tenga productos
        if (catalog && catalog.children.length === 0) {
            // Renderizar productos si no hay ninguno
            if (window.renderProducts) {
                window.renderProducts();
            } else if (window.state && window.state.products) {
                // Renderizar productos manualmente si es necesario
                this.renderProductsManually();
            }
        }

        // Asegurar que la sección de productos tenga el estilo correcto
        const productsSection = catalog.closest('.products-section') || catalog;
        if (!productsSection.classList.contains('products-section')) {
            productsSection.classList.add('products-section');
        }
    }

    // Renderizar productos manualmente si es necesario
    renderProductsManually() {
        const catalog = document.getElementById('catalog');
        if (!catalog || !window.state || !window.state.products) return;

        catalog.innerHTML = window.state.products.map(product => {
            const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
                ? window.currencyUtils.formatPrice(product.price)
                : `${product.price.toFixed(2)} €`;
            
            // Generar estrellas para el rating
            const stars = this.generateStars(product.averageRating || 0);
            const reviewCount = product.reviewCount || 0;
            
            return `
            <article class="card" tabindex="0" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
                <div class="card__content">
                    <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                    <p class="card__description">${product.description}</p>
                    
                    <div class="product-rating">
                        <div class="stars-display">${stars}</div>
                        <span class="rating-text">(${reviewCount} reseñas)</span>
                    </div>
                    
                    <div class="card__price">${formatted}</div>
                    
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                        <input type="number" class="quantity-input" id="quantity-${product.id}" value="1" min="1" max="10" onchange="validateQuantity(${product.id})">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>
                    
                    <div class="card__actions">
                        <button class="button" onclick="addToCartWithQuantity(${product.id})">
                            <span>🛒</span>
                            <span>Añadir al carrito</span>
                        </button>
                    </div>
                    
                    <div class="reviews-container">
                        <button class="button button--secondary" onclick="showReviewModal(${product.id})" style="width: 100%; margin-top: 0.5rem;">
                            <span>⭐</span>
                            <span>Ver Reseñas</span>
                        </button>
                    </div>
                </div>
            </article>
            `;
        }).join('');
    }

    // Generar estrellas para el rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star star--filled">★</span>';
        }
        
        // Media estrella
        if (hasHalfStar) {
            stars += '<span class="star star--half">★</span>';
        }
        
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star">☆</span>';
        }
        
        return stars;
    }

    // Inicializar efecto TextPressure
    initTextPressure() {
        setTimeout(() => {
            const container = document.getElementById('textPressureContainer');
            if (container) {
                // Crear el efecto TextPressure directamente
                container.innerHTML = `
                    <div class="text-pressure-container">
                        <div class="text-pressure-text" id="textPressureText">42Shop</div>
                    </div>
                `;
                
                // Añadir efectos interactivos
                this.setupTextPressureEffects();
            }
        }, 1000);
    }

    // Configurar efectos del texto
    setupTextPressureEffects() {
        const textElement = document.getElementById('textPressureText');
        if (!textElement) return;

        let selectedRating = 0;
        
        // Efecto de presión con mouse
        textElement.addEventListener('mousemove', (e) => {
            this.handleTextPressure(e, textElement);
        });

        textElement.addEventListener('mouseleave', () => {
            this.resetTextPressure(textElement);
        });

        // Efecto de presión con touch
        textElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTextPressure(e.touches[0], textElement);
        });

        textElement.addEventListener('touchend', () => {
            this.resetTextPressure(textElement);
        });

        // Click effect
        textElement.addEventListener('click', () => {
            this.createTextClickEffect(textElement);
        });

        // Animación continua
        this.animateTextPressure(textElement);
    }

    // Manejar presión del texto
    handleTextPressure(e, textElement) {
        const rect = textElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        const maxDistance = Math.sqrt(
            Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
        );
        
        const pressure = Math.max(0, 1 - (distance / maxDistance));
        
        this.applyTextPressure(pressure, textElement);
    }

    // Aplicar presión al texto
    applyTextPressure(pressure, textElement) {
        const fontSize = 36 + (72 - 36) * pressure;
        const fontWeight = 400 + (900 - 400) * pressure;
        const textShadow = `0 0 ${20 + pressure * 30}px #00ff00`;
        
        let transform = '';
        transform += `scale(${1 + pressure * 0.2}) `;
        transform += `skewX(${pressure * 10}deg) `;
        transform += `skewY(${pressure * 5}deg)`;
        
        textElement.style.fontSize = fontSize + 'px';
        textElement.style.fontWeight = fontWeight;
        textElement.style.textShadow = textShadow;
        textElement.style.transform = transform;
    }

    // Resetear presión del texto
    resetTextPressure(textElement) {
        textElement.style.fontSize = '48px';
        textElement.style.fontWeight = '400';
        textElement.style.textShadow = '0 0 20px #00ff00';
        textElement.style.transform = 'scale(1)';
    }

    // Crear efecto de click
    createTextClickEffect(textElement) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.4), transparent);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 3;
        `;
        
        const rect = textElement.getBoundingClientRect();
        const container = textElement.closest('.text-pressure-container');
        const containerRect = container.getBoundingClientRect();
        
        ripple.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
        ripple.style.top = (rect.top - containerRect.top + rect.height / 2) + 'px';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Animar texto continuamente
    animateTextPressure(textElement) {
        let time = 0;
        const animate = () => {
            time += 0.02;
            const pulse = Math.sin(time) * 0.1 + 1;
            textElement.style.textShadow = `0 0 ${20 * pulse}px #00ff00`;
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Crear fondo con estrellas
class StarredBackground {
    constructor() {
        this.createStars();
        this.createParticles();
        this.createNebula();
    }

    createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        
        // Crear estrellas grandes
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            starsContainer.appendChild(star);
        }
        
        // Crear estrellas pequeñas
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'star-small';
            starsContainer.appendChild(star);
        }
        
        document.body.appendChild(starsContainer);
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        
        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }

    createNebula() {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        document.body.appendChild(nebula);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que app.js se inicialice primero
    setTimeout(() => {
        // Crear fondo con estrellas
        new StarredBackground();
        
        // Crear navegación moderna
        window.modernNav = new ModernNavigation();
        
        // Actualizar UI de usuario si hay sesión activa
        if (window.state && window.state.isLoggedIn) {
            window.modernNav.updateUserUI(window.state.currentUser);
        }
        
        // Actualizar contador del carrito
        if (window.state && window.state.cart) {
            const count = window.state.cart.reduce((total, item) => total + item.quantity, 0);
            window.modernNav.updateCartCount(count);
        }
        
        // Inicializar efecto TextPressure
        this.initTextPressure();
    }, 100);
    
});

class ModernNavigation {
    constructor() {
        this.currentSection = 'inicio';
        this.init();
    }

    init() {
        this.createNavigation();
        this.setupScrollEffects();
        this.setupNavigationHandlers();
        this.createWelcomeSection();
        this.setupScrollIndicator();
    }

    // Crear navegación moderna
    createNavigation() {
        const header = document.querySelector('.header');
        if (!header) return;

        header.innerHTML = `
            <div class="modern-header" id="modernHeader">
                <div class="header-content">
                    <div class="logo-section">
                        <div class="logo-text">42Shop</div>
                    </div>
                    
                    <div class="navigation-buttons">
                        <button class="nav-button active" data-section="inicio">
                            <span class="nav-icon">🏠</span>
                            <span data-i18n="home">Inicio</span>
                        </button>
                        <button class="nav-button" data-section="productos">
                            <span class="nav-icon">🛍️</span>
                            <span data-i18n="products">Productos</span>
                        </button>
                    </div>
                    
                    <div class="user-area-modern" id="userAreaModern" style="display: none;">
                        <button class="user-button-modern" id="userButtonModern">
                            <img class="user-avatar-modern" id="userAvatarModern" src="https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png" alt="Avatar">
                            <span id="userNameModern">Usuario</span>
                        </button>
                        <div class="dropdown-modern" id="userDropdownModern" style="display: none;">
                            <div class="dropdown-item-modern" data-action="settings">
                                <span>⚙️</span>
                                <span>Ajustes</span>
                            </div>
                            <div class="dropdown-item-modern" data-action="orders">
                                <span>📋</span>
                                <span>Mis Pedidos</span>
                            </div>
                            <div class="dropdown-item-modern" data-action="logout">
                                <span>🚪</span>
                                <span>Cerrar Sesión</span>
                            </div>
                        </div>
                    </div>
                    
                    <button class="cart-button-modern" id="cartButtonModern">
                        <span class="nav-icon">🛒</span>
                        <span class="cart-badge" id="cartBadgeModern">0</span>
                    </button>
                    
                    <div class="language-currency-modern">
                        <div class="selector-modern" id="languageSelectorModern">
                            <span>🇪🇸</span>
                            <span>ES</span>
                        </div>
                        <div class="selector-modern" id="currencySelectorModern">
                            <span>🇪🇺</span>
                            <span>EUR</span>
                        </div>
                    </div>
                    
                    <div id="authButtonsModern">
                        <button class="nav-button" id="loginBtnModern" data-i18n="login">Iniciar Sesión</button>
                        <button class="nav-button" id="registerBtnModern" data-i18n="register">Crear Cuenta</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Crear sección de bienvenida
    createWelcomeSection() {
        const main = document.querySelector('.main');
        if (!main) return;

        // Solo añadir la sección de bienvenida si no existe
        if (!document.getElementById('welcomeSection')) {
            const welcomeHTML = `
                <div class="welcome-section" id="welcomeSection">
                <div class="welcome-content">
                    <div id="textPressureContainer"></div>
                </div>
                    
                    <div class="welcome-decoration">
                        <div class="floating-element"></div>
                        <div class="floating-element"></div>
                        <div class="floating-element"></div>
                    </div>
                    
                    <div class="welcome-particles">
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                        <div class="welcome-particle"></div>
                    </div>
                    
                    <div class="scroll-indicator" onclick="modernNav.scrollToSection('productos')">
                        <span>⬇️</span>
                    </div>
                </div>
            `;
            
            main.insertAdjacentHTML('afterbegin', welcomeHTML);
        }

        // Asegurar que la sección de productos tenga el header correcto
        const productsSection = document.getElementById('productsSection') || document.querySelector('.products-section');
        if (productsSection && !productsSection.querySelector('.section-header')) {
            const headerHTML = `
                <div class="section-header">
                    <h2>Nuestros Productos</h2>
                    <p>Descubre nuestra colección exclusiva</p>
                </div>
            `;
            productsSection.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    // Configurar efectos de scroll
    setupScrollEffects() {
        let ticking = false;

        const updateHeader = () => {
            const header = document.getElementById('modernHeader');
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Configurar manejadores de navegación
    setupNavigationHandlers() {
        // Botones de navegación
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-button[data-section]')) {
                const section = e.target.closest('.nav-button[data-section]').dataset.section;
                this.navigateToSection(section);
            }
        });

        // Botón de carrito
        document.getElementById('cartButtonModern')?.addEventListener('click', () => {
            this.toggleCart();
        });

        // Botones de autenticación
        document.getElementById('loginBtnModern')?.addEventListener('click', () => {
            this.openLoginModal();
        });

        document.getElementById('registerBtnModern')?.addEventListener('click', () => {
            this.openRegisterModal();
        });

        // Dropdown de usuario
        document.getElementById('userButtonModern')?.addEventListener('click', () => {
            this.toggleUserDropdown();
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('userDropdownModern');
            const userButton = document.getElementById('userButtonModern');
            
            if (dropdown && userButton && !userButton.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    // Navegar a sección
    navigateToSection(section) {
        this.currentSection = section;
        
        // Actualizar botones activos
        document.querySelectorAll('.nav-button[data-section]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Scroll a la sección
        this.scrollToSection(section);
    }

    // Scroll a sección
    scrollToSection(section) {
        if (section === 'inicio') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (section === 'productos') {
            const productsSection = document.getElementById('productsSection');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Configurar indicador de scroll
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        const hideIndicator = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        };

        window.addEventListener('scroll', hideIndicator);
    }

    // Toggle carrito
    toggleCart() {
        // Implementar lógica del carrito existente
        if (window.toggleCart) {
            window.toggleCart();
        }
    }

    // Abrir modal de login
    openLoginModal() {
        if (window.openModal && window.authModal) {
            window.openModal(window.authModal);
        }
    }

    // Abrir modal de registro
    openRegisterModal() {
        if (window.openModal && window.registerModal) {
            window.openModal(window.registerModal);
        }
    }

    // Toggle dropdown de usuario
    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdownModern');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Actualizar UI de usuario
    updateUserUI(user) {
        const userArea = document.getElementById('userAreaModern');
        const authButtons = document.getElementById('authButtonsModern');
        const userName = document.getElementById('userNameModern');
        const userAvatar = document.getElementById('userAvatarModern');

        if (user) {
            userArea.style.display = 'flex';
            authButtons.style.display = 'none';
            userName.textContent = user.name;
            if (user.avatar) {
                userAvatar.src = user.avatar;
            }
        } else {
            userArea.style.display = 'none';
            authButtons.style.display = 'flex';
        }
    }

    // Actualizar contador del carrito
    updateCartCount(count) {
        const badge = document.getElementById('cartBadgeModern');
        if (badge) {
            badge.textContent = count;
        }
    }

    // Asegurar que los productos se muestren
    ensureProductsDisplay() {
        // Verificar que existe el catálogo
        let catalog = document.getElementById('catalog');
        if (!catalog) {
            // Crear el catálogo si no existe
            const main = document.querySelector('.main');
            if (main) {
                catalog = document.createElement('section');
                catalog.id = 'catalog';
                catalog.className = 'catalog';
                main.appendChild(catalog);
            }
        }

        // Verificar que el catálogo tenga productos
        if (catalog && catalog.children.length === 0) {
            // Renderizar productos si no hay ninguno
            if (window.renderProducts) {
                window.renderProducts();
            } else if (window.state && window.state.products) {
                // Renderizar productos manualmente si es necesario
                this.renderProductsManually();
            }
        }

        // Asegurar que la sección de productos tenga el estilo correcto
        const productsSection = catalog.closest('.products-section') || catalog;
        if (!productsSection.classList.contains('products-section')) {
            productsSection.classList.add('products-section');
        }
    }

    // Renderizar productos manualmente si es necesario
    renderProductsManually() {
        const catalog = document.getElementById('catalog');
        if (!catalog || !window.state || !window.state.products) return;

        catalog.innerHTML = window.state.products.map(product => {
            const formatted = (window.currencyUtils && window.currencyUtils.formatPrice)
                ? window.currencyUtils.formatPrice(product.price)
                : `${product.price.toFixed(2)} €`;
            
            // Generar estrellas para el rating
            const stars = this.generateStars(product.averageRating || 0);
            const reviewCount = product.reviewCount || 0;
            
            return `
            <article class="card" tabindex="0" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="card__image" onclick="showProductModal(${product.id})">
                <div class="card__content">
                    <h2 class="card__title" onclick="showProductModal(${product.id})">${product.name}</h2>
                    <p class="card__description">${product.description}</p>
                    
                    <div class="product-rating">
                        <div class="stars-display">${stars}</div>
                        <span class="rating-text">(${reviewCount} reseñas)</span>
                    </div>
                    
                    <div class="card__price">${formatted}</div>
                    
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                        <input type="number" class="quantity-input" id="quantity-${product.id}" value="1" min="1" max="10" onchange="validateQuantity(${product.id})">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>
                    
                    <div class="card__actions">
                        <button class="button" onclick="addToCartWithQuantity(${product.id})">
                            <span>🛒</span>
                            <span>Añadir al carrito</span>
                        </button>
                    </div>
                    
                    <div class="reviews-container">
                        <button class="button button--secondary" onclick="showReviewModal(${product.id})" style="width: 100%; margin-top: 0.5rem;">
                            <span>⭐</span>
                            <span>Ver Reseñas</span>
                        </button>
                    </div>
                </div>
            </article>
            `;
        }).join('');
    }

    // Generar estrellas para el rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star star--filled">★</span>';
        }
        
        // Media estrella
        if (hasHalfStar) {
            stars += '<span class="star star--half">★</span>';
        }
        
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star">☆</span>';
        }
        
        return stars;
    }

    // Inicializar efecto TextPressure
    initTextPressure() {
        setTimeout(() => {
            const container = document.getElementById('textPressureContainer');
            if (container) {
                // Crear el efecto TextPressure directamente
                container.innerHTML = `
                    <div class="text-pressure-container">
                        <div class="text-pressure-text" id="textPressureText">42Shop</div>
                    </div>
                `;
                
                // Añadir efectos interactivos
                this.setupTextPressureEffects();
            }
        }, 1000);
    }

    // Configurar efectos del texto
    setupTextPressureEffects() {
        const textElement = document.getElementById('textPressureText');
        if (!textElement) return;

        let selectedRating = 0;
        
        // Efecto de presión con mouse
        textElement.addEventListener('mousemove', (e) => {
            this.handleTextPressure(e, textElement);
        });

        textElement.addEventListener('mouseleave', () => {
            this.resetTextPressure(textElement);
        });

        // Efecto de presión con touch
        textElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTextPressure(e.touches[0], textElement);
        });

        textElement.addEventListener('touchend', () => {
            this.resetTextPressure(textElement);
        });

        // Click effect
        textElement.addEventListener('click', () => {
            this.createTextClickEffect(textElement);
        });

        // Animación continua
        this.animateTextPressure(textElement);
    }

    // Manejar presión del texto
    handleTextPressure(e, textElement) {
        const rect = textElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        const maxDistance = Math.sqrt(
            Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
        );
        
        const pressure = Math.max(0, 1 - (distance / maxDistance));
        
        this.applyTextPressure(pressure, textElement);
    }

    // Aplicar presión al texto
    applyTextPressure(pressure, textElement) {
        const fontSize = 36 + (72 - 36) * pressure;
        const fontWeight = 400 + (900 - 400) * pressure;
        const textShadow = `0 0 ${20 + pressure * 30}px #00ff00`;
        
        let transform = '';
        transform += `scale(${1 + pressure * 0.2}) `;
        transform += `skewX(${pressure * 10}deg) `;
        transform += `skewY(${pressure * 5}deg)`;
        
        textElement.style.fontSize = fontSize + 'px';
        textElement.style.fontWeight = fontWeight;
        textElement.style.textShadow = textShadow;
        textElement.style.transform = transform;
    }

    // Resetear presión del texto
    resetTextPressure(textElement) {
        textElement.style.fontSize = '48px';
        textElement.style.fontWeight = '400';
        textElement.style.textShadow = '0 0 20px #00ff00';
        textElement.style.transform = 'scale(1)';
    }

    // Crear efecto de click
    createTextClickEffect(textElement) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.4), transparent);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 3;
        `;
        
        const rect = textElement.getBoundingClientRect();
        const container = textElement.closest('.text-pressure-container');
        const containerRect = container.getBoundingClientRect();
        
        ripple.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
        ripple.style.top = (rect.top - containerRect.top + rect.height / 2) + 'px';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Animar texto continuamente
    animateTextPressure(textElement) {
        let time = 0;
        const animate = () => {
            time += 0.02;
            const pulse = Math.sin(time) * 0.1 + 1;
            textElement.style.textShadow = `0 0 ${20 * pulse}px #00ff00`;
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Crear fondo con estrellas
class StarredBackground {
    constructor() {
        this.createStars();
        this.createParticles();
        this.createNebula();
    }

    createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        
        // Crear estrellas grandes
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            starsContainer.appendChild(star);
        }
        
        // Crear estrellas pequeñas
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'star-small';
            starsContainer.appendChild(star);
        }
        
        document.body.appendChild(starsContainer);
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        
        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }

    createNebula() {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        document.body.appendChild(nebula);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que app.js se inicialice primero
    setTimeout(() => {
        // Crear fondo con estrellas
        new StarredBackground();
        
        // Crear navegación moderna
        window.modernNav = new ModernNavigation();
        
        // Actualizar UI de usuario si hay sesión activa
        if (window.state && window.state.isLoggedIn) {
            window.modernNav.updateUserUI(window.state.currentUser);
        }
        
        // Actualizar contador del carrito
        if (window.state && window.state.cart) {
            const count = window.state.cart.reduce((total, item) => total + item.quantity, 0);
            window.modernNav.updateCartCount(count);
        }
        
        // Inicializar efecto TextPressure
        this.initTextPressure();
    }, 100);
    
});
