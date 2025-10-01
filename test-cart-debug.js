// Script de debug para el carrito
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Iniciando debug del carrito...');
    
    // Esperar un poco para que se cargue todo
    setTimeout(() => {
        console.log('🔍 Verificando estado del carrito...');
        console.log('- window.newCart existe:', !!window.newCart);
        console.log('- window.addToCart existe:', !!window.addToCart);
        console.log('- window.addCustomToCart existe:', !!window.addCustomToCart);
        
        if (window.newCart) {
            console.log('- Items en carrito:', window.newCart.items.length);
            console.log('- Métodos disponibles:', Object.getOwnPropertyNames(Object.getPrototypeOf(window.newCart)));
        }
        
        // Función de prueba directa
        window.testCartDirect = function() {
            console.log('🧪 Probando carrito directamente...');
            
            if (window.newCart) {
                const testProduct = {
                    id: 'test-' + Date.now(),
                    name: 'Producto de Prueba',
                    price: 19.99,
                    image: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png'
                };
                
                console.log('🧪 Añadiendo producto de prueba...');
                window.newCart.addCustomProduct(testProduct);
                
                console.log('🧪 Items después de añadir:', window.newCart.items.length);
                console.log('🧪 Items:', window.newCart.items);
            } else {
                console.log('❌ window.newCart no está disponible');
            }
        };
        
        // Función para probar botones de cantidad
        window.testQuantityButtons = function() {
            console.log('🧪 Probando botones de cantidad...');
            
            if (window.newCart && window.newCart.items.length > 0) {
                console.log('🧪 Abriendo carrito para probar botones...');
                window.newCart.openCart();
            } else {
                console.log('❌ No hay items en el carrito para probar');
            }
        };
        
        // Función para verificar si se abre automáticamente
        window.testAutoOpen = function() {
            console.log('🧪 Probando si se abre automáticamente...');
            
            if (window.newCart) {
                const testProduct = {
                    id: 'auto-test-' + Date.now(),
                    name: 'Test Auto Open',
                    price: 9.99,
                    image: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/camiseta.png'
                };
                
                console.log('🧪 Añadiendo producto (debería NO abrir carrito automáticamente)...');
                window.newCart.addCustomProduct(testProduct);
                
                // Verificar si el modal está abierto
                setTimeout(() => {
                    const modal = document.getElementById('beautifulCartModal');
                    console.log('🧪 Modal abierto automáticamente:', !!modal);
                    if (modal) {
                        console.log('❌ PROBLEMA: El carrito se abrió automáticamente');
                    } else {
                        console.log('✅ CORRECTO: El carrito NO se abrió automáticamente');
                    }
                }, 100);
            }
        };
        
        console.log('✅ Funciones de debug disponibles:');
        console.log('- testCartDirect() - Probar añadir producto');
        console.log('- testQuantityButtons() - Probar botones de cantidad');
        console.log('- testAutoOpen() - Probar si se abre automáticamente');
        
    }, 2000);
});
