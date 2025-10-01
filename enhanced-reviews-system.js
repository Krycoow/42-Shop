// Sistema mejorado de reseñas profesionales

class EnhancedReviewsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllProductRatings();
    }

    setupEventListeners() {
        // Event listener para el botón de ver reseñas
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-reviews"]')) {
                const productId = parseInt(e.target.closest('[data-action="view-reviews"]').dataset.productId);
                this.showReviewsModal(productId);
            }
        });
    }

    updateAllProductRatings() {
        // Actualizar ratings de todos los productos
        state.products.forEach(product => {
            const reviews = getProductReviews(product.id);
            const averageRating = calculateAverageRating(product.id);
            
            // Actualizar el producto en el estado
            product.averageRating = averageRating;
            product.reviewCount = reviews.length;
        });
    }

    showReviewsModal(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const reviews = getProductReviews(productId);
        const averageRating = calculateAverageRating(productId);

        const modalHTML = `
            <div class="enhanced-reviews-modal-overlay" id="enhancedReviewsModal">
                <div class="enhanced-reviews-modal">
                    <div class="enhanced-reviews-header">
                        <div class="product-info">
                            <h3>Reseñas de ${product.name}</h3>
                            <div class="product-rating-summary">
                                <div class="rating-number">${averageRating.toFixed(1)}</div>
                                <div class="rating-stars">${generateStars(averageRating)}</div>
                                <div class="rating-count">${reviews.length} reseñas</div>
                            </div>
                        </div>
                        <button class="enhanced-review-close">&times;</button>
                    </div>
                    
                    <div class="enhanced-reviews-content">
                        <div class="reviews-stats">
                            <div class="rating-breakdown">
                                ${this.generateRatingBreakdown(reviews)}
                            </div>
                        </div>

                        <div class="enhanced-reviews-list">
                            ${reviews.length > 0 ? 
                                reviews.map(review => this.createEnhancedReviewHTML(review)).join('') :
                                '<div class="no-reviews"><p>No hay reseñas aún. ¡Sé el primero en reseñar!</p></div>'
                            }
                        </div>
                    </div>

                    <div class="enhanced-reviews-actions">
                        <button class="btn-primary" data-action="add-review" data-product-id="${productId}">
                            ✍️ Escribir Reseña
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModalEventListeners();
    }

    generateRatingBreakdown(reviews) {
        const breakdown = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        reviews.forEach(review => {
            breakdown[review.rating]++;
        });

        return Object.entries(breakdown).reverse().map(([rating, count]) => {
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return `
                <div class="rating-bar">
                    <span class="rating-label">${rating}⭐</span>
                    <div class="rating-progress">
                        <div class="rating-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="rating-count">${count}</span>
                </div>
            `;
        }).join('');
    }

    createEnhancedReviewHTML(review) {
        return `
            <div class="enhanced-review-item">
                <div class="enhanced-review-header">
                    <div class="review-user-info">
                        <div class="review-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                        <div class="review-user-details">
                            <div class="review-user-name">${review.userName}</div>
                            <div class="review-date">${formatDate(review.date)}</div>
                            ${review.verified ? '<div class="review-verified">✓ Compra verificada</div>' : ''}
                        </div>
                    </div>
                    <div class="review-rating-display">
                        ${generateStars(review.rating)}
                        <span class="rating-number">${review.rating}/5</span>
                    </div>
                </div>
                
                <div class="enhanced-review-content">
                    <div class="review-comment">${review.comment}</div>
                    <div class="review-helpful">
                        <span class="helpful-text">¿Te resultó útil esta reseña?</span>
                        <button class="helpful-btn" data-review-id="${review.userName}">
                            👍 ${review.helpful}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupModalEventListeners() {
        const modal = document.getElementById('enhancedReviewsModal');
        const closeBtn = modal.querySelector('.enhanced-review-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Event listener para botones de útil
        modal.addEventListener('click', (e) => {
            if (e.target.closest('.helpful-btn')) {
                const btn = e.target.closest('.helpful-btn');
                const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
                btn.textContent = `👍 ${currentCount + 1}`;
                btn.style.background = '#00ff00';
                btn.style.color = '#000';
            }
        });
    }
}

// Inicializar el sistema de reseñas mejorado
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedReviewsSystem = new EnhancedReviewsSystem();
});

