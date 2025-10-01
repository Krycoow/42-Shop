// Sistema completo de perfil de usuario
class UserProfileSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.createAuthButtons();
        this.createProfileModal();
        this.createOrderHistoryModal();
        this.bindEvents();
        this.initFirebaseAuth();
        this.updateUI();
        console.log('👤 UserProfileSystem inicializado');
    }

    initFirebaseAuth() {
        // Escuchar cambios en el estado de autenticación de Firebase
        if (window.firebaseAuth) {
            window.firebaseAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    console.log('🔥 Usuario autenticado en Firebase:', user.email);
                    // Obtener datos adicionales del usuario
                    const userData = await this.getUserDataFromFirebase(user.uid);
                    
                    this.currentUser = {
                        id: user.uid,
                        name: userData?.name || user.displayName || 'Usuario',
                        email: user.email,
                        phone: userData?.phone || '',
                        address: userData?.address || '',
                        postalCode: userData?.postalCode || '',
                        city: userData?.city || '',
                        photo: userData?.photo || user.photoURL || 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                        orders: userData?.orders || []
                    };
                    
                    this.saveUserToStorage();
                    this.updateUI();
                } else {
                    console.log('🔥 Usuario no autenticado en Firebase');
                    this.currentUser = null;
                    this.saveUserToStorage();
                    this.updateUI();
                }
            });
        }
    }

    createAuthButtons() {
        // NO crear botones adicionales - usar solo el sistema existente del header
        console.log('👤 Usando sistema de autenticación existente del header');
    }

    createProfileModal() {
        const modalHTML = `
            <div id="profileModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 20000;
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 600px;
                    max-height: 90%;
                    overflow-y: auto;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                    border: 2px solid rgba(0, 255, 0, 0.3);
                    border-radius: 15px;
                    padding: 30px;
                    color: #fff;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                ">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #00ff00; margin: 0 0 10px 0; font-size: 28px;">👤 Editar Perfil</h2>
                        <p style="color: #888; margin: 0;">Actualiza tu información personal</p>
                    </div>
                    
                    <form id="profileForm">
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Nombre:</label>
                                <input type="text" id="profileName" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 14px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Teléfono:</label>
                                <input type="tel" id="profilePhone" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 14px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Email:</label>
                            <input type="email" id="profileEmail" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 14px;
                                transition: all 0.3s ease;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Dirección:</label>
                            <input type="text" id="profileAddress" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 14px;
                                transition: all 0.3s ease;
                            ">
                        </div>
                        
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Código Postal:</label>
                                <input type="text" id="profilePostalCode" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 14px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Ciudad:</label>
                                <input type="text" id="profileCity" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(0, 255, 0, 0.3);
                                    border-radius: 8px;
                                    background: rgba(0, 0, 0, 0.5);
                                    color: #fff;
                                    font-size: 14px;
                                    transition: all 0.3s ease;
                                ">
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <label style="display: block; margin-bottom: 8px; color: #fff; font-weight: 600;">Foto de Perfil (URL):</label>
                            <input type="url" id="profilePhoto" placeholder="https://ejemplo.com/foto.jpg" style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid rgba(0, 255, 0, 0.3);
                                border-radius: 8px;
                                background: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                font-size: 14px;
                                transition: all 0.3s ease;
                            ">
                            <div id="photoPreview" style="margin-top: 10px; text-align: center;">
                                <img id="previewImage" src="" alt="Vista previa" style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid rgba(0, 255, 0, 0.3); display: none;">
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 15px;">
                            <button type="button" id="cancelProfile" style="
                                flex: 1;
                                padding: 15px;
                                background: rgba(239, 68, 68, 0.2);
                                border: 2px solid rgba(239, 68, 68, 0.5);
                                border-radius: 8px;
                                color: #fff;
                                font-weight: bold;
                                font-size: 16px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">❌ Cancelar</button>
                            <button type="submit" style="
                                flex: 2;
                                padding: 15px;
                                background: linear-gradient(135deg, #00ff00, #00cc00);
                                border: none;
                                border-radius: 8px;
                                color: #000;
                                font-weight: bold;
                                font-size: 16px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">💾 Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addProfileStyles();
    }

    createOrderHistoryModal() {
        const modalHTML = `
            <div id="orderHistoryModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 20000;
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 800px;
                    max-height: 90%;
                    overflow-y: auto;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                    border: 2px solid rgba(0, 255, 0, 0.3);
                    border-radius: 15px;
                    padding: 30px;
                    color: #fff;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                ">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #00ff00; margin: 0 0 10px 0; font-size: 28px;">📦 Historial de Pedidos</h2>
                        <p style="color: #888; margin: 0;">Seguimiento de tus compras</p>
                    </div>
                    
                    <div id="ordersList">
                        <!-- Los pedidos se mostrarán aquí -->
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button id="closeOrderHistory" style="
                            padding: 15px 30px;
                            background: linear-gradient(135deg, #00ff00, #00cc00);
                            border: none;
                            border-radius: 8px;
                            color: #000;
                            font-weight: bold;
                            font-size: 16px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">✅ Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    addProfileStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #profileModal input:focus, #orderHistoryModal input:focus {
                border-color: rgba(0, 255, 0, 0.8) !important;
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.3) !important;
                outline: none !important;
            }
            
            #profileModal button:hover, #orderHistoryModal button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 255, 0, 0.3);
            }
            
            #cancelProfile:hover {
                background: rgba(239, 68, 68, 0.4) !important;
                border-color: rgba(239, 68, 68, 0.8) !important;
                box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3) !important;
            }
            
            .dropdown-item:hover {
                background: rgba(0, 255, 0, 0.1) !important;
                color: #00ff00 !important;
            }
            
            .order-card {
                background: rgba(0, 255, 0, 0.08);
                border: 2px solid rgba(0, 255, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                transition: all 0.3s ease;
            }
            
            .order-card:hover {
                background: rgba(0, 255, 0, 0.12);
                border-color: rgba(0, 255, 0, 0.5);
                transform: translateY(-2px);
            }
            
            .status-bar {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                padding: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 8px;
            }
            
            .status-step {
                text-align: center;
                flex: 1;
                position: relative;
            }
            
            .status-step.active {
                color: #00ff00;
            }
            
            .status-step.completed {
                color: #00ff00;
            }
            
            .status-step::after {
                content: '';
                position: absolute;
                top: 50%;
                right: -50%;
                width: 100%;
                height: 2px;
                background: rgba(0, 255, 0, 0.3);
                z-index: -1;
            }
            
            .status-step:last-child::after {
                display: none;
            }
        `;
        document.head.appendChild(styles);
    }

    bindEvents() {
        // Eventos del menú de usuario existente
        document.addEventListener('click', (e) => {
            if (e.target.id === 'userButton' || e.target.closest('#userButton')) {
                this.toggleUserDropdown();
            }
        });

        // Dropdown de usuario existente
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown__item') || e.target.closest('.dropdown__item')) {
                const action = e.target.dataset.action || e.target.closest('.dropdown__item').dataset.action;
                console.log('👤 Acción del menú:', action);
                this.handleUserAction(action);
            }
        });
        
        // Eventos de botones de autenticación
        document.addEventListener('click', (e) => {
            if (e.target.id === 'loginBtn') {
                e.preventDefault();
                e.stopPropagation();
                console.log('👤 Botón Iniciar Sesión clickeado');
                this.showLoginModal();
            } else if (e.target.id === 'registerBtn') {
                e.preventDefault();
                e.stopPropagation();
                console.log('👤 Botón Crear Cuenta clickeado');
                this.showRegisterModal();
            }
        });

        // Formulario de perfil
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        // Botón cancelar perfil
        const cancelBtn = document.getElementById('cancelProfile');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.closeProfileModal();
            });
        }

        // Botón cerrar historial
        const closeOrderBtn = document.getElementById('closeOrderHistory');
        if (closeOrderBtn) {
            closeOrderBtn.addEventListener('click', () => {
                this.closeOrderHistoryModal();
            });
        }

        // Vista previa de foto
        const photoInput = document.getElementById('profilePhoto');
        if (photoInput) {
            photoInput.addEventListener('input', (e) => {
                this.updatePhotoPreview(e.target.value);
            });
        }

        // Cerrar modales con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#userArea')) {
                this.closeUserDropdown();
            }
        });
    }

    // Integración con Firebase para autenticación
    async showLoginModal() {
        const email = prompt('Email:');
        if (!email) return;
        
        const password = prompt('Contraseña:');
        if (!password) return;
        
        try {
            if (window.firebaseAuth) {
                const userCredential = await window.iniciarSesion(email, password);
                const user = userCredential.user;
                
                // Obtener datos adicionales del usuario desde la base de datos
                const userData = await this.getUserDataFromFirebase(user.uid);
                
                this.currentUser = {
                    id: user.uid,
                    name: userData?.name || user.displayName || 'Usuario',
                    email: user.email,
                    phone: userData?.phone || '',
                    address: userData?.address || '',
                    postalCode: userData?.postalCode || '',
                    city: userData?.city || '',
                    photo: userData?.photo || user.photoURL || 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                    orders: userData?.orders || []
                };
                
                this.saveUserToStorage();
                this.updateUI();
                this.showSuccessMessage('¡Bienvenido de nuevo!');
            } else {
                // Fallback a localStorage si Firebase no está disponible
                this.showLoginModalFallback(email, password);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: ' + error.message);
        }
    }

    async showRegisterModal() {
        const name = prompt('Nombre:');
        if (!name) return;
        
        const email = prompt('Email:');
        if (!email) return;
        
        const password = prompt('Contraseña:');
        if (!password) return;
        
        try {
            if (window.firebaseAuth) {
                const userCredential = await window.registrarUsuario(email, password);
                const user = userCredential.user;
                
                // Guardar datos adicionales del usuario en Firebase
                const userData = {
                    name,
                    email,
                    phone: '',
                    address: '',
                    postalCode: '',
                    city: '',
                    photo: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                    orders: []
                };
                
                await window.guardarDatos(`users/${user.uid}`, userData);
                
                this.currentUser = {
                    id: user.uid,
                    ...userData
                };
                
                this.saveUserToStorage();
                this.updateUI();
                this.showSuccessMessage('¡Cuenta creada exitosamente!');
            } else {
                // Fallback a localStorage si Firebase no está disponible
                this.showRegisterModalFallback(name, email, password);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error al crear cuenta: ' + error.message);
        }
    }

    async getUserDataFromFirebase(uid) {
        try {
            const snapshot = await window.obtenerDatos(`users/${uid}`);
            return snapshot.val();
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
        }
    }

    async saveUserDataToFirebase() {
        if (!this.currentUser || !window.firebaseAuth) return;
        
        try {
            const userData = {
                name: this.currentUser.name,
                email: this.currentUser.email,
                phone: this.currentUser.phone,
                address: this.currentUser.address,
                postalCode: this.currentUser.postalCode,
                city: this.currentUser.city,
                photo: this.currentUser.photo,
                orders: this.currentUser.orders
            };
            
            await window.guardarDatos(`users/${this.currentUser.id}`, userData);
            console.log('✅ Datos del usuario guardados en Firebase');
        } catch (error) {
            console.error('Error al guardar datos en Firebase:', error);
        }
    }

    // Fallback para localStorage si Firebase no está disponible
    showLoginModalFallback(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.saveUserToStorage();
            this.updateUI();
            this.showSuccessMessage('¡Bienvenido de nuevo!');
        } else {
            alert('Email o contraseña incorrectos');
        }
    }

    showRegisterModalFallback(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            alert('Este email ya está registrado');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            phone: '',
            address: '',
            postalCode: '',
            city: '',
            photo: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
            orders: []
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        this.currentUser = newUser;
        this.saveUserToStorage();
        this.updateUI();
        this.showSuccessMessage('¡Cuenta creada exitosamente!');
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.hidden = !dropdown.hidden;
        }
    }

    closeUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.hidden = true;
        }
    }

    handleUserAction(action) {
        console.log('👤 Ejecutando acción:', action);
        this.closeUserDropdown();
        
        switch (action) {
            case 'settings':
                console.log('👤 Abriendo modal de perfil...');
                this.showProfileModal();
                break;
            case 'orders':
                console.log('👤 Abriendo historial de pedidos...');
                this.showOrderHistoryModal();
                break;
            case 'logout':
                console.log('👤 Cerrando sesión...');
                this.logout();
                break;
            default:
                console.log('❌ Acción no reconocida:', action);
        }
    }

    showProfileModal() {
        console.log('👤 Mostrando modal de perfil...');
        
        // Si no hay usuario autenticado, crear uno temporal para testing
        if (!this.currentUser) {
            console.log('👤 No hay usuario autenticado, creando usuario temporal...');
            this.currentUser = {
                id: 'temp-user',
                name: 'Usuario Demo',
                email: 'demo@ejemplo.com',
                phone: '',
                address: '',
                postalCode: '',
                city: '',
                photo: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                orders: []
            };
        }
        
        // Llenar formulario con datos actuales
        const nameField = document.getElementById('profileName');
        const phoneField = document.getElementById('profilePhone');
        const emailField = document.getElementById('profileEmail');
        const addressField = document.getElementById('profileAddress');
        const postalField = document.getElementById('profilePostalCode');
        const cityField = document.getElementById('profileCity');
        const photoField = document.getElementById('profilePhoto');
        
        if (nameField) nameField.value = this.currentUser.name || '';
        if (phoneField) phoneField.value = this.currentUser.phone || '';
        if (emailField) emailField.value = this.currentUser.email || '';
        if (addressField) addressField.value = this.currentUser.address || '';
        if (postalField) postalField.value = this.currentUser.postalCode || '';
        if (cityField) cityField.value = this.currentUser.city || '';
        if (photoField) photoField.value = this.currentUser.photo || '';
        
        this.updatePhotoPreview(this.currentUser.photo);
        
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            console.log('✅ Modal de perfil abierto');
        } else {
            console.log('❌ Modal de perfil no encontrado');
        }
    }

    closeProfileModal() {
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    async saveProfile() {
        if (!this.currentUser) return;
        
        // Actualizar datos del usuario
        this.currentUser.name = document.getElementById('profileName').value;
        this.currentUser.phone = document.getElementById('profilePhone').value;
        this.currentUser.email = document.getElementById('profileEmail').value;
        this.currentUser.address = document.getElementById('profileAddress').value;
        this.currentUser.postalCode = document.getElementById('profilePostalCode').value;
        this.currentUser.city = document.getElementById('profileCity').value;
        this.currentUser.photo = document.getElementById('profilePhoto').value || 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png';
        
        try {
            // Guardar en Firebase si está disponible
            if (window.firebaseAuth) {
                await this.saveUserDataToFirebase();
            }
            
            // Fallback a localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = this.currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            this.saveUserToStorage();
            this.updateUI();
            this.closeProfileModal();
            this.showSuccessMessage('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al guardar perfil:', error);
            this.showSuccessMessage('Error al guardar perfil');
        }
    }

    updatePhotoPreview(url) {
        const previewImage = document.getElementById('previewImage');
        if (previewImage && url) {
            previewImage.src = url;
            previewImage.style.display = 'block';
            previewImage.onerror = () => {
                previewImage.style.display = 'none';
            };
        } else {
            previewImage.style.display = 'none';
        }
    }

    showOrderHistoryModal() {
        console.log('👤 Mostrando historial de pedidos...');
        
        // Si no hay usuario autenticado, crear uno temporal para testing
        if (!this.currentUser) {
            console.log('👤 No hay usuario autenticado, creando usuario temporal...');
            this.currentUser = {
                id: 'temp-user',
                name: 'Usuario Demo',
                email: 'demo@ejemplo.com',
                phone: '',
                address: '',
                postalCode: '',
                city: '',
                photo: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                orders: [
                    {
                        id: 1,
                        date: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutos atrás
                        items: [
                            { name: 'Camiseta 42', quantity: 2 },
                            { name: 'Taza 42', quantity: 1 }
                        ],
                        total: '€67.97',
                        status: 'En almacén'
                    },
                    {
                        id: 2,
                        date: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutos atrás
                        items: [
                            { name: 'Sudadera 42', quantity: 1 }
                        ],
                        total: '€45.99',
                        status: 'Entregado'
                    }
                ]
            };
        }
        
        const ordersList = document.getElementById('ordersList');
        if (!ordersList) {
            console.log('❌ Lista de pedidos no encontrada');
            return;
        }
        
        if (this.currentUser.orders && this.currentUser.orders.length > 0) {
            ordersList.innerHTML = this.currentUser.orders.map(order => this.createOrderCard(order)).join('');
            console.log('✅ Pedidos renderizados:', this.currentUser.orders.length);
        } else {
            ordersList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #888;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📦</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">No tienes pedidos aún</div>
                    <div>Realiza tu primera compra para ver el historial aquí</div>
                </div>
            `;
        }
        
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            console.log('✅ Modal de historial abierto');
        } else {
            console.log('❌ Modal de historial no encontrado');
        }
    }

    createOrderCard(order) {
        const now = new Date();
        const orderDate = new Date(order.date);
        const timeDiff = now - orderDate;
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        
        let status = 'En almacén';
        let statusClass = 'active';
        
        if (minutesDiff >= 2) {
            status = 'En reparto';
            statusClass = 'active';
        }
        if (minutesDiff >= 5) {
            status = 'Entregado';
            statusClass = 'completed';
        }
        
        return `
            <div class="order-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <h3 style="color: #00ff00; margin: 0 0 5px 0;">Pedido #${order.id}</h3>
                        <p style="color: #888; margin: 0; font-size: 14px;">${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="color: #fff; margin: 0; font-weight: bold; font-size: 18px;">${order.total}</p>
                        <p style="color: #888; margin: 0; font-size: 14px;">${order.items.length} productos</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #fff; margin: 0 0 10px 0;">Productos:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${order.items.map(item => `
                            <div style="background: rgba(0, 255, 0, 0.1); border: 1px solid rgba(0, 255, 0, 0.3); border-radius: 6px; padding: 8px 12px; font-size: 12px;">
                                ${item.name} (x${item.quantity})
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="status-bar">
                    <div class="status-step ${minutesDiff >= 0 ? 'completed' : ''}">
                        <div style="font-size: 20px;">📦</div>
                        <div style="font-size: 12px; margin-top: 5px;">En almacén</div>
                    </div>
                    <div class="status-step ${minutesDiff >= 2 ? 'completed' : (minutesDiff >= 0 ? 'active' : '')}">
                        <div style="font-size: 20px;">🚚</div>
                        <div style="font-size: 12px; margin-top: 5px;">En reparto</div>
                    </div>
                    <div class="status-step ${minutesDiff >= 5 ? 'completed' : ''}">
                        <div style="font-size: 20px;">✅</div>
                        <div style="font-size: 12px; margin-top: 5px;">Entregado</div>
                    </div>
                </div>
            </div>
        `;
    }

    closeOrderHistoryModal() {
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    logout() {
        this.currentUser = null;
        this.saveUserToStorage();
        this.updateUI();
        this.showSuccessMessage('Sesión cerrada exitosamente');
    }

    updateUI() {
        const userArea = document.getElementById('userArea');
        const authButtons = document.getElementById('authButtons');
        
        if (this.currentUser) {
            // Usuario logueado - mostrar área de usuario y ocultar botones de auth
            if (userArea) {
                userArea.hidden = false;
                const userName = document.getElementById('userName');
                const userAvatar = document.getElementById('userAvatar');
                if (userName) userName.textContent = this.currentUser.name;
                if (userAvatar) userAvatar.src = this.currentUser.photo;
            }
            
            // Ocultar botones de autenticación
            if (authButtons) {
                authButtons.hidden = true;
            }
            
            // También buscar botones individuales por si no están en un contenedor
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            if (loginBtn) loginBtn.hidden = true;
            if (registerBtn) registerBtn.hidden = true;
            
            console.log('👤 Usuario logueado - UI actualizada');
        } else {
            // Usuario no logueado - ocultar área de usuario y mostrar botones de auth
            if (userArea) {
                userArea.hidden = true;
            }
            
            // Mostrar botones de autenticación
            if (authButtons) {
                authButtons.hidden = false;
            }
            
            // También mostrar botones individuales
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            if (loginBtn) loginBtn.hidden = false;
            if (registerBtn) registerBtn.hidden = false;
            
            console.log('👤 Usuario no logueado - UI actualizada');
        }
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.9);
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10002;
            animation: fadeInOut 2s ease-in-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    closeAllModals() {
        this.closeProfileModal();
        this.closeOrderHistoryModal();
        this.closeUserDropdown();
    }

    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    loadUserFromStorage() {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            try {
                this.currentUser = JSON.parse(saved);
            } catch (e) {
                this.currentUser = null;
            }
        }
    }

    // Método para añadir pedido (llamado desde el sistema de pago)
    async addOrder(orderData) {
        if (!this.currentUser) return;
        
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: orderData.items,
            total: orderData.total,
            status: 'En almacén'
        };
        
        if (!this.currentUser.orders) {
            this.currentUser.orders = [];
        }
        
        this.currentUser.orders.unshift(newOrder); // Añadir al principio
        
        try {
            // Guardar en Firebase si está disponible
            if (window.firebaseAuth) {
                await this.saveUserDataToFirebase();
            }
            
            // Fallback a localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = this.currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            this.saveUserToStorage();
            console.log('📦 Pedido añadido al historial:', newOrder);
        } catch (error) {
            console.error('Error al guardar pedido:', error);
        }
    }
}

// Inicializar el sistema de perfil
document.addEventListener('DOMContentLoaded', () => {
    console.log('👤 Inicializando UserProfileSystem...');
    window.userProfileSystem = new UserProfileSystem();
    
    // Funciones globales para testing
    window.showProfile = () => {
        if (window.userProfileSystem) {
            window.userProfileSystem.showProfileModal();
        }
    };
    
    window.showOrders = () => {
        if (window.userProfileSystem) {
            window.userProfileSystem.showOrderHistoryModal();
        }
    };
    
    window.testUser = () => {
        if (window.userProfileSystem) {
            window.userProfileSystem.currentUser = {
                id: 'test-user',
                name: 'Usuario Test',
                email: 'test@ejemplo.com',
                phone: '123456789',
                address: 'Calle Test 123',
                postalCode: '12345',
                city: 'Madrid',
                photo: 'https://raw.githubusercontent.com/Krycoow/42-Shop/main/assets/avatar.png',
                orders: [
                    {
                        id: 1,
                        date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
                        items: [
                            { name: 'Camiseta 42', quantity: 2 },
                            { name: 'Taza 42', quantity: 1 }
                        ],
                        total: '€67.97',
                        status: 'En almacén'
                    }
                ]
            };
            window.userProfileSystem.updateUI();
            console.log('✅ Usuario de prueba creado');
        }
    };
    
    window.testLogout = () => {
        if (window.userProfileSystem) {
            window.userProfileSystem.logout();
            console.log('✅ Usuario deslogueado');
        }
    };
    
    window.testLogin = () => {
        if (window.userProfileSystem) {
            window.userProfileSystem.showLoginModal();
            console.log('✅ Modal de login abierto');
        }
    };
});