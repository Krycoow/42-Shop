// Gestión de pedidos
export class Orders {
    constructor() {
        this.db = firebase.database();
        this.auth = firebase.auth();
    }

    // Obtener historial de pedidos del usuario
    async getUserOrders() {
        if (!this.auth.currentUser) return [];

        try {
            const userId = this.auth.currentUser.uid;
            const snapshot = await this.db.ref(`orders/${userId}`).once('value');
            return snapshot.val() || {};
        } catch (error) {
            console.error('Error obteniendo pedidos:', error);
            return {};
        }
    }

    // Mostrar historial de pedidos
    async displayOrderHistory() {
        const orders = await this.getUserOrders();
        const container = document.getElementById('orders-history');
        if (!container) return;

        container.innerHTML = '';
        
        Object.entries(orders).forEach(([orderId, order]) => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-card';
            
            const items = Object.entries(order.items).map(([productId, quantity]) => {
                const product = window.shop.products[productId];
                return product ? `${product.name} x${quantity}` : 'Producto no disponible';
            }).join('<br>');

            orderElement.innerHTML = `
                <h3>Pedido #${orderId}</h3>
                <p>Fecha: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Estado: ${order.status}</p>
                <div class="order-items">
                    ${items}
                </div>
                <p class="order-total">Total: ${order.total}€</p>
            `;
            
            container.appendChild(orderElement);
        });
    }
}