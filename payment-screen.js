// Pantalla de pago con tarjeta de crédito
class PaymentScreen {
    constructor() {
        this.init();
    }

    init() {
        this.createPaymentModal();
        this.bindEvents();
        console.log('💳 PaymentScreen inicializado');
    }

    createPaymentModal() {
        const modalHTML = `
            <div id="paymentModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 20000;
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 500px;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                    border: 2px solid rgba(0, 255, 0, 0.3);
                    border-radius: 15px;
                    padding: 30px;
                    color: #fff;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                ">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #00ff00; margin: 0 0 10px 0; font-size: 28px;">💳 Procesar Pago</h2>
                        <p style="color: #888; margin: 0;">Completa los datos de tu tarjeta</p>
                    </div>
                    
                    <form id="paymentForm">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Número de Tarjeta:</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required style="
                                width: 100%;
                                padding: 15px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 16px;
                                transition: all 0.3s ease;
                            ">
                        </div>
                        
                        <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Mes/Año:</label>
                                <input type="text" id="expiryDate" placeholder="MM/AA" maxlength="5" required style="
                                    width: 100%;
                                    padding: 15px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 16px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">CVV:</label>
                                <input type="text" id="cvv" placeholder="123" maxlength="4" required style="
                                    width: 100%;
                                    padding: 15px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 16px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Nombre del Titular:</label>
                            <input type="text" id="cardName" placeholder="Juan Pérez" required style="
                                width: 100%;
                                padding: 15px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 16px;
                                transition: all 0.3s ease;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Email:</label>
                            <input type="email" id="email" placeholder="tu@email.com" required style="
                                width: 100%;
                                padding: 15px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 16px;
                                transition: all 0.3s ease;
                            ">
                        </div>
                        
                        <div style="display: flex; gap: 15px;">
                            <button type="button" id="cancelPayment" style="
                                flex: 1;
                                padding: 15px;
                                background: rgba(239, 68, 68, 0.2);
                                border: 2px solid rgba(239, 68, 68, 0.5);
                                border-radius: 8px;
                                color: #fff;
                                font-weight: bold;
                                font-size: 16px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">❌ Cancelar</button>
                            <button type="submit" style="
                                flex: 2;
                                padding: 15px;
                                background: linear-gradient(135deg, #00ff00, #00cc00);
                                border: none;
                                border-radius: 8px;
                                color: #000;
                                font-weight: bold;
                                font-size: 16px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">💳 Pagar Ahora</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addPaymentStyles();
    }

    addPaymentStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #paymentModal input:focus {
                border-color: rgba(0, 255, 0, 0.8) !important;
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.3) !important;
                outline: none !important;
            }
            
            #paymentModal button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 255, 0, 0.3);
            }
            
            #cancelPayment:hover {
                background: rgba(239, 68, 68, 0.4) !important;
                border-color: rgba(239, 68, 68, 0.8) !important;
                box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3) !important;
            }
            
            .payment-success {
                animation: paymentSuccess 0.5s ease-in-out;
            }
            
            @keyframes paymentSuccess {
                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    bindEvents() {
        // Formulario de pago
        const paymentForm = document.getElementById('paymentForm');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processPayment();
            });
        }

        // Botón cancelar
        const cancelBtn = document.getElementById('cancelPayment');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.closePaymentModal();
            });
        }

        // Formatear número de tarjeta
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;
            });
        }

        // Formatear fecha de expiración
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // Solo números para CVV
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPaymentModalOpen()) {
                this.closePaymentModal();
            }
        });
    }

    showPaymentModal(cartData) {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Mostrar resumen del carrito
            this.showCartSummary(cartData);
        }
    }

    showCartSummary(cartData) {
        const summaryHTML = `
            <div style="background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <h3 style="color: #00ff00; margin: 0 0 10px 0;">📋 Resumen de Compra</h3>
                <div style="color: #fff;">
                    <p style="margin: 5px 0;">Productos: ${cartData.totalItems}</p>
                    <p style="margin: 5px 0;">Subtotal: ${cartData.subtotal}</p>
                    <p style="margin: 5px 0;">Envío: ${cartData.shipping}</p>
                    ${cartData.discount && cartData.discount !== '0€' ? `
                        <p style="margin: 5px 0; color: #00ff00;">🎉 Descuento: -${cartData.discount}</p>
                    ` : ''}
                    <p style="margin: 5px 0; font-weight: bold; color: #00ff00;">Total: ${cartData.total}</p>
                </div>
            </div>
        `;
        
        const form = document.getElementById('paymentForm');
        if (form) {
            form.insertAdjacentHTML('afterbegin', summaryHTML);
        }
    }

    processPayment() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        const email = document.getElementById('email').value;

        // Validaciones básicas
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
            alert('Por favor, introduce un número de tarjeta válido');
            return;
        }

        if (!expiryDate || expiryDate.length < 5) {
            alert('Por favor, introduce una fecha de expiración válida');
            return;
        }

        if (!cvv || cvv.length < 3) {
            alert('Por favor, introduce un CVV válido');
            return;
        }

        if (!cardName.trim()) {
            alert('Por favor, introduce el nombre del titular');
            return;
        }

        if (!email.trim()) {
            alert('Por favor, introduce tu email');
            return;
        }

        // Simular procesamiento de pago
        this.showProcessingAnimation();
        
        setTimeout(() => {
            this.showSuccessMessage(email);
        }, 2000);
    }

    showProcessingAnimation() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #fff;
                ">
                    <div style="font-size: 48px; margin-bottom: 20px;">⏳</div>
                    <h2 style="color: #00ff00; margin: 0 0 10px 0;">Procesando Pago...</h2>
                    <p style="color: #888;">Por favor, espera mientras procesamos tu pago</p>
                    <div style="margin-top: 20px;">
                        <div style="width: 200px; height: 4px; background: rgba(0, 255, 0, 0.2); border-radius: 2px; margin: 0 auto;">
                            <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #00ff00, #00cc00); border-radius: 2px; animation: loading 2s ease-in-out;"></div>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes loading {
                        0% { width: 0%; }
                        100% { width: 100%; }
                    }
                </style>
            `;
        }
    }

    showSuccessMessage(email) {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #fff;
                    animation: paymentSuccess 0.5s ease-in-out;
                ">
                    <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
                    <h2 style="color: #00ff00; margin: 0 0 15px 0; font-size: 28px;">¡Compra Exitosa!</h2>
                    <p style="color: #fff; margin: 0 0 10px 0; font-size: 18px;">Tu pago ha sido procesado correctamente</p>
                    <p style="color: #888; margin: 0 0 20px 0;">Te enviaremos el estado de tu pedido por email</p>
                    <div style="background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); border-radius: 8px; padding: 15px; margin: 20px 0;">
                        <p style="color: #00ff00; margin: 0; font-weight: bold;">📧 Email: ${email}</p>
                        <p style="color: #888; margin: 5px 0 0 0; font-size: 14px;">Tiempo estimado: 24-48 horas</p>
                    </div>
                    <button onclick="paymentScreen.completePurchase()" style="
                        padding: 15px 30px;
                        background: linear-gradient(135deg, #00ff00, #00cc00);
                        border: none;
                        border-radius: 8px;
                        color: #000;
                        font-weight: bold;
                        font-size: 16px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">🎉 Continuar</button>
                </div>
            `;
        }
    }

    completePurchase() {
        // Obtener datos del carrito antes de limpiarlo
        let cartData = null;
        if (window.newCart) {
            cartData = {
                items: [...window.newCart.items],
                total: window.newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                subtotal: window.newCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                shipping: 0 // Se calculará en el historial
            };
            
            // Añadir pedido al historial del usuario
            if (window.userProfileSystem && window.userProfileSystem.currentUser) {
                window.userProfileSystem.addOrder(cartData);
            }
            
            // Limpiar el carrito
            window.newCart.clearCart();
        }
        
        // Cerrar modal
        this.closePaymentModal();
        
        console.log('✅ Compra completada exitosamente', cartData);
    }

    closePaymentModal() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                // Limpiar formulario
                const form = document.getElementById('paymentForm');
                if (form) {
                    form.reset();
                }
            }, 300);
        }
    }

    isPaymentModalOpen() {
        const modal = document.getElementById('paymentModal');
        return modal && modal.style.display === 'block';
    }
}

// Inicializar el sistema de pago
document.addEventListener('DOMContentLoaded', () => {
    console.log('💳 Inicializando PaymentScreen...');
    window.paymentScreen = new PaymentScreen();
});
