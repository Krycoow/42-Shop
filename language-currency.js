// Manejo de los selectores de idioma y moneda
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos
    const languageSelector = document.getElementById('languageSelector');
    const currencySelector = document.getElementById('currencySelector');
    const languageDropdown = document.getElementById('languageDropdown');
    const currencyDropdown = document.getElementById('currencyDropdown');

    // Helper: return a path to a flag SVG asset
    function getFlagURL(code) {
        if (!code) return '';
        const map = { en: 'us', gbp: 'gb' };
        const key = map[code] || code;
        return `assets/flags/${key}.svg`;
    }

    // Función para cerrar todos los dropdowns
    const closeAllDropdowns = () => {
        languageDropdown?.classList.add('hidden');
        currencyDropdown?.classList.add('hidden');
        languageSelector?.setAttribute('aria-expanded', 'false');
        currencySelector?.setAttribute('aria-expanded', 'false');
    };

    // Cerrar dropdowns cuando se hace scroll
    window.addEventListener('scroll', () => closeAllDropdowns());

    // Manejador de clics fuera de los dropdowns
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#languageSelector') && !e.target.closest('#currencySelector')) {
            closeAllDropdowns();
        }
    });

    // Toggle del dropdown de idioma
    languageSelector?.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyDropdown?.classList.add('hidden');
        const isHidden = languageDropdown.classList.contains('hidden');
        languageDropdown.classList.toggle('hidden', !isHidden);
        languageSelector.setAttribute('aria-expanded', String(isHidden));
    });

    // Toggle del dropdown de moneda
    currencySelector?.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown?.classList.add('hidden');
        const isHidden = currencyDropdown.classList.contains('hidden');
        currencyDropdown.classList.toggle('hidden', !isHidden);
        currencySelector.setAttribute('aria-expanded', String(isHidden));
    });

    // Manejador de selección de idioma
    languageDropdown?.addEventListener('click', (e) => {
        const el = e.target.closest('[data-lang]');
        if (el) {
            const lang = el.dataset.lang;
            const currentLangSpan = languageSelector.querySelector('span');
                if (currentLangSpan) {
                    const map = { es: 'es', en: 'us', fr: 'fr' };
                    const url = getFlagURL(map[lang] || 'us');
                    currentLangSpan.innerHTML = `<img src="${url}" class="flag-img" alt="${lang}"/> <span class="code"> ${lang.toUpperCase()}</span>`;
                }
            closeAllDropdowns();
            updateLanguage(lang);
        }
    });

    // Manejador de selección de moneda
    currencyDropdown?.addEventListener('click', (e) => {
        const el = e.target.closest('[data-currency]');
        if (el) {
            const currency = el.dataset.currency;
            const currentCurrencySpan = currencySelector.querySelector('span');
                if (currentCurrencySpan) {
                    const map = { eur: 'eur', usd: 'us', gbp: 'gb' };
                    const url = getFlagURL(map[currency] || 'eur');
                    currentCurrencySpan.innerHTML = `<img src="${url}" class="flag-img" alt="${currency}"/> <span class="code"> ${currency.toUpperCase()}</span>`;
                }
            closeAllDropdowns();
            updateCurrency(currency);
            // pulse badge to highlight change
            const badge = document.getElementById('cartCount');
            if (badge) {
                badge.classList.remove('pulse');
                // trigger reflow
                void badge.offsetWidth;
                badge.classList.add('pulse');
            }
        }
    });

    // Keyboard navigation: allow arrow keys to navigate dropdown items
    const enableDropdownKeyboard = (dropdown) => {
        let idx = 0;
        const items = Array.from(dropdown.querySelectorAll('button'));
        dropdown.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                idx = (idx + 1) % items.length; items[idx].focus(); e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                idx = (idx - 1 + items.length) % items.length; items[idx].focus(); e.preventDefault();
            } else if (e.key === 'Enter') {
                items[idx].click(); e.preventDefault();
            }
        });
    };

    if (languageDropdown) enableDropdownKeyboard(languageDropdown);
    if (currencyDropdown) enableDropdownKeyboard(currencyDropdown);

    // Cerrar dropdown con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllDropdowns();
    });

    // Función para actualizar el idioma
    function updateLanguage(lang) {
        // Aquí puedes implementar la lógica de cambio de idioma
        const translations = {
            es: {
                home: 'Inicio',
                products: 'Productos',
                login: 'Iniciar Sesión',
                register: 'Registrarse',
                logout: 'Cerrar Sesión',
                cart: 'Carrito'
            },
            en: {
                home: 'Home',
                products: 'Products',
                login: 'Login',
                register: 'Register',
                logout: 'Logout',
                cart: 'Cart'
            },
            fr: {
                home: 'Accueil',
                products: 'Produits',
                login: 'Connexion',
                register: 'S\'inscrire',
                logout: 'Déconnexion',
                cart: 'Panier'
            }
        };

        // Guardar preferencia de idioma
        localStorage.setItem('preferredLanguage', lang);

        // Actualizar textos en la página
        const texts = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (texts[key]) {
                element.textContent = texts[key];
            }
        });
    }

    // Función para actualizar la moneda
    function updateCurrency(currency) {
        // Guardar preferencia de moneda
        localStorage.setItem('preferredCurrency', currency);

        // Tasas de cambio (deberías obtener esto de una API en una aplicación real)
        const rates = {
            eur: 1,
            usd: 1.17,
            gbp: 0.86
        };

        // Actualizar precios en la página
        document.querySelectorAll('[data-price]').forEach(element => {
            const basePrice = parseFloat(element.dataset.price);
            const newPrice = basePrice * rates[currency];
            const symbol = currency === 'eur' ? '€' : currency === 'usd' ? '$' : '£';
            element.textContent = `${symbol}${newPrice.toFixed(2)}`;
        });
        // Refresh UI parts that depend on currency
        if (typeof window.renderProducts === 'function') window.renderProducts();
        if (typeof window.updateCartUI === 'function') window.updateCartUI();
    }

    // Cargar preferencias guardadas
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedCurrency = localStorage.getItem('preferredCurrency');

    if (savedLanguage) {
        updateLanguage(savedLanguage);
        const el = languageSelector.querySelector('span');
        if (el) {
            const map = { es: 'es', en: 'us', fr: 'fr' };
            const url = getFlagURL(map[savedLanguage] || 'us');
            el.innerHTML = `<img src="${url}" class="flag-img" alt="${savedLanguage}"/> <span class="code"> ${savedLanguage.toUpperCase()}</span>`;
        }
    }

    if (savedCurrency) {
        updateCurrency(savedCurrency);
        const el = currencySelector.querySelector('span');
        if (el) {
            const map = { eur: 'eur', usd: 'us', gbp: 'gb' };
            const url = getFlagURL(map[savedCurrency] || 'eur');
            el.innerHTML = `<img src="${url}" class="flag-img" alt="${savedCurrency}"/> <span class="code"> ${savedCurrency.toUpperCase()}</span>`;
        }
    }

    // Ajustar posición de dropdowns cerca de sus selectores
    const adjustDropdownPositions = () => {
        const langRect = languageSelector?.getBoundingClientRect();
        const curRect = currencySelector?.getBoundingClientRect();
        if (langRect && languageDropdown) {
            languageDropdown.style.top = `${langRect.bottom + 8}px`;
            languageDropdown.style.left = `${langRect.left}px`;
        }
        if (curRect && currencyDropdown) {
            currencyDropdown.style.top = `${curRect.bottom + 8}px`;
            currencyDropdown.style.left = `${curRect.left}px`;
        }
    };

    window.addEventListener('resize', adjustDropdownPositions);
    setTimeout(adjustDropdownPositions, 100);
    // Exponer utilidades para formateo/carrito
    window.currencyUtils = {
        getCurrentCurrency: () => localStorage.getItem('preferredCurrency') || 'eur',
        getRate: (currency) => {
            const rates = { eur: 1, usd: 1.17, gbp: 0.86 };
            return rates[currency] || 1;
        },
        formatPrice: (basePrice) => {
            const cur = localStorage.getItem('preferredCurrency') || 'eur';
            const rates = { eur: 1, usd: 1.17, gbp: 0.86 };
            const symbol = cur === 'eur' ? '€' : cur === 'usd' ? '$' : '£';
            const newPrice = basePrice * (rates[cur] || 1);
            return `${symbol}${newPrice.toFixed(2)}`;
        }
    };

    // Reemplazar placeholders en HTML por SVGs generadas
    const injectFlagPlaceholders = () => {
        document.querySelectorAll('#languageDropdown button').forEach(btn => {
                btn.innerHTML = btn.innerHTML
                    .replace('{FLAG_ES}', `<img src="${getFlagURL('es')}" class="flag-img" alt="es"/>`)
                    .replace('{FLAG_US}', `<img src="${getFlagURL('us')}" class="flag-img" alt="us"/>`)
                    .replace('{FLAG_FR}', `<img src="${getFlagURL('fr')}" class="flag-img" alt="fr"/>`);
        });
        document.querySelectorAll('#currencyDropdown button').forEach(btn => {
            btn.innerHTML = btn.innerHTML
                    .replace('{FLAG_EU}', `<img src="${getFlagURL('eur')}" class="flag-img" alt="eur"/>`)
                    .replace('{FLAG_US}', `<img src="${getFlagURL('us')}" class="flag-img" alt="us"/>`)
                    .replace('{FLAG_GB}', `<img src="${getFlagURL('gb')}" class="flag-img" alt="gb"/>`);
        });
    };

    injectFlagPlaceholders();
});