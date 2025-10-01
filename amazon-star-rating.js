// Sistema de estrellas como Amazon

class AmazonStarRating {
    constructor() {
        this.init();
    }

    init() {
        this.createStarRatingStyles();
        this.setupProductRatings();
    }

    // Crear estilos para el sistema de estrellas
    createStarRatingStyles() {
        const styles = `
        <style>
        .amazon-star-rating {
            display: inline-flex;
            align-items: center;
            gap: 0.2rem;
            margin: 0.5rem 0;
        }

        .amazon-star {
            font-size: 1.2rem;
            color: #ddd;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            user-select: none;
        }

        .amazon-star:hover {
            color: #ffd700;
            transform: scale(1.1);
        }

        .amazon-star.filled {
            color: #ffd700;
        }

        .amazon-star.half-filled {
            background: linear-gradient(90deg, #ffd700 50%, #ddd 50%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .amazon-star-rating-text {
            margin-left: 0.5rem;
            font-size: 0.9rem;
            color: #666;
        }

        .amazon-star-rating:hover .amazon-star-rating-text {
            color: #333;
        }

        .amazon-star-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
            z-index: 1000;
            margin-bottom: 0.5rem;
        }

        .amazon-star-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: #333;
        }

        .amazon-star:hover .amazon-star-tooltip {
            opacity: 1;
            visibility: visible;
        }

        .amazon-star-rating-disabled {
            pointer-events: none;
        }

        .amazon-star-rating-disabled .amazon-star {
            cursor: default;
        }

        .amazon-star-rating-disabled .amazon-star:hover {
            transform: none;
        }
        </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Configurar ratings en productos
    setupProductRatings() {
        // Añadir ratings a productos existentes
        this.addRatingsToProducts();
        
        // Configurar ratings interactivos
        this.setupInteractiveRatings();
    }

    // Añadir ratings a productos
    addRatingsToProducts() {
        const products = document.querySelectorAll('.card');
        products.forEach(card => {
            const productId = card.dataset.productId;
            if (productId && !card.querySelector('.amazon-star-rating')) {
                const rating = this.getProductRating(productId);
                const ratingElement = this.createRatingElement(rating, productId);
                
                // Insertar después del precio
                const priceElement = card.querySelector('.card__price');
                if (priceElement) {
                    priceElement.insertAdjacentElement('afterend', ratingElement);
                }
            }
        });
    }

    // Crear elemento de rating
    createRatingElement(rating, productId) {
        const ratingElement = document.createElement('div');
        ratingElement.className = 'amazon-star-rating';
        ratingElement.dataset.productId = productId;
        
        const stars = this.generateStars(rating);
        const ratingText = this.getRatingText(rating);
        
        ratingElement.innerHTML = `
            ${stars}
            <span class="amazon-star-rating-text">${ratingText}</span>
        `;
        
        return ratingElement;
    }

    // Generar estrellas
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="amazon-star filled" data-rating="' + (i + 1) + '">★</span>';
        }
        
        // Media estrella
        if (hasHalfStar) {
            stars += '<span class="amazon-star half-filled" data-rating="' + (fullStars + 1) + '">★</span>';
        }
        
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            const starNumber = fullStars + (hasHalfStar ? 1 : 0) + i + 1;
            stars += '<span class="amazon-star" data-rating="' + starNumber + '">☆</span>';
        }
        
        return stars;
    }

    // Obtener texto de rating
    getRatingText(rating) {
        if (rating === 0) {
            return 'Sin calificar';
        } else if (rating < 1) {
            return 'Muy malo';
        } else if (rating < 2) {
            return 'Malo';
        } else if (rating < 3) {
            return 'Regular';
        } else if (rating < 4) {
            return 'Bueno';
        } else if (rating < 5) {
            return 'Muy bueno';
        } else {
            return 'Excelente';
        }
    }

    // Obtener rating del producto
    getProductRating(productId) {
        // Simular ratings aleatorios para demostración
        const ratings = {
            1: 4.5,
            2: 3.8,
            3: 4.2,
            4: 4.7,
            5: 3.9,
            6: 4.1,
            7: 4.3,
            8: 4.6,
            9: 4.4,
            10: 4.0,
            11: 3.7,
            12: 4.8
        };
        
        return ratings[productId] || 0;
    }

    // Configurar ratings interactivos
    setupInteractiveRatings() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('amazon-star')) {
                const star = e.target;
                const rating = parseInt(star.dataset.rating);
                const ratingContainer = star.closest('.amazon-star-rating');
                const productId = ratingContainer.dataset.productId;
                
                if (productId) {
                    this.updateProductRating(productId, rating);
                    this.updateRatingDisplay(ratingContainer, rating);
                }
            }
        });

        // Hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('amazon-star')) {
                const star = e.target;
                const rating = parseInt(star.dataset.rating);
                const ratingContainer = star.closest('.amazon-star-rating');
                
                this.highlightStars(ratingContainer, rating);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('amazon-star')) {
                const ratingContainer = e.target.closest('.amazon-star-rating');
                const currentRating = this.getProductRating(ratingContainer.dataset.productId);
                
                this.highlightStars(ratingContainer, currentRating);
            }
        });
    }

    // Resaltar estrellas
    highlightStars(ratingContainer, rating) {
        const stars = ratingContainer.querySelectorAll('.amazon-star');
        
        stars.forEach((star, index) => {
            const starNumber = index + 1;
            
            if (starNumber <= rating) {
                star.classList.add('filled');
                star.classList.remove('half-filled');
            } else {
                star.classList.remove('filled');
                star.classList.remove('half-filled');
            }
        });
    }

    // Actualizar rating del producto
    updateProductRating(productId, rating) {
        // Guardar en localStorage
        const ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
        ratings[productId] = rating;
        localStorage.setItem('productRatings', JSON.stringify(ratings));
        
        // Mostrar notificación
        if (window.showNotification) {
            window.showNotification(`Calificación actualizada: ${rating} estrellas`, 'success');
        }
    }

    // Actualizar display del rating
    updateRatingDisplay(ratingContainer, rating) {
        const stars = this.generateStars(rating);
        const ratingText = this.getRatingText(rating);
        
        ratingContainer.innerHTML = `
            ${stars}
            <span class="amazon-star-rating-text">${ratingText}</span>
        `;
        
        // Reconfigurar eventos
        this.setupInteractiveRatings();
    }

    // Obtener rating guardado
    getSavedRating(productId) {
        const ratings = JSON.parse(localStorage.getItem('productRatings')) || {};
        return ratings[productId] || 0;
    }

    // Actualizar todos los ratings
    updateAllRatings() {
        const ratingContainers = document.querySelectorAll('.amazon-star-rating');
        ratingContainers.forEach(container => {
            const productId = container.dataset.productId;
            const rating = this.getSavedRating(productId) || this.getProductRating(productId);
            this.updateRatingDisplay(container, rating);
        });
    }
}

// Inicializar sistema de estrellas Amazon
document.addEventListener('DOMContentLoaded', () => {
    window.amazonStarRating = new AmazonStarRating();
    
    // Actualizar ratings cuando se rendericen productos
    const originalRenderProducts = window.renderProducts;
    if (originalRenderProducts) {
        window.renderProducts = function() {
            originalRenderProducts();
            setTimeout(() => {
                if (window.amazonStarRating) {
                    window.amazonStarRating.updateAllRatings();
                }
            }, 100);
        };
    }
});


