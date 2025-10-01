// Header súper profesional que te dejará loco

class MindBlowingHeader {
    constructor() {
        this.init();
    }

    init() {
        this.createSpectacularHeader();
        this.addParticleEffects();
        this.addGlitchEffects();
        this.addHolographicEffects();
    }

    // Crear header espectacular
    createSpectacularHeader() {
        const header = document.createElement('div');
        header.className = 'mind-blowing-header';
        header.innerHTML = `
            <div class="header-background">
                <div class="holographic-overlay"></div>
                <div class="particle-field"></div>
                <div class="glitch-lines"></div>
            </div>
            
            <div class="header-content">
                <div class="main-title">
                    <span class="title-text">LA MEJOR TIENDA DE ROPA</span>
                    <span class="title-accent">DEL AÑO</span>
                </div>
                
                <div class="subtitle">
                    <span class="exclusivity-badge">EXCLUSIVIDAD</span>
                    <span class="quality-text">CALIDAD PREMIUM</span>
                    <span class="innovation-text">INNOVACIÓN TOTAL</span>
                </div>
                
                <div class="header-stats">
                    <div class="stat-item">
                        <div class="stat-number" data-target="10000">0</div>
                        <div class="stat-label">CLIENTES FELICES</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="500">0</div>
                        <div class="stat-label">PRODUCTOS ÚNICOS</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="99">0</div>
                        <div class="stat-label">% SATISFACCIÓN</div>
                    </div>
                </div>
                
                <div class="cta-buttons">
                    <button class="cta-btn primary" onclick="mindBlowingHeader.exploreProducts()">
                        <span class="btn-text">EXPLORAR COLECCIÓN</span>
                        <span class="btn-icon">🚀</span>
                    </button>
                    <button class="cta-btn secondary" onclick="mindBlowingHeader.scrollToAbout()">
                        <span class="btn-text">SOBRE NOSOTROS</span>
                        <span class="btn-icon">👥</span>
                    </button>
                </div>
            </div>
            
            <div class="floating-elements">
                <div class="floating-shape shape-1"></div>
                <div class="floating-shape shape-2"></div>
                <div class="floating-shape shape-3"></div>
                <div class="floating-shape shape-4"></div>
                <div class="floating-shape shape-5"></div>
            </div>
        `;
        
        // Insertar después del welcome section
        const welcomeSection = document.getElementById('welcomeSection');
        if (welcomeSection) {
            welcomeSection.insertAdjacentElement('afterend', header);
        } else {
            document.body.insertBefore(header, document.body.firstChild);
        }
        
        // Animar números
        this.animateNumbers();
        
        // Configurar eventos
        this.setupEvents();
    }

