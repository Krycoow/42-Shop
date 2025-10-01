// Gestión de productos y carrito
export class Shop {
    constructor() {
        this.db = firebase.database();
        this.auth = firebase.auth();
        this.cart = {};
        this.products = {};
        
        // Cargar carrito si hay usuario
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.loadCart(user.uid);
            } else {
                this.cart = {};
                this.updateCartUI();
            }
        });

        // Cargar productos
        this.loadProducts();
    }

    // Cargar productos de Firebase
    async loadProducts() {
        try {
            const snapshot = await this.db.ref('products').once('value');
            this.products = snapshot.val() || {};
            this.updateProductsUI();
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    // Cargar carrito del usuario
    async loadCart(userId) {
        try {
            const snapshot = await this.db.ref(`carts/${userId}`).once('value');
            this.cart = snapshot.val() || {};
            this.updateCartUI();
        } catch (error) {
            console.error('Error cargando carrito:', error);
        }
    }

    // Añadir producto al carrito
    async addToCart(productId, quantity = 1) {
        if (!this.auth.currentUser) {
            alert('Por favor, inicia sesión para añadir productos al carrito');
            return;
        }

        try {
            const userId = this.auth.currentUser.uid;
            const quantityNum = parseInt(quantity);
            
            if (isNaN(quantityNum) || quantityNum < 1) {
                alert('Por favor, selecciona una cantidad válida');
                return;
            }

            if (this.cart[productId]) {
                this.cart[productId] += quantityNum;
            } else {
                this.cart[productId] = quantityNum;
            }

            await this.db.ref(`carts/${userId}`).set(this.cart);
            this.updateCartUI();
            
            // Mostrar feedback visual
            const toast = document.getElementById('toast');
            toast.textContent = `Producto añadido al carrito (${quantityNum})`;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } catch (error) {
            console.error('Error añadiendo al carrito:', error);
            alert('Error al añadir al carrito: ' + error.message);
        }
    }

    // Actualizar cantidad en el carrito
    async updateCartQuantity(productId, quantity) {
        if (!this.auth.currentUser) return;

        try {
            const userId = this.auth.currentUser.uid;
            if (quantity <= 0) {
                delete this.cart[productId];
            } else {
                this.cart[productId] = quantity;
            }

            await this.db.ref(`carts/${userId}`).set(this.cart);
            this.updateCartUI();
        } catch (error) {
            console.error('Error actualizando carrito:', error);
        }
    }

    // Crear pedido
    async createOrder() {
        if (!this.auth.currentUser || Object.keys(this.cart).length === 0) return;

        try {
            const userId = this.auth.currentUser.uid;
            const orderData = {
                items: this.cart,
                date: new Date().toISOString(),
                status: 'pending',
                total: this.calculateTotal()
            };

            // Crear pedido
            const newOrderRef = await this.db.ref(`orders/${userId}`).push(orderData);
            
            // Limpiar carrito
            this.cart = {};
            await this.db.ref(`carts/${userId}`).remove();
            
            this.updateCartUI();
            return newOrderRef.key;
        } catch (error) {
            console.error('Error creando pedido:', error);
        }
    }

    // Calcular total del carrito
    calculateTotal() {
        return Object.entries(this.cart).reduce((total, [productId, quantity]) => {
            const product = this.products[productId];
            return total + (product ? product.price * quantity : 0);
        }, 0);
    }

    // Generar estrellas para el rating
    generateStars(rating) {
        const roundedRating = Math.round(rating * 2) / 2; // Redondear a medio punto
        return Array(5).fill(0).map((_, i) => `
            <span class="star ${i < roundedRating ? 'star--filled' : ''}">★</span>
        `).join('');
    }

    // Actualizar UI de productos
    updateProductsUI() {
        const catalogContainer = document.getElementById('catalog');
        if (!catalogContainer) return;

        // Si no hay productos en Firebase, usar los productos por defecto
        if (Object.keys(this.products).length === 0) {
            this.products = {
                1: {
                    id: 1,
                    name: "Sudadera 42",
                    description: "Sudadera negra con logo de 42. Algodón premium, edición limitada.",
                    price: 39.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/sudadera.png",
                    averageRating: 0,
                    reviewCount: 0
                },
                2: {
                    id: 2,
                    name: "Taza 42",
                    description: "Taza negra con logo de 42. Ideal para café o té.",
                    price: 14.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/taza.png",
                    averageRating: 0,
                    reviewCount: 0
                },
                3: {
                    id: 3,
                    name: "Gorra 42",
                    description: "Gorra negra con logo de 42. Ajustable y transpirable.",
                    price: 24.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/gorra.png",
                    averageRating: 0,
                    reviewCount: 0
                },
                4: {
                    id: 4,
                    name: "Camiseta 42",
                    description: "Camiseta blanca con logo de 42 en verde neón.",
                    price: 19.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png",
                    averageRating: 0,
                    reviewCount: 0
                },
                5: {
                    id: 5,
                    name: "Mochila 42",
                    description: "Mochila negra resistente con detalles verdes y logo 42.",
                    price: 49.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/mochila.png",
                    averageRating: 0,
                    reviewCount: 0
                },
                6: {
                    id: 6,
                    name: "Llavero 42",
                    description: "Llavero metálico con logo de 42. Pequeño y elegante.",
                    price: 6.99,
                    image: "https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/llavero.png",
                    averageRating: 0,
                    reviewCount: 0
                }
            };
        }

        catalogContainer.innerHTML = '';
        Object.entries(this.products).forEach(([id, product]) => {
            const productElement = document.createElement('article');
            productElement.className = 'product';
            productElement.dataset.productId = id;
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product__image">
                <div class="product__info">
                    <h3 class="product__name">${product.name}</h3>
                    <p class="product__description">${product.description}</p>
                    <div class="rating-display">
                        ${this.generateStars(product.averageRating || 0)}
                        <span class="review-count">(${product.reviewCount || 0})</span>
                    </div>
                    <p class="product__price">${product.price.toFixed(2)} €</p>
                    <div class="quantity-selector">
                        <button type="button" class="quantity-btn minus" onclick="this.nextElementSibling.stepDown();this.nextElementSibling.dispatchEvent(new Event('change'))">-</button>
                        <input type="number" value="1" min="1" max="99" class="quantity-input" 
                               onchange="this.value = Math.max(1, Math.min(99, parseInt(this.value) || 1))">
                        <button type="button" class="quantity-btn plus" onclick="this.previousElementSibling.stepUp();this.previousElementSibling.dispatchEvent(new Event('change'))">+</button>
                    </div>
                    <button class="button button--primary" onclick="shop.addToCart('${id}', this.parentElement.querySelector('.quantity-input').value)">
                        Añadir al carrito
                    </button>
                </div>
                <div class="reviews-container" id="reviews-${id}"></div>
            `;
            catalogContainer.appendChild(productElement);
            
            // Inicializar reseñas
            const reviewsContainer = productElement.querySelector(`#reviews-${id}`);
            if (reviewsContainer) {
                new ReviewSystem().renderReviews(id, reviewsContainer);
            }
        });
    }

    // Actualizar UI del carrito
    updateCartUI() {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        let total = 0;

        Object.entries(this.cart).forEach(([productId, quantity]) => {
            const product = this.products[productId];
            if (!product) return;

            const subtotal = product.price * quantity;
            total += subtotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>${product.price}€ x ${quantity} = ${subtotal}€</p>
                    <div class="quantity-controls">
                        <button onclick="shop.updateCartQuantity('${productId}', ${quantity - 1})">-</button>
                        <span>${quantity}</span>
                        <button onclick="shop.updateCartQuantity('${productId}', ${quantity + 1})">+</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `
            <h3>Total: ${total}€</h3>
            <button onclick="shop.createOrder()" ${Object.keys(this.cart).length === 0 ? 'disabled' : ''}>
                Realizar pedido
            </button>
        `;
        cartContainer.appendChild(totalElement);
    }
}