// Sistema de procesamiento de pago

class PaymentSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listener para proceder al checkout
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="goToCheckout"]') || e.target.closest('[data-action="checkout"]')) {
                e.preventDefault();
                this.showPaymentScreen();
            }
        });
    }

    // Mostrar pantalla de pago
    showPaymentScreen() {
        if (!state.cart || state.cart.length === 0) {
            this.showNotification('Tu carrito está vacío', 'warning');
            return;
        }

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModal">
                <div class="payment-modal">
                    <div class="payment-header">
                        <h2>Procesar Pago</h2>
                        <button class="payment-close">&times;</button>
                    </div>
                    
                    <div class="payment-content">
                        <div class="payment-summary">
                            <h3>Resumen del Pedido</h3>
                            <div class="order-items">
                                ${this.generateOrderItems()}
                            </div>
                            <div class="order-total">
                                <div class="total-line">
                                    <span>Subtotal:</span>
                                    <span>${this.formatPrice(this.calculateSubtotal())}</span>
                                </div>
                                <div class="total-line">
                                    <span>Envío:</span>
                                    <span>Gratis</span>
                                </div>
                                <div class="total-line total-final">
                                    <span>Total:</span>
                                    <span>${this.formatPrice(this.calculateTotal())}</span>
                                </div>
                            </div>
                        </div>

                        <div class="payment-methods">
                            <h3>Método de Pago</h3>
                            <div class="payment-options">
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="card" checked>
                                    <div class="payment-option-content">
                                        <div class="payment-icon">💳</div>
                                        <div class="payment-text">
                                            <div class="payment-title">Tarjeta de Crédito</div>
                                            <div class="payment-subtitle">Visa, Mastercard, American Express</div>
                                        </div>
                                    </div>
                                </label>
                                
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="paypal">
                                    <div class="payment-option-content">
                                        <div class="payment-icon">🅿️</div>
                                        <div class="payment-text">
                                            <div class="payment-title">PayPal</div>
                                            <div class="payment-subtitle">Pago seguro con PayPal</div>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div class="payment-form" id="cardForm">
                                <div class="form-group">
                                    <label>Número de Tarjeta</label>
                                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Fecha de Vencimiento</label>
                                        <input type="text" id="expiryDate" placeholder="MM/AA" maxlength="5">
                                    </div>
                                    <div class="form-group">
                                        <label>CVV</label>
                                        <input type="text" id="cvv" placeholder="123" maxlength="4">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Nombre en la Tarjeta</label>
                                    <input type="text" id="cardName" placeholder="Juan Pérez">
                                </div>
                            </div>

                            <div class="payment-form" id="paypalForm" style="display: none;">
                                <div class="paypal-info">
                                    <div class="paypal-icon">🅿️</div>
                                    <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="payment-actions">
                        <button class="btn-secondary" id="cancelPayment">Cancelar</button>
                        <button class="btn-primary" id="processPayment">
                            <span class="payment-btn-text">Procesar Pago</span>
                            <span class="payment-btn-loading" style="display: none;">
                                <div class="spinner"></div>
                                Procesando...
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupPaymentEventListeners();
    }

    // Configurar event listeners del pago
    setupPaymentEventListeners() {
        const modal = document.getElementById('paymentModal');
        const closeBtn = modal.querySelector('.payment-close');
        const cancelBtn = modal.querySelector('#cancelPayment');
        const processBtn = modal.querySelector('#processPayment');
        const paymentMethods = modal.querySelectorAll('input[name="paymentMethod"]');

        // Cerrar modal
        closeBtn.addEventListener('click', () => modal.remove());
        cancelBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Cambiar método de pago
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const cardForm = document.getElementById('cardForm');
                const paypalForm = document.getElementById('paypalForm');
                
                if (method.value === 'card') {
                    cardForm.style.display = 'block';
                    paypalForm.style.display = 'none';
                } else {
                    cardForm.style.display = 'none';
                    paypalForm.style.display = 'block';
                }
            });
        });

        // Formatear número de tarjeta
        const cardNumber = document.getElementById('cardNumber');
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Formatear fecha de vencimiento
        const expiryDate = document.getElementById('expiryDate');
        expiryDate.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // Solo números en CVV
        const cvv = document.getElementById('cvv');
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        // Procesar pago
        processBtn.addEventListener('click', () => {
            this.processPayment();
        });
    }

    // Procesar pago
    async processPayment() {
        const modal = document.getElementById('paymentModal');
        const processBtn = modal.querySelector('#processPayment');
        const btnText = processBtn.querySelector('.payment-btn-text');
        const btnLoading = processBtn.querySelector('.payment-btn-loading');
        const selectedMethod = modal.querySelector('input[name="paymentMethod"]:checked').value;

        // Mostrar loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        processBtn.disabled = true;

        // Simular procesamiento
        await this.simulatePayment(selectedMethod);

        // Ocultar modal
        modal.remove();

        // Mostrar notificación de éxito
        this.showSuccessNotification();

        // Limpiar carrito
        state.cart = [];
        this.updateCartUI();
    }

    // Simular procesamiento de pago
    async simulatePayment(method) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000); // 2 segundos de simulación
        });
    }

    // Mostrar notificación de éxito
    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <div class="success-text">Compra con éxito</div>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto-remove después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Generar items del pedido
    generateOrderItems() {
        return state.cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-details">
                        <span class="order-item-quantity">Cantidad: ${item.quantity}</span>
                        <span class="order-item-price">${this.formatPrice(item.price * item.quantity)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Calcular subtotal
    calculateSubtotal() {
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calcular total
    calculateTotal() {
        return this.calculateSubtotal(); // Sin envío por ahora
    }

    // Formatear precio
    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = '0';
            cartCount.style.display = 'none';
        }

        if (window.updateCartUI) {
            window.updateCartUI();
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        if (window.showToast) {
            window.showToast(message, type);
        }
    }
}

// Estilos para el sistema de pago
const paymentStyles = `
<style>
.payment-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
}

.payment-modal {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 255, 0, 0.2);
    animation: slideIn 0.3s ease;
}

.payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
}

.payment-header h2 {
    color: #00ff00;
    font-size: 1.8rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.payment-close {
    background: none;
    border: none;
    color: #ccc;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.payment-close:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
}

.payment-content {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.payment-summary h3,
.payment-methods h3 {
    color: #00ff00;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.order-items {
    margin-bottom: 1.5rem;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    margin-bottom: 0.5rem;
}

.order-item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
}

.order-item-name {
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.order-item-details {
    display: flex;
    justify-content: space-between;
    color: #ccc;
    font-size: 0.9rem;
}

.order-total {
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    padding-top: 1rem;
}

.total-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #ccc;
}

.total-final {
    font-size: 1.2rem;
    font-weight: 700;
    color: #00ff00;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}

.payment-options {
    margin-bottom: 1.5rem;
}

.payment-option {
    display: block;
    margin-bottom: 1rem;
    cursor: pointer;
}

.payment-option input[type="radio"] {
    display: none;
}

.payment-option-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.payment-option input[type="radio"]:checked + .payment-option-content {
    background: rgba(0, 255, 0, 0.1);
    border-color: rgba(0, 255, 0, 0.3);
}

.payment-icon {
    font-size: 1.5rem;
}

.payment-title {
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.payment-subtitle {
    color: #ccc;
    font-size: 0.9rem;
}

.payment-form {
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    color: #00ff00;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: rgba(0, 255, 0, 0.6);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.form-group input::placeholder {
    color: #666;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.paypal-info {
    text-align: center;
    padding: 2rem;
}

.paypal-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.paypal-info p {
    color: #ccc;
    line-height: 1.6;
}

.payment-actions {
    padding: 2rem;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn-primary {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ccc;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { 
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .payment-modal-overlay {
        padding: 1rem;
    }
    
    .payment-modal {
        max-height: 95vh;
    }
    
    .payment-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .payment-header,
    .payment-content,
    .payment-actions {
        padding: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .payment-actions {
        flex-direction: column;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', paymentStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.paymentSystem = new PaymentSystem();
});

// Hacer disponible globalmente
window.PaymentSystem = PaymentSystem;

class PaymentSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listener para proceder al checkout
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="goToCheckout"]') || e.target.closest('[data-action="checkout"]')) {
                e.preventDefault();
                this.showPaymentScreen();
            }
        });
    }

    // Mostrar pantalla de pago
    showPaymentScreen() {
        if (!state.cart || state.cart.length === 0) {
            this.showNotification('Tu carrito está vacío', 'warning');
            return;
        }

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModal">
                <div class="payment-modal">
                    <div class="payment-header">
                        <h2>Procesar Pago</h2>
                        <button class="payment-close">&times;</button>
                    </div>
                    
                    <div class="payment-content">
                        <div class="payment-summary">
                            <h3>Resumen del Pedido</h3>
                            <div class="order-items">
                                ${this.generateOrderItems()}
                            </div>
                            <div class="order-total">
                                <div class="total-line">
                                    <span>Subtotal:</span>
                                    <span>${this.formatPrice(this.calculateSubtotal())}</span>
                                </div>
                                <div class="total-line">
                                    <span>Envío:</span>
                                    <span>Gratis</span>
                                </div>
                                <div class="total-line total-final">
                                    <span>Total:</span>
                                    <span>${this.formatPrice(this.calculateTotal())}</span>
                                </div>
                            </div>
                        </div>

                        <div class="payment-methods">
                            <h3>Método de Pago</h3>
                            <div class="payment-options">
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="card" checked>
                                    <div class="payment-option-content">
                                        <div class="payment-icon">💳</div>
                                        <div class="payment-text">
                                            <div class="payment-title">Tarjeta de Crédito</div>
                                            <div class="payment-subtitle">Visa, Mastercard, American Express</div>
                                        </div>
                                    </div>
                                </label>
                                
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="paypal">
                                    <div class="payment-option-content">
                                        <div class="payment-icon">🅿️</div>
                                        <div class="payment-text">
                                            <div class="payment-title">PayPal</div>
                                            <div class="payment-subtitle">Pago seguro con PayPal</div>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div class="payment-form" id="cardForm">
                                <div class="form-group">
                                    <label>Número de Tarjeta</label>
                                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Fecha de Vencimiento</label>
                                        <input type="text" id="expiryDate" placeholder="MM/AA" maxlength="5">
                                    </div>
                                    <div class="form-group">
                                        <label>CVV</label>
                                        <input type="text" id="cvv" placeholder="123" maxlength="4">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Nombre en la Tarjeta</label>
                                    <input type="text" id="cardName" placeholder="Juan Pérez">
                                </div>
                            </div>

                            <div class="payment-form" id="paypalForm" style="display: none;">
                                <div class="paypal-info">
                                    <div class="paypal-icon">🅿️</div>
                                    <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="payment-actions">
                        <button class="btn-secondary" id="cancelPayment">Cancelar</button>
                        <button class="btn-primary" id="processPayment">
                            <span class="payment-btn-text">Procesar Pago</span>
                            <span class="payment-btn-loading" style="display: none;">
                                <div class="spinner"></div>
                                Procesando...
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupPaymentEventListeners();
    }

    // Configurar event listeners del pago
    setupPaymentEventListeners() {
        const modal = document.getElementById('paymentModal');
        const closeBtn = modal.querySelector('.payment-close');
        const cancelBtn = modal.querySelector('#cancelPayment');
        const processBtn = modal.querySelector('#processPayment');
        const paymentMethods = modal.querySelectorAll('input[name="paymentMethod"]');

        // Cerrar modal
        closeBtn.addEventListener('click', () => modal.remove());
        cancelBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Cambiar método de pago
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const cardForm = document.getElementById('cardForm');
                const paypalForm = document.getElementById('paypalForm');
                
                if (method.value === 'card') {
                    cardForm.style.display = 'block';
                    paypalForm.style.display = 'none';
                } else {
                    cardForm.style.display = 'none';
                    paypalForm.style.display = 'block';
                }
            });
        });

        // Formatear número de tarjeta
        const cardNumber = document.getElementById('cardNumber');
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Formatear fecha de vencimiento
        const expiryDate = document.getElementById('expiryDate');
        expiryDate.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        // Solo números en CVV
        const cvv = document.getElementById('cvv');
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        // Procesar pago
        processBtn.addEventListener('click', () => {
            this.processPayment();
        });
    }

    // Procesar pago
    async processPayment() {
        const modal = document.getElementById('paymentModal');
        const processBtn = modal.querySelector('#processPayment');
        const btnText = processBtn.querySelector('.payment-btn-text');
        const btnLoading = processBtn.querySelector('.payment-btn-loading');
        const selectedMethod = modal.querySelector('input[name="paymentMethod"]:checked').value;

        // Mostrar loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        processBtn.disabled = true;

        // Simular procesamiento
        await this.simulatePayment(selectedMethod);

        // Ocultar modal
        modal.remove();

        // Mostrar notificación de éxito
        this.showSuccessNotification();

        // Limpiar carrito
        state.cart = [];
        this.updateCartUI();
    }

    // Simular procesamiento de pago
    async simulatePayment(method) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000); // 2 segundos de simulación
        });
    }

    // Mostrar notificación de éxito
    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <div class="success-text">Compra con éxito</div>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto-remove después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Generar items del pedido
    generateOrderItems() {
        return state.cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-details">
                        <span class="order-item-quantity">Cantidad: ${item.quantity}</span>
                        <span class="order-item-price">${this.formatPrice(item.price * item.quantity)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Calcular subtotal
    calculateSubtotal() {
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calcular total
    calculateTotal() {
        return this.calculateSubtotal(); // Sin envío por ahora
    }

    // Formatear precio
    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = '0';
            cartCount.style.display = 'none';
        }

        if (window.updateCartUI) {
            window.updateCartUI();
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        if (window.showToast) {
            window.showToast(message, type);
        }
    }
}

// Estilos para el sistema de pago
const paymentStyles = `
<style>
.payment-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
}