    // Añadir efectos de partículas
    addParticleEffects() {
        const particleField = document.querySelector('.particle-field');
        if (!particleField) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            particleField.appendChild(particle);
        }
    }

    // Añadir efectos de glitch
    addGlitchEffects() {
        const glitchLines = document.querySelector('.glitch-lines');
        if (!glitchLines) return;

        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'glitch-line';
            line.style.cssText = `
                position: absolute;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff00, transparent);
                top: ${Math.random() * 100}%;
                animation: glitchLine ${Math.random() * 2 + 1}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                opacity: 0;
            `;
            glitchLines.appendChild(line);
        }
    }

    // Añadir efectos holográficos
    addHolographicEffects() {
        const overlay = document.querySelector('.holographic-overlay');
        if (!overlay) return;

        // Crear ondas holográficas
        for (let i = 0; i < 10; i++) {
            const wave = document.createElement('div');
            wave.className = 'holographic-wave';
            wave.style.cssText = `
                position: absolute;
                width: ${Math.random() * 200 + 100}px;
                height: ${Math.random() * 200 + 100}px;
                border: 2px solid rgba(0, 255, 0, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: holographicPulse ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            overlay.appendChild(wave);
        }
    }

    // Animar números
    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Configurar eventos
    setupEvents() {
        // Efecto de hover en botones
        const buttons = document.querySelectorAll('.cta-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createButtonExplosion(button);
            });
        });

        // Efecto de hover en título
        const title = document.querySelector('.main-title');
        if (title) {
            title.addEventListener('mouseenter', () => {
                this.createTitleGlitch();
            });
        }
    }

    // Crear explosión de botón
    createButtonExplosion(button) {
        const explosion = document.createElement('div');
        explosion.className = 'button-explosion';
        explosion.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.3), transparent);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: buttonExplosion 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        button.style.position = 'relative';
        button.appendChild(explosion);
        
        setTimeout(() => {
            explosion.remove();
        }, 600);
    }

    // Crear glitch del título
    createTitleGlitch() {
        const title = document.querySelector('.main-title');
        if (!title) return;

        title.classList.add('glitch-active');
        setTimeout(() => {
            title.classList.remove('glitch-active');
        }, 500);
    }

    // Explorar productos
    exploreProducts() {
        // Crear efecto de transición espectacular
        this.createTransitionEffect(() => {
            const productsSection = document.getElementById('productsSection');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Scroll a sección Sobre Nosotros
    scrollToAbout() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }


    // Crear efecto de transición
    createTransitionEffect(callback) {
        const transition = document.createElement('div');
        transition.className = 'spectacular-transition';
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, #000, #00ff00, #000);
            z-index: 10000;
            opacity: 0;
            animation: spectacularTransition 1s ease-in-out;
        `;
        
        document.body.appendChild(transition);
        
        setTimeout(() => {
            callback();
            setTimeout(() => {
                transition.remove();
            }, 500);
        }, 500);
    }

    // Crear modal de demo
    createDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'demo-modal-overlay';
        modal.id = 'demoModal';
        modal.innerHTML = `
            <div class="demo-modal">
                <div class="demo-header">
                    <h2>🚀 DEMO INTERACTIVO DE 42SHOP</h2>
                    <button class="demo-close" onclick="mindBlowingHeader.closeDemo()">✕</button>
                </div>
                <div class="demo-content">
                    <div class="demo-video">
                        <div class="video-placeholder" onclick="mindBlowingHeader.playDemo()">
                            <div class="play-button">▶️</div>
                            <p>DEMO EN VIVO</p>
                            <p class="demo-subtitle">Click para reproducir</p>
                        </div>
                    </div>
                    <div class="demo-features">
                        <div class="feature-item">
                            <span class="feature-icon">🎨</span>
                            <span class="feature-text">Diseño Futurista</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">⚡</span>
                            <span class="feature-text">Rendimiento Óptimo</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🔮</span>
                            <span class="feature-text">Tecnología Avanzada</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🛒</span>
                            <span class="feature-text">E-commerce Completo</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">⭐</span>
                            <span class="feature-text">Sistema de Reseñas</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🌍</span>
                            <span class="feature-text">Multiidioma</span>
                        </div>
                    </div>
                    <div class="demo-actions">
                        <button class="demo-btn primary" onclick="mindBlowingHeader.exploreProducts()">
                            🛍️ Explorar Productos
                        </button>
                        <button class="demo-btn secondary" onclick="mindBlowingHeader.closeDemo()">
                            ✨ Cerrar Demo
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 100);
    }

    // Cerrar demo
    closeDemo() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Reproducir demo
    playDemo() {
        const placeholder = document.querySelector('.video-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="demo-playing">
                    <div class="demo-animation">
                        <div class="demo-screen">
                            <div class="demo-header-bar">
                                <div class="demo-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div class="demo-title">42Shop Demo</div>
                            </div>
                            <div class="demo-content-area">
                                <div class="demo-product-grid">
                                    <div class="demo-product"></div>
                                    <div class="demo-product"></div>
                                    <div class="demo-product"></div>
                                    <div class="demo-product"></div>
                                </div>
                                <div class="demo-cart">
                                    <div class="demo-cart-item"></div>
                                    <div class="demo-cart-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>🎬 Demo en reproducción...</p>
                </div>
            `;
            
            // Simular demo por 5 segundos
            setTimeout(() => {
                placeholder.innerHTML = `
                    <div class="play-button">▶️</div>
                    <p>DEMO EN VIVO</p>
                    <p class="demo-subtitle">Click para reproducir</p>
                `;
            }, 5000);
        }
    }
}

