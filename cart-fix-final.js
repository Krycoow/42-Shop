// Script final para asegurar que el carrito funcione correctamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando Cart Fix Final...');
    
    // Esperar a que se cargue el carrito simple
    setTimeout(() => {
        if (window.simpleCart) {
            console.log('✅ SimpleCart encontrado');
            
            // Función para re-vincular el botón del carrito
            const rebindCartButton = () => {
                const cartButton = document.getElementById('cartButton');
                if (cartButton) {
                    // Remover todos los event listeners existentes
                    cartButton.replaceWith(cartButton.cloneNode(true));
                    const newCartButton = document.getElementById('cartButton');
                    
                    // Añadir nuevo event listener
                    newCartButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🛒 Botón del carrito clickeado desde Cart Fix Final');
                        window.simpleCart.toggleCart();
                    });
                    
                    console.log('✅ Botón del carrito re-vinculado desde Cart Fix Final');
                } else {
                    console.log('❌ Botón del carrito no encontrado en Cart Fix Final');
                }
            };
            
            // Re-vincular inmediatamente
            rebindCartButton();
            
            // Re-vincular después de añadir productos
            const originalAddToCart = window.simpleCart.addToCart.bind(window.simpleCart);
            window.simpleCart.addToCart = function(productId) {
                console.log('🛒 Añadiendo producto:', productId);
                const result = originalAddToCart(productId);
                
                // Re-vincular el botón después de añadir
                setTimeout(() => {
                    rebindCartButton();
                }, 100);
                
                return result;
            };
            
            // También re-vincular periódicamente
            setInterval(() => {
                rebindCartButton();
            }, 2000);
            
        } else {
            console.log('❌ SimpleCart no encontrado, reintentando...');
            setTimeout(arguments.callee, 1000);
        }
    }, 1000);
});

// Función global para añadir productos al carrito
window.addToCart = function(productId) {
    if (window.simpleCart) {
        window.simpleCart.addToCart(productId);
    }
};

// Función global para abrir el carrito
window.openCart = function() {
    if (window.simpleCart) {
        window.simpleCart.openCart();
    }
};

// Función global para cerrar el carrito
window.closeCart = function() {
    if (window.simpleCart) {
        window.simpleCart.closeCart();
    }
};

// Función global para toggle del carrito
window.toggleCart = function() {
    if (window.simpleCart) {
        window.simpleCart.toggleCart();
    }
};
