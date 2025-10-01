// Sistema profesional de reseñas con fotos y base de datos

class ProfessionalReviews {
    constructor() {
        this.reviews = {};
        this.init();
    }

    init() {
        this.loadReviewsFromFirebase();
        this.setupRealtimeListener();
    }

    // Cargar reseñas desde Firebase
    async loadReviewsFromFirebase() {
        try {
            if (typeof firebase !== 'undefined' && firebase.database) {
                const snapshot = await firebase.database().ref('reviews').once('value');
                this.reviews = snapshot.val() || {};
            } else {
                // Fallback: cargar desde localStorage
                this.reviews = JSON.parse(localStorage.getItem('reviews')) || {};
            }
        } catch (error) {
            console.error('Error cargando reseñas:', error);
            this.reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        }
    }

    // Guardar reseñas en Firebase
    async saveReviewsToFirebase() {
        try {
            if (typeof firebase !== 'undefined' && firebase.database) {
                await firebase.database().ref('reviews').set(this.reviews);
            } else {
                // Fallback: guardar en localStorage
                localStorage.setItem('reviews', JSON.stringify(this.reviews));
            }
        } catch (error) {
            console.error('Error guardando reseñas:', error);
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
        }
    }

    // Configurar listener en tiempo real
    setupRealtimeListener() {
        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref('reviews').on('value', (snapshot) => {
                this.reviews = snapshot.val() || {};
                this.updateAllProductRatings();
            });
        }
    }

    // Mostrar modal de reseñas profesional
    showReviewsModal(productId) {
        const product = window.state.products.find(p => p.id === productId);
        if (!product) return;

        // Cerrar modal de producto si está abierto
        const productModal = document.querySelector('.amazing-product-modal-overlay');
        if (productModal) {
            productModal.remove();
        }

        this.createReviewsModal(product);
    }

    // Crear modal de reseñas
    createReviewsModal(product) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'reviews-modal-overlay';
        overlay.id = 'reviewsModalOverlay';
        
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'reviews-modal';
        modal.innerHTML = `
            <div class="reviews-modal-header">
                <h2>Reseñas de ${product.name}</h2>
                <button class="reviews-close-btn" onclick="professionalReviews.closeModal()">✕</button>
            </div>
            
            <div class="reviews-modal-content">
                <div class="reviews-stats">
                    <div class="rating-summary">
                        <div class="rating-number">${this.calculateAverageRating(product.id).toFixed(1)}</div>
                        <div class="rating-stars">${this.generateStars(this.calculateAverageRating(product.id))}</div>
                        <div class="rating-count">${this.getReviewCount(product.id)} reseñas</div>
                    </div>
                </div>
                
                <div class="reviews-actions">
                    <button class="add-review-btn" onclick="professionalReviews.showAddReviewModal(${product.id})">
                        <span>✍️</span>
                        Escribir Reseña
                    </button>
                </div>
                
                <div class="reviews-list" id="reviewsList${product.id}">
                    ${this.renderReviewsList(product.id)}
                </div>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Mostrar modal con animación
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);
    }

    // Mostrar modal para añadir reseña
    showAddReviewModal(productId) {
        const product = window.state.products.find(p => p.id === productId);
        if (!product) return;

        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'add-review-modal-overlay';
        overlay.id = 'addReviewModalOverlay';
        
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'add-review-modal';
        modal.innerHTML = `
            <div class="add-review-header">
                <h3>Escribir Reseña para ${product.name}</h3>
                <button class="add-review-close-btn" onclick="professionalReviews.closeAddReviewModal()">✕</button>
            </div>
            
            <div class="add-review-content">
                <form id="addReviewForm" onsubmit="professionalReviews.submitReview(event, ${productId})">
                    <div class="rating-input-section">
                        <label>Tu Calificación:</label>
                        <div class="stars-input" id="starsInput">
                            <span class="star-input" data-rating="1">☆</span>
                            <span class="star-input" data-rating="2">☆</span>
                            <span class="star-input" data-rating="3">☆</span>
                            <span class="star-input" data-rating="4">☆</span>
                            <span class="star-input" data-rating="5">☆</span>
                        </div>
                    </div>
                    
                    <div class="comment-input-section">
                        <label for="reviewComment">Tu Comentario:</label>
                        <textarea id="reviewComment" placeholder="Cuéntanos tu experiencia con este producto..." required></textarea>
                    </div>
                    
                    <div class="photo-input-section">
                        <label>Foto del Producto (opcional):</label>
                        <div class="photo-upload-area" id="photoUploadArea">
                            <input type="file" id="photoInput" accept="image/*" onchange="professionalReviews.handlePhotoUpload(event)">
                            <div class="photo-upload-text">
                                <span>📷</span>
                                <span>Haz click para subir una foto</span>
                            </div>
                        </div>
                        <div class="photo-preview" id="photoPreview" style="display: none;">
                            <img id="previewImage" src="" alt="Preview">
                            <button type="button" onclick="professionalReviews.removePhoto()">Eliminar</button>
                        </div>
                    </div>
                    
                    <div class="submit-section">
                        <button type="submit" class="submit-review-btn">
                            <span>📝</span>
                            Publicar Reseña
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Mostrar modal con animación
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);
        
        // Configurar estrellas interactivas
        this.setupStarInput();
    }

    // Configurar estrellas interactivas
    setupStarInput() {
        const stars = document.querySelectorAll('.star-input');
        let selectedRating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                this.highlightStars(index + 1);
            });
            
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                this.highlightStars(selectedRating);
            });
        });
        
        document.getElementById('starsInput').addEventListener('mouseleave', () => {
            this.highlightStars(selectedRating);
        });
    }

    // Resaltar estrellas
    highlightStars(rating) {
        const stars = document.querySelectorAll('.star-input');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.textContent = '★';
                star.style.color = '#ffd700';
            } else {
                star.textContent = '☆';
                star.style.color = '#ccc';
            }
        });
    }

    // Manejar subida de foto
    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen debe ser menor a 5MB');
            return;
        }

        // Mostrar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('photoPreview').style.display = 'block';
            document.getElementById('photoUploadArea').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    // Eliminar foto
    removePhoto() {
        document.getElementById('photoInput').value = '';
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('photoUploadArea').style.display = 'block';
    }

    // Enviar reseña
    async submitReview(event, productId) {
        event.preventDefault();
        
        const form = event.target;
        const rating = document.querySelector('.star-input[style*="color: rgb(255, 215, 0)"]')?.dataset.rating || 0;
        const comment = document.getElementById('reviewComment').value;
        const photoFile = document.getElementById('photoInput').files[0];
        
        if (rating === 0) {
            alert('Por favor selecciona una calificación');
            return;
        }

        // Crear reseña
        const review = {
            id: Date.now(),
            productId: productId,
            rating: parseInt(rating),
            comment: comment,
            userName: window.state.currentUser?.name || 'Usuario Anónimo',
            userEmail: window.state.currentUser?.email || '',
            userId: window.state.currentUser?.uid || 'anonymous',
            photoUrl: null,
            date: new Date().toISOString(),
            verified: false
        };

        // Subir foto si existe
        if (photoFile) {
            try {
                review.photoUrl = await this.uploadPhoto(photoFile, productId);
            } catch (error) {
                console.error('Error subiendo foto:', error);
                alert('Error subiendo foto, pero la reseña se guardará sin imagen');
            }
        }

        // Guardar reseña
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }
        this.reviews[productId].push(review);
        
        await this.saveReviewsToFirebase();
        this.updateProductRating(productId);
        
        // Cerrar modal y mostrar confirmación
        this.closeAddReviewModal();
        this.closeModal();
        
        // Mostrar notificación
        if (window.showToast) {
            window.showToast('¡Reseña publicada con éxito!', 'success');
        }
        
        // Actualizar lista de reseñas
        this.updateReviewsList(productId);
    }

    // Subir foto a Firebase Storage
    async uploadPhoto(file, productId) {
        if (typeof firebase === 'undefined' || !firebase.storage) {
            // Fallback: convertir a base64
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }

        const storageRef = firebase.storage().ref();
        const photoRef = storageRef.child(`reviews/${productId}/${Date.now()}_${file.name}`);
        
        // Comprimir imagen
        const compressedFile = await this.compressImage(file);
        
        const snapshot = await photoRef.put(compressedFile);
        return await snapshot.ref.getDownloadURL();
    }

    // Comprimir imagen
    async compressImage(file) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                const maxWidth = 800;
                const maxHeight = 600;
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(resolve, 'image/jpeg', 0.8);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    // Renderizar lista de reseñas
    renderReviewsList(productId) {
        const reviews = this.reviews[productId] || [];
        
        if (reviews.length === 0) {
            return `
                <div class="no-reviews">
                    <div class="no-reviews-icon">📝</div>
                    <div class="no-reviews-text">No hay reseñas aún</div>
                    <div class="no-reviews-subtext">Sé el primero en escribir una reseña</div>
                </div>
            `;
        }

        return reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-user">
                        <div class="review-avatar">${review.userName.charAt(0).toUpperCase()}</div>
                        <div class="review-user-info">
                            <div class="review-user-name">${review.userName}</div>
                            <div class="review-date">${this.formatDate(review.date)}</div>
                        </div>
                    </div>
                    <div class="review-rating">${this.generateStars(review.rating)}</div>
                </div>
                
                <div class="review-content">
                    <div class="review-comment">${review.comment}</div>
                    ${review.photoUrl ? `
                        <div class="review-photo">
                            <img src="${review.photoUrl}" alt="Foto de la reseña" onclick="professionalReviews.showPhotoModal('${review.photoUrl}')">
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    // Actualizar lista de reseñas
    updateReviewsList(productId) {
        const reviewsList = document.getElementById(`reviewsList${productId}`);
        if (reviewsList) {
            reviewsList.innerHTML = this.renderReviewsList(productId);
        }
    }

    // Mostrar modal de foto
    showPhotoModal(photoUrl) {
        const overlay = document.createElement('div');
        overlay.className = 'photo-modal-overlay';
        overlay.innerHTML = `
            <div class="photo-modal">
                <button class="photo-modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
                <img src="${photoUrl}" alt="Foto de la reseña">
            </div>
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);
    }

    // Calcular rating promedio
    calculateAverageRating(productId) {
        const reviews = this.reviews[productId] || [];
        if (reviews.length === 0) return 0;
        
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
    }

    // Obtener cantidad de reseñas
    getReviewCount(productId) {
        return (this.reviews[productId] || []).length;
    }

    // Actualizar rating del producto
    updateProductRating(productId) {
        const product = window.state.products.find(p => p.id === productId);
        if (product) {
            product.averageRating = this.calculateAverageRating(productId);
            product.reviewCount = this.getReviewCount(productId);
        }
    }

    // Actualizar todos los ratings
    updateAllProductRatings() {
        window.state.products.forEach(product => {
            this.updateProductRating(product.id);
        });
    }

    // Generar estrellas
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star star--filled">★</span>';
        }
        
        if (hasHalfStar) {
            stars += '<span class="star star--half">★</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star">☆</span>';
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

    // Cerrar modal
    closeModal() {
        const overlay = document.getElementById('reviewsModalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    // Cerrar modal de añadir reseña
    closeAddReviewModal() {
        const overlay = document.getElementById('addReviewModalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }
}

// Inicializar sistema de reseñas profesional
document.addEventListener('DOMContentLoaded', () => {
    window.professionalReviews = new ProfessionalReviews();
});
