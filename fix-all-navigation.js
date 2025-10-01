// Script para arreglar TODOS los botones de navegación y indicadores
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando arreglo completo de navegación...');
    
    // Esperar a que todos los scripts se carguen
    setTimeout(() => {
        fixAllNavigationButtons();
        fixAllIndicators();
        fixAllCartButtons();
        fixAllCustomButtons();
    }, 1000);
});

function fixAllNavigationButtons() {
    console.log('🧭 Arreglando TODOS los botones de navegación...');
    
    // Función para navegar a una sección
    const navigateToSection = (sectionName) => {
        console.log('🧭 Navegando a:', sectionName);
        
        const sections = {
            'inicio': 'header',
            'sobre-nosotros': 'why-we-are-number-one',
            'productos': 'featured-products-section',
            'reseñas': 'real-reviews-section'
        };
        
        const targetElement = document.getElementById(sections[sectionName]);
        if (targetElement) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar indicadores
            updateActiveIndicators(sectionName);
            console.log('✅ Navegación exitosa a:', sectionName);
        } else {
            console.log('❌ Sección no encontrada:', sectionName);
        }
    };

    // Arreglar botones de navegación principales
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        // Remover event listeners existentes
        link.replaceWith(link.cloneNode(true));
        const newLink = document.querySelectorAll('.nav-link')[index];
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const section = newLink.dataset.section;
            console.log('🧭 Botón de navegación clickeado:', section);
            navigateToSection(section);
        });
    });
    
    console.log('✅ Botones de navegación arreglados:', navLinks.length);
}

function fixAllIndicators() {
    console.log('🔘 Arreglando TODOS los indicadores...');
    
    // Función para navegar a una sección
    const navigateToSection = (sectionName) => {
        console.log('🔘 Navegando desde indicador a:', sectionName);
        
        const sections = {
            'inicio': 'header',
            'sobre-nosotros': 'why-we-are-number-one',
            'productos': 'featured-products-section',
            'reseñas': 'real-reviews-section'
        };
        
        const targetElement = document.getElementById(sections[sectionName]);
        if (targetElement) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar indicadores
            updateActiveIndicators(sectionName);
            console.log('✅ Navegación desde indicador exitosa a:', sectionName);
        } else {
            console.log('❌ Sección no encontrada:', sectionName);
        }
    };

    // Arreglar indicadores del lado derecho
    const indicators = document.querySelectorAll('.indicator-dot');
    indicators.forEach((indicator, index) => {
        // Remover event listeners existentes
        indicator.replaceWith(indicator.cloneNode(true));
        const newIndicator = document.querySelectorAll('.indicator-dot')[index];
        
        newIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const section = newIndicator.dataset.section;
            console.log('🔘 Indicador clickeado:', section);
            navigateToSection(section);
        });
    });
    
    console.log('✅ Indicadores arreglados:', indicators.length);
    
    // Configurar scroll spy para actualizar indicadores automáticamente
    setupScrollSpy();
}

function updateActiveIndicators(activeSection) {
    // Actualizar indicadores
    document.querySelectorAll('.indicator-dot').forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === activeSection) {
            dot.classList.add('active');
        }
    });
    
    // Actualizar botones de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSection) {
            link.classList.add('active');
        }
    });
}

function setupScrollSpy() {
    let ticking = false;
    
    const updateActiveSectionOnScroll = () => {
        const scrollPosition = window.scrollY + 150;
        let newActiveSection = 'inicio';
        
        const sections = {
            'inicio': 'header',
            'sobre-nosotros': 'why-we-are-number-one',
            'productos': 'featured-products-section',
            'reseñas': 'real-reviews-section'
        };
        
        // Verificar cada sección
        for (const [sectionName, elementId] of Object.entries(sections)) {
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
        const currentActive = document.querySelector('.indicator-dot.active')?.dataset.section;
        if (currentActive !== newActiveSection) {
            updateActiveIndicators(newActiveSection);
            console.log('🔘 Sección activa cambiada a:', newActiveSection);
        }
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveSectionOnScroll);
            ticking = true;
        }
    });
    
    // Ejecutar una vez al cargar
    setTimeout(updateActiveSectionOnScroll, 500);
}

function fixAllCartButtons() {
    console.log('🛒 Arreglando TODOS los botones del carrito...');
    
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        // Remover event listeners existentes
        cartButton.replaceWith(cartButton.cloneNode(true));
        const newCartButton = document.getElementById('cartButton');
        
        newCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🛒 Botón del carrito clickeado');
            
            if (window.newCart) {
                console.log('✅ Usando newCart');
                window.newCart.toggleCart();
            } else if (window.toggleCart) {
                console.log('✅ Usando toggleCart global');
                window.toggleCart();
            } else {
                console.log('❌ Sistema de carrito no disponible');
                alert('Sistema de carrito no disponible');
            }
        });
        
        console.log('✅ Botón del carrito arreglado');
    } else {
        console.log('❌ Botón del carrito no encontrado');
    }
}

function fixAllCustomButtons() {
    console.log('👕 Arreglando TODOS los botones custom...');
    
    const customButtons = document.querySelectorAll('.price-card-button');
    customButtons.forEach((button, index) => {
        // Remover event listeners existentes
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.price-card-button')[index];
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👕 Botón custom clickeado');
            
            // Extraer información del botón
            const onclick = newButton.getAttribute('onclick');
            if (onclick) {
                const productType = onclick.match(/'([^']+)'/)[1];
                const price = parseFloat(onclick.match(/(\d+\.\d+)/)[1]);
                
                console.log('👕 Producto:', productType, 'Precio:', price);
                
                if (window.customClothingSystem) {
                    window.customClothingSystem.addCustomToCart(productType, price);
                } else if (window.addCustomToCart) {
                    window.addCustomToCart(productType, price);
                } else {
                    console.log('❌ Sistema custom no disponible');
                    alert('Sistema de productos custom no disponible');
                }
            }
        });
    });
    
    console.log('✅ Botones custom arreglados:', customButtons.length);
}

// Función global para debug
window.debugNavigation = function() {
    console.log('🔍 Debug de navegación:');
    console.log('modernNavigation:', window.modernNavigation);
    console.log('newCart:', window.newCart);
    console.log('customClothingSystem:', window.customClothingSystem);
    
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('navLinks:', navLinks.length);
    
    const indicators = document.querySelectorAll('.indicator-dot');
    console.log('indicators:', indicators.length);
    
    const cartButton = document.getElementById('cartButton');
    console.log('cartButton:', cartButton);
};
