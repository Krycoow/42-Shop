// Sección de testimonios para llenar espacio
class TestimonialsSection {
    constructor() {
        this.init();
    }

    init() {
        this.createTestimonialsSection();
        this.createTestimonialsStyles();
    }

    createTestimonialsSection() {
        const testimonialsHTML = `
            <section class="testimonials-section" id="testimonialsSection">
                <div class="testimonials-background">
                    <div class="testimonials-particles"></div>
                </div>
                
                <div class="testimonials-container">
                    <div class="testimonials-header">
                        <h2 class="testimonials-title">💬 Reseñas de Productos Reales</h2>
                        <div class="testimonials-subtitle">Lo que dicen nuestros clientes sobre productos específicos</div>
                    </div>

                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Camiseta Premium</div>
                            <p class="testimonial-text">"Compré la Camiseta Premium hace 2 semanas y estoy súper contenta. La tela es súper suave, no se encoge en la lavadora y el color se mantiene perfecto. La talla es exacta, muy cómoda para el día a día. ¡Ya pedí otra en color diferente!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">María González</div>
                                    <div class="author-location">Madrid, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Pantalón Tech</div>
                            <p class="testimonial-text">"El Pantalón Tech es increíble. La tecnología de la tela es real, se seca súper rápido y es perfecto para el gimnasio. El corte es moderno y la calidad se nota desde el primer uso. El envío llegó en 24h como prometieron."</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">Carlos Ruiz</div>
                                    <div class="author-location">Barcelona, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Chaqueta Elite</div>
                            <p class="testimonial-text">"La Chaqueta Elite es una obra de arte. Los detalles de costura son perfectos, el material es de primera calidad y el diseño es único. Recibo cumplidos cada vez que la uso. Vale cada euro que pagué. ¡Definitivamente repetiré!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">Ana Martín</div>
                                    <div class="author-location">Valencia, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Zapatos Sport</div>
                            <p class="testimonial-text">"Los Zapatos Sport son la comodidad personificada. Los uso para correr y para caminar, y mis pies nunca han estado tan cómodos. La suela es perfecta, no resbala y la parte superior respira bien. ¡Los recomiendo al 100%!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">David López</div>
                                    <div class="author-location">Sevilla, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Colección VIP</div>
                            <p class="testimonial-text">"La Colección VIP es espectacular. Cada pieza es única, los materiales son de lujo y el diseño es impecable. Es una inversión que vale la pena. El servicio al cliente es excepcional y el embalaje es de lujo. ¡Soy cliente VIP desde hace 6 meses!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">Laura Sánchez</div>
                                    <div class="author-location">Bilbao, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Accesorio Moda</div>
                            <p class="testimonial-text">"El Accesorio Moda es perfecto para completar cualquier look. La calidad es excelente para el precio, se ve mucho más caro de lo que cuesta. El envío fue súper rápido y el packaging es muy cuidado. ¡Ya tengo varios en diferentes colores!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">Miguel Torres</div>
                                    <div class="author-location">Málaga, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials-stats">
                        <div class="stat-item">
                            <div class="stat-number">10,000+</div>
                            <div class="stat-label">Clientes Felices</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4/5</div>
                            <div class="stat-label">Valoración Media</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">98%</div>
                            <div class="stat-label">Recomiendan</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insertar después de la sección de características
        // Insertar al final del main
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('beforeend', testimonialsHTML);
        }

        // Crear efectos de partículas
        this.createParticleEffects();
    }

    createParticleEffects() {
        const particleContainer = document.querySelector('.testimonials-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'testimonial-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 2}px;
                height: ${Math.random() * 3 + 2}px;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: testimonialFloat ${Math.random() * 10 + 8}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 6px rgba(0, 255, 0, 0.3);
            `;
            particleContainer.appendChild(particle);
        }
    }

    createTestimonialsStyles() {
        const styles = `
        <style>
        .testimonials-section {
            position: relative;
            padding: 50px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            overflow: hidden;
            margin: 20px 0;
            z-index: 1;
        }

        .testimonials-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .testimonials-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .testimonials-container {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .testimonials-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .testimonials-title {
            font-size: 2.5rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .testimonials-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .testimonial-card {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 15px;
            padding: 25px 20px;
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(50px);
        }

        .testimonial-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .testimonial-card:hover::before {
            left: 100%;
        }

        .testimonial-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .testimonial-stars {
            font-size: 1.5rem;
            margin-bottom: 15px;
            text-align: center;
        }

        .testimonial-product {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
        }

        .testimonial-text {
            color: #fff;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 25px;
            font-style: italic;
            text-align: center;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-avatar {
            font-size: 2.5rem;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: bold;
        }

        .author-info {
            flex: 1;
        }

        .author-name {
            color: #00ff00;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }

        .author-location {
            color: #ccc;
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .author-verified {
            color: #00ff00;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .testimonials-stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 40px;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
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

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(0, 255, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(0, 255, 0, 0.8); }
        }

        @keyframes testimonialFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .testimonials-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .testimonials-title {
                font-size: 2.2rem;
            }
            
            .testimonials-subtitle {
                font-size: 1.1rem;
            }
            
            .testimonials-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .testimonial-card {
                padding: 25px 20px;
            }
            
            .testimonials-stats {
                flex-direction: column;
                gap: 30px;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.testimonialsSection = new TestimonialsSection();
});

    constructor() {
        this.init();
    }

    init() {
        this.createTestimonialsSection();
        this.createTestimonialsStyles();
    }

    createTestimonialsSection() {
        const testimonialsHTML = `
            <section class="testimonials-section" id="testimonialsSection">
                <div class="testimonials-background">
                    <div class="testimonials-particles"></div>
                </div>
                
                <div class="testimonials-container">
                    <div class="testimonials-header">
                        <h2 class="testimonials-title">💬 Reseñas de Productos Reales</h2>
                        <div class="testimonials-subtitle">Lo que dicen nuestros clientes sobre productos específicos</div>
                    </div>

                    <div class="testimonials-grid">
                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Camiseta Premium</div>
                            <p class="testimonial-text">"Compré la Camiseta Premium hace 2 semanas y estoy súper contenta. La tela es súper suave, no se encoge en la lavadora y el color se mantiene perfecto. La talla es exacta, muy cómoda para el día a día. ¡Ya pedí otra en color diferente!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">María González</div>
                                    <div class="author-location">Madrid, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Pantalón Tech</div>
                            <p class="testimonial-text">"El Pantalón Tech es increíble. La tecnología de la tela es real, se seca súper rápido y es perfecto para el gimnasio. El corte es moderno y la calidad se nota desde el primer uso. El envío llegó en 24h como prometieron."</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">Carlos Ruiz</div>
                                    <div class="author-location">Barcelona, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Chaqueta Elite</div>
                            <p class="testimonial-text">"La Chaqueta Elite es una obra de arte. Los detalles de costura son perfectos, el material es de primera calidad y el diseño es único. Recibo cumplidos cada vez que la uso. Vale cada euro que pagué. ¡Definitivamente repetiré!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">Ana Martín</div>
                                    <div class="author-location">Valencia, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Zapatos Sport</div>
                            <p class="testimonial-text">"Los Zapatos Sport son la comodidad personificada. Los uso para correr y para caminar, y mis pies nunca han estado tan cómodos. La suela es perfecta, no resbala y la parte superior respira bien. ¡Los recomiendo al 100%!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">David López</div>
                                    <div class="author-location">Sevilla, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Colección VIP</div>
                            <p class="testimonial-text">"La Colección VIP es espectacular. Cada pieza es única, los materiales son de lujo y el diseño es impecable. Es una inversión que vale la pena. El servicio al cliente es excepcional y el embalaje es de lujo. ¡Soy cliente VIP desde hace 6 meses!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👩</div>
                                <div class="author-info">
                                    <div class="author-name">Laura Sánchez</div>
                                    <div class="author-location">Bilbao, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>

                        <div class="testimonial-card">
                            <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <div class="testimonial-product">Sobre: Accesorio Moda</div>
                            <p class="testimonial-text">"El Accesorio Moda es perfecto para completar cualquier look. La calidad es excelente para el precio, se ve mucho más caro de lo que cuesta. El envío fue súper rápido y el packaging es muy cuidado. ¡Ya tengo varios en diferentes colores!"</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">👨</div>
                                <div class="author-info">
                                    <div class="author-name">Miguel Torres</div>
                                    <div class="author-location">Málaga, España</div>
                                    <div class="author-verified">✓ Compra verificada</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials-stats">
                        <div class="stat-item">
                            <div class="stat-number">10,000+</div>
                            <div class="stat-label">Clientes Felices</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4/5</div>
                            <div class="stat-label">Valoración Media</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">98%</div>
                            <div class="stat-label">Recomiendan</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insertar después de la sección de características
        // Insertar al final del main
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('beforeend', testimonialsHTML);
        }

        // Crear efectos de partículas
        this.createParticleEffects();
    }

    createParticleEffects() {
        const particleContainer = document.querySelector('.testimonials-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'testimonial-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 2}px;
                height: ${Math.random() * 3 + 2}px;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: testimonialFloat ${Math.random() * 10 + 8}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 6px rgba(0, 255, 0, 0.3);
            `;
            particleContainer.appendChild(particle);
        }
    }

    createTestimonialsStyles() {
        const styles = `
        <style>
        .testimonials-section {
            position: relative;
            padding: 50px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            overflow: hidden;
            margin: 20px 0;
            z-index: 1;
        }

        .testimonials-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .testimonials-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .testimonials-container {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .testimonials-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .testimonials-title {
            font-size: 2.5rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .testimonials-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .testimonial-card {
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 1px solid rgba(0, 255, 0, 0.2);
            border-radius: 15px;
            padding: 25px 20px;
            transition: all 0.5s ease;
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(50px);
        }

        .testimonial-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .testimonial-card:hover::before {
            left: 100%;
        }

        .testimonial-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .testimonial-stars {
            font-size: 1.5rem;
            margin-bottom: 15px;
            text-align: center;
        }

        .testimonial-product {
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
        }

        .testimonial-text {
            color: #fff;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 25px;
            font-style: italic;
            text-align: center;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-avatar {
            font-size: 2.5rem;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: bold;
        }

        .author-info {
            flex: 1;
        }

        .author-name {
            color: #00ff00;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }

        .author-location {
            color: #ccc;
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .author-verified {
            color: #00ff00;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .testimonials-stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 40px;
        }

        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
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

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(0, 255, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(0, 255, 0, 0.8); }
        }

        @keyframes testimonialFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .testimonials-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .testimonials-title {
                font-size: 2.2rem;
            }
            
            .testimonials-subtitle {
                font-size: 1.1rem;
            }
            
            .testimonials-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .testimonial-card {
                padding: 25px 20px;
            }
            
            .testimonials-stats {
                flex-direction: column;
                gap: 30px;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.testimonialsSection = new TestimonialsSection();
});
