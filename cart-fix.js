// Script para asegurar que el carrito funcione correctamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Iniciando Cart Fix...');
    
    // Esperar a que se cargue el carrito funcional
    setTimeout(() => {
        if (window.functionalCart) {
            console.log('✅ FunctionalCart encontrado');
            
            // Asegurar que el botón del carrito esté vinculado
            const cartButton = document.getElementById('cartButton');
            if (cartButton) {
                // Remover todos los event listeners existentes
                cartButton.replaceWith(cartButton.cloneNode(true));
                const newCartButton = document.getElementById('cartButton');
                
                // Añadir nuevo event listener
                newCartButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🛒 Botón del carrito clickeado desde Cart Fix');
                    window.functionalCart.toggleCart();
                });
                
                console.log('✅ Botón del carrito vinculado desde Cart Fix');
            } else {
                console.log('❌ Botón del carrito no encontrado');
            }
            
            // Asegurar que los productos se puedan añadir al carrito
            document.addEventListener('click', function(e) {
                if (e.target.matches('button[onclick*="addToCart"]') || 
                    e.target.matches('button[onclick*="addToCartWithQuantity"]')) {
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Extraer el ID del producto del onclick
                    const onclick = e.target.getAttribute('onclick');
                    const productIdMatch = onclick.match(/addToCart(?:WithQuantity)?\((\d+)\)/);
                    
                    if (productIdMatch) {
                        const productId = parseInt(productIdMatch[1]);
                        console.log('🛒 Añadiendo producto al carrito:', productId);
                        
                        // Buscar el producto en los datos
                        const product = findProductById(productId);
                        if (product) {
                            window.functionalCart.addProduct(product, 1);
                        } else {
                            console.log('❌ Producto no encontrado:', productId);
                        }
                    }
                }
            });
            
        } else {
            console.log('❌ FunctionalCart no encontrado, reintentando...');
            setTimeout(arguments.callee, 1000);
        }
    }, 1000);
});

// Función para encontrar un producto por ID
function findProductById(id) {
    // Buscar en diferentes fuentes de datos
    const sources = [
        window.state?.products,
        window.products,
        getDefaultProducts()
    ];
    
    for (const source of sources) {
        if (source && Array.isArray(source)) {
            const product = source.find(p => p.id === id);
            if (product) return product;
        }
    }
    
    return null;
}

// Productos por defecto si no se encuentran en otras fuentes
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: "Camiseta 42",
            price: 25.99,
            image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png"
        },
        {
            id: 2,
            name: "Taza 42",
            price: 15.99,
            image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/taza.png"
        },
        {
            id: 3,
            name: "Hoodie 42",
            price: 45.99,
            image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/hoodie.png"
        },
        {
            id: 4,
            name: "Sticker Pack",
            price: 8.99,
            image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/stickers.png"
        },
        {
            id: 5,
            name: "Laptop Sticker",
            price: 3.99,
            image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/laptop-sticker.png"
        }
    ];
}
