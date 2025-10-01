// Efecto súper sorprendente al hacer click en productos

class MindBlowingProductClick {
    constructor() {
        this.init();
    }

    init() {
        this.setupProductClickEffects();
        this.createSpectacularStyles();
    }

    // Configurar efectos de click en productos
    setupProductClickEffects() {
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.card');
            if (productCard) {
                e.preventDefault();
                this.createSpectacularProductEffect(productCard);
            }
        });
    }

    // Crear efecto espectacular del producto
    createSpectacularProductEffect(productCard) {
        const productId = productCard.dataset.productId;
        const product = window.state.products.find(p => p.id == productId);
        
        if (!product) return;

        // Crear overlay espectacular
        const overlay = document.createElement('div');
        overlay.className = 'spectacular-product-overlay';
        overlay.innerHTML = `
            <div class="spectacular-background">
                <div class="holographic-grid"></div>
                <div class="energy-waves"></div>
                <div class="particle-explosion"></div>
            </div>
            
            <div class="spectacular-content">
                <div class="product-hologram">
                    <div class="hologram-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="hologram-scan-lines"></div>
                    </div>
                    <div class="hologram-info">
                        <h2 class="hologram-title">${product.name}</h2>
                        <p class="hologram-description">${product.description}</p>
                        <div class="hologram-price">${product.price.toFixed(2)} €</div>
                    </div>
                </div>
                
                <div class="spectacular-actions">
                    <button class="spectacular-btn primary" onclick="mindBlowingProductClick.addToCart(${productId})">
                        <span class="btn-icon">🛒</span>
                        <span class="btn-text">AÑADIR AL CARRITO</span>
                        <div class="btn-glow"></div>
                    </button>
                    <button class="spectacular-btn secondary" onclick="mindBlowingProductClick.viewReviews(${productId})">
                        <span class="btn-icon">⭐</span>
                        <span class="btn-text">VER RESEÑAS</span>
                        <div class="btn-glow"></div>
                    </button>
                    <button class="spectacular-btn tertiary" onclick="mindBlowingProductClick.buyNow(${productId})">
                        <span class="btn-icon">⚡</span>
                        <span class="btn-text">COMPRAR AHORA</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
                
                <div class="spectacular-features">
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <div class="feature-text">Envío Gratis</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔒</div>
                        <div class="feature-text">Compra Segura</div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">↩️</div>
                        <div class="feature-text">Devolución Fácil</div>
                    </div>
                </div>
            </div>
            
            <button class="spectacular-close" onclick="mindBlowingProductClick.closeSpectacular()">
                <span>✕</span>
            </button>
        `;
        
        document.body.appendChild(overlay);
        
        // Animar entrada
        setTimeout(() => {
            overlay.classList.add('active');
            this.createParticleExplosion(overlay);
            this.createHolographicGrid(overlay);
            this.createEnergyWaves(overlay);
        }, 100);
    }

    // Crear explosión de partículas
    createParticleExplosion(overlay) {
        const particleContainer = overlay.querySelector('.particle-explosion');
        if (!particleContainer) return;

        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                animation: particleExplosion ${Math.random() * 2 + 1}s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Crear grid holográfico
    createHolographicGrid(overlay) {
        const gridContainer = overlay.querySelector('.holographic-grid');
        if (!gridContainer) return;

        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.cssText = `
                position: absolute;
                background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
                animation: gridPulse ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            if (i % 2 === 0) {
                line.style.width = '100%';
                line.style.height = '1px';
                line.style.top = `${Math.random() * 100}%`;
            } else {
                line.style.height = '100%';
                line.style.width = '1px';
                line.style.left = `${Math.random() * 100}%`;
            }
            
            gridContainer.appendChild(line);
        }
    }

    // Crear ondas de energía
    createEnergyWaves(overlay) {
        const wavesContainer = overlay.querySelector('.energy-waves');
        if (!wavesContainer) return;

        for (let i = 0; i < 10; i++) {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.cssText = `
                position: absolute;
                width: ${Math.random() * 300 + 100}px;
                height: ${Math.random() * 300 + 100}px;
                border: 2px solid rgba(0, 255, 0, 0.4);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: energyWave ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            wavesContainer.appendChild(wave);
        }
    }

    // Añadir al carrito
    addToCart(productId) {
        if (window.addToCartWithQuantity) {
            window.addToCartWithQuantity(productId, 1);
        }
        this.closeSpectacular();
    }

    // Ver reseñas
    viewReviews(productId) {
        this.closeSpectacular();
        setTimeout(() => {
            if (window.professionalReviews) {
                window.professionalReviews.showReviewsModal(productId);
            }
        }, 300);
    }

    // Comprar ahora
    buyNow(productId) {
        if (window.addToCartWithQuantity) {
            window.addToCartWithQuantity(productId, 1);
        }
        this.closeSpectacular();
        
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 500);
    }

    // Crear efecto de éxito
    createSuccessEffect(message) {
        const success = document.createElement('div');
        success.className = 'success-effect';
        success.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✅</div>
                <div class="success-message">${message}</div>
            </div>
        `;
        success.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.9), rgba(0, 200, 0, 0.9));
            color: #000;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: 700;
            z-index: 10001;
            animation: successPop 2s ease-out forwards;
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.5);
        `;
        
        document.body.appendChild(success);
        
        setTimeout(() => {
            success.remove();
        }, 2000);
    }

    // Cerrar efecto espectacular
    closeSpectacular() {
        const overlay = document.querySelector('.spectacular-product-overlay');
        if (overlay) {
            overlay.classList.add('closing');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
    }

    // Crear estilos espectaculares
    createSpectacularStyles() {
        const styles = `
        <style>
        .spectacular-product-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s ease;
        }

        .spectacular-product-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .spectacular-product-overlay.closing {
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8);
        }

        .spectacular-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .holographic-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .grid-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        .energy-waves {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .energy-wave {
            position: absolute;
            border: 2px solid rgba(0, 255, 0, 0.4);
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }

        .particle-explosion {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .particle {
            position: absolute;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
        }

        .spectacular-content {
            position: relative;
            z-index: 2;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 20, 0, 0.9));
            border: 2px solid rgba(0, 255, 0, 0.3);
            border-radius: 20px;
            padding: 3rem;
            max-width: 800px;
            width: 90%;
            color: #fff;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 255, 0, 0.3);
        }

        .product-hologram {
            margin-bottom: 3rem;
        }

        .hologram-image {
            position: relative;
            margin-bottom: 2rem;
        }

        .hologram-image img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 20px;
            border: 3px solid rgba(0, 255, 0, 0.5);
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: hologramFloat 3s ease-in-out infinite;
        }

        .hologram-scan-lines {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(0, 255, 0, 0.1) 50%,
                transparent 100%
            );
            animation: scanLines 2s linear infinite;
            border-radius: 20px;
        }

        .hologram-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: #00ff00;
            text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
            margin-bottom: 1rem;
            animation: titleGlow 2s ease-in-out infinite alternate;
        }

        .hologram-description {
            font-size: 1.2rem;
            color: #ccc;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .hologram-price {
            font-size: 2rem;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .spectacular-actions {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .spectacular-btn {
            position: relative;
            padding: 1rem 2rem;
            border: 2px solid #00ff00;
            border-radius: 50px;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 0, 0.05));
            color: #00ff00;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            min-width: 200px;
            justify-content: center;
        }

        .spectacular-btn:hover {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 255, 0, 0.4);
        }

        .spectacular-btn.primary {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
        }

        .spectacular-btn.primary:hover {
            background: linear-gradient(135deg, #00cc00, #00ff00);
            transform: translateY(-5px) scale(1.05);
        }

        .btn-glow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.2), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .spectacular-btn:hover .btn-glow {
            opacity: 1;
        }

        .spectacular-features {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .feature-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: rgba(0, 255, 0, 0.05);
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 15px;
            transition: all 0.3s ease;
            min-width: 120px;
        }

        .feature-card:hover {
            background: rgba(0, 255, 0, 0.1);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 255, 0, 0.2);
        }

        .feature-icon {
            font-size: 2rem;
        }

        .feature-text {
            font-size: 0.9rem;
            font-weight: 600;
            color: #00ff00;
        }

        .spectacular-close {
            position: absolute;
            top: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: rgba(0, 255, 0, 0.1);
            border: 2px solid rgba(0, 255, 0, 0.3);
            border-radius: 50%;
            color: #00ff00;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            z-index: 3;
        }

        .spectacular-close:hover {
            background: rgba(0, 255, 0, 0.2);
            border-color: rgba(0, 255, 0, 0.6);
            transform: scale(1.1);
        }

        .success-effect {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10001;
        }

        .success-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .success-icon {
            font-size: 3rem;
            animation: successBounce 0.6s ease-out;
        }

        .success-message {
            font-size: 1.2rem;
            font-weight: 700;
            text-align: center;
        }

        /* Animaciones */
        @keyframes hologramFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes scanLines {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
            50% { text-shadow: 0 0 40px rgba(0, 255, 0, 0.8); }
        }

        @keyframes particleExplosion {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }

        @keyframes gridPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }

        @keyframes energyWave {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }

        @keyframes successPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }

        @keyframes successBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .spectacular-content {
                padding: 2rem;
                margin: 1rem;
            }
            
            .hologram-image img {
                width: 150px;
                height: 150px;
            }
            
            .hologram-title {
                font-size: 2rem;
            }
            
            .spectacular-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .spectacular-btn {
                width: 100%;
                max-width: 300px;
            }
            
            .spectacular-features {
                gap: 1rem;
            }
        }

        @media (max-width: 480px) {
            .hologram-title {
                font-size: 1.5rem;
            }
            
            .hologram-description {
                font-size: 1rem;
            }
            
            .hologram-price {
                font-size: 1.5rem;
            }
        }
        </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar efectos espectaculares
document.addEventListener('DOMContentLoaded', () => {
    window.mindBlowingProductClick = new MindBlowingProductClick();
});
