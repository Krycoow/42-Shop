// Sistema para productos destacados con compra directa
class FeaturedProductsDirectBuy {
    constructor() {
        this.featuredProducts = {
            'exclusivos': [
                {
                    id: 'camiseta-42-elite',
                    name: 'Camiseta 42 Elite',
                    price: 49.99,
                    description: 'Edición limitada con bordado premium',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZDNzAwIi8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iI0ZGRUE1MDAiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjIwIiBmaWxsPSIjMjIyQzU1Ii8+CjxyZWN0IHg9IjYwIiB5PSIxMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzIyMkM1NSIvPgo8L3N2Zz4K',
                    category: 'exclusivo'
                },
                {
                    id: 'sudadera-42-pro',
                    name: 'Sudadera 42 Pro',
                    price: 79.99,
                    description: 'Material premium con tecnología avanzada',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iIzQ3NTU2OSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjUiIGZpbGw9IiM2QjcyODAiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K',
                    category: 'exclusivo'
                },
                {
                    id: 'mochila-42-signature',
                    name: 'Mochila 42 Signature',
                    price: 129.99,
                    description: 'Diseño exclusivo solo para miembros VIP',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                    category: 'exclusivo'
                }
            ],
            'nuevos': [
                {
                    id: 'gorra-42-fresh',
                    name: 'Gorra 42 Fresh',
                    price: 29.99,
                    description: 'Última colección primavera 2024',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZDNzAwIi8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iI0ZGRUE1MDAiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjIwIiBmaWxsPSIjMjIyQzU1Ii8+CjxyZWN0IHg9IjYwIiB5PSIxMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzIyMkM1NSIvPgo8L3N2Zz4K',
                    category: 'nuevo'
                },
                {
                    id: 'zapatillas-42-boost',
                    name: 'Zapatillas 42 Boost',
                    price: 89.99,
                    description: 'Tecnología de amortiguación revolucionaria',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iIzQ3NTU2OSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjUiIGZpbGw9IiM2QjcyODAiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K',
                    category: 'nuevo'
                },
                {
                    id: 'reloj-42-smart',
                    name: 'Reloj 42 Smart',
                    price: 199.99,
                    description: 'Smartwatch con funciones exclusivas',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                    category: 'nuevo'
                }
            ],
            'populares': [
                {
                    id: 'camiseta-42-classic',
                    name: 'Camiseta 42 Classic',
                    price: 19.99,
                    description: 'El modelo más vendido de la historia',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZDNzAwIi8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iI0ZGRUE1MDAiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjIwIiBmaWxsPSIjMjIyQzU1Ii8+CjxyZWN0IHg9IjYwIiB5PSIxMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzIyMkM1NSIvPgo8L3N2Zz4K',
                    category: 'popular'
                },
                {
                    id: 'taza-42-premium',
                    name: 'Taza 42 Premium',
                    price: 14.99,
                    description: 'La taza que todos quieren tener',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iIzQ3NTU2OSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjUiIGZpbGw9IiM2QjcyODAiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K',
                    category: 'popular'
                },
                {
                    id: 'llavero-42-metal',
                    name: 'Llavero 42 Metal',
                    price: 6.99,
                    description: 'Accesorio perfecto para cualquier llave',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                    category: 'popular'
                }
            ],
            'ofertas': [
                {
                    id: 'pantalon-42-sport',
                    name: 'Pantalón 42 Sport',
                    price: 29.99,
                    originalPrice: 59.99,
                    description: '50% de descuento por tiempo limitado',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                    category: 'oferta'
                },
                {
                    id: 'chaqueta-42-winter',
                    name: 'Chaqueta 42 Winter',
                    price: 53.99,
                    originalPrice: 89.99,
                    description: 'Últimas unidades con 40% de descuento',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iIzQ3NTU2OSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjUiIGZpbGw9IiM2QjcyODAiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K',
                    category: 'oferta'
                },
                {
                    id: 'pack-42-complete',
                    name: 'Pack 42 Complete',
                    price: 39.99,
                    originalPrice: 59.99,
                    description: '3 productos por el precio de 2',
                    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                    category: 'oferta'
                }
            ]
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.createProductModal();
    }

    bindEvents() {
        // Esperar a que el DOM esté listo
        setTimeout(() => {
            this.setupFeaturedButtons();
        }, 500);
    }

    setupFeaturedButtons() {
        const featuredButtons = document.querySelectorAll('.featured-btn');
        console.log('🔍 Encontrados botones destacados:', featuredButtons.length);

        featuredButtons.forEach((button, index) => {
            // Remover event listeners existentes
            button.replaceWith(button.cloneNode(true));
            const newButton = document.querySelectorAll('.featured-btn')[index];
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Obtener información del producto desde el DOM
                const featuredItem = newButton.closest('.featured-item');
                const productName = featuredItem.querySelector('h3').textContent;
                const productPrice = featuredItem.querySelector('.featured-price').textContent;
                const productDescription = featuredItem.querySelector('p').textContent;
                
                // Extraer precio numérico
                const priceMatch = productPrice.match(/€(\d+\.?\d*)/);
                const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
                
                console.log('🛍️ Producto destacado clickeado:', productName, price);
                
                // Mostrar modal de producto
                this.showProductModal({
                    name: productName,
                    price: price,
                    description: productDescription,
                    image: this.getProductImage(productName)
                });
            });
        });
    }

    getProductImage(productName) {
        // Buscar imagen en los productos definidos
        for (const category in this.featuredProducts) {
            const product = this.featuredProducts[category].find(p => p.name === productName);
            if (product) {
                return product.image;
            }
        }
        // Imagen por defecto
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iI0U1RTdFQiIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHJlY3QgeD0iNjAiIHk9IjEyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
    }

    createProductModal() {
        const modalHTML = `
            <dialog id="featuredProductModal" class="modal featured-product-modal">
                <div class="modal__content">
                    <div class="modal__header">
                        <h2>🛍️ Producto Destacado</h2>
                        <button class="modal__close" onclick="closeFeaturedProductModal()">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="featured-product-content">
                        <div class="product-image-container">
                            <img id="featuredProductImage" src="" alt="Producto" class="product-image">
                        </div>
                        
                        <div class="product-info">
                            <h3 id="featuredProductName" class="product-name"></h3>
                            <p id="featuredProductDescription" class="product-description"></p>
                            <div class="product-price-container">
                                <span id="featuredProductPrice" class="product-price"></span>
                                <span id="featuredProductOriginalPrice" class="product-original-price"></span>
                            </div>
                            
                            <div class="product-actions">
                                <button class="action-btn primary" onclick="addFeaturedToCart()">
                                    🛒 Añadir al Carrito
                                </button>
                                <button class="action-btn secondary" onclick="buyNowFeatured()">
                                    💳 Comprar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    showProductModal(product) {
        const modal = document.getElementById('featuredProductModal');
        if (!modal) return;

        // Llenar información del producto
        document.getElementById('featuredProductName').textContent = product.name;
        document.getElementById('featuredProductDescription').textContent = product.description;
        document.getElementById('featuredProductPrice').textContent = `€${product.price}`;
        document.getElementById('featuredProductImage').src = product.image;

        // Ocultar precio original si no existe
        const originalPriceEl = document.getElementById('featuredProductOriginalPrice');
        if (product.originalPrice) {
            originalPriceEl.textContent = `€${product.originalPrice}`;
            originalPriceEl.style.display = 'block';
        } else {
            originalPriceEl.style.display = 'none';
        }

        // Guardar producto actual para usar en los botones
        window.currentFeaturedProduct = product;

        // Mostrar modal
        modal.showModal();
    }
}

// Funciones globales para el modal
window.closeFeaturedProductModal = function() {
    const modal = document.getElementById('featuredProductModal');
    if (modal) {
        modal.close();
    }
};

window.addFeaturedToCart = function() {
    if (window.currentFeaturedProduct) {
        console.log('🛒 Añadiendo producto destacado al carrito:', window.currentFeaturedProduct.name);
        
        const product = {
            id: window.currentFeaturedProduct.name.toLowerCase().replace(/\s+/g, '-'),
            name: window.currentFeaturedProduct.name,
            price: window.currentFeaturedProduct.price,
            image: window.currentFeaturedProduct.image,
            quantity: 1
        };

        // Usar el nuevo sistema de carrito
        if (window.newCart) {
            window.newCart.addCustomProduct(product);
            console.log('✅ Producto destacado añadido al nuevo carrito');
        } else if (window.addToCart) {
            window.addToCart(product.id);
            console.log('✅ Producto destacado añadido al carrito (fallback)');
        } else {
            console.log('❌ No se encontró sistema de carrito disponible');
        }

        // Mostrar notificación
        showFeaturedSuccessMessage(`${product.name} añadido al carrito`);
        closeFeaturedProductModal();
    }
};

window.buyNowFeatured = function() {
    if (window.currentFeaturedProduct) {
        console.log('💳 Comprando producto destacado ahora:', window.currentFeaturedProduct.name);
        
        // Añadir al carrito y proceder al pago
        addFeaturedToCart();
        
        // Abrir carrito después de un pequeño delay
        setTimeout(() => {
            if (window.newCart) {
                window.newCart.openCart();
                console.log('✅ Carrito abierto para compra inmediata');
            } else if (window.openCart) {
                window.openCart();
                console.log('✅ Carrito abierto para compra inmediata (fallback)');
            } else {
                console.log('❌ No se pudo abrir el carrito');
            }
        }, 500);
    }
};

function showFeaturedSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'featured-success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.featuredProductsDirectBuy = new FeaturedProductsDirectBuy();
});
