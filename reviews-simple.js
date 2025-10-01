// Sistema simple de reseñas - FUNCIONAL
class SimpleReviews {
    constructor() {
        this.reviews = this.loadReviews();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createReviewStyles();
    }

    loadReviews() {
        const saved = localStorage.getItem('productReviews');
        return saved ? JSON.parse(saved) : {};
    }

    saveReviews() {
        localStorage.setItem('productReviews', JSON.stringify(this.reviews));
    }

    setupEventListeners() {
        // Escuchar clicks en botones de reseñas
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="view-reviews"]')) {
                const productId = e.target.dataset.productId;
                this.showReviewsModal(productId);
            } else if (e.target.matches('[data-action="add-review"]')) {
                const productId = e.target.dataset.productId;
                this.showAddReviewModal(productId);
            } else if (e.target.matches('.review-close')) {
                this.closeModals();
            }
        });

        // Escuchar envío de formulario de reseña
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#reviewForm')) {
                e.preventDefault();
                this.submitReview(e.target);
            }
        });

        // Escuchar clicks en estrellas
        document.addEventListener('click', (e) => {
            if (e.target.matches('.star-rating .star')) {
                const rating = parseInt(e.target.dataset.rating);
                const container = e.target.closest('.star-rating');
                this.setStarRating(container, rating);
            }
        });
    }

    showReviewsModal(productId) {
        const product = this.getProduct(productId);
        if (!product) return;

        const productReviews = this.reviews[productId] || [];
        const averageRating = this.calculateAverageRating(productReviews);

        const modalHTML = `
            <div class="reviews-modal-overlay" id="reviewsModal">
                <div class="reviews-modal">
                    <div class="reviews-header">
                        <h3>Reseñas de ${product.name}</h3>
                        <button class="review-close">&times;</button>
                    </div>
                    
                    <div class="reviews-summary">
                        <div class="average-rating">
                            <div class="rating-number">${averageRating.toFixed(1)}</div>
                            <div class="rating-stars">${this.generateStars(averageRating)}</div>
                            <div class="rating-count">${productReviews.length} reseñas</div>
                        </div>
                    </div>

                    <div class="reviews-list">
                        ${productReviews.length > 0 ? 
                            productReviews.map(review => this.createReviewHTML(review)).join('') :
                            '<p class="no-reviews">No hay reseñas aún. ¡Sé el primero en reseñar!</p>'
                        }
                    </div>

                    <div class="reviews-actions">
                        <button class="btn-primary" data-action="add-review" data-product-id="${productId}">
                            Escribir Reseña
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    showAddReviewModal(productId) {
        const product = this.getProduct(productId);
        if (!product) return;

        const modalHTML = `
            <div class="reviews-modal-overlay" id="addReviewModal">
                <div class="reviews-modal">
                    <div class="reviews-header">
                        <h3>Escribir Reseña - ${product.name}</h3>
                        <button class="review-close">&times;</button>
                    </div>
                    
                    <form id="reviewForm" data-product-id="${productId}">
                        <div class="form-group">
                            <label>Tu Calificación:</label>
                            <div class="star-rating" id="ratingInput">
                                <span class="star" data-rating="1">★</span>
                                <span class="star" data-rating="2">★</span>
                                <span class="star" data-rating="3">★</span>
                                <span class="star" data-rating="4">★</span>
                                <span class="star" data-rating="5">★</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reviewComment">Tu Comentario:</label>
                            <textarea id="reviewComment" name="comment" rows="4" placeholder="Cuéntanos tu experiencia con este producto..." required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="reviewerName">Tu Nombre:</label>
                            <input type="text" id="reviewerName" name="name" placeholder="Tu nombre" required>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn-secondary review-close">Cancelar</button>
                            <button type="submit" class="btn-primary">Publicar Reseña</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    submitReview(form) {
        const productId = form.dataset.productId;
        const formData = new FormData(form);
        
        const rating = parseInt(form.querySelector('.star-rating').dataset.selectedRating || '0');
        const comment = formData.get('comment');
        const name = formData.get('name');

        if (rating === 0) {
            alert('Por favor selecciona una calificación');
            return;
        }

        if (!comment.trim()) {
            alert('Por favor escribe un comentario');
            return;
        }

        if (!name.trim()) {
            alert('Por favor escribe tu nombre');
            return;
        }

        const review = {
            id: Date.now(),
            rating: rating,
            comment: comment.trim(),
            name: name.trim(),
            date: new Date().toLocaleDateString('es-ES')
        };

        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }

        this.reviews[productId].push(review);
        this.saveReviews();

        this.closeModals();
        this.showReviewsModal(productId);
        
        // Mostrar notificación de éxito
        this.showNotification('¡Reseña publicada con éxito!', 'success');
    }

    setStarRating(container, rating) {
        const stars = container.querySelectorAll('.star');
        container.dataset.selectedRating = rating;
        
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    calculateAverageRating(reviews) {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star filled">★</span>';
        }
        if (hasHalfStar) {
            stars += '<span class="star half">★</span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">★</span>';
        }
        return stars;
    }

    createReviewHTML(review) {
        return `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <span class="reviewer-name">${review.name}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-rating">${this.generateStars(review.rating)}</div>
                </div>
                <div class="review-comment">${review.comment}</div>
            </div>
        `;
    }

    getProduct(productId) {
        if (window.state && window.state.products) {
            return window.state.products.find(p => p.id == productId);
        }
        return null;
    }

    closeModals() {
        const modals = document.querySelectorAll('.reviews-modal-overlay');
        modals.forEach(modal => modal.remove());
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff00' : '#ff6b6b'};
            color: #000;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    createReviewStyles() {
        const styles = `
        <style>
        .reviews-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .reviews-modal {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 20, 0, 0.9));
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 15px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            color: #fff;
        }

        .reviews-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid rgba(0, 255, 0, 0.2);
        }

        .reviews-header h3 {
            color: #00ff00;
            margin: 0;
            font-size: 1.5rem;
        }

        .review-close {
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .review-close:hover {
            color: #00ff00;
        }

        .reviews-summary {
            padding: 25px;
            text-align: center;
            border-bottom: 1px solid rgba(0, 255, 0, 0.2);
        }

        .average-rating {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .rating-number {
            font-size: 3rem;
            font-weight: 900;
            color: #00ff00;
        }

        .rating-stars {
            font-size: 1.5rem;
        }

        .rating-count {
            color: #ccc;
            font-size: 1rem;
        }

        .reviews-list {
            padding: 25px;
            max-height: 300px;
            overflow-y: auto;
        }

        .review-item {
            background: rgba(0, 255, 0, 0.05);
            border: 1px solid rgba(0, 255, 0, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
        }

        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .reviewer-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .reviewer-name {
            font-weight: 600;
            color: #00ff00;
        }

        .review-date {
            color: #999;
            font-size: 0.9rem;
        }

        .review-rating {
            font-size: 1.2rem;
        }

        .review-comment {
            color: #ccc;
            line-height: 1.6;
        }

        .no-reviews {
            text-align: center;
            color: #999;
            font-style: italic;
            padding: 40px 20px;
        }

        .reviews-actions {
            padding: 25px;
            text-align: center;
            border-top: 1px solid rgba(0, 255, 0, 0.2);
        }

        .btn-primary, .btn-secondary {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 0 5px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
        }

        .btn-secondary {
            background: transparent;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #00ff00;
            font-weight: 600;
        }

        .star-rating {
            display: flex;
            gap: 5px;
            font-size: 2rem;
        }

        .star-rating .star {
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
        }

        .star-rating .star:hover,
        .star-rating .star.active {
            color: #00ff00;
        }

        .star-rating .star.filled {
            color: #00ff00;
        }

        .star-rating .star.half {
            color: #00ff00;
            opacity: 0.5;
        }

        .star-rating .star.empty {
            color: #666;
        }

        textarea, input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            font-size: 1rem;
        }

        textarea:focus, input[type="text"]:focus {
            outline: none;
            border-color: #00ff00;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }

        .form-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .reviews-modal {
                margin: 10px;
                max-height: 90vh;
            }
            
            .review-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .form-actions {
                flex-direction: column;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.simpleReviews = new SimpleReviews();
});


