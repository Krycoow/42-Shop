// Sistema de notificación de descuento
class DiscountNotification {
    constructor() {
        this.discountPercent = 60;
        this.minimumAmount = 100;
        this.notificationId = 'discountNotification';
        this.init();
    }

    init() {
        this.checkNotificationStatus();
        this.bindEvents();
        console.log('💰 DiscountNotification inicializado');
    }

    checkNotificationStatus() {
        const lastShown = localStorage.getItem('discountNotificationLastShown');
        const now = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        // Si no se ha mostrado nunca o han pasado más de 24 horas
        if (!lastShown || (now - parseInt(lastShown)) > twentyFourHours) {
            this.showNotification();
        }
    }

    showNotification() {
        // Verificar si ya existe
        if (document.getElementById(this.notificationId)) {
            return;
        }

        const notification = document.createElement('div');
        notification.id = this.notificationId;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
            border: 2px solid rgba(0, 255, 0, 0.8);
            border-radius: 12px;
            padding: 15px;
            color: #000;
            font-weight: bold;
            z-index: 15000;
            box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
            animation: slideInFromRight 0.5s ease-out;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="flex: 1;">
                    <div style="font-size: 18px; margin-bottom: 5px;">🎉 ¡OFERTA ESPECIAL!</div>
                    <div style="font-size: 14px; margin-bottom: 8px;">${this.discountPercent}% de descuento</div>
                    <div style="font-size: 12px; opacity: 0.8;">En compras superiores a ${this.minimumAmount}€</div>
                </div>
                <button id="closeDiscountNotification" style="
                    background: none;
                    border: none;
                    color: #000;
                    font-size: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 10px;
                    transition: all 0.3s ease;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            <div style="margin-top: 10px; font-size: 11px; opacity: 0.7; text-align: center;">
                Válido por 24 horas
            </div>
        `;

        // Añadir estilos CSS para la animación
        this.addNotificationStyles();

        document.body.appendChild(notification);

        // Guardar timestamp de cuando se mostró
        const now = new Date().getTime();
        localStorage.setItem('discountNotificationLastShown', now.toString());

        // Vincular evento de cierre directamente al botón
        const closeButton = notification.querySelector('#closeDiscountNotification');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('💰 Botón X clickeado');
                this.closeNotification();
            });
        }

        // Añadir efecto hover
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateY(-2px)';
            notification.style.boxShadow = '0 12px 30px rgba(0, 255, 0, 0.6)';
        });

        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateY(0)';
            notification.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.4)';
        });

        console.log('💰 Notificación de descuento mostrada');
    }

    addNotificationStyles() {
        // Verificar si ya existen los estilos
        if (document.getElementById('discountNotificationStyles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'discountNotificationStyles';
        styles.textContent = `
            @keyframes slideInFromRight {
                0% {
                    transform: translateX(100%);
                    opacity: 0;
                }
                100% {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutToRight {
                0% {
                    transform: translateX(0);
                    opacity: 1;
                }
                100% {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            #closeDiscountNotification:hover {
                color: #ff0000 !important;
                transform: scale(1.2);
            }
            
            #discountNotification:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 12px 30px rgba(0, 255, 0, 0.6) !important;
            }
        `;
        document.head.appendChild(styles);
    }

    bindEvents() {
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById(this.notificationId)) {
                this.closeNotification();
            }
        });
    }

    closeNotification() {
        const notification = document.getElementById(this.notificationId);
        if (notification) {
            console.log('💰 Cerrando notificación de descuento...');
            
            // Deshabilitar interacciones
            notification.style.pointerEvents = 'none';
            
            // Añadir animación de salida
            notification.style.animation = 'slideOutToRight 0.3s ease-in forwards';
            
            // Remover después de la animación
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                    console.log('✅ Notificación de descuento eliminada');
                }
            }, 300);
        } else {
            console.log('❌ Notificación no encontrada para cerrar');
        }
    }

    // Método para verificar si se aplica el descuento
    shouldApplyDiscount(totalAmount) {
        return totalAmount >= this.minimumAmount;
    }

    // Método para calcular el descuento
    calculateDiscount(totalAmount) {
        if (this.shouldApplyDiscount(totalAmount)) {
            return (totalAmount * this.discountPercent) / 100;
        }
        return 0;
    }

    // Método para obtener el total con descuento
    getTotalWithDiscount(totalAmount) {
        const discount = this.calculateDiscount(totalAmount);
        return totalAmount - discount;
    }

    // Método para mostrar el descuento aplicado
    showDiscountApplied(originalTotal, discountAmount, finalTotal) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 20px 30px;
            border-radius: 12px;
            font-weight: bold;
            font-size: 16px;
            z-index: 10002;
            box-shadow: 0 10px 30px rgba(0, 255, 0, 0.5);
            animation: discountApplied 3s ease-in-out forwards;
            text-align: center;
        `;
        
        message.innerHTML = `
            <div style="font-size: 20px; margin-bottom: 10px;">🎉 ¡Descuento Aplicado!</div>
            <div style="margin-bottom: 5px;">Total original: ${this.formatPrice(originalTotal)}</div>
            <div style="margin-bottom: 5px;">Descuento (${this.discountPercent}%): -${this.formatPrice(discountAmount)}</div>
            <div style="font-size: 18px; font-weight: bold;">Total final: ${this.formatPrice(finalTotal)}</div>
        `;

        // Añadir estilos para la animación
        const styleSheet = document.head.querySelector('style') || document.createElement('style');
        if (!document.head.querySelector('style')) {
            document.head.appendChild(styleSheet);
        }
        styleSheet.textContent += `
            @keyframes discountApplied {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);

        console.log('💰 Descuento aplicado:', {
            original: originalTotal,
            discount: discountAmount,
            final: finalTotal
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    // Método para resetear la notificación (para testing)
    resetNotification() {
        localStorage.removeItem('discountNotificationLastShown');
        this.forceCloseNotification();
        setTimeout(() => {
            this.showNotification();
        }, 500);
    }

    // Método para forzar el cierre inmediato
    forceCloseNotification() {
        const notification = document.getElementById(this.notificationId);
        if (notification) {
            console.log('💰 Forzando cierre de notificación...');
            notification.remove();
        }
    }
}

// Inicializar el sistema de notificación
document.addEventListener('DOMContentLoaded', () => {
    console.log('💰 Inicializando DiscountNotification...');
    window.discountNotification = new DiscountNotification();
    
    // Función global para testing
    window.closeDiscountNotification = () => {
        if (window.discountNotification) {
            window.discountNotification.closeNotification();
        }
    };
    
    window.resetDiscountNotification = () => {
        if (window.discountNotification) {
            window.discountNotification.resetNotification();
        }
    };
});