// Hacer disponible globalmente
window.EnhancedReviewsSystem = EnhancedReviewsSystem;

class EnhancedReviewsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateAllProductRatings();
    }

    setupEventListeners() {
        // Event listener para el botón de ver reseñas
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-reviews"]')) {
                const productId = parseInt(e.target.closest('[data-action="view-reviews"]').dataset.productId);
                this.showReviewsModal(productId);
            }
        });
    }

    updateAllProductRatings() {
        // Actualizar ratings de todos los productos
        state.products.forEach(product => {
            const reviews = getProductReviews(product.id);
            const averageRating = calculateAverageRating(product.id);
            
            // Actualizar el producto en el estado
            product.averageRating = averageRating;
            product.reviewCount = reviews.length;
        });
    }

    showReviewsModal(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const reviews = getProductReviews(productId);
        const averageRating = calculateAverageRating(productId);

        const modalHTML = `
            <div class="enhanced-reviews-modal-overlay" id="enhancedReviewsModal">
                <div class="enhanced-reviews-modal">
                    <div class="enhanced-reviews-header">
                        <div class="product-info">
                            <h3>Reseñas de ${product.name}</h3>
                            <div class="product-rating-summary">
                                <div class="rating-number">${averageRating.toFixed(1)}</div>
                                <div class="rating-stars">${generateStars(averageRating)}</div>
                                <div class="rating-count">${reviews.length} reseñas</div>
                            </div>
                        </div>
                        <button class="enhanced-review-close">&times;</button>
                    </div>
                    
                    <div class="enhanced-reviews-content">
                        <div class="reviews-stats">
                            <div class="rating-breakdown">
                                ${this.generateRatingBreakdown(reviews)}
                            </div>
                        </div>

                        <div class="enhanced-reviews-list">
                            ${reviews.length > 0 ? 
                                reviews.map(review => this.createEnhancedReviewHTML(review)).join('') :
                                '<div class="no-reviews"><p>No hay reseñas aún. ¡Sé el primero en reseñar!</p></div>'
                            }
                        </div>
                    </div>

                    <div class="enhanced-reviews-actions">
                        <button class="btn-primary" data-action="add-review" data-product-id="${productId}">
                            ✍️ Escribir Reseña
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModalEventListeners();
    }

    generateRatingBreakdown(reviews) {
        const breakdown = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        reviews.forEach(review => {
            breakdown[review.rating]++;
        });

        return Object.entries(breakdown).reverse().map(([rating, count]) => {
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return `
                <div class="rating-bar">
                    <span class="rating-label">${rating}⭐</span>
                    <div class="rating-progress">
                        <div class="rating-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="rating-count">${count}</span>
                </div>
            `;
        }).join('');
    }

    createEnhancedReviewHTML(review) {
        return `
            <div class="enhanced-review-item">
                <div class="enhanced-review-header">
                    <div class="review-user-info">
                        <div class="review-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                        <div class="review-user-details">
                            <div class="review-user-name">${review.userName}</div>
                            <div class="review-date">${formatDate(review.date)}</div>
                            ${review.verified ? '<div class="review-verified">✓ Compra verificada</div>' : ''}
                        </div>
                    </div>
                    <div class="review-rating-display">
                        ${generateStars(review.rating)}
                        <span class="rating-number">${review.rating}/5</span>
                    </div>
                </div>
                
                <div class="enhanced-review-content">
                    <div class="review-comment">${review.comment}</div>
                    <div class="review-helpful">
                        <span class="helpful-text">¿Te resultó útil esta reseña?</span>
                        <button class="helpful-btn" data-review-id="${review.userName}">
                            👍 ${review.helpful}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupModalEventListeners() {
        const modal = document.getElementById('enhancedReviewsModal');
        const closeBtn = modal.querySelector('.enhanced-review-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Event listener para botones de útil
        modal.addEventListener('click', (e) => {
            if (e.target.closest('.helpful-btn')) {
                const btn = e.target.closest('.helpful-btn');
                const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
                btn.textContent = `👍 ${currentCount + 1}`;
                btn.style.background = '#00ff00';
                btn.style.color = '#000';
            }
        });
    }
}

// Inicializar el sistema de reseñas mejorado
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedReviewsSystem = new EnhancedReviewsSystem();
});

// Hacer disponible globalmente
window.EnhancedReviewsSystem = EnhancedReviewsSystem;
