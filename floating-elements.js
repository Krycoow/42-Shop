// Elementos flotantes para llenar espacios vacíos
class FloatingElements {
    constructor() {
        this.init();
    }

    init() {
        this.createFloatingStats();
        this.createFloatingBadges();
        this.createFloatingParticles();
        this.createFloatingText();
    }

    createFloatingStats() {
        const statsHTML = `
            <div class="floating-stats">
                <div class="stat-floating" id="stat1">
                    <div class="stat-icon">🛍️</div>
                    <div class="stat-number" data-target="1247">0</div>
                    <div class="stat-label">Compras Hoy</div>
                </div>
                <div class="stat-floating" id="stat2">
                    <div class="stat-icon">👥</div>
                    <div class="stat-number" data-target="89">0</div>
                    <div class="stat-label">Usuarios Online</div>
                </div>
                <div class="stat-floating" id="stat3">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-number" data-target="4">0</div>
                    <div class="stat-label">Valoración</div>
                </div>
                <div class="stat-floating" id="stat4">
                    <div class="stat-icon">🚚</div>
                    <div class="stat-number" data-target="24">0</div>
                    <div class="stat-label">Horas Envío</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', statsHTML);
        this.animateStats();
    }

    createFloatingBadges() {
        const badgesHTML = `
            <div class="floating-badges">
                <div class="badge-floating" id="badge1">
                    <span class="badge-icon">🔥</span>
                    <span class="badge-text">TENDENCIA</span>
                </div>
                <div class="badge-floating" id="badge2">
                    <span class="badge-icon">💎</span>
                    <span class="badge-text">PREMIUM</span>
                </div>
                <div class="badge-floating" id="badge3">
                    <span class="badge-icon">⚡</span>
                    <span class="badge-text">RÁPIDO</span>
                </div>
                <div class="badge-floating" id="badge4">
                    <span class="badge-icon">🎯</span>
                    <span class="badge-text">EXACTO</span>
                </div>
                <div class="badge-floating" id="badge5">
                    <span class="badge-icon">🌟</span>
                    <span class="badge-text">EXCLUSIVO</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', badgesHTML);
        this.animateBadges();
    }

    createFloatingParticles() {
        const particlesHTML = `
            <div class="floating-particles">
                <div class="particle" id="particle1"></div>
                <div class="particle" id="particle2"></div>
                <div class="particle" id="particle3"></div>
                <div class="particle" id="particle4"></div>
                <div class="particle" id="particle5"></div>
                <div class="particle" id="particle6"></div>
                <div class="particle" id="particle7"></div>
                <div class="particle" id="particle8"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', particlesHTML);
        this.animateParticles();
    }

    createFloatingText() {
        const textHTML = `
            <div class="floating-text">
                <div class="text-floating" id="text1">¡NUEVO!</div>
                <div class="text-floating" id="text2">¡OFERTA!</div>
                <div class="text-floating" id="text3">¡GRATIS!</div>
                <div class="text-floating" id="text4">¡LIMITADO!</div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', textHTML);
        this.animateText();
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-floating');
        stats.forEach((stat, index) => {
            // Posicionar aleatoriamente
            const x = Math.random() * (window.innerWidth - 200);
            const y = Math.random() * (window.innerHeight - 200) + 100;
            
            stat.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 100;
                animation: statFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;

            // Animar números
            const number = stat.querySelector('.stat-number');
            const target = parseInt(number.dataset.target);
            this.animateNumber(number, target);
        });
    }

