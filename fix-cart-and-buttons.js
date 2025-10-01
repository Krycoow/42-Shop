// Script para arreglar el carrito y los botones
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando arreglo del carrito y botones...');
    
    // Esperar un poco para que todos los scripts se carguen
    setTimeout(() => {
        fixCartButton();
        fixNavigationButtons();
        fixCustomButtons();
    }, 500);
});

function fixCartButton() {
    console.log('🛒 Arreglando botón del carrito...');
    
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        // Remover event listeners existentes
        cartButton.replaceWith(cartButton.cloneNode(true));
        const newCartButton = document.getElementById('cartButton');
        
        // Añadir nuevo event listener
        newCartButton.addEventListener('click', function(e) {
            e.preventDefault();
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

function fixNavigationButtons() {
    console.log('🧭 Arreglando botones de navegación...');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        // Remover event listeners existentes
        link.replaceWith(link.cloneNode(true));
        const newLink = document.querySelectorAll('.nav-link')[index];
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const section = newLink.dataset.section;
            console.log('🧭 Navegando a sección:', section);
            
            if (window.modernNavigation) {
                window.modernNavigation.navigateToSection(section);
            } else {
                // Fallback manual
                navigateToSectionManual(section);
            }
        });
    });
    
    console.log('✅ Botones de navegación arreglados:', navLinks.length);
}

function fixCustomButtons() {
    console.log('👕 Arreglando botones custom...');
    
    const customButtons = document.querySelectorAll('.price-card-button');
    customButtons.forEach((button, index) => {
        // Remover event listeners existentes
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.price-card-button')[index];
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
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

function navigateToSectionManual(sectionName) {
    const sections = {
        'inicio': 'header',
        'sobre-nosotros': 'why-we-are-number-one',
        'productos': 'featured-products-section',
        'reseñas': 'real-reviews-section'
    };
    
    const targetElement = document.getElementById(sections[sectionName]);
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log('✅ Navegación manual a:', sectionName);
    } else {
        console.log('❌ Sección no encontrada:', sectionName);
    }
}

// Función para verificar el estado del carrito
function checkCartStatus() {
    console.log('🔍 Verificando estado del carrito...');
    console.log('newCart disponible:', !!window.newCart);
    console.log('toggleCart disponible:', !!window.toggleCart);
    console.log('addToCart disponible:', !!window.addToCart);
}

// Ejecutar verificación después de un delay
setTimeout(checkCartStatus, 1000);

// Función global para debug
window.debugCart = function() {
    console.log('🔍 Debug del carrito:');
    console.log('newCart:', window.newCart);
    console.log('toggleCart:', window.toggleCart);
    console.log('addToCart:', window.addToCart);
    
    const cartButton = document.getElementById('cartButton');
    console.log('cartButton:', cartButton);
    
    const cartOverlay = document.getElementById('cartOverlay');
    console.log('cartOverlay:', cartOverlay);
    
    const cartContainer = document.getElementById('cartContainer');
    console.log('cartContainer:', cartContainer);
};
