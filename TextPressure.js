// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/

class TextPressure {
    constructor(options = {}) {
        this.options = {
            text: options.text || 'Hello!',
            flex: options.flex !== undefined ? options.flex : true,
            alpha: options.alpha !== undefined ? options.alpha : false,
            stroke: options.stroke !== undefined ? options.stroke : false,
            width: options.width !== undefined ? options.width : true,
            weight: options.weight !== undefined ? options.weight : true,
            italic: options.italic !== undefined ? options.italic : true,
            textColor: options.textColor || '#ffffff',
            strokeColor: options.strokeColor || '#ff0000',
            minFontSize: options.minFontSize || 36,
            maxFontSize: options.maxFontSize || 72,
            container: options.container || null
        };
        
        this.init();
    }

    init() {
        this.createContainer();
        this.createTextElement();
        this.setupEventListeners();
        this.animate();
    }

    createContainer() {
        if (!this.options.container) {
            this.container = document.createElement('div');
            this.container.style.cssText = `
                position: relative;
                height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 0, 0.8));
                border-radius: 20px;
                margin: 2rem 0;
                box-shadow: 0 10px 30px rgba(0, 255, 0, 0.3);
            `;
            document.body.appendChild(this.container);
        } else {
            this.container = this.options.container;
        }
    }

    createTextElement() {
        this.textElement = document.createElement('div');
        this.textElement.style.cssText = `
            font-family: 'Arial', sans-serif;
            font-size: ${this.options.minFontSize}px;
            font-weight: 400;
            color: ${this.options.textColor};
            text-align: center;
            cursor: pointer;
            user-select: none;
            transition: all 0.3s ease;
            text-shadow: 0 0 20px ${this.options.textColor};
            position: relative;
            z-index: 2;
        `;
        
        this.textElement.textContent = this.options.text;
        this.container.appendChild(this.textElement);
        
        // Añadir efectos de partículas
        this.createParticleEffects();
    }

    createParticleEffects() {
        // Crear partículas flotantes
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${this.options.textColor};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                animation: particleFloat${i} ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            this.container.appendChild(particle);
        }

        // Crear estilos de animación para partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat0 {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
            @keyframes particleFloat1 {
                0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateX(20px) rotate(180deg); opacity: 1; }
            }
            @keyframes particleFloat2 {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translate(15px, -15px) rotate(180deg); opacity: 1; }
            }
            @keyframes particleFloat3 {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                50% { transform: translateY(-25px) scale(1.2); opacity: 1; }
            }
            @keyframes particleFloat4 {
                0%, 100% { transform: translateX(0px) scale(1); opacity: 0.3; }
                50% { transform: translateX(-20px) scale(1.2); opacity: 1; }
            }
            @keyframes particleFloat5 {
                0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.3; }
                50% { transform: translate(-15px, 15px) scale(1.2); opacity: 1; }
            }
            @keyframes particleFloat6 {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(20px) rotate(-180deg); opacity: 1; }
            }
            @keyframes particleFloat7 {
                0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateX(-25px) rotate(-180deg); opacity: 1; }
            }
            @keyframes particleFloat8 {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translate(20px, 20px) rotate(-180deg); opacity: 1; }
            }
            @keyframes particleFloat9 {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                50% { transform: translateY(25px) scale(0.8); opacity: 1; }
            }
            @keyframes particleFloat10 {
                0%, 100% { transform: translateX(0px) scale(1); opacity: 0.3; }
                50% { transform: translateX(25px) scale(0.8); opacity: 1; }
            }
            @keyframes particleFloat11 {
                0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.3; }
                50% { transform: translate(-20px, -20px) scale(0.8); opacity: 1; }
            }
            @keyframes particleFloat12 {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-30px) rotate(360deg); opacity: 1; }
            }
            @keyframes particleFloat13 {
                0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateX(30px) rotate(360deg); opacity: 1; }
            }
            @keyframes particleFloat14 {
                0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translate(25px, -25px) rotate(360deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Efecto de presión con mouse
        this.textElement.addEventListener('mousemove', (e) => {
            this.handlePressure(e);
        });

        this.textElement.addEventListener('mouseleave', () => {
            this.resetPressure();
        });

        // Efecto de presión con touch
        this.textElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handlePressure(e.touches[0]);
        });

        this.textElement.addEventListener('touchend', () => {
            this.resetPressure();
        });

        // Click effect
        this.textElement.addEventListener('click', () => {
            this.createClickEffect();
        });
    }

    handlePressure(e) {
        const rect = this.textElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        const maxDistance = Math.sqrt(
            Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
        );
        
        const pressure = Math.max(0, 1 - (distance / maxDistance));
        
        this.applyPressure(pressure);
    }

    applyPressure(pressure) {
        const fontSize = this.options.minFontSize + 
            (this.options.maxFontSize - this.options.minFontSize) * pressure;
        
        const fontWeight = 400 + (900 - 400) * pressure;
        
        const textShadow = `0 0 ${20 + pressure * 30}px ${this.options.textColor}`;
        
        let transform = '';
        if (this.options.flex) {
            transform += `scale(${1 + pressure * 0.2}) `;
        }
        if (this.options.width) {
            transform += `skewX(${pressure * 10}deg) `;
        }
        if (this.options.italic) {
            transform += `skewY(${pressure * 5}deg)`;
        }
        
        this.textElement.style.fontSize = fontSize + 'px';
        this.textElement.style.fontWeight = fontWeight;
        this.textElement.style.textShadow = textShadow;
        this.textElement.style.transform = transform;
        
        if (this.options.alpha) {
            this.textElement.style.opacity = 0.7 + pressure * 0.3;
        }
        
        if (this.options.stroke) {
            this.textElement.style.webkitTextStroke = 
                `${1 + pressure * 2}px ${this.options.strokeColor}`;
        }
    }

    resetPressure() {
        this.textElement.style.fontSize = this.options.minFontSize + 'px';
        this.textElement.style.fontWeight = '400';
        this.textElement.style.textShadow = `0 0 20px ${this.options.textColor}`;
        this.textElement.style.transform = 'scale(1)';
        this.textElement.style.opacity = '1';
        this.textElement.style.webkitTextStroke = 'none';
    }

    createClickEffect() {
        // Crear efecto de ondas
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, ${this.options.textColor}40, transparent);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 3;
        `;
        
        const rect = this.textElement.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        ripple.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
        ripple.style.top = (rect.top - containerRect.top + rect.height / 2) + 'px';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        this.container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Añadir estilo de animación ripple
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animate() {
        // Animación continua sutil
        let time = 0;
        const animate = () => {
            time += 0.02;
            const pulse = Math.sin(time) * 0.1 + 1;
            this.textElement.style.textShadow = 
                `0 0 ${20 * pulse}px ${this.options.textColor}`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

// Función para crear el efecto fácilmente
window.createTextPressure = function(options = {}) {
    return new TextPressure(options);
};

// Exportar para uso global
window.TextPressure = TextPressure;