    animateBadges() {
        const badges = document.querySelectorAll('.badge-floating');
        badges.forEach((badge, index) => {
            const x = Math.random() * (window.innerWidth - 150);
            const y = Math.random() * (window.innerHeight - 100) + 50;
            
            badge.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 99;
                animation: badgeFloat ${4 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${index * 0.3}s;
            `;
        });
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 6 + 2;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                border-radius: 50%;
                z-index: 50;
                animation: particleFloat ${5 + Math.random() * 5}s linear infinite;
                animation-delay: ${index * 0.2}s;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            `;
        });
    }

    animateText() {
        const texts = document.querySelectorAll('.text-floating');
        texts.forEach((text, index) => {
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 50) + 25;
            
            text.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 98;
                animation: textFloat ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${index * 0.4}s;
            `;
        });
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    createStyles() {
        const styles = `
        <style>
        .floating-stats {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
        }

        .stat-floating {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(0, 255, 0, 0.3);
            border-radius: 15px;
            padding: 15px 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 255, 0, 0.2);
            min-width: 120px;
        }

        .stat-icon {
            font-size: 1.5rem;
            margin-bottom: 8px;
        }

        .stat-number {
            font-size: 1.8rem;
            font-weight: 900;
            color: #00ff00;
            margin-bottom: 5px;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        .stat-label {
            font-size: 0.8rem;
            color: #ccc;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .floating-badges {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99;
        }

        .badge-floating {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
            min-width: 100px;
        }

        .badge-icon {
            font-size: 1.2rem;
        }

        .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
        }

        .floating-text {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 98;
        }

        .text-floating {
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: #000;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            min-width: 80px;
            text-align: center;
        }

        /* Animaciones */
        @keyframes statFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-20px) rotate(2deg); 
                opacity: 1;
            }
        }

        @keyframes badgeFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1); 
            }
            50% { 
                transform: translateY(-15px) scale(1.05); 
            }
        }

        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes textFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.7;
            }
            50% { 
                transform: translateY(-10px) rotate(1deg); 
                opacity: 1;
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .stat-floating {
                min-width: 100px;
                padding: 12px 16px;
            }
            
            .stat-number {
                font-size: 1.5rem;
            }
            
            .badge-floating {
                min-width: 80px;
                padding: 6px 12px;
                font-size: 0.8rem;
            }
            
            .text-floating {
                min-width: 60px;
                padding: 4px 8px;
                font-size: 0.7rem;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.floatingElements = new FloatingElements();
    window.floatingElements.createStyles();
});


    constructor() {
        this.init();
    }

    init() {
        this.createFloatingStats();
        this.createFloatingBadges();
        this.createFloatingParticles();
        this.createFloatingText();
    }

    createFloatingStats() {
        const statsHTML = `
            <div class="floating-stats">
                <div class="stat-floating" id="stat1">
                    <div class="stat-icon">🛍️</div>
                    <div class="stat-number" data-target="1247">0</div>
                    <div class="stat-label">Compras Hoy</div>
                </div>
                <div class="stat-floating" id="stat2">
                    <div class="stat-icon">👥</div>
                    <div class="stat-number" data-target="89">0</div>
                    <div class="stat-label">Usuarios Online</div>
                </div>
                <div class="stat-floating" id="stat3">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-number" data-target="4">0</div>
                    <div class="stat-label">Valoración</div>
                </div>
                <div class="stat-floating" id="stat4">
                    <div class="stat-icon">🚚</div>
                    <div class="stat-number" data-target="24">0</div>
                    <div class="stat-label">Horas Envío</div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', statsHTML);
        this.animateStats();
    }

    createFloatingBadges() {
        const badgesHTML = `
            <div class="floating-badges">
                <div class="badge-floating" id="badge1">
                    <span class="badge-icon">🔥</span>
                    <span class="badge-text">TENDENCIA</span>
                </div>
                <div class="badge-floating" id="badge2">
                    <span class="badge-icon">💎</span>
                    <span class="badge-text">PREMIUM</span>
                </div>
                <div class="badge-floating" id="badge3">
                    <span class="badge-icon">⚡</span>
                    <span class="badge-text">RÁPIDO</span>
                </div>
                <div class="badge-floating" id="badge4">
                    <span class="badge-icon">🎯</span>
                    <span class="badge-text">EXACTO</span>
                </div>
                <div class="badge-floating" id="badge5">
                    <span class="badge-icon">🌟</span>
                    <span class="badge-text">EXCLUSIVO</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', badgesHTML);
        this.animateBadges();
    }

    createFloatingParticles() {
        const particlesHTML = `
            <div class="floating-particles">
                <div class="particle" id="particle1"></div>
                <div class="particle" id="particle2"></div>
                <div class="particle" id="particle3"></div>
                <div class="particle" id="particle4"></div>
                <div class="particle" id="particle5"></div>
                <div class="particle" id="particle6"></div>
                <div class="particle" id="particle7"></div>
                <div class="particle" id="particle8"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', particlesHTML);
        this.animateParticles();
    }

    createFloatingText() {
        const textHTML = `
            <div class="floating-text">
                <div class="text-floating" id="text1">¡NUEVO!</div>
                <div class="text-floating" id="text2">¡OFERTA!</div>
                <div class="text-floating" id="text3">¡GRATIS!</div>
                <div class="text-floating" id="text4">¡LIMITADO!</div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', textHTML);
        this.animateText();
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-floating');
        stats.forEach((stat, index) => {
            // Posicionar aleatoriamente
            const x = Math.random() * (window.innerWidth - 200);
            const y = Math.random() * (window.innerHeight - 200) + 100;
            
            stat.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 100;
                animation: statFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
            `;

            // Animar números
            const number = stat.querySelector('.stat-number');
            const target = parseInt(number.dataset.target);
            this.animateNumber(number, target);
        });
    }

    animateBadges() {
        const badges = document.querySelectorAll('.badge-floating');
        badges.forEach((badge, index) => {
            const x = Math.random() * (window.innerWidth - 150);
            const y = Math.random() * (window.innerHeight - 100) + 50;
            
            badge.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 99;
                animation: badgeFloat ${4 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${index * 0.3}s;
            `;
        });
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 6 + 2;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                border-radius: 50%;
                z-index: 50;
                animation: particleFloat ${5 + Math.random() * 5}s linear infinite;
                animation-delay: ${index * 0.2}s;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            `;
        });
    }

    animateText() {
        const texts = document.querySelectorAll('.text-floating');
        texts.forEach((text, index) => {
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 50) + 25;
            
            text.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                z-index: 98;
                animation: textFloat ${6 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${index * 0.4}s;
            `;
        });
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    createStyles() {
        const styles = `
        <style>
        .floating-stats {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
        }

        .stat-floating {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(0, 255, 0, 0.3);
            border-radius: 15px;
            padding: 15px 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 255, 0, 0.2);
            min-width: 120px;
        }

        .stat-icon {
            font-size: 1.5rem;
            margin-bottom: 8px;
        }

        .stat-number {
            font-size: 1.8rem;
            font-weight: 900;
            color: #00ff00;
            margin-bottom: 5px;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        .stat-label {
            font-size: 0.8rem;
            color: #ccc;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .floating-badges {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99;
        }

        .badge-floating {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
            min-width: 100px;
        }

        .badge-icon {
            font-size: 1.2rem;
        }

        .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
        }

        .floating-text {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 98;
        }

        .text-floating {
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: #000;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            min-width: 80px;
            text-align: center;
        }

        /* Animaciones */
        @keyframes statFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-20px) rotate(2deg); 
                opacity: 1;
            }
        }

        @keyframes badgeFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1); 
            }
            50% { 
                transform: translateY(-15px) scale(1.05); 
            }
        }

        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes textFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
                opacity: 0.7;
            }
            50% { 
                transform: translateY(-10px) rotate(1deg); 
                opacity: 1;
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .stat-floating {
                min-width: 100px;
                padding: 12px 16px;
            }
            
            .stat-number {
                font-size: 1.5rem;
            }
            
            .badge-floating {
                min-width: 80px;
                padding: 6px 12px;
                font-size: 0.8rem;
            }
            
            .text-floating {
                min-width: 60px;
                padding: 4px 8px;
                font-size: 0.7rem;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.floatingElements = new FloatingElements();
    window.floatingElements.createStyles();
});

