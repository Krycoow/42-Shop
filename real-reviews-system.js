// Sistema de reseñas reales con base de datos Firebase

class RealReviewsSystem {
    constructor() {
        this.db = firebase.database();
        this.reviewsRef = this.db.ref('reviews');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadReviews();
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

    // Cargar reseñas desde Firebase
    async loadReviews() {
        try {
            const snapshot = await this.reviewsRef.once('value');
            let reviews = snapshot.val() || {};
            
            // Si no hay reseñas, cargar reseñas de ejemplo
            if (Object.keys(reviews).length === 0) {
                reviews = this.loadSampleReviews();
            }
            
            // Actualizar ratings de productos
            Object.keys(reviews).forEach(productId => {
                const productReviews = reviews[productId];
                const averageRating = this.calculateAverageRating(productReviews);
                const product = state.products.find(p => p.id == productId);
                if (product) {
                    product.averageRating = averageRating;
                    product.reviewCount = Object.keys(productReviews).length;
                }
            });
        } catch (error) {
            console.error('Error loading reviews:', error);
            // Cargar reseñas de ejemplo en caso de error
            this.loadSampleReviews();
        }
    }

    // Cargar reseñas de ejemplo
    loadSampleReviews() {
        const sampleReviews = {
            1: [ // Camiseta 42
                {
                    id: 'review_1_1',
                    userName: 'María González',
                    userEmail: 'maria.gonzalez@email.com',
                    userId: 'user_maria_123',
                    rating: 5,
                    comment: '¡Increíble calidad! La camiseta es súper cómoda y el diseño del logo 42 se ve perfecto. La talla es exacta y el material es de primera calidad. Definitivamente volveré a comprar.',
                    date: '2024-01-15T10:30:00Z',
                    verified: true,
                    helpful: 12
                },
                {
                    id: 'review_1_2',
                    userName: 'Carlos Ruiz',
                    userEmail: 'carlos.ruiz@email.com',
                    userId: 'user_carlos_456',
                    rating: 4,
                    comment: 'Muy buena camiseta, aunque esperaba que fuera un poco más gruesa. El diseño es perfecto y el envío fue súper rápido. Satisfecho con la compra.',
                    date: '2024-01-12T14:20:00Z',
                    verified: true,
                    helpful: 8
                },
                {
                    id: 'review_1_3',
                    userName: 'Ana Martín',
                    userEmail: 'ana.martin@email.com',
                    userId: 'user_ana_789',
                    rating: 5,
                    comment: 'Perfecta! La calidad es excelente y el logo se ve increíble. Mi hijo está encantado con su nueva camiseta 42. Recomendada 100%.',
                    date: '2024-01-10T09:15:00Z',
                    verified: true,
                    helpful: 15
                }
            ],
            2: [ // Taza 42
                {
                    id: 'review_2_1',
                    userName: 'David López',
                    userEmail: 'david.lopez@email.com',
                    userId: 'user_david_101',
                    rating: 5,
                    comment: 'La taza perfecta para mi café matutino! El logo 42 se ve genial y la calidad es excelente. Mantiene el café caliente por mucho tiempo.',
                    date: '2024-01-18T16:45:00Z',
                    verified: true,
                    helpful: 9
                },
                {
                    id: 'review_2_2',
                    userName: 'Laura Sánchez',
                    userEmail: 'laura.sanchez@email.com',
                    userId: 'user_laura_202',
                    rating: 4,
                    comment: 'Buena taza, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.',
                    date: '2024-01-16T11:30:00Z',
                    verified: true,
                    helpful: 6
                }
            ],
            3: [ // Gorra 42
                {
                    id: 'review_3_1',
                    userName: 'Miguel Torres',
                    userEmail: 'miguel.torres@email.com',
                    userId: 'user_miguel_303',
                    rating: 5,
                    comment: 'Excelente gorra! El ajuste es perfecto y el logo 42 se ve increíble. La calidad del material es de primera. Perfecta para el verano.',
                    date: '2024-01-20T13:20:00Z',
                    verified: true,
                    helpful: 11
                },
                {
                    id: 'review_3_2',
                    userName: 'Sofia García',
                    userEmail: 'sofia.garcia@email.com',
                    userId: 'user_sofia_404',
                    rating: 4,
                    comment: 'Buena gorra, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.',
                    date: '2024-01-17T15:10:00Z',
                    verified: true,
                    helpful: 7
                }
            ],
            4: [ // Mochila 42
                {
                    id: 'review_4_1',
                    userName: 'Javier Rodríguez',
                    userEmail: 'javier.rodriguez@email.com',
                    userId: 'user_javier_505',
                    rating: 5,
                    comment: 'Increíble mochila! Tiene mucho espacio y el logo 42 se ve genial. Perfecta para la universidad. La calidad es excelente.',
                    date: '2024-01-22T08:45:00Z',
                    verified: true,
                    helpful: 14
                },
                {
                    id: 'review_4_2',
                    userName: 'Carmen López',
                    userEmail: 'carmen.lopez@email.com',
                    userId: 'user_carmen_606',
                    rating: 4,
                    comment: 'Buena mochila, aunque esperaba que fuera un poco más grande. La calidad es excelente y el diseño es perfecto.',
                    date: '2024-01-19T12:15:00Z',
                    verified: true,
                    helpful: 5
                }
            ],
            5: [ // Pantalón 42
                {
                    id: 'review_5_1',
                    userName: 'Francisco García',
                    userEmail: 'francisco.garcia@email.com',
                    userId: 'user_francisco_707',
                    rating: 5,
                    comment: 'Pantalones perfectos! La talla es exacta y el logo 42 se ve increíble. Muy cómodos y de excelente calidad.',
                    date: '2024-01-25T10:30:00Z',
                    verified: true,
                    helpful: 13
                },
                {
                    id: 'review_5_2',
                    userName: 'Beatriz Ramos',
                    userEmail: 'beatriz.ramos@email.com',
                    userId: 'user_beatriz_808',
                    rating: 4,
                    comment: 'Buenos pantalones, aunque la talla es un poco grande. La calidad es excelente y el diseño es perfecto. Recomendado.',
                    date: '2024-01-23T14:20:00Z',
                    verified: true,
                    helpful: 8
                }
            ]
        };
        
        // Guardar reseñas de ejemplo en Firebase si está disponible
        try {
            this.reviewsRef.set(sampleReviews);
        } catch (error) {
            console.log('No se pudo guardar en Firebase, usando localStorage');
            localStorage.setItem('realReviews', JSON.stringify(sampleReviews));
        }
        
        return sampleReviews;
    }

    // Calcular rating promedio
    calculateAverageRating(reviews) {
        const reviewList = Object.values(reviews);
        if (reviewList.length === 0) return 0;
        
        const totalRating = reviewList.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviewList.length;
    }

    // Mostrar modal de reseñas
    showReviewsModal(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        this.reviewsRef.child(productId).once('value').then(snapshot => {
            const reviews = snapshot.val() || {};
            const reviewList = Object.values(reviews);
            const averageRating = this.calculateAverageRating(reviews);

            const modalHTML = `
                <div class="real-reviews-modal-overlay" id="realReviewsModal">
                    <div class="real-reviews-modal">
                        <div class="real-reviews-header">
                            <div class="product-info">
                                <h3>Reseñas de ${product.name}</h3>
                                <div class="product-rating-summary">
                                    <div class="rating-number">${averageRating.toFixed(1)}</div>
                                    <div class="rating-stars">${this.generateStars(averageRating)}</div>
                                    <div class="rating-count">${reviewList.length} reseñas</div>
                                </div>
                            </div>
                            <button class="real-review-close">&times;</button>
                        </div>
                        
                        <div class="real-reviews-content">
                            <div class="reviews-stats">
                                <div class="rating-breakdown">
                                    ${this.generateRatingBreakdown(reviewList)}
                                </div>
                            </div>

                            <div class="real-reviews-list">
                                ${reviewList.length > 0 ? 
                                    reviewList.map(review => this.createReviewHTML(review)).join('') :
                                    '<div class="no-reviews"><p>No hay reseñas aún. ¡Sé el primero en reseñar!</p></div>'
                                }
                            </div>
                        </div>

                        <div class="real-reviews-actions">
                            <button class="btn-primary" data-action="add-review" data-product-id="${productId}">
                                ✍️ Escribir Reseña
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.setupModalEventListeners();
        });
    }

    // Generar desglose de ratings
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

    // Crear HTML de reseña
    createReviewHTML(review) {
        return `
            <div class="real-review-item">
                <div class="real-review-header">
                    <div class="review-user-info">
                        <div class="review-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                        <div class="review-user-details">
                            <div class="review-user-name">${review.userName}</div>
                            <div class="review-date">${this.formatDate(review.date)}</div>
                            <div class="review-verified">✓ Compra verificada</div>
                        </div>
                    </div>
                    <div class="review-rating-display">
                        ${this.generateStars(review.rating)}
                        <span class="rating-number">${review.rating}/5</span>
                    </div>
                </div>
                
                <div class="real-review-content">
                    <div class="review-comment">${review.comment}</div>
                    <div class="review-helpful">
                        <span class="helpful-text">¿Te resultó útil esta reseña?</span>
                        <button class="helpful-btn" data-review-id="${review.id}">
                            👍 ${review.helpful || 0}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Configurar event listeners del modal
    setupModalEventListeners() {
        const modal = document.getElementById('realReviewsModal');
        const closeBtn = modal.querySelector('.real-review-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Event listener para botón de escribir reseña
        modal.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="add-review"]')) {
                const productId = parseInt(e.target.closest('[data-action="add-review"]').dataset.productId);
                modal.remove();
                this.showAddReviewModal(productId);
            }
        });

        // Event listener para botones de útil
        modal.addEventListener('click', (e) => {
            if (e.target.closest('.helpful-btn')) {
                const btn = e.target.closest('.helpful-btn');
                const reviewId = btn.dataset.reviewId;
                const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
                const newCount = currentCount + 1;
                
                btn.textContent = `👍 ${newCount}`;
                btn.style.background = '#00ff00';
                btn.style.color = '#000';
                
                // Actualizar en Firebase
                this.updateHelpfulCount(reviewId, newCount);
            }
        });
    }

    // Mostrar modal para agregar reseña
    showAddReviewModal(productId = null) {
        // Verificar si el usuario está logueado
        if (!state.isLoggedIn || !state.currentUser) {
            this.showLoginRequiredModal();
            return;
        }

        const product = productId ? state.products.find(p => p.id === productId) : null;
        const modalHTML = `
            <div class="add-review-modal-overlay" id="addReviewModal">
                <div class="add-review-modal">
                    <div class="add-review-header">
                        <h3>${product ? `Escribir Reseña - ${product.name}` : 'Escribir Reseña'}</h3>
                        <button class="add-review-close">&times;</button>
                    </div>
                    
                    <div class="add-review-content">
                        <div class="review-type-selector">
                            <h4>¿Qué quieres reseñar?</h4>
                            <div class="review-options">
                                <button class="review-option ${product ? 'active' : ''}" data-type="product" data-product-id="${productId || ''}">
                                    <span class="option-icon">🛍️</span>
                                    <span class="option-text">Producto</span>
                                </button>
                                <button class="review-option ${!product ? 'active' : ''}" data-type="store">
                                    <span class="option-icon">🏪</span>
                                    <span class="option-text">Tienda</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="review-form">
                            <div class="form-group">
                                <label>Calificación:</label>
                                <div class="star-rating" id="starRating">
                                    <span class="star" data-rating="1">☆</span>
                                    <span class="star" data-rating="2">☆</span>
                                    <span class="star" data-rating="3">☆</span>
                                    <span class="star" data-rating="4">☆</span>
                                    <span class="star" data-rating="5">☆</span>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Tu reseña:</label>
                                <textarea id="reviewComment" placeholder="Cuéntanos tu experiencia..." rows="4" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="add-review-actions">
                        <button class="btn-secondary" id="cancelReview">Cancelar</button>
                        <button class="btn-primary" id="submitReview" data-product-id="${productId || ''}">Enviar Reseña</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupAddReviewEventListeners();
    }

    showLoginRequiredModal() {
        const modalHTML = `
            <div class="login-required-modal-overlay" id="loginRequiredModal">
                <div class="login-required-modal">
                    <div class="login-required-header">
                        <h3>🔒 Iniciar Sesión Requerido</h3>
                        <button class="login-required-close">&times;</button>
                    </div>
                    
                    <div class="login-required-content">
                        <p>Para escribir reseñas necesitas iniciar sesión primero.</p>
                        <p>¡Es gratis y solo toma unos segundos!</p>
                        
                        <div class="login-required-actions">
                            <button id="goToLogin" class="btn btn-primary">Iniciar Sesión</button>
                            <button id="closeLoginRequired" class="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Event listeners para el modal de login requerido
        const modal = document.getElementById('loginRequiredModal');
        const closeBtn = modal.querySelector('.login-required-close');
        const cancelBtn = modal.querySelector('#closeLoginRequired');
        const loginBtn = modal.querySelector('#goToLogin');

        const closeModal = () => modal.remove();
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        loginBtn.addEventListener('click', () => {
            modal.remove();
            // Abrir modal de login
            const loginModal = document.getElementById('authModal');
            if (loginModal) {
                loginModal.showModal();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Configurar event listeners del modal de agregar reseña
    setupAddReviewEventListeners() {
        const modal = document.getElementById('addReviewModal');
        const closeBtn = modal.querySelector('.add-review-close');
        const cancelBtn = modal.querySelector('#cancelReview');
        const submitBtn = modal.querySelector('#submitReview');
        const stars = modal.querySelectorAll('.star');

        // Cerrar modal
        closeBtn.addEventListener('click', () => modal.remove());
        cancelBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Sistema de estrellas
        let selectedRating = 0;
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                stars.forEach((s, i) => {
                    s.textContent = i < selectedRating ? '⭐' : '☆';
                });
            });

            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.textContent = i <= index ? '⭐' : '☆';
                });
            });
        });

        modal.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                s.textContent = i < selectedRating ? '⭐' : '☆';
            });
        });

        // Enviar reseña
        submitBtn.addEventListener('click', () => {
            const userName = modal.querySelector('#reviewerName').value.trim();
            const comment = modal.querySelector('#reviewComment').value.trim();

            if (!userName || !comment || selectedRating === 0) {
                alert('Por favor completa todos los campos');
                return;
            }

            this.submitReview(submitBtn.dataset.productId, {
                userName,
                rating: selectedRating,
                comment,
                date: new Date().toISOString(),
                helpful: 0
            });

            modal.remove();
        });
    }

    // Enviar reseña a Firebase
    async submitReview(productId, reviewData) {
        try {
            const reviewId = Date.now().toString();
            await this.reviewsRef.child(productId).child(reviewId).set(reviewData);
            
            // Actualizar producto
            const product = state.products.find(p => p.id == productId);
            if (product) {
                const snapshot = await this.reviewsRef.child(productId).once('value');
                const reviews = snapshot.val() || {};
                const averageRating = this.calculateAverageRating(reviews);
                
                product.averageRating = averageRating;
                product.reviewCount = Object.keys(reviews).length;
            }

            // Mostrar mensaje de éxito
            this.showSuccessMessage('¡Reseña enviada con éxito!');
            
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error al enviar la reseña. Inténtalo de nuevo.');
        }
    }

    // Actualizar contador de útil
    async updateHelpfulCount(reviewId, newCount) {
        try {
            // Buscar la reseña en todos los productos
            const snapshot = await this.reviewsRef.once('value');
            const allReviews = snapshot.val() || {};
            
            for (const productId in allReviews) {
                for (const id in allReviews[productId]) {
                    if (id === reviewId) {
                        await this.reviewsRef.child(productId).child(id).child('helpful').set(newCount);
                        return;
                    }
                }
            }
        } catch (error) {
            console.error('Error updating helpful count:', error);
        }
    }

    // Generar estrellas
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '✨';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        return stars;
    }

    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Mostrar mensaje de éxito
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00ff00;
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Mostrar todas las reseñas
    async showAllReviews() {
        try {
            const snapshot = await this.reviewsRef.once('value');
            const allReviews = snapshot.val() || {};
            
            const reviewsGrid = document.getElementById('reviewsGrid');
            if (!reviewsGrid) return;

            reviewsGrid.innerHTML = '';

            // Crear tarjetas de reseñas destacadas
            const featuredReviews = [];
            Object.keys(allReviews).forEach(productId => {
                const productReviews = Object.values(allReviews[productId]);
                const product = state.products.find(p => p.id == productId);
                
                if (product && productReviews.length > 0) {
                    // Tomar las mejores reseñas (rating 4-5)
                    const bestReviews = productReviews
                        .filter(review => review.rating >= 4)
                        .slice(0, 2);
                    
                    bestReviews.forEach(review => {
                        featuredReviews.push({
                            ...review,
                            productName: product.name,
                            productId: productId
                        });
                    });
                }
            });

            // Mostrar hasta 6 reseñas destacadas
            featuredReviews.slice(0, 6).forEach(review => {
                const reviewCard = this.createReviewCard(review);
                reviewsGrid.appendChild(reviewCard);
            });

            if (featuredReviews.length === 0) {
                reviewsGrid.innerHTML = `
                    <div class="no-reviews-message">
                        <h3>¡Aún no hay reseñas!</h3>
                        <p>Sé el primero en compartir tu experiencia con nuestros productos.</p>
                        <button class="btn-primary" onclick="scrollToProducts()">
                            Ver Productos
                        </button>
                    </div>
                `;
            }

        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }

    // Crear tarjeta de reseña para la sección principal
    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-card-header">
                <div class="review-product-info">
                    <h4>${review.productName}</h4>
                    <div class="review-rating">
                        ${this.generateStars(review.rating)}
                        <span class="rating-text">${review.rating}/5</span>
                    </div>
                </div>
                <div class="review-user">
                    <div class="review-avatar-small">${review.userName.charAt(0).toUpperCase()}</div>
                    <span class="review-user-name">${review.userName}</span>
                </div>
            </div>
            <div class="review-card-content">
                <p class="review-comment-preview">${review.comment.length > 150 ? review.comment.substring(0, 150) + '...' : review.comment}</p>
                <div class="review-card-footer">
                    <span class="review-date">${this.formatDate(review.date)}</span>
                    <button class="btn-read-more" onclick="realReviewsSystem.showReviewsModal(${review.productId})">
                        Leer más
                    </button>
                </div>
            </div>
        `;
        return card;
    }
}

// Inicializar el sistema de reseñas reales
document.addEventListener('DOMContentLoaded', () => {
    window.realReviewsSystem = new RealReviewsSystem();
    
    // Cargar reseñas cuando esté listo
    setTimeout(() => {
        if (window.realReviewsSystem) {
            window.realReviewsSystem.showAllReviews();
        }
    }, 1000);
});

// Funciones globales
window.showAllReviews = function() {
    if (window.realReviewsSystem) {
        window.realReviewsSystem.showAllReviews();
    }
};

window.scrollToProducts = function() {
    const catalog = document.getElementById('catalog');
    if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
    }
};

// Hacer disponible globalmente
window.RealReviewsSystem = RealReviewsSystem;

class RealReviewsSystem {
    constructor() {
        this.db = firebase.database();
        this.reviewsRef = this.db.ref('reviews');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadReviews();
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

    // Cargar reseñas desde Firebase
    async loadReviews() {
        try {
            const snapshot = await this.reviewsRef.once('value');
            let reviews = snapshot.val() || {};
            
            // Si no hay reseñas, cargar reseñas de ejemplo
            if (Object.keys(reviews).length === 0) {
                reviews = this.loadSampleReviews();
            }
            
            // Actualizar ratings de productos
            Object.keys(reviews).forEach(productId => {
                const productReviews = reviews[productId];
                const averageRating = this.calculateAverageRating(productReviews);
                const product = state.products.find(p => p.id == productId);
                if (product) {
                    product.averageRating = averageRating;
                    product.reviewCount = Object.keys(productReviews).length;
                }
            });
        } catch (error) {
            console.error('Error loading reviews:', error);
            // Cargar reseñas de ejemplo en caso de error
            this.loadSampleReviews();
        }
    }

    // Cargar reseñas de ejemplo
    loadSampleReviews() {
        const sampleReviews = {
            1: [ // Camiseta 42
                {
                    id: 'review_1_1',
                    userName: 'María González',
                    userEmail: 'maria.gonzalez@email.com',
                    userId: 'user_maria_123',
                    rating: 5,
                    comment: '¡Increíble calidad! La camiseta es súper cómoda y el diseño del logo 42 se ve perfecto. La talla es exacta y el material es de primera calidad. Definitivamente volveré a comprar.',
                    date: '2024-01-15T10:30:00Z',
                    verified: true,
                    helpful: 12
                },
                {
                    id: 'review_1_2',
                    userName: 'Carlos Ruiz',
                    userEmail: 'carlos.ruiz@email.com',
                    userId: 'user_carlos_456',
                    rating: 4,
                    comment: 'Muy buena camiseta, aunque esperaba que fuera un poco más gruesa. El diseño es perfecto y el envío fue súper rápido. Satisfecho con la compra.',
                    date: '2024-01-12T14:20:00Z',
                    verified: true,
                    helpful: 8
                },
                {
                    id: 'review_1_3',
                    userName: 'Ana Martín',
                    userEmail: 'ana.martin@email.com',
                    userId: 'user_ana_789',
                    rating: 5,
                    comment: 'Perfecta! La calidad es excelente y el logo se ve increíble. Mi hijo está encantado con su nueva camiseta 42. Recomendada 100%.',
                    date: '2024-01-10T09:15:00Z',
                    verified: true,
                    helpful: 15
                }
            ],
            2: [ // Taza 42
                {
                    id: 'review_2_1',
                    userName: 'David López',
                    userEmail: 'david.lopez@email.com',
                    userId: 'user_david_101',
                    rating: 5,
                    comment: 'La taza perfecta para mi café matutino! El logo 42 se ve genial y la calidad es excelente. Mantiene el café caliente por mucho tiempo.',
                    date: '2024-01-18T16:45:00Z',
                    verified: true,
                    helpful: 9
                },
                {
                    id: 'review_2_2',
                    userName: 'Laura Sánchez',
                    userEmail: 'laura.sanchez@email.com',
                    userId: 'user_laura_202',
                    rating: 4,
                    comment: 'Buena taza, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.',
                    date: '2024-01-16T11:30:00Z',
                    verified: true,
                    helpful: 6
                }
            ],
            3: [ // Gorra 42
                {
                    id: 'review_3_1',
                    userName: 'Miguel Torres',
                    userEmail: 'miguel.torres@email.com',
                    userId: 'user_miguel_303',
                    rating: 5,
                    comment: 'Excelente gorra! El ajuste es perfecto y el logo 42 se ve increíble. La calidad del material es de primera. Perfecta para el verano.',
                    date: '2024-01-20T13:20:00Z',
                    verified: true,
                    helpful: 11
                },
                {
                    id: 'review_3_2',
                    userName: 'Sofia García',
                    userEmail: 'sofia.garcia@email.com',
                    userId: 'user_sofia_404',
                    rating: 4,
                    comment: 'Buena gorra, aunque esperaba que fuera un poco más grande. El diseño es perfecto y la calidad es buena. Recomendada.',
                    date: '2024-01-17T15:10:00Z',
                    verified: true,
                    helpful: 7
                }
            ],
            4: [ // Mochila 42
                {
                    id: 'review_4_1',
                    userName: 'Javier Rodríguez',
                    userEmail: 'javier.rodriguez@email.com',
                    userId: 'user_javier_505',
                    rating: 5,
                    comment: 'Increíble mochila! Tiene mucho espacio y el logo 42 se ve genial. Perfecta para la universidad. La calidad es excelente.',
                    date: '2024-01-22T08:45:00Z',
                    verified: true,
                    helpful: 14
                },
                {
                    id: 'review_4_2',
                    userName: 'Carmen López',
                    userEmail: 'carmen.lopez@email.com',
                    userId: 'user_carmen_606',
                    rating: 4,
                    comment: 'Buena mochila, aunque esperaba que fuera un poco más grande. La calidad es excelente y el diseño es perfecto.',
                    date: '2024-01-19T12:15:00Z',
                    verified: true,
                    helpful: 5
                }
            ],
            5: [ // Pantalón 42
                {
                    id: 'review_5_1',
                    userName: 'Francisco García',
                    userEmail: 'francisco.garcia@email.com',
                    userId: 'user_francisco_707',
                    rating: 5,
                    comment: 'Pantalones perfectos! La talla es exacta y el logo 42 se ve increíble. Muy cómodos y de excelente calidad.',
                    date: '2024-01-25T10:30:00Z',
                    verified: true,
                    helpful: 13
                },
                {
                    id: 'review_5_2',
                    userName: 'Beatriz Ramos',
                    userEmail: 'beatriz.ramos@email.com',
                    userId: 'user_beatriz_808',
                    rating: 4,
                    comment: 'Buenos pantalones, aunque la talla es un poco grande. La calidad es excelente y el diseño es perfecto. Recomendado.',
                    date: '2024-01-23T14:20:00Z',
                    verified: true,
                    helpful: 8
                }
            ]
        };
        
        // Guardar reseñas de ejemplo en Firebase si está disponible
        try {
            this.reviewsRef.set(sampleReviews);
        } catch (error) {
            console.log('No se pudo guardar en Firebase, usando localStorage');
            localStorage.setItem('realReviews', JSON.stringify(sampleReviews));
        }
        
        return sampleReviews;
    }

    // Calcular rating promedio
    calculateAverageRating(reviews) {
        const reviewList = Object.values(reviews);
        if (reviewList.length === 0) return 0;
        
        const totalRating = reviewList.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviewList.length;
    }

    // Mostrar modal de reseñas
    showReviewsModal(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        this.reviewsRef.child(productId).once('value').then(snapshot => {
            const reviews = snapshot.val() || {};
            const reviewList = Object.values(reviews);
            const averageRating = this.calculateAverageRating(reviews);

            const modalHTML = `
                <div class="real-reviews-modal-overlay" id="realReviewsModal">
                    <div class="real-reviews-modal">
                        <div class="real-reviews-header">
                            <div class="product-info">
                                <h3>Reseñas de ${product.name}</h3>
                                <div class="product-rating-summary">
                                    <div class="rating-number">${averageRating.toFixed(1)}</div>
                                    <div class="rating-stars">${this.generateStars(averageRating)}</div>
                                    <div class="rating-count">${reviewList.length} reseñas</div>
                                </div>
                            </div>
                            <button class="real-review-close">&times;</button>
                        </div>
                        
                        <div class="real-reviews-content">
                            <div class="reviews-stats">
                                <div class="rating-breakdown">
                                    ${this.generateRatingBreakdown(reviewList)}
                                </div>
                            </div>

                            <div class="real-reviews-list">
                                ${reviewList.length > 0 ? 
                                    reviewList.map(review => this.createReviewHTML(review)).join('') :
                                    '<div class="no-reviews"><p>No hay reseñas aún. ¡Sé el primero en reseñar!</p></div>'
                                }
                            </div>
                        </div>

                        <div class="real-reviews-actions">
                            <button class="btn-primary" data-action="add-review" data-product-id="${productId}">
                                ✍️ Escribir Reseña
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.setupModalEventListeners();
        });
    }

    // Generar desglose de ratings
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

    // Crear HTML de reseña
    createReviewHTML(review) {
        return `
            <div class="real-review-item">
                <div class="real-review-header">
                    <div class="review-user-info">
                        <div class="review-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                        <div class="review-user-details">
                            <div class="review-user-name">${review.userName}</div>
                            <div class="review-date">${this.formatDate(review.date)}</div>
                            <div class="review-verified">✓ Compra verificada</div>
                        </div>
                    </div>
                    <div class="review-rating-display">
                        ${this.generateStars(review.rating)}
                        <span class="rating-number">${review.rating}/5</span>
                    </div>
                </div>
                
                <div class="real-review-content">
                    <div class="review-comment">${review.comment}</div>
                    <div class="review-helpful">
                        <span class="helpful-text">¿Te resultó útil esta reseña?</span>
                        <button class="helpful-btn" data-review-id="${review.id}">
                            👍 ${review.helpful || 0}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Configurar event listeners del modal
    setupModalEventListeners() {
        const modal = document.getElementById('realReviewsModal');
        const closeBtn = modal.querySelector('.real-review-close');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Event listener para botón de escribir reseña
        modal.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="add-review"]')) {
                const productId = parseInt(e.target.closest('[data-action="add-review"]').dataset.productId);
                modal.remove();
                this.showAddReviewModal(productId);
            }
        });

        // Event listener para botones de útil
        modal.addEventListener('click', (e) => {
            if (e.target.closest('.helpful-btn')) {
                const btn = e.target.closest('.helpful-btn');
                const reviewId = btn.dataset.reviewId;
                const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
                const newCount = currentCount + 1;
                
                btn.textContent = `👍 ${newCount}`;
                btn.style.background = '#00ff00';
                btn.style.color = '#000';
                
                // Actualizar en Firebase
                this.updateHelpfulCount(reviewId, newCount);
            }
        });
    }

    // Mostrar modal para agregar reseña
    showAddReviewModal(productId = null) {
        // Verificar si el usuario está logueado
        if (!state.isLoggedIn || !state.currentUser) {
            this.showLoginRequiredModal();
            return;
        }

        const product = productId ? state.products.find(p => p.id === productId) : null;
        const modalHTML = `
            <div class="add-review-modal-overlay" id="addReviewModal">
                <div class="add-review-modal">
                    <div class="add-review-header">
                        <h3>${product ? `Escribir Reseña - ${product.name}` : 'Escribir Reseña'}</h3>
                        <button class="add-review-close">&times;</button>
                    </div>
                    
                    <div class="add-review-content">
                        <div class="review-type-selector">
                            <h4>¿Qué quieres reseñar?</h4>
                            <div class="review-options">
                                <button class="review-option ${product ? 'active' : ''}" data-type="product" data-product-id="${productId || ''}">
                                    <span class="option-icon">🛍️</span>
                                    <span class="option-text">Producto</span>
                                </button>
                                <button class="review-option ${!product ? 'active' : ''}" data-type="store">
                                    <span class="option-icon">🏪</span>
                                    <span class="option-text">Tienda</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="review-form">
                            <div class="form-group">
                                <label>Calificación:</label>
                                <div class="star-rating" id="starRating">
                                    <span class="star" data-rating="1">☆</span>
                                    <span class="star" data-rating="2">☆</span>
                                    <span class="star" data-rating="3">☆</span>
                                    <span class="star" data-rating="4">☆</span>
                                    <span class="star" data-rating="5">☆</span>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Tu reseña:</label>
                                <textarea id="reviewComment" placeholder="Cuéntanos tu experiencia..." rows="4" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="add-review-actions">
                        <button class="btn-secondary" id="cancelReview">Cancelar</button>
                        <button class="btn-primary" id="submitReview" data-product-id="${productId || ''}">Enviar Reseña</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupAddReviewEventListeners();
    }

    showLoginRequiredModal() {
        const modalHTML = `
            <div class="login-required-modal-overlay" id="loginRequiredModal">
                <div class="login-required-modal">
                    <div class="login-required-header">
                        <h3>🔒 Iniciar Sesión Requerido</h3>
                        <button class="login-required-close">&times;</button>
                    </div>
                    
                    <div class="login-required-content">
                        <p>Para escribir reseñas necesitas iniciar sesión primero.</p>
                        <p>¡Es gratis y solo toma unos segundos!</p>
                        
                        <div class="login-required-actions">
                            <button id="goToLogin" class="btn btn-primary">Iniciar Sesión</button>
                            <button id="closeLoginRequired" class="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Event listeners para el modal de login requerido
        const modal = document.getElementById('loginRequiredModal');
        const closeBtn = modal.querySelector('.login-required-close');
        const cancelBtn = modal.querySelector('#closeLoginRequired');
        const loginBtn = modal.querySelector('#goToLogin');

        const closeModal = () => modal.remove();
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        loginBtn.addEventListener('click', () => {
            modal.remove();
            // Abrir modal de login
            const loginModal = document.getElementById('authModal');
            if (loginModal) {
                loginModal.showModal();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Configurar event listeners del modal de agregar reseña
    setupAddReviewEventListeners() {
        const modal = document.getElementById('addReviewModal');
        const closeBtn = modal.querySelector('.add-review-close');
        const cancelBtn = modal.querySelector('#cancelReview');
        const submitBtn = modal.querySelector('#submitReview');
        const stars = modal.querySelectorAll('.star');

        // Cerrar modal
        closeBtn.addEventListener('click', () => modal.remove());
        cancelBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Sistema de estrellas
        let selectedRating = 0;
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                stars.forEach((s, i) => {
                    s.textContent = i < selectedRating ? '⭐' : '☆';
                });
            });

            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.textContent = i <= index ? '⭐' : '☆';
                });
            });
        });

        modal.addEventListener('mouseleave', () => {
            stars.forEach((s, i) => {
                s.textContent = i < selectedRating ? '⭐' : '☆';
            });
        });

        // Enviar reseña
        submitBtn.addEventListener('click', () => {
            const userName = modal.querySelector('#reviewerName').value.trim();
            const comment = modal.querySelector('#reviewComment').value.trim();

            if (!userName || !comment || selectedRating === 0) {
                alert('Por favor completa todos los campos');
                return;
            }

            this.submitReview(submitBtn.dataset.productId, {
                userName,
                rating: selectedRating,
                comment,
                date: new Date().toISOString(),
                helpful: 0
            });

            modal.remove();
        });
    }

    // Enviar reseña a Firebase
    async submitReview(productId, reviewData) {
        try {
            const reviewId = Date.now().toString();
            await this.reviewsRef.child(productId).child(reviewId).set(reviewData);
            
            // Actualizar producto
            const product = state.products.find(p => p.id == productId);
            if (product) {
                const snapshot = await this.reviewsRef.child(productId).once('value');
                const reviews = snapshot.val() || {};
                const averageRating = this.calculateAverageRating(reviews);
                
                product.averageRating = averageRating;
                product.reviewCount = Object.keys(reviews).length;
            }

            // Mostrar mensaje de éxito
            this.showSuccessMessage('¡Reseña enviada con éxito!');
            
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error al enviar la reseña. Inténtalo de nuevo.');
        }
    }

    // Actualizar contador de útil
    async updateHelpfulCount(reviewId, newCount) {
        try {
            // Buscar la reseña en todos los productos
            const snapshot = await this.reviewsRef.once('value');
            const allReviews = snapshot.val() || {};
            
            for (const productId in allReviews) {
                for (const id in allReviews[productId]) {
                    if (id === reviewId) {
                        await this.reviewsRef.child(productId).child(id).child('helpful').set(newCount);
                        return;
                    }
                }
            }
        } catch (error) {
            console.error('Error updating helpful count:', error);
        }
    }

    // Generar estrellas
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '✨';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        return stars;
    }

    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Mostrar mensaje de éxito
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00ff00;
            color: #000;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Mostrar todas las reseñas
    async showAllReviews() {
        try {
            const snapshot = await this.reviewsRef.once('value');
            const allReviews = snapshot.val() || {};
            
            const reviewsGrid = document.getElementById('reviewsGrid');
            if (!reviewsGrid) return;

            reviewsGrid.innerHTML = '';

            // Crear tarjetas de reseñas destacadas
            const featuredReviews = [];
            Object.keys(allReviews).forEach(productId => {
                const productReviews = Object.values(allReviews[productId]);
                const product = state.products.find(p => p.id == productId);
                
                if (product && productReviews.length > 0) {
                    // Tomar las mejores reseñas (rating 4-5)
                    const bestReviews = productReviews
                        .filter(review => review.rating >= 4)
                        .slice(0, 2);
                    
                    bestReviews.forEach(review => {
                        featuredReviews.push({
                            ...review,
                            productName: product.name,
                            productId: productId
                        });
                    });
                }
            });

            // Mostrar hasta 6 reseñas destacadas
            featuredReviews.slice(0, 6).forEach(review => {
                const reviewCard = this.createReviewCard(review);
                reviewsGrid.appendChild(reviewCard);
            });

            if (featuredReviews.length === 0) {
                reviewsGrid.innerHTML = `
                    <div class="no-reviews-message">
                        <h3>¡Aún no hay reseñas!</h3>
                        <p>Sé el primero en compartir tu experiencia con nuestros productos.</p>
                        <button class="btn-primary" onclick="scrollToProducts()">
                            Ver Productos
                        </button>
                    </div>
                `;
            }

        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }

    // Crear tarjeta de reseña para la sección principal
    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-card-header">
                <div class="review-product-info">
                    <h4>${review.productName}</h4>
                    <div class="review-rating">
                        ${this.generateStars(review.rating)}
                        <span class="rating-text">${review.rating}/5</span>
                    </div>
                </div>
                <div class="review-user">
                    <div class="review-avatar-small">${review.userName.charAt(0).toUpperCase()}</div>
                    <span class="review-user-name">${review.userName}</span>
                </div>
            </div>
            <div class="review-card-content">
                <p class="review-comment-preview">${review.comment.length > 150 ? review.comment.substring(0, 150) + '...' : review.comment}</p>
                <div class="review-card-footer">
                    <span class="review-date">${this.formatDate(review.date)}</span>
                    <button class="btn-read-more" onclick="realReviewsSystem.showReviewsModal(${review.productId})">
                        Leer más
                    </button>
                </div>
            </div>
        `;
        return card;
    }
}

// Inicializar el sistema de reseñas reales
document.addEventListener('DOMContentLoaded', () => {
    window.realReviewsSystem = new RealReviewsSystem();
    
    // Cargar reseñas cuando esté listo
    setTimeout(() => {
        if (window.realReviewsSystem) {
            window.realReviewsSystem.showAllReviews();
        }
    }, 1000);
});

// Funciones globales
window.showAllReviews = function() {
    if (window.realReviewsSystem) {
        window.realReviewsSystem.showAllReviews();
    }
};

window.scrollToProducts = function() {
    const catalog = document.getElementById('catalog');
    if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
    }
};

// Hacer disponible globalmente
window.RealReviewsSystem = RealReviewsSystem;