// Crear estilos espectaculares
const mindBlowingStyles = `
<style>
.mind-blowing-header {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #000, #001100, #000);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 3px solid #00ff00;
}

.header-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.holographic-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(0, 255, 0, 0.1), transparent),
                radial-gradient(circle at 70% 80%, rgba(0, 255, 0, 0.05), transparent);
}

.particle-field {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.particle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, #00ff00, #00cc00);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.glitch-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.glitch-line {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
    box-shadow: 0 0 10px #00ff00;
}

.header-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    max-width: 1200px;
    padding: 2rem;
}

.main-title {
    margin-bottom: 2rem;
    position: relative;
}

.title-text {
    display: block;
    font-size: 4rem;
    font-weight: 900;
    color: #00ff00;
    text-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
    margin-bottom: 0.5rem;
    animation: titleGlow 2s ease-in-out infinite alternate;
}

.title-accent {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    animation: titlePulse 3s ease-in-out infinite;
}

.subtitle {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.exclusivity-badge,
.quality-text,
.innovation-text {
    padding: 0.8rem 1.5rem;
    border: 2px solid #00ff00;
    border-radius: 25px;
    background: rgba(0, 255, 0, 0.1);
    font-weight: 600;
    font-size: 1.1rem;
    color: #00ff00;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    animation: badgeFloat 2s ease-in-out infinite;
}

.exclusivity-badge {
    animation-delay: 0s;
}

.quality-text {
    animation-delay: 0.5s;
}

.innovation-text {
    animation-delay: 1s;
}

.header-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 3rem;
    font-weight: 900;
    color: #00ff00;
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    color: #ccc;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cta-buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.cta-btn {
    position: relative;
    padding: 1.2rem 2.5rem;
    border: 2px solid #00ff00;
    border-radius: 50px;
    background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 0, 0.05));
    color: #00ff00;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cta-btn:hover {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 0, 0.4);
}

.cta-btn.primary {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
}

.cta-btn.primary:hover {
    background: linear-gradient(135deg, #00cc00, #00ff00);
    transform: translateY(-5px) scale(1.05);
}

.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
}

.floating-shape {
    position: absolute;
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 50%;
    animation: floatShape 6s ease-in-out infinite;
}

.shape-1 {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 1s;
}

.shape-3 {
    width: 80px;
    height: 80px;
    top: 40%;
    left: 80%;
    animation-delay: 2s;
}

.shape-4 {
    width: 120px;
    height: 120px;
    bottom: 20%;
    left: 20%;
    animation-delay: 3s;
}

.shape-5 {
    width: 200px;
    height: 200px;
    top: 10%;
    right: 30%;
    animation-delay: 4s;
}

/* Animaciones */
@keyframes titleGlow {
    0%, 100% { text-shadow: 0 0 30px rgba(0, 255, 0, 0.8); }
    50% { text-shadow: 0 0 50px rgba(0, 255, 0, 1); }
}

@keyframes titlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes badgeFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes particleFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
}

@keyframes glitchLine {
    0%, 100% { opacity: 0; transform: translateX(-100%); }
    50% { opacity: 1; transform: translateX(0); }
}

@keyframes holographicPulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 0.6; }
}

@keyframes floatShape {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes buttonExplosion {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

@keyframes spectacularTransition {
    0% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0; transform: scale(1.2); }
}

.glitch-active {
    animation: glitchEffect 0.5s ease-in-out;
}

@keyframes glitchEffect {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
}

/* Modal de demo */
.demo-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(20px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.demo-modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.demo-modal {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 20, 0, 0.95));
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    color: #fff;
}

.demo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid rgba(0, 255, 0, 0.3);
    padding-bottom: 1rem;
}

.demo-header h2 {
    color: #00ff00;
    margin: 0;
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.demo-close {
    background: none;
    border: 2px solid rgba(0, 255, 0, 0.3);
    color: #00ff00;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.demo-close:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
}

.demo-subtitle {
    font-size: 0.9rem;
    color: #888;
    margin-top: 0.5rem;
}

.demo-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.demo-btn {
    padding: 0.8rem 1.5rem;
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.demo-btn:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.6);
    transform: translateY(-2px);
}

.demo-btn.primary {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
}

.demo-btn.primary:hover {
    background: linear-gradient(135deg, #00cc00, #00ff00);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
}

.demo-playing {
    text-align: center;
    color: #00ff00;
}

.demo-animation {
    margin-bottom: 1rem;
}

.demo-screen {
    width: 300px;
    height: 200px;
    background: #000;
    border: 2px solid #00ff00;
    border-radius: 8px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.demo-header-bar {
    background: #00ff00;
    color: #000;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.demo-dots {
    display: flex;
    gap: 0.25rem;
}

.demo-dots span {
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
}

.demo-title {
    font-weight: 700;
    font-size: 0.9rem;
}

.demo-content-area {
    padding: 1rem;
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.demo-product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
}

.demo-product {
    height: 30px;
    background: linear-gradient(45deg, #00ff00, #00cc00);
    border-radius: 4px;
    animation: demoPulse 2s ease-in-out infinite;
}

.demo-cart {
    display: flex;
    gap: 0.5rem;
}

.demo-cart-item {
    height: 20px;
    background: #00ff00;
    border-radius: 4px;
    flex: 1;
    animation: demoSlide 3s ease-in-out infinite;
}

@keyframes demoPulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
}

@keyframes demoSlide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
}

.demo-video {
    margin-bottom: 2rem;
}

.video-placeholder {
    background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 255, 0, 0.05));
    border: 2px dashed rgba(0, 255, 0, 0.3);
    border-radius: 12px;
    padding: 3rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.video-placeholder:hover {
    border-color: rgba(0, 255, 0, 0.6);
    background: rgba(0, 255, 0, 0.1);
}

.play-button {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: playPulse 2s ease-in-out infinite;
}

@keyframes playPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.demo-features {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 255, 0, 0.05);
    border: 1px solid rgba(0, 255, 0, 0.2);
    border-radius: 20px;
    transition: all 0.3s ease;
}

.feature-item:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-2px);
}

.feature-icon {
    font-size: 1.2rem;
}

.feature-text {
    font-size: 0.9rem;
    font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
    .title-text {
        font-size: 2.5rem;
    }
    
    .title-accent {
        font-size: 1.8rem;
    }
    
    .subtitle {
        flex-direction: column;
        gap: 1rem;
    }
    
    .header-stats {
        gap: 2rem;
    }
    
    .stat-number {
        font-size: 2rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .cta-btn {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 480px) {
    .title-text {
        font-size: 2rem;
    }
    
    .title-accent {
        font-size: 1.5rem;
    }
    
    .stat-number {
        font-size: 1.5rem;
    }
    
    .exclusivity-badge,
    .quality-text,
    .innovation-text {
        font-size: 0.9rem;
        padding: 0.6rem 1rem;
    }
}
</style>
`;

// Añadir estilos
document.head.insertAdjacentHTML('beforeend', mindBlowingStyles);

// Inicializar header espectacular
document.addEventListener('DOMContentLoaded', () => {
    window.mindBlowingHeader = new MindBlowingHeader();
});
