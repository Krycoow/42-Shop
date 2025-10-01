// JavaScript para la página de pago

class PaymentProcessor {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.paymentData = {};
        this.init();
    }

    init() {
        this.loadCartData();
        this.setupEventListeners();
        this.updateProgress();
    }

    // Cargar datos del carrito
    loadCartData() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            this.showEmptyCart();
            return;
        }
        
        this.paymentData.cart = cart;
        this.updateOrderSummary();
    }

    // Mostrar carrito vacío
    showEmptyCart() {
        const main = document.querySelector('.payment-main');
        main.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Tu carrito está vacío</h2>
                <p>No hay productos para procesar el pago</p>
                <button class="btn-primary" onclick="goToShop()">Ir a la Tienda</button>
            </div>
        `;
    }

    // Configurar event listeners
    setupEventListeners() {
        // Métodos de pago
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', () => {
                this.selectPaymentMethod(method);
            });
        });

        // Formateo de tarjeta
        document.getElementById('cardNumber')?.addEventListener('input', (e) => {
            this.formatCardNumber(e);
        });

        document.getElementById('expiryDate')?.addEventListener('input', (e) => {
            this.formatExpiryDate(e);
        });

        document.getElementById('cvv')?.addEventListener('input', (e) => {
            this.formatCVV(e);
        });
    }

    // Seleccionar método de pago
    selectPaymentMethod(method) {
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
        });
        method.classList.add('active');
        
        this.paymentData.paymentMethod = method.dataset.method;
        
        // Mostrar/ocultar formulario de tarjeta
        const cardForm = document.getElementById('cardForm');
        if (method.dataset.method === 'card') {
            cardForm.style.display = 'block';
        } else {
            cardForm.style.display = 'none';
        }
    }

    // Formatear número de tarjeta
    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.substr(0, 19);
        }
        e.target.value = formattedValue;
    }

    // Formatear fecha de vencimiento
    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }

    // Formatear CVV
    formatCVV(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }

    // Siguiente paso
    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.updateProgress();
            this.showStep(this.currentStep);
            
            if (this.currentStep === 3) {
                this.updateOrderSummary();
            }
        }
    }

    // Paso anterior
    prevStep() {
        this.currentStep--;
        this.updateProgress();
        this.showStep(this.currentStep);
    }

    // Validar paso actual
    validateCurrentStep() {
        if (this.currentStep === 1) {
            return this.validateShippingForm();
        } else if (this.currentStep === 2) {
            return this.validatePaymentForm();
        }
        return true;
    }

    // Validar formulario de envío
    validateShippingForm() {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                field.style.borderColor = 'rgba(0, 255, 0, 0.3)';
            }
        });

        if (!isValid) {
            this.showNotification('Por favor completa todos los campos obligatorios', 'error');
        } else {
            // Guardar datos de envío
            this.paymentData.shipping = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value
            };
        }

        return isValid;
    }

    // Validar formulario de pago
    validatePaymentForm() {
        if (this.paymentData.paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('cardName').value;

            if (!cardNumber || cardNumber.length < 16) {
                this.showNotification('Número de tarjeta inválido', 'error');
                return false;
            }

            if (!expiryDate || expiryDate.length < 5) {
                this.showNotification('Fecha de vencimiento inválida', 'error');
                return false;
            }

            if (!cvv || cvv.length < 3) {
                this.showNotification('CVV inválido', 'error');
                return false;
            }

            if (!cardName.trim()) {
                this.showNotification('Nombre en la tarjeta requerido', 'error');
                return false;
            }

            this.paymentData.payment = {
                method: 'card',
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                cardName: cardName
            };
        } else {
            this.paymentData.payment = {
                method: this.paymentData.paymentMethod
            };
        }

        return true;
    }

    // Mostrar paso
    showStep(step) {
        document.querySelectorAll('.payment-step').forEach(s => {
            s.classList.remove('active');
        });
        document.getElementById(`step${step}`).classList.add('active');
    }

    // Actualizar progreso
    updateProgress() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.toggle('active', index < this.currentStep);
        });

        document.querySelectorAll('.progress-line').forEach((line, index) => {
            line.classList.toggle('completed', index < this.currentStep - 1);
        });
    }

    // Actualizar resumen del pedido
    updateOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const total = document.getElementById('total');
        const shippingInfo = document.getElementById('shippingInfo');

        if (!orderItems || !this.paymentData.cart) return;

        // Calcular totales
        let subtotalAmount = 0;
        this.paymentData.cart.forEach(item => {
            subtotalAmount += (item.price || 0) * item.quantity;
        });

        const shippingAmount = subtotalAmount > 50 ? 0 : 5.99;
        const totalAmount = subtotalAmount + shippingAmount;

        // Actualizar items
        orderItems.innerHTML = this.paymentData.cart.map(item => {
            const product = window.state?.products.find(p => p.id === item.id);
            if (!product) return '';

            return `
                <div class="order-item">
                    <div class="item-info">
                        <img src="${product.image}" alt="${product.name}" class="item-image" onerror="this.src='https://via.placeholder.com/50x50/00ff00/000000?text=42'">
                        <div class="item-details">
                            <div class="item-name">${product.name}</div>
                            <div class="item-quantity">Cantidad: ${item.quantity}</div>
                        </div>
                    </div>
                    <div class="item-price">${(item.price || product.price).toFixed(2)} €</div>
                </div>
            `;
        }).join('');

        // Actualizar totales
        subtotal.textContent = `${subtotalAmount.toFixed(2)} €`;
        shipping.textContent = `${shippingAmount.toFixed(2)} €`;
        total.textContent = `${totalAmount.toFixed(2)} €`;

        // Actualizar información de envío
        if (this.paymentData.shipping) {
            shippingInfo.innerHTML = `
                <p><strong>${this.paymentData.shipping.firstName} ${this.paymentData.shipping.lastName}</strong></p>
                <p>${this.paymentData.shipping.address}</p>
                <p>${this.paymentData.shipping.city}, ${this.paymentData.shipping.postalCode}</p>
                <p>${this.paymentData.shipping.country}</p>
                <p>📧 ${this.paymentData.shipping.email}</p>
                <p>📞 ${this.paymentData.shipping.phone}</p>
            `;
        }
    }

    // Completar pago
    completePayment() {
        if (!this.validateCurrentStep()) return;

        // Simular procesamiento de pago
        this.showLoadingState();
        
        setTimeout(() => {
            this.hideLoadingState();
            this.processPayment();
        }, 2000);
    }

    // Procesar pago
    processPayment() {
        // Guardar pedido
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'completed',
            ...this.paymentData,
            total: this.calculateTotal()
        };

        // Guardar en localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Limpiar carrito
        localStorage.removeItem('cart');
        if (window.state) {
            window.state.cart = [];
        }

        // Mostrar éxito
        this.showSuccessModal();
    }

    // Calcular total
    calculateTotal() {
        let subtotal = 0;
        this.paymentData.cart.forEach(item => {
            subtotal += (item.price || 0) * item.quantity;
        });
        const shipping = subtotal > 50 ? 0 : 5.99;
        return subtotal + shipping;
    }

    // Mostrar estado de carga
    showLoadingState() {
        const button = document.querySelector('.btn-primary');
        if (button) {
            button.innerHTML = '<span class="spinner"></span> Procesando...';
            button.disabled = true;
        }
    }

    // Ocultar estado de carga
    hideLoadingState() {
        const button = document.querySelector('.btn-primary');
        if (button) {
            button.innerHTML = 'Finalizar Pago';
            button.disabled = false;
        }
    }

    // Mostrar modal de éxito
    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Funciones globales
function nextStep() {
    if (window.paymentProcessor) {
        window.paymentProcessor.nextStep();
    }
}

function prevStep() {
    if (window.paymentProcessor) {
        window.paymentProcessor.prevStep();
    }
}

function completePayment() {
    if (window.paymentProcessor) {
        window.paymentProcessor.completePayment();
    }
}

function goBack() {
    window.history.back();
}

function goToShop() {
    window.location.href = 'index.html';
}

function viewOrder() {
    // Implementar vista de pedido
    console.log('Ver pedido');
}

function openCart() {
    if (window.modernCart) {
        window.modernCart.openCart();
    }
}

function openSettings() {
    if (window.userSettings) {
        window.userSettings.openSettings();
    }
}

function showLoginModal() {
    if (window.showLoginModal) {
        window.showLoginModal();
    }
}

function showRegisterModal() {
    if (window.showRegisterModal) {
        window.showRegisterModal();
    }
}

function scrollToSection(section) {
    if (section === 'inicio' || section === 'productos') {
        window.location.href = 'index.html';
    }
}

// Inicializar procesador de pagos
document.addEventListener('DOMContentLoaded', () => {
    window.paymentProcessor = new PaymentProcessor();
});


