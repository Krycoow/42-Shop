// Funciones de autenticación
export class Auth {
    constructor() {
        this.currentUser = null;
        
        // Listener para cambios en el estado de autenticación
        firebase.auth().onAuthStateChanged((user) => {
            this.currentUser = user;
            if (user) {
                console.log('Usuario logueado:', user.email);
                document.body.classList.add('logged-in');
                this.updateUIForUser();
            } else {
                console.log('No hay usuario logueado');
                document.body.classList.remove('logged-in');
                this.updateUIForGuest();
            }
        });
    }

    // Registrar nuevo usuario
    async register(email, password, nombre) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.database().ref(`users/${userCredential.user.uid}`).set({
                email: email,
                nombre: nombre,
                fechaRegistro: new Date().toISOString()
            });
            return userCredential.user;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    // Iniciar sesión
    async login(email, password) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    // Cerrar sesión
    async logout() {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    }

    // Actualizar UI para usuario logueado
    updateUIForUser() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userInfo) {
            userInfo.style.display = 'block';
            userInfo.textContent = `Hola, ${this.currentUser.email}`;
        }
    }

    // Actualizar UI para invitado
    updateUIForGuest() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }
}