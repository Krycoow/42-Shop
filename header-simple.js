// Header profesional y funcional
class SimpleHeader {
    constructor() {
        this.init();
    }

    init() {
        this.createHeader();
        this.addEffects();
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'simple-header';
        header.innerHTML = `
            <div class="header-background">
                <div class="holographic-overlay"></div>
                <div class="particle-field"></div>
            </div>
            
            <div class="header-content">
                <div class="main-title">
                    <div class="title-container">
                        <span class="title-text animated-text">
                            <span class="word">LA</span>
                            <span class="word">MEJOR</span>
                            <span class="word">TIENDA</span>
                            <span class="word">DE</span>
                            <span class="word">ROPA</span>
                        </span>
                        <span class="title-accent animated-accent">
                            <span class="word">DEL</span>
                            <span class="word">AÑO</span>
                        </span>
                    </div>
                    <div class="title-effects">
                        <div class="glow-effect"></div>
                        <div class="particle-burst"></div>
                        <div class="energy-waves"></div>
                    </div>
                </div>
                
                <div class="subtitle">
                    <span class="exclusivity-badge">EXCLUSIVIDAD</span>
                    <span class="quality-text">CALIDAD PREMIUM</span>
                    <span class="innovation-text">INNOVACIÓN TOTAL</span>
                </div>
                
                <div class="header-stats">
                    <div class="stat-item">
                        <div class="stat-number">10K</div>
                        <div class="stat-label">CLIENTES FELICES</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24</div>
                        <div class="stat-label">PRODUCTOS ÚNICOS</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">4.75/5</div>
                        <div class="stat-label">SATISFACCIÓN</div>
                    </div>
                </div>
                
                <div class="cta-buttons">
                    <button class="cta-btn primary" onclick="simpleHeader.exploreProducts()">
                        <span class="btn-text">EXPLORAR COLECCIÓN</span>
                        <span class="btn-icon">🚀</span>
                    </button>
                    <button class="cta-btn secondary" onclick="simpleHeader.scrollToAbout()">
                        <span class="btn-text">SOBRE NOSOTROS</span>
                        <span class="btn-icon">👥</span>
                    </button>
                </div>
            </div>
            
            <div class="floating-elements">
                <div class="floating-shape shape-1"></div>
                <div class="floating-shape shape-2"></div>
                <div class="floating-shape shape-3"></div>
            </div>
        `;

        // Insertar al principio del body
        document.body.insertBefore(header, document.body.firstChild);
        
        // Los números ya están fijos, no necesitan animación
    }

    addEffects() {
        this.createParticles();
        this.createFloatingShapes();
        this.addHoverEffects();
        this.createTitleAnimations();
    }

    createParticles() {
        const particleField = document.querySelector('.particle-field');
        if (!particleField) return;

        for (let i = 0; i < 30; i++) {
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
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            `;
            particleField.appendChild(particle);
        }
    }

    createFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, rgba(0, 255, 0, 0.1), rgba(0, 200, 0, 0.05));
                border: 1px solid rgba(0, 255, 0, 0.2);
                border-radius: ${index % 2 === 0 ? '50%' : '20px'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
        });
    }

    addHoverEffects() {
        const buttons = document.querySelectorAll('.cta-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-5px) scale(1.05)';
                button.style.boxShadow = '0 15px 30px rgba(0, 255, 0, 0.4)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
                button.style.boxShadow = '0 8px 20px rgba(0, 255, 0, 0.2)';
            });
        });
    }

    createTitleAnimations() {
        // Animar palabras una por una
        const words = document.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(50px) rotateX(90deg)';
            
            setTimeout(() => {
                word.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 200 + 500);
        });

        // Crear efectos de partículas
        this.createTitleParticles();
        
        // Crear ondas de energía
        this.createEnergyWaves();
        
        // Efecto de brillo continuo
        this.createGlowEffect();
    }

    createTitleParticles() {
        const particleBurst = document.querySelector('.particle-burst');
        if (!particleBurst) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'title-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                animation: particleBurst ${Math.random() * 3 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
            `;
            particleBurst.appendChild(particle);
        }
    }

    createEnergyWaves() {
        const energyWaves = document.querySelector('.energy-waves');
        if (!energyWaves) return;

        for (let i = 0; i < 8; i++) {
            const wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.cssText = `
                position: absolute;
                width: ${Math.random() * 400 + 200}px;
                height: ${Math.random() * 400 + 200}px;
                border: 3px solid rgba(0, 255, 0, 0.3);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: energyWave ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.2);
            `;
            energyWaves.appendChild(wave);
        }
    }

