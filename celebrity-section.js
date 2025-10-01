// Sección de celebridades que compran en la tienda
class CelebritySection {
    constructor() {
        this.init();
    }

    init() {
        this.createCelebritySection();
        this.createStyles();
    }

    createCelebritySection() {
        const celebrityHTML = `
            <section class="celebrity-section">
                <div class="celebrity-container">
                    <div class="celebrity-header">
                        <h2 class="celebrity-title">🌟 NUESTROS CLIENTES FAMOSOS</h2>
                        <p class="celebrity-subtitle">Cantantes y artistas que confían en nosotros</p>
                    </div>

                    <div class="celebrity-grid">
                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎤</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Bad Bunny</h3>
                                <p class="celebrity-role">Cantante & Rapero</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La calidad de la ropa es increíble. Uso sus prendas en mis conciertos y siempre se ven perfectas. El estilo es único y la comodidad es máxima."</p>
                                <div class="celebrity-product">Compró: Chaqueta Elite + Pantalón Tech</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎵</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Rosalía</h3>
                                <p class="celebrity-role">Cantante & Compositora</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Me encanta la exclusividad de sus diseños. Cada pieza es única y me ayuda a expresar mi estilo. El servicio es excepcional."</p>
                                <div class="celebrity-product">Compró: Colección VIP + Accesorio Moda</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎧</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">J Balvin</h3>
                                <p class="celebrity-role">Cantante & Productor</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La ropa es perfecta para mis videoclips. Los colores son vibrantes y la calidad se mantiene después de muchas lavadas. ¡Recomendado!"</p>
                                <div class="celebrity-product">Compró: Camiseta Premium + Zapatos Sport</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎤</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Karol G</h3>
                                <p class="celebrity-role">Cantante & Actriz</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Sus diseños son perfectos para el escenario. La comodidad y el estilo van de la mano. Mis fans siempre preguntan dónde compro mi ropa."</p>
                                <div class="celebrity-product">Compró: Pantalón Tech + Accesorio Moda</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎵</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Maluma</h3>
                                <p class="celebrity-role">Cantante & Actor</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La calidad es de otro nivel. Uso sus prendas en mis giras mundiales y siempre se ven impecables. El envío internacional es súper rápido."</p>
                                <div class="celebrity-product">Compró: Chaqueta Elite + Colección VIP</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">💃</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Shakira</h3>
                                <p class="celebrity-role">Cantante & Bailarina</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Sus diseños son perfectos para mis coreografías. La tela se mueve conmigo y mantiene su forma. La atención al detalle es increíble."</p>
                                <div class="celebrity-product">Compró: Pantalón Tech + Zapatos Sport</div>
                            </div>
                        </div>
                    </div>


                    <div class="celebrity-cta">
                        <h3>¿Quieres vestir como tus ídolos?</h3>
                        <p>Únete a miles de clientes que eligen la misma calidad que los famosos</p>
                        <button class="celebrity-btn" onclick="simpleHeader.exploreProducts()">
                            <span>VER COLECCIÓN CELEBRITY</span>
                            <span class="btn-icon">⭐</span>
                        </button>
                    </div>
                </div>
            </section>
        `;

        // Insertar después de la sección de testimonios
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.insertAdjacentHTML('afterend', celebrityHTML);
        } else {
            // Si no existe, insertar al final del main
            const main = document.querySelector('main');
            if (main) {
                main.insertAdjacentHTML('beforeend', celebrityHTML);
            }
        }
    }

    createStyles() {
        const styles = `
        <style>
        .celebrity-section {
            position: relative;
            padding: 80px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            margin: 40px 0;
            z-index: 1;
        }

        .celebrity-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .celebrity-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .celebrity-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .celebrity-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .celebrity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .celebrity-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .celebrity-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .celebrity-card:hover::before {
            left: 100%;
        }

        .celebrity-card:hover {
            transform: translateY(-10px);
            border-color: rgba(255, 215, 0, 0.6);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
        }

        .celebrity-photo {
            position: relative;
            margin-bottom: 20px;
        }

        .celebrity-emoji {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 255, 0, 0.1));
            border: 4px solid rgba(255, 215, 0, 0.5);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
            animation: emojiPulse 2s ease-in-out infinite;
        }

        @keyframes emojiPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 12px 35px rgba(255, 215, 0, 0.5);
            }
        }

        .celebrity-verified {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
        }

        .celebrity-name {
            font-size: 1.5rem;
            color: #ffd700;
            margin-bottom: 5px;
            font-weight: 700;
        }

        .celebrity-role {
            color: #ccc;
            font-size: 1rem;
            margin-bottom: 15px;
            font-style: italic;
        }

        .celebrity-stars {
            font-size: 1.2rem;
            margin-bottom: 15px;
        }

        .celebrity-review {
            color: #fff;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 15px;
            font-style: italic;
        }

        .celebrity-product {
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .celebrity-cta {
            text-align: center;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 25px;
            padding: 40px 30px;
            backdrop-filter: blur(10px);
        }

        .celebrity-cta h3 {
            font-size: 2rem;
            color: #ffd700;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .celebrity-cta p {
            font-size: 1.2rem;
            color: #ccc;
            margin-bottom: 30px;
        }

        .celebrity-btn {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            padding: 20px 40px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            border: none;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        }

        .celebrity-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4);
        }

        .btn-icon {
            font-size: 1.5rem;
        }

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(255, 215, 0, 0.8); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .celebrity-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .celebrity-title {
                font-size: 2.2rem;
            }
            
            .celebrity-subtitle {
                font-size: 1.1rem;
            }
            
            .celebrity-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .celebrity-card {
                padding: 25px 20px;
            }
            
            .celebrity-img {
                width: 100px;
                height: 100px;
            }
            
            .celebrity-cta {
                padding: 30px 20px;
            }
            
            .celebrity-cta h3 {
                font-size: 1.5rem;
            }
            
            .celebrity-btn {
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
    // Esperar un poco para que se carguen las otras secciones
    setTimeout(() => {
        window.celebritySection = new CelebritySection();
    }, 1000);
});

// También inicializar si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.celebritySection = new CelebritySection();
        }, 1000);
    });
} else {
    setTimeout(() => {
        window.celebritySection = new CelebritySection();
    }, 1000);
}

    constructor() {
        this.init();
    }

    init() {
        this.createCelebritySection();
        this.createStyles();
    }

    createCelebritySection() {
        const celebrityHTML = `
            <section class="celebrity-section">
                <div class="celebrity-container">
                    <div class="celebrity-header">
                        <h2 class="celebrity-title">🌟 NUESTROS CLIENTES FAMOSOS</h2>
                        <p class="celebrity-subtitle">Cantantes y artistas que confían en nosotros</p>
                    </div>

                    <div class="celebrity-grid">
                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎤</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Bad Bunny</h3>
                                <p class="celebrity-role">Cantante & Rapero</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La calidad de la ropa es increíble. Uso sus prendas en mis conciertos y siempre se ven perfectas. El estilo es único y la comodidad es máxima."</p>
                                <div class="celebrity-product">Compró: Chaqueta Elite + Pantalón Tech</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎵</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Rosalía</h3>
                                <p class="celebrity-role">Cantante & Compositora</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Me encanta la exclusividad de sus diseños. Cada pieza es única y me ayuda a expresar mi estilo. El servicio es excepcional."</p>
                                <div class="celebrity-product">Compró: Colección VIP + Accesorio Moda</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎧</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">J Balvin</h3>
                                <p class="celebrity-role">Cantante & Productor</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La ropa es perfecta para mis videoclips. Los colores son vibrantes y la calidad se mantiene después de muchas lavadas. ¡Recomendado!"</p>
                                <div class="celebrity-product">Compró: Camiseta Premium + Zapatos Sport</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎤</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Karol G</h3>
                                <p class="celebrity-role">Cantante & Actriz</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Sus diseños son perfectos para el escenario. La comodidad y el estilo van de la mano. Mis fans siempre preguntan dónde compro mi ropa."</p>
                                <div class="celebrity-product">Compró: Pantalón Tech + Accesorio Moda</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">🎵</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Maluma</h3>
                                <p class="celebrity-role">Cantante & Actor</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"La calidad es de otro nivel. Uso sus prendas en mis giras mundiales y siempre se ven impecables. El envío internacional es súper rápido."</p>
                                <div class="celebrity-product">Compró: Chaqueta Elite + Colección VIP</div>
                            </div>
                        </div>

                        <div class="celebrity-card">
                            <div class="celebrity-photo">
                                <div class="celebrity-emoji">💃</div>
                                <div class="celebrity-verified">✓</div>
                            </div>
                            <div class="celebrity-info">
                                <h3 class="celebrity-name">Shakira</h3>
                                <p class="celebrity-role">Cantante & Bailarina</p>
                                <div class="celebrity-stars">⭐⭐⭐⭐⭐</div>
                                <p class="celebrity-review">"Sus diseños son perfectos para mis coreografías. La tela se mueve conmigo y mantiene su forma. La atención al detalle es increíble."</p>
                                <div class="celebrity-product">Compró: Pantalón Tech + Zapatos Sport</div>
                            </div>
                        </div>
                    </div>


                    <div class="celebrity-cta">
                        <h3>¿Quieres vestir como tus ídolos?</h3>
                        <p>Únete a miles de clientes que eligen la misma calidad que los famosos</p>
                        <button class="celebrity-btn" onclick="simpleHeader.exploreProducts()">
                            <span>VER COLECCIÓN CELEBRITY</span>
                            <span class="btn-icon">⭐</span>
                        </button>
                    </div>
                </div>
            </section>
        `;

        // Insertar después de la sección de testimonios
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            testimonialsSection.insertAdjacentHTML('afterend', celebrityHTML);
        } else {
            // Si no existe, insertar al final del main
            const main = document.querySelector('main');
            if (main) {
                main.insertAdjacentHTML('beforeend', celebrityHTML);
            }
        }
    }

    createStyles() {
        const styles = `
        <style>
        .celebrity-section {
            position: relative;
            padding: 80px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            margin: 40px 0;
            z-index: 1;
        }

        .celebrity-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .celebrity-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .celebrity-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .celebrity-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .celebrity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .celebrity-card {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .celebrity-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .celebrity-card:hover::before {
            left: 100%;
        }

        .celebrity-card:hover {
            transform: translateY(-10px);
            border-color: rgba(255, 215, 0, 0.6);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
        }

        .celebrity-photo {
            position: relative;
            margin-bottom: 20px;
        }

        .celebrity-emoji {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 255, 0, 0.1));
            border: 4px solid rgba(255, 215, 0, 0.5);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
            animation: emojiPulse 2s ease-in-out infinite;
        }

        @keyframes emojiPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 12px 35px rgba(255, 215, 0, 0.5);
            }
        }

        .celebrity-verified {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
        }

        .celebrity-name {
            font-size: 1.5rem;
            color: #ffd700;
            margin-bottom: 5px;
            font-weight: 700;
        }

        .celebrity-role {
            color: #ccc;
            font-size: 1rem;
            margin-bottom: 15px;
            font-style: italic;
        }

        .celebrity-stars {
            font-size: 1.2rem;
            margin-bottom: 15px;
        }

        .celebrity-review {
            color: #fff;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 15px;
            font-style: italic;
        }

        .celebrity-product {
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .celebrity-cta {
            text-align: center;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 25px;
            padding: 40px 30px;
            backdrop-filter: blur(10px);
        }

        .celebrity-cta h3 {
            font-size: 2rem;
            color: #ffd700;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .celebrity-cta p {
            font-size: 1.2rem;
            color: #ccc;
            margin-bottom: 30px;
        }

        .celebrity-btn {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            padding: 20px 40px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            border: none;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        }

        .celebrity-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4);
        }

        .btn-icon {
            font-size: 1.5rem;
        }

        /* Animaciones */
        @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(255, 215, 0, 0.8); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .celebrity-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .celebrity-title {
                font-size: 2.2rem;
            }
            
            .celebrity-subtitle {
                font-size: 1.1rem;
            }
            
            .celebrity-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .celebrity-card {
                padding: 25px 20px;
            }
            
            .celebrity-img {
                width: 100px;
                height: 100px;
            }
            
            .celebrity-cta {
                padding: 30px 20px;
            }
            
            .celebrity-cta h3 {
                font-size: 1.5rem;
            }
            
            .celebrity-btn {
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
    // Esperar un poco para que se carguen las otras secciones
    setTimeout(() => {
        window.celebritySection = new CelebritySection();
    }, 1000);
});

// También inicializar si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.celebritySection = new CelebritySection();
        }, 1000);
    });
} else {
    setTimeout(() => {
        window.celebritySection = new CelebritySection();
    }, 1000);
}
