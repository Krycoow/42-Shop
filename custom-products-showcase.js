// Sistema de animaciones para la sección de productos custom

class CustomProductsShowcase {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupEventListeners();
        this.startAnimations();
    }

    createParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

        // Crear múltiples partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: #00ff00;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ff00;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 4 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    setupEventListeners() {
        // Event listener para scroll suave
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="scrollToProducts"]')) {
                e.preventDefault();
                this.scrollToProducts();
            }
        });

        // Event listener para solicitar presupuesto
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="showCustomQuote"]')) {
                e.preventDefault();
                this.showCustomQuote();
            }
        });

        // Animaciones al hacer scroll
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });
    }

    startAnimations() {
        // Animar números de estadísticas
        this.animateStats();
        
        // Animar tarjetas de características
        this.animateFeatureCards();
        
        // Animar elementos de servicios
        this.animateServiceItems();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUpAnimation(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    countUpAnimation(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isTime = target.includes('h') || target.includes('años');
        
        let numericValue;
        if (isPercentage) {
            numericValue = parseInt(target.replace('%', ''));
        } else if (isPlus) {
            numericValue = parseInt(target.replace('+', ''));
        } else if (isTime) {
            numericValue = parseInt(target.replace(/[^\d]/g, ''));
        } else {
            numericValue = parseInt(target);
        }

        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            if (isTime) {
                if (target.includes('h')) displayValue += 'h';
                if (target.includes('años')) displayValue += ' años';
            }
            
            element.textContent = displayValue;
        }, 30);
    }

    animateFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                    }, index * 200);
                }
            });
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    animateServiceItems() {
        const items = document.querySelectorAll('.service-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                    }, index * 150);
                }
            });
        });

        items.forEach(item => {
            observer.observe(item);
        });
    }

    handleScrollAnimations() {
        const showcase = document.querySelector('.custom-products-showcase');
        if (!showcase) return;

        const rect = showcase.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            // Animar elementos según el scroll
            const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            
            // Animar título
            const titleWords = document.querySelectorAll('.title-word');
            titleWords.forEach((word, index) => {
                const delay = index * 0.1;
                const wordProgress = Math.max(0, Math.min(1, scrollProgress - delay));
                word.style.transform = `translateY(${(1 - wordProgress) * 50}px) scale(${0.8 + wordProgress * 0.2})`;
                word.style.opacity = wordProgress;
            });
        }
    }

    scrollToProducts() {
        const productsSection = document.getElementById('productsSection');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showCustomQuote() {
        const modalHTML = `
            <div class="custom-quote-modal-overlay" id="customQuoteModal">
                <div class="custom-quote-modal">
                    <div class="modal-header">
                        <h3>Solicitar Presupuesto Custom</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    
                    <div class="modal-content">
                        <form class="quote-form">
                            <div class="form-group">
                                <label>Nombre completo</label>
                                <input type="text" id="quoteName" placeholder="Tu nombre" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="quoteEmail" placeholder="tu@email.com" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Tipo de producto</label>
                                <select id="quoteProduct" required>
                                    <option value="">Selecciona un producto</option>
                                    <option value="camiseta">Camiseta Personalizada</option>
                                    <option value="sudadera">Sudadera Custom</option>
                                    <option value="accesorio">Accesorio Personalizado</option>
                                    <option value="calzado">Calzado Custom</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Cantidad aproximada</label>
                                <input type="number" id="quoteQuantity" placeholder="Ej: 10" min="1" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Descripción del diseño</label>
                                <textarea id="quoteDescription" placeholder="Describe tu idea de diseño..." rows="4" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Fecha límite (opcional)</label>
                                <input type="date" id="quoteDeadline">
                            </div>
                        </form>
                    </div>

                    <div class="modal-actions">
                        <button class="btn-secondary" id="cancelQuote">Cancelar</button>
                        <button class="btn-primary" id="submitQuote">Enviar Solicitud</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
            this.setupQuoteModal();
        }, 50);
    }

    setupQuoteModal() {
        const modal = document.getElementById('customQuoteModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('#cancelQuote');
        const submitBtn = modal.querySelector('#submitQuote');

        // Función rápida de cierre mejorada
        const quickClose = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.8)';
            modal.style.transition = 'all 0.2s ease';
            
            setTimeout(() => {
                if (modal && modal.parentNode) {
                    modal.remove();
                }
            }, 200);
        };

        // Cerrar modal - múltiples formas
        if (closeBtn) {
            closeBtn.addEventListener('click', quickClose);
            closeBtn.addEventListener('touchstart', quickClose);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', quickClose);
            cancelBtn.addEventListener('touchstart', quickClose);
        }
        
        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                quickClose(e);
            }
        });

        // Cerrar con tecla Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                quickClose(e);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Enviar solicitud
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const form = modal.querySelector('.quote-form');
                const formData = new FormData(form);
                
                // Validar formulario
                const name = document.getElementById('quoteName').value.trim();
                const email = document.getElementById('quoteEmail').value.trim();
                const product = document.getElementById('quoteProduct').value;
                const quantity = document.getElementById('quoteQuantity').value;
                const description = document.getElementById('quoteDescription').value.trim();

                if (!name || !email || !product || !quantity || !description) {
                    alert('Por favor completa todos los campos obligatorios');
                    return;
                }

                // Simular envío
                submitBtn.innerHTML = '<div class="spinner"></div> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    quickClose(e);
                    this.showSuccessMessage('¡Solicitud enviada! Te contactaremos en 24 horas.');
                }, 2000);
            });
        }
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <div class="success-text">${message}</div>
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

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Estilos adicionales para el modal
const customQuoteStyles = `
<style>
.custom-quote-modal-overlay {
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
    transition: opacity 0.15s ease;
}

.custom-quote-modal {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 255, 0, 0.2);
    animation: slideIn 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
}

.modal-header h3 {
    color: #00ff00;
    font-size: 1.5rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.modal-close {
    background: none;
    border: none;
    color: #ccc;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
}

.modal-content {
    padding: 2rem;
}

.quote-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    color: #00ff00;
    font-weight: 600;
    font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: rgba(0, 255, 0, 0.6);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #666;
}

.modal-actions {
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

@keyframes slideInUp {
    from { 
        opacity: 0;
        transform: translateY(30px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from { 
        opacity: 0;
        transform: translateX(-30px);
    }
    to { 
        opacity: 1;
        transform: translateX(0);
    }
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
    .custom-quote-modal-overlay {
        padding: 1rem;
    }
    
    .custom-quote-modal {
        max-height: 95vh;
    }
    
    .modal-header,
    .modal-content,
    .modal-actions {
        padding: 1.5rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', customQuoteStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.customProductsShowcase = new CustomProductsShowcase();
});

// Funciones globales
window.scrollToProducts = function() {
    if (window.customProductsShowcase) {
        window.customProductsShowcase.scrollToProducts();
    }
};

window.showCustomQuote = function() {
    if (window.customProductsShowcase) {
        window.customProductsShowcase.showCustomQuote();
    }
};

// Hacer disponible globalmente
window.CustomProductsShowcase = CustomProductsShowcase;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.customProductsShowcase = new CustomProductsShowcase();
});

class CustomProductsShowcase {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupEventListeners();
        this.startAnimations();
    }

    createParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

        // Crear múltiples partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: #00ff00;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ff00;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 4 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    setupEventListeners() {
        // Event listener para scroll suave
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="scrollToProducts"]')) {
                e.preventDefault();
                this.scrollToProducts();
            }
        });

        // Event listener para solicitar presupuesto
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="showCustomQuote"]')) {
                e.preventDefault();
                this.showCustomQuote();
            }
        });

        // Animaciones al hacer scroll
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });
    }

    startAnimations() {
        // Animar números de estadísticas
        this.animateStats();
        
        // Animar tarjetas de características
        this.animateFeatureCards();
        
        // Animar elementos de servicios
        this.animateServiceItems();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUpAnimation(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    countUpAnimation(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isTime = target.includes('h') || target.includes('años');
        
        let numericValue;
        if (isPercentage) {
            numericValue = parseInt(target.replace('%', ''));
        } else if (isPlus) {
            numericValue = parseInt(target.replace('+', ''));
        } else if (isTime) {
            numericValue = parseInt(target.replace(/[^\d]/g, ''));
        } else {
            numericValue = parseInt(target);
        }

        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            if (isTime) {
                if (target.includes('h')) displayValue += 'h';
                if (target.includes('años')) displayValue += ' años';
            }
            
            element.textContent = displayValue;
        }, 30);
    }

    animateFeatureCards() {
        const cards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                    }, index * 200);
                }
            });
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    animateServiceItems() {
        const items = document.querySelectorAll('.service-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                    }, index * 150);
                }
            });
        });

        items.forEach(item => {
            observer.observe(item);
        });
    }

    handleScrollAnimations() {
        const showcase = document.querySelector('.custom-products-showcase');
        if (!showcase) return;

        const rect = showcase.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            // Animar elementos según el scroll
            const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            
            // Animar título
            const titleWords = document.querySelectorAll('.title-word');
            titleWords.forEach((word, index) => {
                const delay = index * 0.1;
                const wordProgress = Math.max(0, Math.min(1, scrollProgress - delay));
                word.style.transform = `translateY(${(1 - wordProgress) * 50}px) scale(${0.8 + wordProgress * 0.2})`;
                word.style.opacity = wordProgress;
            });
        }
    }

    scrollToProducts() {
        const productsSection = document.getElementById('productsSection');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showCustomQuote() {
        const modalHTML = `
            <div class="custom-quote-modal-overlay" id="customQuoteModal">
                <div class="custom-quote-modal">
                    <div class="modal-header">
                        <h3>Solicitar Presupuesto Custom</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    
                    <div class="modal-content">
                        <form class="quote-form">
                            <div class="form-group">
                                <label>Nombre completo</label>
                                <input type="text" id="quoteName" placeholder="Tu nombre" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="quoteEmail" placeholder="tu@email.com" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Tipo de producto</label>
                                <select id="quoteProduct" required>
                                    <option value="">Selecciona un producto</option>
                                    <option value="camiseta">Camiseta Personalizada</option>
                                    <option value="sudadera">Sudadera Custom</option>
                                    <option value="accesorio">Accesorio Personalizado</option>
                                    <option value="calzado">Calzado Custom</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Cantidad aproximada</label>
                                <input type="number" id="quoteQuantity" placeholder="Ej: 10" min="1" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Descripción del diseño</label>
                                <textarea id="quoteDescription" placeholder="Describe tu idea de diseño..." rows="4" required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label>Fecha límite (opcional)</label>
                                <input type="date" id="quoteDeadline">
                            </div>
                        </form>
                    </div>

                    <div class="modal-actions">
                        <button class="btn-secondary" id="cancelQuote">Cancelar</button>
                        <button class="btn-primary" id="submitQuote">Enviar Solicitud</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
            this.setupQuoteModal();
        }, 50);
    }

    setupQuoteModal() {
        const modal = document.getElementById('customQuoteModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('#cancelQuote');
        const submitBtn = modal.querySelector('#submitQuote');

        // Función rápida de cierre mejorada
        const quickClose = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.8)';
            modal.style.transition = 'all 0.2s ease';
            
            setTimeout(() => {
                if (modal && modal.parentNode) {
                    modal.remove();
                }
            }, 200);
        };

        // Cerrar modal - múltiples formas
        if (closeBtn) {
            closeBtn.addEventListener('click', quickClose);
            closeBtn.addEventListener('touchstart', quickClose);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', quickClose);
            cancelBtn.addEventListener('touchstart', quickClose);
        }
        
        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                quickClose(e);
            }
        });

        // Cerrar con tecla Escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                quickClose(e);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Enviar solicitud
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const form = modal.querySelector('.quote-form');
                const formData = new FormData(form);
                
                // Validar formulario
                const name = document.getElementById('quoteName').value.trim();
                const email = document.getElementById('quoteEmail').value.trim();
                const product = document.getElementById('quoteProduct').value;
                const quantity = document.getElementById('quoteQuantity').value;
                const description = document.getElementById('quoteDescription').value.trim();

                if (!name || !email || !product || !quantity || !description) {
                    alert('Por favor completa todos los campos obligatorios');
                    return;
                }

                // Simular envío
                submitBtn.innerHTML = '<div class="spinner"></div> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    quickClose(e);
                    this.showSuccessMessage('¡Solicitud enviada! Te contactaremos en 24 horas.');
                }, 2000);
            });
        }
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <div class="success-text">${message}</div>
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

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Estilos adicionales para el modal
const customQuoteStyles = `
<style>
.custom-quote-modal-overlay {
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
    transition: opacity 0.15s ease;
}

.custom-quote-modal {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 255, 0, 0.2);
    animation: slideIn 0.3s ease;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
}

.modal-header h3 {
    color: #00ff00;
    font-size: 1.5rem;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.modal-close {
    background: none;
    border: none;
    color: #ccc;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
}

.modal-content {
    padding: 2rem;
}

.quote-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    color: #00ff00;
    font-weight: 600;
    font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: rgba(0, 255, 0, 0.6);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #666;
}

.modal-actions {
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

@keyframes slideInUp {
    from { 
        opacity: 0;
        transform: translateY(30px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from { 
        opacity: 0;
        transform: translateX(-30px);
    }
    to { 
        opacity: 1;
        transform: translateX(0);
    }
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
    .custom-quote-modal-overlay {
        padding: 1rem;
    }
    
    .custom-quote-modal {
        max-height: 95vh;
    }
    
    .modal-header,
    .modal-content,
    .modal-actions {
        padding: 1.5rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
</style>
`;

// Agregar estilos
document.head.insertAdjacentHTML('beforeend', customQuoteStyles);

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    window.customProductsShowcase = new CustomProductsShowcase();
});

// Funciones globales
window.scrollToProducts = function() {
    if (window.customProductsShowcase) {
        window.customProductsShowcase.scrollToProducts();
    }
};

window.showCustomQuote = function() {
    if (window.customProductsShowcase) {
        window.customProductsShowcase.showCustomQuote();
    }
};

// Hacer disponible globalmente
window.CustomProductsShowcase = CustomProductsShowcase;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.customProductsShowcase = new CustomProductsShowcase();
});
