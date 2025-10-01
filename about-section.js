// Sección "Sobre Nosotros" con animaciones espectaculares
class AboutSection {
    constructor() {
        this.init();
    }

    init() {
        this.createAboutSection();
        this.setupAnimations();
        this.createSpectacularStyles();
    }

    createAboutSection() {
        const aboutHTML = `
            <section class="about-section" id="about">
                <div class="about-background">
                    <div class="floating-particles"></div>
                    <div class="geometric-shapes"></div>
                    <div class="light-rays"></div>
                </div>
                
                <div class="about-container">
                    <div class="about-header">
                        <h2 class="about-title" data-i18n="about-title">Sobre Nosotros</h2>
                        <div class="title-underline"></div>
                        <p class="about-subtitle" data-i18n="about-subtitle">Más de 10 años creando la moda del futuro</p>
                    </div>

                    <div class="about-content">
                        <div class="about-story">
                            <div class="story-card">
                                <div class="story-icon">🚀</div>
                                <h3 class="story-title" data-i18n="story-title-1">Nuestra Historia</h3>
                                <p class="story-text" data-i18n="story-text-1">
                                    Desde 2014, hemos estado a la vanguardia de la moda tecnológica, 
                                    combinando diseño innovador con la última tecnología. Nuestro logo "42" 
                                    representa la respuesta a todo en el universo de la moda.
                                </p>
                            </div>

                            <div class="story-card">
                                <div class="story-icon">💎</div>
                                <h3 class="story-title" data-i18n="story-title-2">Calidad Premium</h3>
                                <p class="story-text" data-i18n="story-text-2">
                                    Cada producto está diseñado con materiales de la más alta calidad. 
                                    Trabajamos con los mejores proveedores del mundo para garantizar 
                                    que cada prenda supere tus expectativas.
                                </p>
                            </div>

                            <div class="story-card">
                                <div class="story-icon">🌍</div>
                                <h3 class="story-title" data-i18n="story-title-3">Impacto Global</h3>
                                <p class="story-text" data-i18n="story-text-3">
                                    Hemos vestido a más de 1 millón de personas en 50+ países. 
                                    Nuestra misión es democratizar la moda de alta calidad, 
                                    haciéndola accesible para todos.
                                </p>
                            </div>
                        </div>

                        <div class="about-stats">
                            <div class="stat-item">
                                <div class="stat-number">10</div>
                                <div class="stat-label">Años de Experiencia</div>
                                <div class="stat-icon">📅</div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-number">10K</div>
                                <div class="stat-label">Clientes Satisfechos</div>
                                <div class="stat-icon">👥</div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-number">Esp/Port</div>
                                <div class="stat-label">España & Portugal</div>
                                <div class="stat-icon">🌍</div>
                            </div>
                            
                            <div class="stat-item">
                                <div class="stat-number">4.75/5</div>
                                <div class="stat-label">Satisfacción</div>
                                <div class="stat-icon">⭐</div>
                            </div>
                        </div>

                        <div class="about-values">
                            <h3 class="values-title" data-i18n="values-title">Nuestros Valores</h3>
                            <div class="values-grid">
                                <div class="value-item">
                                    <div class="value-icon">🎨</div>
                                    <h4 class="value-name" data-i18n="value-innovation">Innovación</h4>
                                    <p class="value-desc" data-i18n="value-innovation-desc">Siempre buscamos nuevas formas de sorprenderte</p>
                                </div>
                                
                                <div class="value-item">
                                    <div class="value-icon">🤝</div>
                                    <h4 class="value-name" data-i18n="value-quality">Calidad</h4>
                                    <p class="value-desc" data-i18n="value-quality-desc">Cada detalle cuenta en nuestros productos</p>
                                </div>
                                
                                <div class="value-item">
                                    <div class="value-icon">💚</div>
                                    <h4 class="value-name" data-i18n="value-sustainability">Sostenibilidad</h4>
                                    <p class="value-desc" data-i18n="value-sustainability-desc">Cuidamos el planeta con cada decisión</p>
                                </div>
                                
                                <div class="value-item">
                                    <div class="value-icon">🚀</div>
                                    <h4 class="value-name" data-i18n="value-future">Futuro</h4>
                                    <p class="value-desc" data-i18n="value-future-desc">Construimos la moda del mañana hoy</p>
                                </div>
                            </div>
                        </div>

                        <div class="about-team">
                            <h3 class="team-title" data-i18n="team-title">Nuestro Equipo</h3>
                            <div class="team-grid">
                                <div class="team-member">
                                    <div class="member-avatar">
                                        <div class="avatar-placeholder">💻</div>
                                        <div class="avatar-glow"></div>
                                    </div>
                                    <h4 class="member-name" data-i18n="member-ceo">KryDev</h4>
                                    <p class="member-role" data-i18n="role-ceo">CEO & Fundador</p>
                                    <p class="member-desc" data-i18n="desc-ceo">Genio de la programación y visionario de la moda tecnológica</p>
                                </div>
                                
                                <div class="team-member">
                                    <div class="member-avatar">
                                        <div class="avatar-placeholder">👩‍🎨</div>
                                        <div class="avatar-glow"></div>
                                    </div>
                                    <h4 class="member-name" data-i18n="member-designer">Luna Rodriguez</h4>
                                    <p class="member-role" data-i18n="role-designer">Directora de Diseño</p>
                                    <p class="member-desc" data-i18n="desc-designer">Artista digital que da vida a cada producto con creatividad única</p>
                                </div>
                                
                                <div class="team-member">
                                    <div class="member-avatar">
                                        <div class="avatar-placeholder">🚀</div>
                                        <div class="avatar-glow"></div>
                                    </div>
                                    <h4 class="member-name" data-i18n="member-tech">Nexus AI</h4>
                                    <p class="member-role" data-i18n="role-tech">CTO & IA</p>
                                    <p class="member-desc" data-i18n="desc-tech">Inteligencia artificial que optimiza cada aspecto de la experiencia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insertar antes de la sección de productos
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            productsSection.insertAdjacentHTML('beforebegin', aboutHTML);
        } else {
            // Si no existe la sección de productos, insertar al final del main
            const main = document.querySelector('main');
            if (main) {
                main.insertAdjacentHTML('beforeend', aboutHTML);
            }
        }
    }

    setupAnimations() {
        // Animar tarjetas al hacer scroll
        this.animateCards();
        
        // Crear efectos de partículas
        this.createParticleEffects();
        
        // Animar formas geométricas
        this.animateGeometricShapes();
    }


    animateCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        const cards = document.querySelectorAll('.story-card, .value-item, .team-member');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    createParticleEffects() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

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
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            `;
            particleContainer.appendChild(particle);
        }
    }

    animateGeometricShapes() {
        const shapesContainer = document.querySelector('.geometric-shapes');
        if (!shapesContainer) return;

        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'geometric-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: linear-gradient(45deg, rgba(0, 255, 0, 0.1), rgba(0, 200, 0, 0.05));
                border: 1px solid rgba(0, 255, 0, 0.2);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: rotate ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            // Hacer formas diferentes
            if (i % 3 === 0) {
                shape.style.borderRadius = '50%';
            } else if (i % 3 === 1) {
                shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            shapesContainer.appendChild(shape);
        }
    }

    createSpectacularStyles() {
        const styles = `
        <style>
        .about-section {
            position: relative;
            padding: 40px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            overflow: hidden;
            margin: 0;
        }

        .about-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .floating-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .geometric-shapes {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .light-rays {
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

        .about-container {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
        }

        .about-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .about-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .title-underline {
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #00ff00, #00cc00);
            margin: 0 auto 30px;
            border-radius: 2px;
            animation: underlineGlow 2s ease-in-out infinite alternate;
        }

        .about-subtitle {
            font-size: 1.5rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .about-story {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-bottom: 60px;
        }

        .story-card {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            transition: all 0.5s ease;
            opacity: 0;
            transform: translateY(50px);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }

        .story-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .story-card:hover::before {
            left: 100%;
        }

        .story-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .story-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .story-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: iconFloat 3s ease-in-out infinite;
        }

        .story-title {
            font-size: 1.8rem;
            color: #00ff00;
            margin-bottom: 20px;
            font-weight: 700;
        }

        .story-text {
            color: #ccc;
            line-height: 1.8;
            font-size: 1.1rem;
        }

        .about-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 60px;
        }

        .stat-item {
            text-align: center;
            padding: 30px 20px;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 0, 0, 0.6));
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 15px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .stat-item:hover {
            transform: translateY(-5px);
            border-color: rgba(0, 255, 0, 0.6);
            box-shadow: 0 15px 30px rgba(0, 255, 0, 0.3);
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            color: #00ff00;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        }

        .stat-label {
            color: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .stat-icon {
            font-size: 2rem;
            opacity: 0.7;
        }

        .about-values {
            margin-bottom: 50px;
        }

        .values-title {
            text-align: center;
            font-size: 2.5rem;
            color: #00ff00;
            margin-bottom: 50px;
            font-weight: 700;
        }

        .values-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }

        .value-item {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 15px;
            padding: 30px 20px;
            text-align: center;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(30px);
        }

        .value-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .value-item:hover {
            transform: translateY(-5px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 10px 25px rgba(0, 255, 0, 0.2);
        }

        .value-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
        }

        .value-name {
            color: #00ff00;
            font-size: 1.3rem;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .value-desc {
            color: #ccc;
            font-size: 1rem;
            line-height: 1.6;
        }

        .about-team {
            text-align: center;
        }

        .team-title {
            font-size: 2.5rem;
            color: #00ff00;
            margin-bottom: 50px;
            font-weight: 700;
        }

        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
        }

        .team-member {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(30px);
        }

        .team-member.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .team-member:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .member-avatar {
            position: relative;
            width: 100px;
            height: 100px;
            margin: 0 auto 20px;
        }

        .avatar-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            position: relative;
            z-index: 2;
        }

        .avatar-glow {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            border-radius: 50%;
            opacity: 0.3;
            animation: avatarPulse 2s ease-in-out infinite;
        }

        .member-name {
            color: #fff;
            font-size: 1.5rem;
            margin-bottom: 5px;
            font-weight: 700;
        }

        .member-role {
            color: #00ff00;
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .member-desc {
            color: #ccc;
            font-size: 1rem;
            line-height: 1.6;
        }

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(0, 255, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(0, 255, 0, 0.8); }
        }

        @keyframes underlineGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.3); }
            50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.6); }
        }

        @keyframes iconFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes lightSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }

        @keyframes avatarPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.6; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .about-section {
                padding: 40px 0;
                margin: 20px 0;
            }
            
            .about-title {
                font-size: 2.2rem;
            }
            
            .about-subtitle {
                font-size: 1.1rem;
            }
            
            .about-header {
                margin-bottom: 30px;
            }
            
            .story-card {
                padding: 25px 20px;
            }
            
            .stat-number {
                font-size: 2.2rem;
            }
            
            .values-title,
            .team-title {
                font-size: 1.8rem;
            }
            
            .about-story,
            .about-stats,
            .about-values {
                margin-bottom: 30px;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.aboutSection = new AboutSection();
});
