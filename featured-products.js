// Productos destacados para llenar espacio
class FeaturedProducts {
    constructor() {
        this.init();
    }

    init() {
        this.createFeaturedProducts();
        this.createStyles();
    }

    createFeaturedProducts() {
        const featuredHTML = `
            <section class="featured-products-section">
                <div class="featured-container">
                    <div class="featured-header">
                        <h2 class="featured-title">⭐ PRODUCTOS DESTACADOS</h2>
                        <p class="featured-subtitle">Los favoritos de nuestros clientes</p>
                    </div>

                    <div class="featured-grid">
                        <div class="featured-item">
                            <div class="featured-badge">MÁS VENDIDO</div>
                            <div class="featured-icon">🔥</div>
                            <h3>Camiseta Premium</h3>
                            <p>La más vendida de la temporada</p>
                            <div class="featured-price">€29.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">NUEVO</div>
                            <div class="featured-icon">✨</div>
                            <h3>Pantalón Tech</h3>
                            <p>Última tecnología en moda</p>
                            <div class="featured-price">€59.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">EXCLUSIVO</div>
                            <div class="featured-icon">💎</div>
                            <h3>Chaqueta Elite</h3>
                            <p>Edición limitada disponible</p>
                            <div class="featured-price">€89.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">OFERTA</div>
                            <div class="featured-icon">💰</div>
                            <h3>Zapatos Sport</h3>
                            <p>Comodidad y estilo garantizados</p>
                            <div class="featured-price">€79.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">TRENDING</div>
                            <div class="featured-icon">📈</div>
                            <h3>Accesorio Moda</h3>
                            <p>Lo que está de moda ahora</p>
                            <div class="featured-price">€19.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">PREMIUM</div>
                            <div class="featured-icon">👑</div>
                            <h3>Colección VIP</h3>
                            <p>Para los más exigentes</p>
                            <div class="featured-price">€149.99</div>
                        </div>
                    </div>

                    <div class="featured-stats">
                        <div class="stat-item">
                            <div class="stat-number">24</div>
                            <div class="stat-label">PRODUCTOS ÚNICOS</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">CLIENTES FELICES</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4/5</div>
                            <div class="stat-label">VALORACIÓN</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">24H</div>
                            <div class="stat-label">ENVÍO EXPRESS</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insertar al final del main
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('beforeend', featuredHTML);
        }
    }

    createStyles() {
        const styles = `
        <style>
        .featured-products-section {
            position: relative;
            padding: 80px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            margin: 40px 0;
            z-index: 1;
        }

        .featured-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .featured-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .featured-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .featured-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .featured-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .featured-item {
            position: relative;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(0, 255, 0, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .featured-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .featured-item:hover::before {
            left: 100%;
        }

        .featured-item:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .featured-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
            animation: badgePulse 2s ease-in-out infinite;
        }

        .featured-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: iconFloat 3s ease-in-out infinite;
        }

        .featured-item h3 {
            font-size: 1.5rem;
            color: #00ff00;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .featured-item p {
            color: #ccc;
            font-size: 1rem;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .featured-price {
            font-size: 1.8rem;
            color: #ffffff;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .featured-stats {
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

        @keyframes badgePulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0, 255, 0, 0.6);
            }
        }

        @keyframes iconFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .featured-products-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .featured-title {
                font-size: 2.2rem;
            }
            
            .featured-subtitle {
                font-size: 1.1rem;
            }
            
            .featured-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .featured-item {
                padding: 30px 20px;
            }
            
