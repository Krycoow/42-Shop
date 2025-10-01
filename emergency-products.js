// Script de emergencia para mostrar productos
document.addEventListener('DOMContentLoaded', function() {
    // Forzar visibilidad de productos
    function forceShowProducts() {
        const catalog = document.getElementById('catalog');
        if (catalog) {
            catalog.style.display = 'grid';
            catalog.style.visibility = 'visible';
            catalog.style.opacity = '1';
            catalog.style.zIndex = '10';
            catalog.style.position = 'relative';
        }

        // Forzar visibilidad de todas las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'flex';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.zIndex = '11';
        });

        // Asegurar que el main sea visible
        const main = document.querySelector('main');
        if (main) {
            main.style.display = 'block';
            main.style.visibility = 'visible';
            main.style.opacity = '1';
            main.style.zIndex = '5';
        }
    }

    // Ejecutar inmediatamente
    forceShowProducts();

    // Ejecutar después de un delay
    setTimeout(forceShowProducts, 1000);
    setTimeout(forceShowProducts, 3000);

    // Forzar re-renderizado de productos - DESHABILITADO para evitar conflictos
    // if (window.renderProducts) {
    //     window.renderProducts();
    // }

        // Añadir estilos de emergencia
    const emergencyStyles = `
        <style>
        #catalog {
            display: grid !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 10 !important;
        }
        
        .card {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 11 !important;
            transform: none !important;
            animation: none !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        main {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 5 !important;
        }
        
        /* Deshabilitar solo animaciones problemáticas, mantener las profesionales */
        .card {
            /* Mantener animaciones profesionales */
        }
        
        .card:nth-child(n) {
            /* Mantener animaciones profesionales */
        }
        
        .card:hover {
            /* Mantener hover effects profesionales */
        }
        
        .card * {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card:hover {
            /* Mantener hover effects profesionales */
        }
        
        .catalog .card img {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card img:hover {
            /* Mantener hover effects profesionales */
        }
        
        /* Asegurar que la navegación esté por encima */
        .modern-header {
            z-index: 9999 !important;
        }
        
        .dropdown-modern {
            z-index: 9998 !important;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', emergencyStyles);
});

    // Forzar visibilidad de productos
    function forceShowProducts() {
        const catalog = document.getElementById('catalog');
        if (catalog) {
            catalog.style.display = 'grid';
            catalog.style.visibility = 'visible';
            catalog.style.opacity = '1';
            catalog.style.zIndex = '10';
            catalog.style.position = 'relative';
        }

        // Forzar visibilidad de todas las tarjetas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'flex';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.zIndex = '11';
        });

        // Asegurar que el main sea visible
        const main = document.querySelector('main');
        if (main) {
            main.style.display = 'block';
            main.style.visibility = 'visible';
            main.style.opacity = '1';
            main.style.zIndex = '5';
        }
    }

    // Ejecutar inmediatamente
    forceShowProducts();

    // Ejecutar después de un delay
    setTimeout(forceShowProducts, 1000);
    setTimeout(forceShowProducts, 3000);

    // Forzar re-renderizado de productos - DESHABILITADO para evitar conflictos
    // if (window.renderProducts) {
    //     window.renderProducts();
    // }

        // Añadir estilos de emergencia
    const emergencyStyles = `
        <style>
        #catalog {
            display: grid !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 10 !important;
        }
        
        .card {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 11 !important;
            transform: none !important;
            animation: none !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        
        main {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 5 !important;
        }
        
        /* Deshabilitar solo animaciones problemáticas, mantener las profesionales */
        .card {
            /* Mantener animaciones profesionales */
        }
        
        .card:nth-child(n) {
            /* Mantener animaciones profesionales */
        }
        
        .card:hover {
            /* Mantener hover effects profesionales */
        }
        
        .card * {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card:hover {
            /* Mantener hover effects profesionales */
        }
        
        .catalog .card img {
            /* Mantener animaciones profesionales */
        }
        
        .catalog .card img:hover {
            /* Mantener hover effects profesionales */
        }
        
        /* Asegurar que la navegación esté por encima */
        .modern-header {
            z-index: 9999 !important;
        }
        
        .dropdown-modern {
            z-index: 9998 !important;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', emergencyStyles);
});
