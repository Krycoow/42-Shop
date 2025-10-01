// Sistema de formateo de precios con múltiples monedas
class PriceFormatter {
    constructor() {
        this.exchangeRates = {
            eur: 1.0,    // Euro como base
            usd: 1.08,   // 1 EUR = 1.08 USD
            gbp: 0.85    // 1 EUR = 0.85 GBP
        };
        this.init();
    }

    init() {
        // Escuchar cambios de moneda
        document.addEventListener('currencyChanged', (e) => {
            this.updateAllPrices();
        });
    }

    formatPrice(priceInEur, currency = 'eur') {
        const rate = this.exchangeRates[currency] || 1.0;
        const convertedPrice = priceInEur * rate;
        
        const symbols = {
            eur: '€',
            usd: '$',
            gbp: '£'
        };
        
        const symbol = symbols[currency] || '€';
        
        // Formatear con 2 decimales
        return `${symbol}${convertedPrice.toFixed(2)}`;
    }

    updateAllPrices() {
        // Obtener la moneda actual
        const currentCurrency = localStorage.getItem('currency') || 'eur';
        
        // Actualizar precios de productos
        document.querySelectorAll('.card__price').forEach(priceEl => {
            const originalPrice = priceEl.dataset.originalPrice;
            if (originalPrice) {
                priceEl.textContent = this.formatPrice(parseFloat(originalPrice), currentCurrency);
            }
        });
        
        // Actualizar precios en el carrito
        document.querySelectorAll('.cart-item-price').forEach(priceEl => {
            const originalPrice = priceEl.dataset.originalPrice;
            if (originalPrice) {
                priceEl.textContent = this.formatPrice(parseFloat(originalPrice), currentCurrency);
            }
        });
        
        // Actualizar total del carrito
        document.querySelectorAll('.cart-total').forEach(totalEl => {
            const originalTotal = totalEl.dataset.originalTotal;
            if (originalTotal) {
                totalEl.textContent = this.formatPrice(parseFloat(originalTotal), currentCurrency);
            }
        });
        
        // Actualizar precios de productos custom
        document.querySelectorAll('.price-card-price').forEach(priceEl => {
            const originalPrice = priceEl.dataset.originalPrice;
            if (originalPrice) {
                priceEl.textContent = this.formatPrice(parseFloat(originalPrice), currentCurrency);
            }
        });
    }

    // Función global para ser llamada desde otros scripts
    updateAllPricesGlobal() {
        this.updateAllPrices();
    }
}

// Crear instancia global
window.priceFormatter = new PriceFormatter();

// Función global para compatibilidad
window.updateAllPrices = function() {
    window.priceFormatter.updateAllPricesGlobal();
};

// Función para formatear precios individuales
window.formatPrice = function(priceInEur, currency = 'eur') {
    return window.priceFormatter.formatPrice(priceInEur, currency);
};