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
            if (this.cart[productId]) {
                this.cart[productId] += quantity;
            } else {
                this.cart[productId] = quantity;
            }

            await this.db.ref(`carts/${userId}`).set(this.cart);
            this.updateCartUI();
        } catch (error) {
            console.error('Error añadiendo al carrito:', error);
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

    // Actualizar UI de productos
    updateProductsUI() {
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';
        Object.entries(this.products).forEach(([id, product]) => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}€</p>
                <button onclick="shop.addToCart('${id}')">Añadir al carrito</button>
            `;
            productsContainer.appendChild(productElement);
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