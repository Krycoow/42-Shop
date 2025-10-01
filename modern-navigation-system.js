// Sistema de navegación moderna y funcional
class ModernNavigation {
    constructor() {
        this.currentSection = 'inicio';
        this.sections = {
            'inicio': 'home',
            'sobre-nosotros': 'about',
            'productos': 'products',
            'reseñas': 'reviews'
        };
        this.init();
    }

    init() {
        this.createNavigationHTML();
        this.bindEvents();
        this.createSectionIndicator();
        this.updateActiveSection();
        this.setupScrollSpy();
    }

    createNavigationHTML() {
        // DESHABILITADO: No insertar botones de navegación en el header
        // Solo mantener los círculos verdes de la derecha
        console.log('Navegación HTML deshabilitada - usando solo círculos verdes');
    }

    bindEvents() {
        // Eventos de clic en los enlaces de navegación
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link');
                const section = link.dataset.section;
                console.log('Navegando a sección:', section);
                this.navigateToSection(section);
            }
        });

        // También vincular directamente los botones si existen
        setTimeout(() => {
            this.bindNavigationButtons();
        }, 100);

        // Eventos de clic en el área de usuario
        document.addEventListener('click', (e) => {
            if (e.target.closest('.user-info')) {
                this.toggleUserDropdown();
            } else if (!e.target.closest('.user-dropdown')) {
                this.closeUserDropdown();
            }
        });

        // Eventos del dropdown de usuario
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="profile"]')) {
                this.openUserProfile();
            } else if (e.target.closest('[data-action="logout"]')) {
                this.logout();
            }
        });
    }

    bindNavigationButtons() {
        // Vincular botones de navegación directamente
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                console.log('Botón de navegación clickeado:', section);
                this.navigateToSection(section);
            });
        });
        console.log('Botones de navegación vinculados:', navLinks.length);
    }

    createSectionIndicator() {
        const indicatorHTML = `
            <div class="section-indicator">
                <div class="indicator-dot active" data-section="inicio" data-section-name="Inicio"></div>
                <div class="indicator-dot" data-section="sobre-nosotros" data-section-name="Sobre Nosotros"></div>
                <div class="indicator-dot" data-section="productos" data-section-name="Productos"></div>
                <div class="indicator-dot" data-section="reseñas" data-section-name="Reseñas"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', indicatorHTML);

        // Eventos para los indicadores
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator-dot')) {
                const section = e.target.dataset.section;
                console.log('Indicador clickeado:', section);
                this.navigateToSection(section);
            }
        });

        // Vincular indicadores después de un pequeño delay
        setTimeout(() => {
            this.bindIndicators();
        }, 200);
    }

    bindIndicators() {
        const indicators = document.querySelectorAll('.indicator-dot');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                const section = indicator.dataset.section;
                console.log('Indicador vinculado clickeado:', section);
                this.navigateToSection(section);
            });
        });
        console.log('Indicadores vinculados:', indicators.length);
    }

    navigateToSection(sectionName) {
        const targetElement = document.getElementById(this.sections[sectionName]);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            this.currentSection = sectionName;
            this.updateActiveSection();
        }
    }

    updateActiveSection() {
        // Actualizar enlaces de navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === this.currentSection) {
                link.classList.add('active');
            }
        });

        // Actualizar indicadores
        document.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === this.currentSection) {
                dot.classList.add('active');
            }
        });
    }

    setupScrollSpy() {
        let ticking = false;

        const updateActiveSectionOnScroll = () => {
            const scrollPosition = window.scrollY + 150; // Ajustar offset
            let newActiveSection = 'inicio'; // Por defecto
            
            // Verificar cada sección
            for (const [sectionName, elementId] of Object.entries(this.sections)) {
                const element = document.getElementById(elementId);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;
                    
                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        newActiveSection = sectionName;
                        break;
                    }
                }
            }
            
            // Actualizar solo si cambió la sección
            if (this.currentSection !== newActiveSection) {
                this.currentSection = newActiveSection;
                this.updateActiveSection();
                console.log('Sección activa cambiada a:', newActiveSection);
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSectionOnScroll);
                ticking = true;
            }
        });

        // También ejecutar una vez al cargar
        setTimeout(updateActiveSectionOnScroll, 500);
    }

    toggleUserDropdown() {
        const dropdown = document.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        } else {
            this.createUserDropdown();
        }
    }

    closeUserDropdown() {
        const dropdown = document.querySelector('.user-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }

    createUserDropdown() {
        const userArea = document.querySelector('.user-area');
        if (!userArea) return;

        const dropdownHTML = `
            <div class="user-dropdown">
                <div class="dropdown-item" data-action="profile">
                    <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Ajustes del Perfil
                </div>
                <div class="dropdown-item" data-action="orders">
                    <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    Historial de Compras
                </div>
                <div class="dropdown-item" data-action="logout">
                    <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Cerrar Sesión
                </div>
            </div>
        `;

        const userInfo = userArea.querySelector('.user-info');
        if (userInfo) {
            userInfo.insertAdjacentHTML('afterend', dropdownHTML);
        }
    }

    openUserProfile() {
        if (window.userProfileSystem) {
            window.userProfileSystem.showProfileModal();
        }
        this.closeUserDropdown();
    }

    logout() {
        // Limpiar datos de usuario
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userSession');
        
        // Recargar la página para actualizar el estado
        window.location.reload();
    }

    // Método público para navegar programáticamente
    goToSection(sectionName) {
        this.navigateToSection(sectionName);
    }

    // Método público para obtener la sección actual
    getCurrentSection() {
        return this.currentSection;
    }
}

// Inicializar el sistema de navegación
document.addEventListener('DOMContentLoaded', () => {
    window.modernNavigation = new ModernNavigation();
});
