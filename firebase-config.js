// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBffR1K7Azkn1YIPp-qUP-CrjefjRCcMXo",
    authDomain: "shop-35cde.firebaseapp.com",
    projectId: "shop-35cde",
    storageBucket: "shop-35cde.firebasestorage.app",
    messagingSenderId: "176619280783",
    appId: "1:176619280783:web:05c970db9c8c716d5913fa",
    measurementId: "G-0B4K94KHTZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Enable persistence
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Referencias a servicios de Firebase
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Función para registrar un nuevo usuario
function registrarUsuario(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

// Función para iniciar sesión
function iniciarSesion(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Función para cerrar sesión
function cerrarSesion() {
    return auth.signOut();
}

// Función para guardar datos en la base de datos
function guardarDatos(ruta, datos) {
    return database.ref(ruta).set(datos);
}

// Función para obtener datos de la base de datos
function obtenerDatos(ruta) {
    return database.ref(ruta).once('value');
}

// Hacer funciones disponibles globalmente
window.firebaseAuth = auth;
window.firebaseDatabase = database;
window.registrarUsuario = registrarUsuario;
window.iniciarSesion = iniciarSesion;
window.cerrarSesion = cerrarSesion;
window.guardarDatos = guardarDatos;
window.obtenerDatos = obtenerDatos;