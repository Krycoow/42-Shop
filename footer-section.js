// Footer simplificado con solo contacto y desarrollado por KryDev
class FooterSection {
    constructor() {
        this.init();
    }

    init() {
        this.createFooter();
        this.createFooterStyles();
    }

    createFooter() {
        const footerHTML = `
            <footer class="footer-section">
                <div class="footer-background">
                    <div class="footer-particles"></div>
                    <div class="footer-grid"></div>
                </div>
                
                <div class="footer-container">
                    <div class="footer-contact">
                        <h4 class="footer-title">Contacto</h4>
                        <div class="contact-info">
                            <div class="contact-item">
                                <span class="contact-icon">📧</span>
                                <span class="contact-text">info@42shop.com</span>
                            </div>
                            <div class="contact-item">
                                <span class="contact-icon">📱</span>
                                <span class="contact-text">+34 123 456 789</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        // Insertar al final del body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    createFooterStyles() {
        const styles = `
        <style>
        .footer-section {
            position: relative;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
            color: #fff;
            padding: 40px 0 30px;
            margin-top: 100px;
            overflow: hidden;
        }

        .footer-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }

        .footer-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .footer-particles::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 0, 0.05) 1px, transparent 1px),
                radial-gradient(circle at 40% 60%, rgba(0, 255, 0, 0.08) 1px, transparent 1px);
            background-size: 50px 50px, 80px 80px, 60px 60px;
            animation: particleMove 20s linear infinite;
        }

        .footer-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            animation: gridMove 30s linear infinite;
        }

        .footer-container {
            position: relative;
            z-index: 2;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .footer-contact {
            text-align: center;
            padding: 40px 0;
        }

        .footer-title {
            color: #00ff00;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #ccc;
            font-size: 1rem;
        }

        .contact-icon {
            font-size: 1.2rem;
            width: 20px;
            text-align: center;
        }

        .contact-text {
            color: #fff;
            font-weight: 400;
        }

        /* Animaciones */
        @keyframes particleMove {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(-50px) translateY(-50px); }
        }

        @keyframes gridMove {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(20px) translateY(20px); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .footer-contact {
                padding: 30px 0;
            }
            
            .contact-info {
                gap: 10px;
            }
        }

        @media (max-width: 480px) {
            .footer-section {
                padding: 20px 0;
            }
            
            .footer-contact {
                padding: 20px 0;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.footerSection = new FooterSection();
});