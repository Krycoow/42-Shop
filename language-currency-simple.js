// Sistema simple de idioma y moneda - FUNCIONAL
class SimpleLanguageCurrency {
    constructor() {
        this.currentLanguage = 'es';
        this.currentCurrency = 'eur';
        this.init();
    }

    init() {
        this.loadSettings();
        this.createSelectors();
        this.setupEvents();
        this.updateAllContent();
    }

    loadSettings() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.currentCurrency = localStorage.getItem('currency') || 'eur';
    }

    saveSettings() {
        localStorage.setItem('language', this.currentLanguage);
        localStorage.setItem('currency', this.currentCurrency);
    }

    createSelectors() {
        // Crear selector de idioma
        this.createLanguageSelector();
        // Crear selector de moneda
        this.createCurrencySelector();
    }

    createLanguageSelector() {
        // Usar el selector existente del HTML en lugar de crear uno nuevo
        const existing = document.getElementById('languageSelector');
        if (existing) {
            // Solo actualizar el contenido si es necesario
            const flagSpan = existing.querySelector('.flag');
            const codeSpan = existing.querySelector('.code');
            
            if (flagSpan && codeSpan) {
                flagSpan.textContent = this.getFlag(this.currentLanguage);
                codeSpan.textContent = this.getLanguageCode(this.currentLanguage);
            }
            return;
        }

        // Solo crear nuevo si no existe
        const selector = document.createElement('div');
        selector.id = 'languageSelector';
        selector.className = 'language-selector';
        selector.innerHTML = `
            <div class="selector-button" id="languageButton">
                <span class="flag">${this.getFlag(this.currentLanguage)}</span>
                <span class="text">${this.getLanguageName(this.currentLanguage)}</span>
                <span class="arrow">▼</span>
            </div>
            <div class="selector-dropdown" id="languageDropdown">
                <div class="option" data-lang="es">
                    <span class="flag">🇪🇸</span>
                    <span class="text">Español</span>
                </div>
                <div class="option" data-lang="en">
                    <span class="flag">🇺🇸</span>
                    <span class="text">English</span>
                </div>
                <div class="option" data-lang="fr">
                    <span class="flag">🇫🇷</span>
                    <span class="text">Français</span>
                </div>
            </div>
        `;

        // Insertar en el header
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(selector);
        } else {
            // Si no hay header, crear una posición fija
            const navContainer = document.createElement('div');
            navContainer.className = 'language-currency-container';
            navContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; gap: 10px;';
            navContainer.appendChild(selector);
            document.body.appendChild(navContainer);
        }
    }

    createCurrencySelector() {
        // Usar el selector existente del HTML en lugar de crear uno nuevo
        const existing = document.getElementById('currencySelector');
        if (existing) {
            // Solo actualizar el contenido si es necesario
            const flagSpan = existing.querySelector('.flag');
            const codeSpan = existing.querySelector('.code');
            
            if (flagSpan && codeSpan) {
                flagSpan.textContent = this.getCurrencyFlag(this.currentCurrency);
                codeSpan.textContent = this.getCurrencyName(this.currentCurrency);
            }
            return;
        }

        // Solo crear nuevo si no existe
        const selector = document.createElement('div');
        selector.id = 'currencySelector';
        selector.className = 'currency-selector';
        selector.innerHTML = `
            <div class="selector-button" id="currencyButton">
                <span class="symbol">${this.getCurrencySymbol(this.currentCurrency)}</span>
                <span class="text">${this.getCurrencyName(this.currentCurrency)}</span>
                <span class="arrow">▼</span>
            </div>
            <div class="selector-dropdown" id="currencyDropdown">
                <div class="option" data-currency="eur">
                    <span class="symbol">€</span>
                    <span class="text">EUR</span>
                </div>
                <div class="option" data-currency="usd">
                    <span class="symbol">$</span>
                    <span class="text">USD</span>
                </div>
                <div class="option" data-currency="gbp">
                    <span class="symbol">£</span>
                    <span class="text">GBP</span>
                </div>
            </div>
        `;

        // Insertar en el header
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(selector);
        } else {
            // Si no hay header, crear una posición fija
            const navContainer = document.querySelector('.language-currency-container') || document.createElement('div');
            if (!navContainer.className.includes('language-currency-container')) {
                navContainer.className = 'language-currency-container';
                navContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; gap: 10px;';
                document.body.appendChild(navContainer);
            }
            navContainer.appendChild(selector);
        }
    }

    setupEvents() {
        // Idioma
        document.addEventListener('click', (e) => {
            if (e.target.closest('#languageButton')) {
                this.toggleLanguageDropdown();
            } else if (e.target.closest('[data-lang]')) {
                const lang = e.target.closest('[data-lang]').dataset.lang;
                this.changeLanguage(lang);
            } else {
                this.closeLanguageDropdown();
            }
        });

        // Moneda
        document.addEventListener('click', (e) => {
            if (e.target.closest('#currencyButton')) {
                this.toggleCurrencyDropdown();
            } else if (e.target.closest('[data-currency]')) {
                const currency = e.target.closest('[data-currency]').dataset.currency;
                this.changeCurrency(currency);
            } else {
                this.closeCurrencyDropdown();
            }
        });
    }

    toggleLanguageDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        const currencyDropdown = document.getElementById('currencyDropdown');
        
        if (currencyDropdown) currencyDropdown.style.display = 'none';
        
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    }

    toggleCurrencyDropdown() {
        const dropdown = document.getElementById('currencyDropdown');
        const languageDropdown = document.getElementById('languageDropdown');
        
        if (languageDropdown) languageDropdown.style.display = 'none';
        
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    }

    closeLanguageDropdown() {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }

    closeCurrencyDropdown() {
        const dropdown = document.getElementById('currencyDropdown');
        if (dropdown) dropdown.style.display = 'none';
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.saveSettings();
        
        // Actualizar botón del HTML original
        const originalSelector = document.getElementById('languageSelector');
        if (originalSelector) {
            const flagSpan = originalSelector.querySelector('.flag');
            const codeSpan = originalSelector.querySelector('.code');
            if (flagSpan && codeSpan) {
                flagSpan.textContent = this.getFlag(lang);
                codeSpan.textContent = this.getLanguageCode(lang);
            }
        }
        
        // Actualizar botón del JavaScript
        const button = document.getElementById('languageButton');
        if (button) {
            button.querySelector('.flag').textContent = this.getFlag(lang);
            button.querySelector('.text').textContent = this.getLanguageName(lang);
        }
        
        this.closeLanguageDropdown();
        this.updateAllContent();
    }

    changeCurrency(currency) {
        this.currentCurrency = currency;
        this.saveSettings();
        
        // Actualizar botón del HTML original
        const originalSelector = document.getElementById('currencySelector');
        if (originalSelector) {
            const flagSpan = originalSelector.querySelector('.flag');
            const codeSpan = originalSelector.querySelector('.code');
            if (flagSpan && codeSpan) {
                flagSpan.textContent = this.getCurrencyFlag(currency);
                codeSpan.textContent = this.getCurrencyName(currency);
            }
        }
        
        // Actualizar botón del JavaScript
        const button = document.getElementById('currencyButton');
        if (button) {
            button.querySelector('.symbol').textContent = this.getCurrencySymbol(currency);
            button.querySelector('.text').textContent = this.getCurrencyName(currency);
        }
        
        this.closeCurrencyDropdown();
        this.updateAllContent();
    }

    updateAllContent() {
        this.updateTexts();
        this.updatePrices();
    }

    updateTexts() {
        const translations = {
            es: {
                'welcome-title': 'Bienvenidos a la Mejor Tienda de Ropa',
                'products': 'Productos',
                'cart': 'Carrito',
                'login': 'Iniciar Sesión',
                'register': 'Registrarse',
                'add-to-cart': 'Añadir al Carrito',
                'buy-now': 'Comprar Ahora',
                'view-reviews': 'Ver Reseñas',
                'description': 'Descripción',
                'reviews': 'Reseñas',
                'price': 'Precio',
                'total': 'Total',
                'checkout': 'Proceder al Pago',
                'empty-cart': 'Tu carrito está vacío',
                'best-store': 'Mejor Tienda del Año',
                'featured-products': 'Productos Destacados',
                'products-sale': 'Productos en Venta',
                'real-reviews': 'Reseñas Reales',
                'custom-clothing': 'Mejores Productos del Año',
                'why-number-one': 'Porque somos #1'
            },
            en: {
                'welcome-title': 'Welcome to the Best Clothing Store',
                'products': 'Products',
                'cart': 'Cart',
                'login': 'Login',
                'register': 'Register',
                'add-to-cart': 'Add to Cart',
                'buy-now': 'Buy Now',
                'view-reviews': 'View Reviews',
                'description': 'Description',
                'reviews': 'Reviews',
                'price': 'Price',
                'total': 'Total',
                'checkout': 'Proceed to Payment',
                'empty-cart': 'Your cart is empty',
                'best-store': 'Best Store of the Year',
                'featured-products': 'Featured Products',
                'products-sale': 'Products for Sale',
                'real-reviews': 'Real Reviews',
                'custom-clothing': 'Best Products of the Year',
                'why-number-one': 'Why we are #1'
            },
            fr: {
                'welcome-title': 'Bienvenue dans la Meilleure Boutique de Vêtements',
                'products': 'Produits',
                'cart': 'Panier',
                'login': 'Se Connecter',
                'register': 'S\'inscrire',
                'add-to-cart': 'Ajouter au Panier',
                'buy-now': 'Acheter Maintenant',
                'view-reviews': 'Voir les Avis',
                'description': 'Description',
                'reviews': 'Avis',
                'price': 'Prix',
                'total': 'Total',
                'checkout': 'Procéder au Paiement',
                'empty-cart': 'Votre panier est vide',
                'best-store': 'Meilleure Boutique de l\'Année',
                'featured-products': 'Produits Vedettes',
                'products-sale': 'Produits en Vente',
                'real-reviews': 'Avis Réels',
                'custom-clothing': 'Meilleurs Produits de l\'Année',
                'why-number-one': 'Pourquoi nous sommes #1'
            }
        };

        const texts = translations[this.currentLanguage] || translations.es;
        
        Object.keys(texts).forEach(key => {
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            elements.forEach(el => {
                el.textContent = texts[key];
            });
        });
    }

    updatePrices() {
        // Esperar un poco para que se carguen las funciones
        setTimeout(() => {
            // Actualizar precios usando la función global formatPrice
            if (window.updateAllPrices) {
                window.updateAllPrices();
            }
            
            // Actualizar total del carrito
            if (window.updateCartUI) {
                window.updateCartUI();
            }
            
            // Forzar re-renderizado de productos
            if (window.renderProducts) {
                window.renderProducts();
            }
        }, 100);
    }

    getFlag(lang) {
        const flags = {
            es: '🇪🇸',
            en: '🇺🇸',
            fr: '🇫🇷'
        };
        return flags[lang] || '🇪🇸';
    }

    getLanguageName(lang) {
        const names = {
            es: 'Español',
            en: 'English',
            fr: 'Français'
        };
        return names[lang] || 'Español';
    }

    getLanguageCode(lang) {
        const codes = {
            es: 'ES',
            en: 'EN',
            fr: 'FR'
        };
        return codes[lang] || 'ES';
    }

    getCurrencySymbol(currency) {
        const symbols = {
            eur: '€',
            usd: '$',
            gbp: '£'
        };
        return symbols[currency] || '€';
    }

    getCurrencyName(currency) {
        const names = {
            eur: 'EUR',
            usd: 'USD',
            gbp: 'GBP'
        };
        return names[currency] || 'EUR';
    }

    getCurrencyFlag(currency) {
        const flags = {
            eur: '🇪🇺',
            usd: '🇺🇸',
            gbp: '🇬🇧'
        };
        return flags[currency] || '🇪🇺';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.simpleLanguageCurrency = new SimpleLanguageCurrency();
});

// Añadir estilos CSS
const styles = `
<style>
.language-selector,
.currency-selector {
    position: relative;
    display: inline-block;
    margin: 0 10px;
}

.selector-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 600;
    min-width: 120px;
}

.selector-button:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.5);
    transform: translateY(-2px);
}

.selector-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    margin-top: 5px;
    z-index: 1000;
    display: none;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.option:hover {
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
}

.option:first-child {
    border-radius: 6px 6px 0 0;
}

.option:last-child {
    border-radius: 0 0 6px 6px;
}

.flag, .symbol {
    font-size: 16px;
}

.arrow {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.selector-button:hover .arrow {
    transform: rotate(180deg);
}

@media (max-width: 768px) {
    .selector-button {
        padding: 8px 12px;
        font-size: 12px;
        min-width: 100px;
    }
    
    .option {
        padding: 10px 12px;
        font-size: 12px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);