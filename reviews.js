// Sistema de reseñas con Firebase y fotos
class ReviewSystem {
    constructor() {
        this.reviews = {};
        this.db = firebase.database();
        this.storage = firebase.storage();
        this.auth = firebase.auth();
        this.init();
    }

    async init() {
        // Cargar reseñas desde Firebase
        await this.loadReviewsFromFirebase();
        
        // Escuchar cambios en tiempo real
        this.setupRealtimeListener();
    }

    // Cargar reseñas desde Firebase
    async loadReviewsFromFirebase() {
        try {
            const snapshot = await this.db.ref('reviews').once('value');
            this.reviews = snapshot.val() || {};
        } catch (error) {
            console.error('Error cargando reseñas:', error);
            // Fallback a localStorage
            this.reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        }
    }

    // Configurar listener en tiempo real
    setupRealtimeListener() {
        this.db.ref('reviews').on('value', (snapshot) => {
            this.reviews = snapshot.val() || {};
            this.updateAllProductRatings();
        });
    }

    // Guardar reseñas en Firebase
    async saveReviewsToFirebase() {
        try {
            await this.db.ref('reviews').set(this.reviews);
            // También guardar en localStorage como backup
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
        } catch (error) {
            console.error('Error guardando reseñas:', error);
            // Fallback a localStorage
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
        }
    }

    // Añadir reseña con foto opcional
    async addReview(productId, rating, comment, userName, photoFile = null) {
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }
        
        let photoUrl = null;
        
        // Subir foto si se proporciona
        if (photoFile) {
            try {
                photoUrl = await this.uploadReviewPhoto(photoFile, productId);
            } catch (error) {
                console.error('Error subiendo foto:', error);
                showToast('Error subiendo foto, pero la reseña se guardará sin imagen', 'error');
            }
        }
        
        const reviewData = {
            id: Date.now(),
            rating: rating,
            comment: comment,
            userName: userName,
            userEmail: this.auth.currentUser?.email || '',
            userId: this.auth.currentUser?.uid || '',
            photoUrl: photoUrl,
            date: new Date().toISOString()
        };
        
        this.reviews[productId].push(reviewData);
        
        // Guardar en Firebase
        await this.saveReviewsToFirebase();
        this.updateProductRating(productId);
        