            .featured-stats {
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
    window.featuredProducts = new FeaturedProducts();
});


    constructor() {
        this.init();
    }

    init() {
        this.createFeaturedProducts();
        this.createStyles();
    }

    createFeaturedProducts() {
        const featuredHTML = `
            <section class="featured-products-section">
                <div class="featured-container">
                    <div class="featured-header">
                        <h2 class="featured-title">⭐ PRODUCTOS DESTACADOS</h2>
                        <p class="featured-subtitle">Los favoritos de nuestros clientes</p>
                    </div>

                    <div class="featured-grid">
                        <div class="featured-item">
                            <div class="featured-badge">MÁS VENDIDO</div>
                            <div class="featured-icon">🔥</div>
                            <h3>Camiseta Premium</h3>
                            <p>La más vendida de la temporada</p>
                            <div class="featured-price">€29.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">NUEVO</div>
                            <div class="featured-icon">✨</div>
                            <h3>Pantalón Tech</h3>
                            <p>Última tecnología en moda</p>
                            <div class="featured-price">€59.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">EXCLUSIVO</div>
                            <div class="featured-icon">💎</div>
                            <h3>Chaqueta Elite</h3>
                            <p>Edición limitada disponible</p>
                            <div class="featured-price">€89.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">OFERTA</div>
                            <div class="featured-icon">💰</div>
                            <h3>Zapatos Sport</h3>
                            <p>Comodidad y estilo garantizados</p>
                            <div class="featured-price">€79.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">TRENDING</div>
                            <div class="featured-icon">📈</div>
                            <h3>Accesorio Moda</h3>
                            <p>Lo que está de moda ahora</p>
                            <div class="featured-price">€19.99</div>
                        </div>

                        <div class="featured-item">
                            <div class="featured-badge">PREMIUM</div>
                            <div class="featured-icon">👑</div>
                            <h3>Colección VIP</h3>
                            <p>Para los más exigentes</p>
                            <div class="featured-price">€149.99</div>
                        </div>
                    </div>

                    <div class="featured-stats">
                        <div class="stat-item">
                            <div class="stat-number">24</div>
                            <div class="stat-label">PRODUCTOS ÚNICOS</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">10K+</div>
                            <div class="stat-label">CLIENTES FELICES</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4/5</div>
                            <div class="stat-label">VALORACIÓN</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">24H</div>
                            <div class="stat-label">ENVÍO EXPRESS</div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insertar al final del main
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('beforeend', featuredHTML);
        }
    }

    createStyles() {
        const styles = `
        <style>
        .featured-products-section {
            position: relative;
            padding: 80px 0;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            margin: 40px 0;
            z-index: 1;
        }

        .featured-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .featured-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .featured-title {
            font-size: 3rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00ff00, #00cc00, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: titleGlow 3s ease-in-out infinite alternate;
        }

        .featured-subtitle {
            font-size: 1.3rem;
            color: #ccc;
            font-weight: 300;
            letter-spacing: 1px;
        }

        .featured-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }

        .featured-item {
            position: relative;
            background: linear-gradient(135deg, rgba(0, 255, 0, 0.05), rgba(0, 0, 0, 0.8));
            border: 2px solid rgba(0, 255, 0, 0.2);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .featured-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .featured-item:hover::before {
            left: 100%;
        }

        .featured-item:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 0, 0.5);
            box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
        }

        .featured-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: linear-gradient(135deg, #00ff00, #00cc00);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
            animation: badgePulse 2s ease-in-out infinite;
        }

        .featured-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: iconFloat 3s ease-in-out infinite;
        }

        .featured-item h3 {
            font-size: 1.5rem;
            color: #00ff00;
            margin-bottom: 15px;
            font-weight: 700;
        }

        .featured-item p {
            color: #ccc;
            font-size: 1rem;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .featured-price {
            font-size: 1.8rem;
            color: #ffffff;
            font-weight: 900;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .featured-stats {
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

        @keyframes badgePulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 4px 15px rgba(0, 255, 0, 0.4);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0, 255, 0, 0.6);
            }
        }

        @keyframes iconFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .featured-products-section {
                padding: 60px 0;
                margin: 20px 0;
            }
            
            .featured-title {
                font-size: 2.2rem;
            }
            
            .featured-subtitle {
                font-size: 1.1rem;
            }
            
            .featured-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .featured-item {
                padding: 30px 20px;
            }
            
            .featured-stats {
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
    window.featuredProducts = new FeaturedProducts();
});

