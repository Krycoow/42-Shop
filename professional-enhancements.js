// Mejoras profesionales para la web

class ProfessionalEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addProfessionalHeader();
        this.addLoadingScreen();
        this.addScrollToTop();
        this.addProfessionalFooter();
        this.addPerformanceOptimizations();
        this.addSEOOptimizations();
    }

    // Añadir header profesional
    addProfessionalHeader() {
        const header = document.querySelector('.header');
        if (header) {
            // Añadir indicador de carga
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = `
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            `;
            header.appendChild(loadingIndicator);

            // Añadir notificaciones profesionales
            this.addNotificationSystem();
        }
    }

    // Añadir pantalla de carga
    addLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'loadingScreen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <div class="logo-text">42Shop</div>
                    <div class="logo-subtitle">La Mejor Página de Ropa a la Moda del Año</div>
                </div>
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loading-text">Cargando experiencia premium...</div>
            </div>
        `;
        document.body.appendChild(loadingScreen);

        // Ocultar pantalla de carga después de 2 segundos
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    }

    // Añadir botón de scroll to top
    addScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.title = 'Volver arriba';
        document.body.appendChild(scrollToTopBtn);

        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll suave al hacer click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Añadir footer profesional
    addProfessionalFooter() {
        const footer = document.createElement('footer');
        footer.className = 'professional-footer';
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h3>42Shop</h3>
                    <p>La mejor página de ropa a la moda del año. Productos exclusivos con la mejor calidad y diseño.</p>
                    <div class="social-links">
                        <a href="#" class="social-link">📘</a>
                        <a href="#" class="social-link">📷</a>
                        <a href="#" class="social-link">🐦</a>
                        <a href="#" class="social-link">💼</a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#productos">Productos</a></li>
                        <li><a href="#reseñas">Reseñas</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Información</h4>
                    <ul>
                        <li><a href="#envios">Envíos</a></li>
                        <li><a href="#devoluciones">Devoluciones</a></li>
                        <li><a href="#garantia">Garantía</a></li>
                        <li><a href="#privacidad">Privacidad</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <div class="contact-info">
                        <p>📧 info@42shop.com</p>
                        <p>📞 +34 123 456 789</p>
                        <p>📍 Madrid, España</p>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 42Shop. Todos los derechos reservados.</p>
                <p>Desarrollado con ❤️ y tecnología moderna</p>
            </div>
        `;
        document.body.appendChild(footer);
    }

    // Añadir sistema de notificaciones
    addNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.id = 'notificationContainer';
        document.body.appendChild(notificationContainer);
    }

    // Mostrar notificación profesional
    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
        `;

        container.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-remover
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // Obtener icono de notificación
    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    // Optimizaciones de rendimiento
    addPerformanceOptimizations() {
        // Lazy loading para imágenes
        this.addLazyLoading();
        
        // Preload de recursos críticos
        this.addResourcePreloading();
        
        // Optimización de scroll
        this.optimizeScroll();
    }

    // Añadir lazy loading
    addLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Añadir preload de recursos
    addResourcePreloading() {
        const criticalResources = [
            'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/sudadera.png',
            'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png'
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // Optimizar scroll
    optimizeScroll() {
        let ticking = false;
        
        const updateScroll = () => {
            // Actualizar indicador de progreso
            const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const progressBar = document.querySelector('.loading-progress');
            if (progressBar) {
                progressBar.style.width = `${scrollProgress}%`;
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }

    // Optimizaciones SEO
    addSEOOptimizations() {
        // Añadir meta tags dinámicos
        this.addDynamicMetaTags();
        
        // Añadir structured data
        this.addStructuredData();
        
        // Optimizar títulos
        this.optimizeTitles();
    }

    // Añadir meta tags dinámicos
    addDynamicMetaTags() {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = '42Shop - La mejor página de ropa a la moda del año. Productos exclusivos con la mejor calidad y diseño. Sudaderas, camisetas, accesorios y más.';
            document.head.appendChild(meta);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = 'ropa, moda, 42shop, sudaderas, camisetas, accesorios, tienda online, compras';
            document.head.appendChild(meta);
        }
    }

    // Añadir structured data
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "42Shop",
            "description": "La mejor página de ropa a la moda del año",
            "url": window.location.href,
            "logo": "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/logo.png",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Madrid",
                "addressCountry": "ES"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34-123-456-789",
                "contactType": "customer service"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Optimizar títulos
    optimizeTitles() {
        // Añadir títulos dinámicos según la página
        const currentPage = window.location.pathname;
        let pageTitle = '42Shop - La Mejor Página de Ropa a la Moda del Año';
        
        if (currentPage.includes('checkout')) {
            pageTitle = 'Checkout - 42Shop';
        } else if (currentPage.includes('product')) {
            pageTitle = 'Producto - 42Shop';
        }
        
        document.title = pageTitle;
    }
}

// Inicializar mejoras profesionales
document.addEventListener('DOMContentLoaded', () => {
    window.professionalEnhancements = new ProfessionalEnhancements();
    
    // Hacer funciones disponibles globalmente
    window.showNotification = (message, type, duration) => {
        if (window.professionalEnhancements) {
            window.professionalEnhancements.showNotification(message, type, duration);
        }
    };
});