.payment-modal {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 255, 0, 0.2);
    animation: slideIn 0.3s ease;
}

.payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
}

.payment-header h2 {
    color: #00ff00;
    font-size: 1.8rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.payment-close {
    background: none;
    border: none;
    color: #ccc;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.payment-close:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
}

.payment-content {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.payment-summary h3,
.payment-methods h3 {
    color: #00ff00;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.order-items {
    margin-bottom: 1.5rem;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    margin-bottom: 0.5rem;
}

.order-item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
}

.order-item-name {
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.order-item-details {
    display: flex;
    justify-content: space-between;
    color: #ccc;
    font-size: 0.9rem;
}

.order-total {
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    padding-top: 1rem;
}

.total-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #ccc;
}

.total-final {
    font-size: 1.2rem;
    font-weight: 700;
    color: #00ff00;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
}

.payment-options {
    margin-bottom: 1.5rem;
}

.payment-option {
    display: block;
    margin-bottom: 1rem;
    cursor: pointer;
}

.payment-option input[type="radio"] {
    display: none;
}

.payment-option-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.payment-option input[type="radio"]:checked + .payment-option-content {
    background: rgba(0, 255, 0, 0.1);
    border-color: rgba(0, 255, 0, 0.3);
}

.payment-icon {
    font-size: 1.5rem;
}

.payment-title {
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.payment-subtitle {
    color: #ccc;
    font-size: 0.9rem;
}

.payment-form {
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    color: #00ff00;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.form-group input {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: rgba(0, 255, 0, 0.6);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.form-group input::placeholder {
    color: #666;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.paypal-info {
    text-align: center;
    padding: 2rem;
}

.paypal-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.paypal-info p {
    color: #ccc;
    line-height: 1.6;
}

.payment-actions {
    padding: 2rem;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn-primary {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ccc;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideIn {
    from { 
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .payment-modal-overlay {
        padding: 1rem;
    }
    
    .payment-modal {
        max-height: 95vh;
    }
    
    .payment-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .payment-header,
    .payment-content,
    .payment-actions {
        padding: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .payment-actions {
        flex-direction: column;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', paymentStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.paymentSystem = new PaymentSystem();
});

// Hacer disponible globalmente
window.PaymentSystem = PaymentSystem;