    createGlowEffect() {
        const glowEffect = document.querySelector('.glow-effect');
        if (!glowEffect) return;

        glowEffect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: glowPulse 3s ease-in-out infinite;
            pointer-events: none;
        `;
    }


    // Explorar productos
    exploreProducts() {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
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

    createStyles() {
        const styles = `
        <style>
        .simple-header {
            position: relative;
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            overflow: hidden;
            color: #fff;
            padding: 40px 0;
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
            background: linear-gradient(
                45deg,
                transparent 30%,
                rgba(0, 255, 0, 0.03) 50%,
                transparent 70%
            );
            animation: lightSweep 8s ease-in-out infinite;
        }

        .particle-field {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .header-content {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 1200px;
            padding: 0 20px;
        }

        .main-title {
            margin-bottom: 30px;
            position: relative;
        }

        .title-container {
            position: relative;
            z-index: 2;
        }

        .title-text {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 4rem;
            font-weight: 900;
            color: #00ff00;
            text-shadow: 
                0 0 10px rgba(0, 255, 0, 0.8),
                0 0 20px rgba(0, 255, 0, 0.6),
                0 0 30px rgba(0, 255, 0, 0.4),
                0 0 40px rgba(0, 255, 0, 0.2);
            flex-wrap: wrap;
            filter: none;
            -webkit-text-stroke: 1px rgba(0, 255, 0, 0.3);
        }

        .title-accent {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 2.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-top: 20px;
            text-shadow: 
                0 0 10px rgba(255, 255, 255, 0.8),
                0 0 20px rgba(0, 255, 0, 0.6),
                0 0 30px rgba(0, 255, 0, 0.4);
            flex-wrap: wrap;
            -webkit-text-stroke: 1px rgba(0, 255, 0, 0.5);
        }

        .word {
            display: inline-block;
            position: relative;
            animation: wordFloat 4s ease-in-out infinite;
        }

        .word:nth-child(1) { animation-delay: 0s; }
        .word:nth-child(2) { animation-delay: 0.5s; }
        .word:nth-child(3) { animation-delay: 1s; }
        .word:nth-child(4) { animation-delay: 1.5s; }
        .word:nth-child(5) { animation-delay: 2s; }

        .title-effects {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            pointer-events: none;
        }

        .particle-burst,
        .energy-waves,
        .glow-effect {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .subtitle {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 50px;
            flex-wrap: wrap;
        }

        .exclusivity-badge,
        .quality-text,
        .innovation-text {
            padding: 10px 20px;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            color: #00ff00;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header-stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-bottom: 60px;
            flex-wrap: wrap;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: #00ff00;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        }

        .stat-label {
            color: #ccc;
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }

        .cta-btn {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px 40px;
            border: 2px solid rgba(0, 255, 0, 0.3);
            border-radius: 50px;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 0, 0, 0.8));
            color: #fff;
            font-size: 1.1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .cta-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .cta-btn:hover::before {
            left: 100%;
        }

        .cta-btn:hover {
            border-color: rgba(0, 255, 0, 0.6);
            box-shadow: 0 8px 20px rgba(0, 255, 0, 0.2);
        }

        .cta-btn.primary {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
        }

        .cta-btn.primary:hover {
            background: linear-gradient(135deg, #00cc00, #00ff00);
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 255, 0, 0.4);
        }

        .btn-text {
            position: relative;
            z-index: 2;
        }

        .btn-icon {
            font-size: 1.5rem;
            position: relative;
            z-index: 2;
        }

        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .floating-shape {
            position: absolute;
        }

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(0, 255, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(0, 255, 0, 0.8); }
        }

        @keyframes lightSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes wordFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1); 
                filter: brightness(1);
            }
            50% { 
                transform: translateY(-10px) scale(1.05); 
                filter: brightness(1.2);
            }
        }

        @keyframes particleBurst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                opacity: 0;
            }
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

        @keyframes glowPulse {
            0%, 100% { 
                opacity: 0.3; 
                transform: translate(-50%, -50%) scale(1);
            }
            50% { 
                opacity: 0.6; 
                transform: translate(-50%, -50%) scale(1.1);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .title-text {
                font-size: 2.5rem;
                gap: 10px;
            }
            
            .title-accent {
                font-size: 1.8rem;
                gap: 10px;
            }
            
            .subtitle {
                gap: 15px;
            }
            
            .header-stats {
                gap: 30px;
            }
            
            .stat-number {
                font-size: 2.5rem;
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
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.simpleHeader = new SimpleHeader();
    window.simpleHeader.createStyles();
});