        return true;
    }

    // Subir foto de reseña
    async uploadReviewPhoto(file, productId) {
        const user = this.auth.currentUser;
        if (!user) throw new Error('Usuario no autenticado');
        
        const fileName = `review_${productId}_${user.uid}_${Date.now()}.jpg`;
        const storageRef = this.storage.ref(`review-photos/${fileName}`);
        
        // Comprimir imagen si es muy grande
        const compressedFile = await this.compressImage(file);
        
        const uploadTask = storageRef.put(compressedFile);
        
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progreso de subida
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Subiendo foto:', progress + '%');
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    }

    // Comprimir imagen
    async compressImage(file) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calcular nuevas dimensiones (máximo 800px)
                const maxWidth = 800;
                const maxHeight = 800;
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
                
                // Dibujar imagen redimensionada
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convertir a blob
                canvas.toBlob(resolve, 'image/jpeg', 0.8);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    // Actualizar rating promedio del producto
    updateProductRating(productId) {
        const productReviews = this.reviews[productId] || [];
        if (productReviews.length === 0) return;

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / productReviews.length;
        
        // Actualizar en el estado global
        const product = state.products.find(p => p.id === productId);
        if (product) {
            product.averageRating = averageRating;
            product.reviewCount = productReviews.length;
        }
    }

    // Generar estrellas para rating
    generateStars(rating, interactive = false, productId = null) {
        const roundedRating = Math.round(rating * 2) / 2;
        return Array(5).fill(0).map((_, i) => {
            const starClass = i < roundedRating ? 'star--filled' : '';
            const interactiveClass = interactive ? 'star--interactive' : '';
            const clickHandler = interactive ? `onclick="reviewSystem.setRating(${productId}, ${i + 1})"` : '';
            
            return `<span class="star ${starClass} ${interactiveClass}" ${clickHandler}>★</span>`;
        }).join('');
    }

    // Establecer rating (para formulario interactivo)
    setRating(productId, rating) {
        const stars = document.querySelectorAll(`[data-product-id="${productId}"] .star--interactive`);
        stars.forEach((star, index) => {
            star.classList.toggle('star--filled', index < rating);
        });
        
        // Guardar rating temporalmente
        window.tempRating = rating;
    }

    // Renderizar reseñas para un producto
    renderReviews(productId, container) {
        const productReviews = this.reviews[productId] || [];
        const product = state.products.find(p => p.id === productId);
        
        if (!product) return;

        // Actualizar rating promedio
        this.updateProductRating(productId);

        container.innerHTML = `
            <div class="reviews-section">
                <div class="reviews-header">
                    <div class="rating-summary">
                        <div class="stars-display">
                            ${this.generateStars(product.averageRating || 0)}
                        </div>
                        <span class="rating-text">${(product.averageRating || 0).toFixed(1)} (${product.reviewCount || 0} reseñas)</span>
                    </div>
                    <button class="button button--secondary" onclick="reviewSystem.showReviewModal(${productId})">
                        Escribir reseña
                    </button>
                </div>
                
                <div class="reviews-list">
                    ${productReviews.slice(-3).map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-user">${review.userName}</span>
                                <div class="review-stars">${this.generateStars(review.rating)}</div>
                                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                            ${review.photoUrl ? `
                                <div class="review-photo">
                                    <img src="${review.photoUrl}" alt="Foto de la reseña" onclick="reviewSystem.showPhotoModal('${review.photoUrl}')">
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                
                ${productReviews.length > 3 ? `
                    <button class="button button--secondary" onclick="reviewSystem.showAllReviews(${productId})">
                        Ver todas las reseñas (${productReviews.length})
                    </button>
                ` : ''}
            </div>
        `;
    }

    // Mostrar modal de reseña
    showReviewModal(productId) {
        if (!state.isLoggedIn) {
            showToast('Debes iniciar sesión para escribir reseñas');
            return;
        }

        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'review-modal-overlay';
        modal.innerHTML = `
            <div class="review-modal">
                <div class="review-modal-header">
                    <h3>⭐ Escribir reseña para ${product.name}</h3>
                    <button onclick="this.closest('.review-modal-overlay').remove()" class="button button--secondary">×</button>
                </div>
                <div class="review-modal-content">
                    <div class="rating-input">
                        <label>Calificación:</label>
                        <div class="stars-input" data-product-id="${productId}">
                            ${this.generateStars(0, true, productId)}
                        </div>
                    </div>
                    
                    <div class="comment-input">
                        <label for="reviewComment">Comentario:</label>
                        <textarea id="reviewComment" placeholder="Escribe tu opinión sobre este producto..." rows="4"></textarea>
                    </div>
                    
                    <div class="photo-input">
                        <label for="reviewPhoto">📸 Foto del producto (opcional):</label>
                        <div class="photo-upload-area" id="photoUploadArea">
                            <input type="file" id="reviewPhoto" accept="image/*" hidden>
                            <div class="photo-preview" id="photoPreview"></div>
                            <button type="button" class="photo-upload-btn" onclick="document.getElementById('reviewPhoto').click()">
                                <span class="upload-icon">📷</span>
                                <span>Seleccionar foto</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="review-modal-actions">
                        <button onclick="reviewSystem.submitReview(${productId})" class="button button--primary" id="submitReviewBtn">
                            <span class="btn-text">Enviar reseña</span>
                            <span class="btn-icon">📤</span>
                        </button>
                        <button onclick="this.closest('.review-modal-overlay').remove()" class="button button--secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        window.tempRating = 0;
        
        // Configurar eventos de foto
        this.setupPhotoUpload();
    }

    // Configurar subida de fotos
    setupPhotoUpload() {
        const photoInput = document.getElementById('reviewPhoto');
        const photoPreview = document.getElementById('photoPreview');
        const uploadArea = document.getElementById('photoUploadArea');
        
        if (!photoInput || !photoPreview || !uploadArea) return;
        
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.previewPhoto(file, photoPreview, uploadArea);
            }
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                photoInput.files = files;
                this.previewPhoto(files[0], photoPreview, uploadArea);
            }
        });
    }

    // Previsualizar foto
    previewPhoto(file, preview, uploadArea) {
        if (!file.type.startsWith('image/')) {
            showToast('Por favor, selecciona un archivo de imagen válido', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `
                <div class="photo-preview-content">
                    <img src="${e.target.result}" alt="Vista previa">
                    <div class="photo-info">
                        <span class="photo-name">${file.name}</span>
                        <span class="photo-size">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <button type="button" class="remove-photo" onclick="reviewSystem.removePhoto()">✕</button>
                </div>
            `;
            uploadArea.classList.add('has-photo');
        };
        reader.readAsDataURL(file);
    }

    // Remover foto
    removePhoto() {
        const photoInput = document.getElementById('reviewPhoto');
        const photoPreview = document.getElementById('photoPreview');
        const uploadArea = document.getElementById('photoUploadArea');
        
        if (photoInput) photoInput.value = '';
        if (photoPreview) photoPreview.innerHTML = '';
        if (uploadArea) uploadArea.classList.remove('has-photo');
    }

    // Enviar reseña
    async submitReview(productId) {
        const comment = document.getElementById('reviewComment').value.trim();
        const rating = window.tempRating || 0;
        const photoInput = document.getElementById('reviewPhoto');
        const photoFile = photoInput?.files[0] || null;
        
        if (rating === 0) {
            showToast('Por favor, selecciona una calificación', 'error');
            return;
        }
        
        if (comment.length < 10) {
            showToast('El comentario debe tener al menos 10 caracteres', 'error');
            return;
        }

        const userName = state.currentUser?.name || 'Usuario';
        const submitBtn = document.getElementById('submitReviewBtn');
        
        // Mostrar estado de carga
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Enviando...</span><span class="btn-icon">⏳</span>';
        }
        
        try {
            await this.addReview(productId, rating, comment, userName, photoFile);
            
            // Cerrar modal
            document.querySelector('.review-modal-overlay').remove();
            
            // Actualizar UI
            const container = document.querySelector(`[data-product-id="${productId}"] .reviews-container`);
            if (container) {
                this.renderReviews(productId, container);
            }
            
            showToast('Reseña enviada correctamente', 'success');
        } catch (error) {
            console.error('Error enviando reseña:', error);
            showToast('Error enviando reseña. Inténtalo de nuevo.', 'error');
            
            // Restaurar botón
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Enviar reseña</span><span class="btn-icon">📤</span>';
            }
        }
    }

    // Mostrar todas las reseñas
    showAllReviews(productId) {
        const productReviews = this.reviews[productId] || [];
        const product = state.products.find(p => p.id === productId);
        
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'review-modal-overlay';
        modal.innerHTML = `
            <div class="review-modal review-modal--large">
                <div class="review-modal-header">
                    <h3>⭐ Todas las reseñas de ${product.name}</h3>
                    <button onclick="this.closest('.review-modal-overlay').remove()" class="button button--secondary">×</button>
                </div>
                <div class="review-modal-content">
                    <div class="reviews-list">
                        ${productReviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="review-user">${review.userName}</span>
                                    <div class="review-stars">${this.generateStars(review.rating)}</div>
                                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                                </div>
                                <p class="review-comment">${review.comment}</p>
                                ${review.photoUrl ? `
                                    <div class="review-photo">
                                        <img src="${review.photoUrl}" alt="Foto de la reseña" onclick="reviewSystem.showPhotoModal('${review.photoUrl}')">
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Mostrar foto en modal
    showPhotoModal(photoUrl) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal-overlay';
        modal.innerHTML = `
            <div class="photo-modal">
                <div class="photo-modal-header">
                    <h3>📸 Foto de la reseña</h3>
                    <button onclick="this.closest('.photo-modal-overlay').remove()" class="button button--secondary">×</button>
                </div>
                <div class="photo-modal-content">
                    <img src="${photoUrl}" alt="Foto de la reseña" class="photo-modal-image">
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar al hacer click fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Instancia global del sistema de reseñas
const reviewSystem = new ReviewSystem();