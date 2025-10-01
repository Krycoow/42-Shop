// Funcionalidad para productos custom
class CustomClothingSystem {
    constructor() {
        this.customProducts = [
            {
                id: 'camiseta-custom',
                name: 'Camiseta Personalizada',
                price: 19.99,
                originalPrice: 35.99,
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iI0U1RTdFQiIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMjAiIGZpbGw9IiM5Q0EzQUYiLz4KPHJlY3QgeD0iNjAiIHk9IjEyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=',
                category: 'ropa',
                features: ['Algodón 100% orgánico', 'Diseño personalizado', 'Envío gratis', 'Garantía de calidad']
            },
            {
                id: 'hoodie-custom',
                name: 'Hoodie Premium',
                price: 49.99,
                originalPrice: 89.99,
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxODBWMTgwSDIwVjIwWiIgZmlsbD0iIzQ3NTU2OSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMjUiIGZpbGw9IiM2QjcyODAiLz4KPHJlY3QgeD0iNDAiIHk9IjEwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K',
                category: 'ropa',
                features: ['Material premium', 'Diseño exclusivo', 'Capucha ajustable', 'Resistente al lavado']
            },
            {
                id: 'pantalon-custom',
                name: 'Pantalones Custom',
                price: 39.99,
                originalPrice: 79.99,
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjIyQzU1Ii8+CjxwYXRoIGQ9Ik02MCAyMEgxNDBWMTgwSDYwVjIwWiIgZmlsbD0iIzE2QTM0QSIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNkEzNEEiLz4KPHJlY3QgeD0iODAiIHk9IjQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNkEzNEEiLz4KPC9zdmc+Cg==',
                category: 'ropa',
                features: ['Denim de calidad', 'Corte personalizado', 'Diseño único', 'Tallas disponibles']
            },
            {
                id: 'accesorio-custom',
                name: 'Accesorios Premium',
                price: 24.99,
                originalPrice: 45.99,
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZDNzAwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNGRkE1MDAiLz4KPHJlY3QgeD0iODAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkE1MDAiLz4KPC9zdmc+Cg==',
                category: 'accesorios',
                features: ['Materiales premium', 'Diseño personalizado', 'Durabilidad garantizada', 'Variedad de estilos']
            }
        ];
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAnimations();
    }

    bindEvents() {
        // Eventos para los botones de añadir al carrito
        document.addEventListener('click', (e) => {
            if (e.target.closest('.price-card-button')) {
                const button = e.target.closest('.price-card-button');
                const productType = button.getAttribute('onclick').match(/'([^']+)'/)[1];
                const price = parseFloat(button.getAttribute('onclick').match(/(\d+\.\d+)/)[1]);
                this.addCustomToCart(productType, price);
            }
        });
    }

    setupAnimations() {
        // Animaciones de entrada escalonadas para las tarjetas
        const cards = document.querySelectorAll('.price-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Animación de hover para los iconos
        const icons = document.querySelectorAll('.price-card-icon');
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-15px) scale(1.1)';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addCustomToCart(productType, price) {
        const product = this.customProducts.find(p => p.id.includes(productType));
        if (!product) return;

        console.log('🛒 Añadiendo producto custom al carrito:', product.name, 'Precio:', price);

        // Usar el nuevo sistema de carrito
        if (window.newCart) {
            // Crear un producto temporal con ID único para productos custom
            const customProduct = {
                id: `custom-${productType}-${Date.now()}`,
                name: product.name,
                price: price,
                image: product.image
            };
            
            // Añadir al carrito usando el método del nuevo sistema
            window.newCart.addToCart(customProduct.id);
            console.log('✅ Producto custom añadido al nuevo carrito');
        } else if (window.addToCart) {
            // Fallback al sistema anterior
            window.addToCart(product.id);
            console.log('✅ Producto custom añadido al carrito (fallback)');
        } else {
            console.log('❌ No se encontró sistema de carrito disponible');
        }

        // Mostrar animación de éxito
        this.showSuccessAnimation(product.name);
    }

    showSuccessAnimation(productName) {
        const notification = document.createElement('div');
        notification.className = 'custom-success-notification';
        notification.innerHTML = `
            <div class="success-icon">✅</div>
            <div class="success-text">${productName} añadido al carrito</div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-weight: 700;
            z-index: 10000;
            animation: customSuccessAnimation 2s ease-out forwards;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        document.body.appendChild(notification);

        // Añadir animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes customSuccessAnimation {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 2000);
    }

    // Método público para obtener productos custom
    getCustomProducts() {
        return this.customProducts;
    }

    // Método público para añadir producto custom
    addCustomProduct(product) {
        this.customProducts.push(product);
    }
}

// Funciones globales para compatibilidad
window.addCustomToCart = function(productType, price) {
    if (window.customClothingSystem) {
        window.customClothingSystem.addCustomToCart(productType, price);
    }
};

window.scrollToProducts = function() {
    const productsSection = document.getElementById('featured-products-section');
    if (productsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.customClothingSystem = new CustomClothingSystem();
});
