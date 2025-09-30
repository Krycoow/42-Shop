// Inicialización de Firebase y gestión de la aplicación
import { Auth } from './auth.js';
import { Shop } from './shop.js';
import { Orders } from './orders.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar las clases principales
    window.auth = new Auth();
    window.shop = new Shop();
    window.orders = new Orders();

    // Referencias a elementos del DOM
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const cartBtn = document.getElementById('cartButton');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const cartModal = document.getElementById('cartModal');
    const closeButtons = document.querySelectorAll('.close');

    // Event listeners para los botones
    loginBtn?.addEventListener('click', () => loginModal.style.display = 'block');
    registerBtn?.addEventListener('click', () => registerModal.style.display = 'block');
    logoutBtn?.addEventListener('click', () => auth.logout());
    cartBtn?.addEventListener('click', () => cartModal.style.display = 'block');

    // Cerrar modales
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Manejar formulario de login
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            await auth.login(email, password);
            loginModal.style.display = 'none';
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.message);
        }
    });

    // Manejar formulario de registro
    document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        try {
            await auth.register(email, password, name);
            registerModal.style.display = 'none';
        } catch (error) {
            alert('Error al registrarse: ' + error.message);
        }
    });

    // Actualizar contador del carrito cuando cambie
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref(`carts/${user.uid}`).on('value', snapshot => {
                const cart = snapshot.val() || {};
                const count = Object.values(cart).reduce((a, b) => a + b, 0);
                document.getElementById('cartCount').textContent = count;
            });
        } else {
            document.getElementById('cartCount').textContent = '0';
        }
    });
});