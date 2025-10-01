// Animaciones profesionales para productos
class ProfessionalProductAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createStyles();
        this.setupAnimations();
    }

    createStyles() {
        const styles = `
        <style>
        /* Animaciones profesionales para productos */
        .catalog {
            animation: catalogFadeIn 0.8s ease-out;
        }

        .card {
            /* animation: cardSlideIn 1.2s ease-out; */
            /* transition: all 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94); */
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.6s ease;
            z-index: 1;
        }

        .card:hover::before {
            left: 100%;
        }

        .card:hover {
            /* transform: translateY(-8px) scale(1.02); */
            box-shadow: 
                0 8px 25px rgba(0, 255, 0, 0.1);
            /* border-color: rgba(0, 255, 0, 0.3); */
        }

        .card__image {
            /* transition: all 1.0s ease; */
            position: relative;
            overflow: hidden;
        }

        .card__image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.1) 50%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .card:hover .card__image {
            /* transform: scale(1.08); */
        }

        .card:hover .card__image::after {
            opacity: 1;
        }

        .card__image img {
            transition: all 0.4s ease;
            filter: brightness(1) contrast(1) saturate(1);
        }

        .card:hover .card__image img {
            filter: brightness(1.1) contrast(1.1) saturate(1.2);
        }

        .card__content {
            position: relative;
            z-index: 2;
        }

        .card__title {
            transition: all 0.3s ease;
        }

        .card:hover .card__title {
            color: #00ff00;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }

        .card__price {
            transition: all 0.3s ease;
            position: relative;
        }

        .card:hover .card__price {
            color: #00ff00;
            transform: scale(1.05);
        }

        .card__price::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #00ff00, #00cc00);
            transition: width 0.3s ease;
        }

        .card:hover .card__price::after {
            width: 100%;
        }

        .card__actions {
            transition: all 0.3s ease;
        }

        .card:hover .card__actions {
            transform: translateY(-2px);
        }

        .card__actions .button {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card__actions .button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 255, 0, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }

        .card__actions .button:hover::before {
            width: 100%;
            height: 100%;
        }

        .card__actions .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 255, 0, 0.3);
        }

        .card__actions .button:active {
            transform: translateY(0);
        }

        /* Animaciones de entrada escalonadas */
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
        .card:nth-child(7) { animation-delay: 0.7s; }
        .card:nth-child(8) { animation-delay: 0.8s; }
        .card:nth-child(9) { animation-delay: 0.9s; }
        .card:nth-child(10) { animation-delay: 1.0s; }
        .card:nth-child(11) { animation-delay: 1.1s; }
        .card:nth-child(12) { animation-delay: 1.2s; }

        /* Keyframes */
        @keyframes catalogFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes cardSlideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Efecto de pulso sutil en el precio */
        .card__price {
            animation: pricePulse 3s ease-in-out infinite;
        }

        @keyframes pricePulse {
            0%, 100% {
                text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
            }
            50% {
                text-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
            }
        }

        /* Efecto de brillo en el título */
        .card__title {
            position: relative;
            overflow: hidden;
        }

        .card__title::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }

        .card:hover .card__title::after {
            left: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .card:hover {
                transform: translateY(-4px) scale(1.01);
            }
            
            .card:hover .card__image {
                transform: scale(1.02);
            }
        }

        /* Desactivar animaciones en dispositivos que prefieren menos movimiento */
        @media (prefers-reduced-motion: reduce) {
            .card,
            .card__image,
            .card__image img,
            .card__title,
            .card__price,
            .card__actions,
            .card__actions .button {
                animation: none !important;
                transition: none !important;
            }
            
            .card:hover {
                transform: none !important;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    setupAnimations() {
        // Observar cuando los productos entran en el viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Aplicar observador a todas las tarjetas
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    observer.observe(card);
                });
            }, 1000);
        });

        // Re-aplicar cuando se rendericen nuevos productos
        const originalRenderProducts = window.renderProducts;
        if (originalRenderProducts) {
            window.renderProducts = () => {
                originalRenderProducts();
                setTimeout(() => {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(card => {
                        observer.observe(card);
                    });
                }, 100);
            };
        }
    }
}

// Inicializar animaciones profesionales
document.addEventListener('DOMContentLoaded', () => {
    window.professionalProductAnimations = new ProfessionalProductAnimations();
});


    constructor() {
        this.init();
    }

    init() {
        this.createStyles();
        this.setupAnimations();
    }

    createStyles() {
        const styles = `
        <style>
        /* Animaciones profesionales para productos */
        .catalog {
            animation: catalogFadeIn 0.8s ease-out;
        }

        .card {
            /* animation: cardSlideIn 1.2s ease-out; */
            /* transition: all 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94); */
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
            transition: left 0.6s ease;
            z-index: 1;
        }

        .card:hover::before {
            left: 100%;
        }

        .card:hover {
            /* transform: translateY(-8px) scale(1.02); */
            box-shadow: 
                0 8px 25px rgba(0, 255, 0, 0.1);
            /* border-color: rgba(0, 255, 0, 0.3); */
        }

        .card__image {
            /* transition: all 1.0s ease; */
            position: relative;
            overflow: hidden;
        }

        .card__image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.1) 50%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .card:hover .card__image {
            /* transform: scale(1.08); */
        }

        .card:hover .card__image::after {
            opacity: 1;
        }

        .card__image img {
            transition: all 0.4s ease;
            filter: brightness(1) contrast(1) saturate(1);
        }

        .card:hover .card__image img {
            filter: brightness(1.1) contrast(1.1) saturate(1.2);
        }

        .card__content {
            position: relative;
            z-index: 2;
        }

        .card__title {
            transition: all 0.3s ease;
        }

        .card:hover .card__title {
            color: #00ff00;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }

        .card__price {
            transition: all 0.3s ease;
            position: relative;
        }

        .card:hover .card__price {
            color: #00ff00;
            transform: scale(1.05);
        }

        .card__price::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #00ff00, #00cc00);
            transition: width 0.3s ease;
        }

        .card:hover .card__price::after {
            width: 100%;
        }

        .card__actions {
            transition: all 0.3s ease;
        }

        .card:hover .card__actions {
            transform: translateY(-2px);
        }

        .card__actions .button {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card__actions .button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 255, 0, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }

        .card__actions .button:hover::before {
            width: 100%;
            height: 100%;
        }

        .card__actions .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 255, 0, 0.3);
        }

        .card__actions .button:active {
            transform: translateY(0);
        }

        /* Animaciones de entrada escalonadas */
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
        .card:nth-child(7) { animation-delay: 0.7s; }
        .card:nth-child(8) { animation-delay: 0.8s; }
        .card:nth-child(9) { animation-delay: 0.9s; }
        .card:nth-child(10) { animation-delay: 1.0s; }
        .card:nth-child(11) { animation-delay: 1.1s; }
        .card:nth-child(12) { animation-delay: 1.2s; }

        /* Keyframes */
        @keyframes catalogFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes cardSlideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Efecto de pulso sutil en el precio */
        .card__price {
            animation: pricePulse 3s ease-in-out infinite;
        }

        @keyframes pricePulse {
            0%, 100% {
                text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
            }
            50% {
                text-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
            }
        }

        /* Efecto de brillo en el título */
        .card__title {
            position: relative;
            overflow: hidden;
        }

        .card__title::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }

        .card:hover .card__title::after {
            left: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .card:hover {
                transform: translateY(-4px) scale(1.01);
            }
            
            .card:hover .card__image {
                transform: scale(1.02);
            }
        }

        /* Desactivar animaciones en dispositivos que prefieren menos movimiento */
        @media (prefers-reduced-motion: reduce) {
            .card,
            .card__image,
            .card__image img,
            .card__title,
            .card__price,
            .card__actions,
            .card__actions .button {
                animation: none !important;
                transition: none !important;
            }
            
            .card:hover {
                transform: none !important;
            }
        }
        </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    setupAnimations() {
        // Observar cuando los productos entran en el viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Aplicar observador a todas las tarjetas
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    observer.observe(card);
                });
            }, 1000);
        });

        // Re-aplicar cuando se rendericen nuevos productos
        const originalRenderProducts = window.renderProducts;
        if (originalRenderProducts) {
            window.renderProducts = () => {
                originalRenderProducts();
                setTimeout(() => {
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(card => {
                        observer.observe(card);
                    });
                }, 100);
            };
        }
    }
}

// Inicializar animaciones profesionales
document.addEventListener('DOMContentLoaded', () => {
    window.professionalProductAnimations = new ProfessionalProductAnimations();
});

