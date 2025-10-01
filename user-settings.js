// Sistema de ajustes de usuario súper profesional

class UserSettings {
    constructor() {
        this.init();
    }

    init() {
        this.createSettingsButton();
        this.createSettingsModal();
        this.setupEventListeners();
    }

    // Crear botón de ajustes
    createSettingsButton() {
        const userArea = document.querySelector('.user-area-modern');
        if (!userArea) return;

        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'settings-btn';
        settingsBtn.innerHTML = `
            <span class="settings-icon">⚙️</span>
            <span class="settings-text">Ajustes</span>
        `;
        settingsBtn.onclick = () => this.openSettings();

        userArea.appendChild(settingsBtn);
    }

    // Crear modal de ajustes
    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'settings-modal-overlay';
        modal.id = 'settingsModal';
        modal.innerHTML = `
            <div class="settings-modal">
                <div class="settings-header">
                    <h2>⚙️ Ajustes de Usuario</h2>
                    <button class="settings-close" onclick="userSettings.closeSettings()">✕</button>
                </div>
                
                <div class="settings-content">
                    <div class="settings-tabs">
                        <button class="tab-btn active" data-tab="profile">👤 Perfil</button>
                        <button class="tab-btn" data-tab="account">🔐 Cuenta</button>
                        <button class="tab-btn" data-tab="preferences">🎨 Preferencias</button>
                    </div>
                    
                    <div class="settings-body">
                        <!-- Tab Perfil -->
                        <div class="tab-content active" id="profile-tab">
                            <div class="profile-section">
                                <div class="profile-photo-section">
                                    <div class="current-photo">
                                        <img id="currentProfilePhoto" src="" alt="Foto de perfil">
                                        <div class="photo-overlay">
                                            <button class="change-photo-btn" onclick="userSettings.changeProfilePhoto()">
                                                📷 Cambiar Foto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <form class="profile-form" id="profileForm">
                                    <div class="form-group">
                                        <label for="fullName">Nombre Completo</label>
                                        <input type="text" id="fullName" placeholder="Tu nombre completo" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="phone">Teléfono</label>
                                        <input type="tel" id="phone" placeholder="+34 123 456 789">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" placeholder="tu@email.com" readonly>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="birthDate">Fecha de Nacimiento</label>
                                        <input type="date" id="birthDate">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="address">Dirección</label>
                                        <textarea id="address" placeholder="Tu dirección completa" rows="3"></textarea>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="submit" class="save-btn">
                                            💾 Guardar Cambios
                                        </button>
                                        <button type="button" class="cancel-btn" onclick="userSettings.closeSettings()">
                                            ❌ Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <!-- Tab Cuenta -->
                        <div class="tab-content" id="account-tab">
                            <div class="account-section">
                                <div class="security-section">
                                    <h3>🔐 Seguridad</h3>
                                    <div class="form-group">
                                        <label for="currentPassword">Contraseña Actual</label>
                                        <input type="password" id="currentPassword" placeholder="Tu contraseña actual">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="newPassword">Nueva Contraseña</label>
                                        <input type="password" id="newPassword" placeholder="Nueva contraseña">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="confirmPassword">Confirmar Contraseña</label>
                                        <input type="password" id="confirmPassword" placeholder="Confirmar nueva contraseña">
                                    </div>
                                    
                                    <button class="change-password-btn">
                                        🔑 Cambiar Contraseña
                                    </button>
                                </div>
                                
                                <div class="privacy-section">
                                    <h3>🔒 Privacidad</h3>
                                    <div class="privacy-options">
                                        <label class="privacy-option">
                                            <input type="checkbox" id="showEmail" checked>
                                            <span class="checkmark"></span>
                                            Mostrar email en perfil
                                        </label>
                                        
                                        <label class="privacy-option">
                                            <input type="checkbox" id="showPhone">
                                            <span class="checkmark"></span>
                                            Mostrar teléfono en perfil
                                        </label>
                                        
                                        <label class="privacy-option">
                                            <input type="checkbox" id="showAddress">
                                            <span class="checkmark"></span>
                                            Mostrar dirección en perfil
                                        </label>
                                        
                                        <label class="privacy-option">
                                            <input type="checkbox" id="allowMarketing" checked>
                                            <span class="checkmark"></span>
                                            Recibir ofertas por email
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tab Preferencias -->
                        <div class="tab-content" id="preferences-tab">
                            <div class="preferences-section">
                                <div class="theme-section">
                                    <h3>🎨 Tema</h3>
                                    <div class="theme-options">
                                        <label class="theme-option">
                                            <input type="radio" name="theme" value="dark" checked>
                                            <span class="theme-preview dark-theme"></span>
                                            <span class="theme-name">Oscuro</span>
                                        </label>
                                        
                                        <label class="theme-option">
                                            <input type="radio" name="theme" value="light">
                                            <span class="theme-preview light-theme"></span>
                                            <span class="theme-name">Claro</span>
                                        </label>
                                        
                                        <label class="theme-option">
                                            <input type="radio" name="theme" value="auto">
                                            <span class="theme-preview auto-theme"></span>
                                            <span class="theme-name">Automático</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="language-section">
                                    <h3>🌍 Idioma</h3>
                                    <div class="form-group">
                                        <label for="preferredLanguage">Idioma Preferido</label>
                                        <select id="preferredLanguage">
                                            <option value="es">🇪🇸 Español</option>
                                            <option value="en">🇺🇸 English</option>
                                            <option value="fr">🇫🇷 Français</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="notifications-section">
                                    <h3>🔔 Notificaciones</h3>
                                    <div class="notification-options">
                                        <label class="notification-option">
                                            <input type="checkbox" id="emailNotifications" checked>
                                            <span class="checkmark"></span>
                                            Notificaciones por email
                                        </label>
                                        
                                        <label class="notification-option">
                                            <input type="checkbox" id="pushNotifications">
                                            <span class="checkmark"></span>
                                            Notificaciones push
                                        </label>
                                        
                                        <label class="notification-option">
                                            <input type="checkbox" id="orderUpdates" checked>
                                            <span class="checkmark"></span>
                                            Actualizaciones de pedidos
                                        </label>
                                        
                                        <label class="notification-option">
                                            <input type="checkbox" id="promotions" checked>
                                            <span class="checkmark"></span>
                                            Ofertas y promociones
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Tabs
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Formulario de perfil
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'profileForm') {
                e.preventDefault();
                this.saveProfile();
            }
        });

        // Cambio de contraseña
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('change-password-btn')) {
                this.changePassword();
            }
        });

        // Cargar datos del usuario
        this.loadUserData();
    }

    // Abrir ajustes
    openSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.add('active');
            this.loadUserData();
        }
    }

    // Cerrar ajustes
    closeSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Cambiar tab
    switchTab(tabName) {
        // Ocultar todos los tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Desactivar todos los botones
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar tab seleccionado
        document.getElementById(`${tabName}-tab`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    // Cargar datos del usuario
    loadUserData() {
        const user = window.state?.currentUser;
        if (!user) return;

        // Cargar datos básicos
        document.getElementById('fullName').value = user.fullName || user.name || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('birthDate').value = user.birthDate || '';
        document.getElementById('address').value = user.address || '';

        // Cargar foto de perfil
        const photoUrl = user.profilePhoto || user.avatar || 'https://via.placeholder.com/150x150/00ff00/000000?text=U';
        document.getElementById('currentProfilePhoto').src = photoUrl;

        // Cargar preferencias
        this.loadPreferences();
    }

    // Cargar preferencias
    loadPreferences() {
        const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};

        // Tema
        const theme = preferences.theme || 'dark';
        document.querySelector(`input[name="theme"][value="${theme}"]`).checked = true;

        // Idioma
        document.getElementById('preferredLanguage').value = preferences.language || 'es';

        // Notificaciones
        document.getElementById('emailNotifications').checked = preferences.emailNotifications !== false;
        document.getElementById('pushNotifications').checked = preferences.pushNotifications || false;
        document.getElementById('orderUpdates').checked = preferences.orderUpdates !== false;
        document.getElementById('promotions').checked = preferences.promotions !== false;

        // Privacidad
        document.getElementById('showEmail').checked = preferences.showEmail !== false;
        document.getElementById('showPhone').checked = preferences.showPhone || false;
        document.getElementById('showAddress').checked = preferences.showAddress || false;
        document.getElementById('allowMarketing').checked = preferences.allowMarketing !== false;
    }

    // Guardar perfil
    saveProfile() {
        const user = window.state?.currentUser;
        if (!user) return;

        // Recopilar datos
        const profileData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            birthDate: document.getElementById('birthDate').value,
            address: document.getElementById('address').value
        };

        // Actualizar usuario
        Object.assign(user, profileData);
        window.state.currentUser = user;

        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Mostrar notificación
        if (window.showNotification) {
            window.showNotification('Perfil actualizado correctamente', 'success');
        }

        // Cerrar modal
        this.closeSettings();
    }

    // Cambiar foto de perfil
    changeProfilePhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.uploadProfilePhoto(file);
            }
        };
        input.click();
    }

    // Subir foto de perfil
    async uploadProfilePhoto(file) {
        try {
            // Comprimir imagen
            const compressedFile = await this.compressImage(file);
            
            // Convertir a base64 para almacenamiento local
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoUrl = e.target.result;
                
                // Actualizar usuario
                if (window.state?.currentUser) {
                    window.state.currentUser.profilePhoto = photoUrl;
                    localStorage.setItem('currentUser', JSON.stringify(window.state.currentUser));
                }
                
                // Actualizar imagen
                document.getElementById('currentProfilePhoto').src = photoUrl;
                
                // Mostrar notificación
                if (window.showNotification) {
                    window.showNotification('Foto de perfil actualizada', 'success');
                }
            };
            reader.readAsDataURL(compressedFile);
            
        } catch (error) {
            console.error('Error subiendo foto:', error);
            if (window.showNotification) {
                window.showNotification('Error al subir foto', 'error');
            }
        }
    }

    // Comprimir imagen
    async compressImage(file) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                const maxWidth = 300;
                const maxHeight = 300;
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob(resolve, 'image/jpeg', 0.8);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    // Cambiar contraseña
    changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            if (window.showNotification) {
                window.showNotification('Por favor completa todos los campos', 'error');
            }
            return;
        }

        if (newPassword !== confirmPassword) {
            if (window.showNotification) {
                window.showNotification('Las contraseñas no coinciden', 'error');
            }
            return;
        }

        if (newPassword.length < 6) {
            if (window.showNotification) {
                window.showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            }
            return;
        }

        // Simular cambio de contraseña
        if (window.showNotification) {
            window.showNotification('Contraseña cambiada correctamente', 'success');
        }

        // Limpiar campos
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }

    // Guardar preferencias
    savePreferences() {
        const preferences = {
            theme: document.querySelector('input[name="theme"]:checked').value,
            language: document.getElementById('preferredLanguage').value,
            emailNotifications: document.getElementById('emailNotifications').checked,
            pushNotifications: document.getElementById('pushNotifications').checked,
            orderUpdates: document.getElementById('orderUpdates').checked,
            promotions: document.getElementById('promotions').checked,
            showEmail: document.getElementById('showEmail').checked,
            showPhone: document.getElementById('showPhone').checked,
            showAddress: document.getElementById('showAddress').checked,
            allowMarketing: document.getElementById('allowMarketing').checked
        };

        localStorage.setItem('userPreferences', JSON.stringify(preferences));

        if (window.showNotification) {
            window.showNotification('Preferencias guardadas', 'success');
        }
    }
}

// Crear estilos para el sistema de ajustes
const userSettingsStyles = `
<style>
.settings-btn {
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    color: #00ff00;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
}

.settings-btn:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.6);
    transform: translateY(-2px);
}

.settings-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(20px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.settings-modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.settings-modal {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 20, 0, 0.95));
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 20px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 255, 0, 0.3);
}

.settings-header {
    padding: 2rem;
    border-bottom: 2px solid rgba(0, 255, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.settings-header h2 {
    color: #00ff00;
    margin: 0;
    font-size: 1.8rem;
    text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.settings-close {
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 50%;
    color: #00ff00;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.settings-close:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.6);
    transform: scale(1.1);
}

.settings-content {
    display: flex;
    height: 600px;
}

.settings-tabs {
    width: 200px;
    background: rgba(0, 0, 0, 0.5);
    border-right: 2px solid rgba(0, 255, 0, 0.2);
    padding: 1rem 0;
}

.tab-btn {
    width: 100%;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tab-btn:hover {
    background: rgba(0, 255, 0, 0.1);
    color: #00ff00;
}

.tab-btn.active {
    background: rgba(0, 255, 0, 0.2);
    color: #00ff00;
    border-right: 3px solid #00ff00;
}

.settings-body {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.profile-photo-section {
    text-align: center;
    margin-bottom: 2rem;
}

.current-photo {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(0, 255, 0, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

.current-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.photo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.current-photo:hover .photo-overlay {
    opacity: 1;
}

.change-photo-btn {
    background: rgba(0, 255, 0, 0.8);
    color: #000;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.change-photo-btn:hover {
    background: #00ff00;
    transform: scale(1.05);
}

.profile-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    color: #00ff00;
    font-weight: 600;
    font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    color: #000;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.form-group input[readonly] {
    background: rgba(200, 200, 200, 0.5);
    color: #666;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
}

.save-btn,
.cancel-btn {
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.save-btn {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
}

.save-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
}

.cancel-btn {
    background: rgba(255, 0, 0, 0.1);
    color: #ff4444;
    border: 2px solid rgba(255, 0, 0, 0.3);
}

.cancel-btn:hover {
    background: rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.6);
}

.security-section,
.privacy-section,
.theme-section,
.language-section,
.notifications-section {
    margin-bottom: 2rem;
}

.security-section h3,
.privacy-section h3,
.theme-section h3,
.language-section h3,
.notifications-section h3 {
    color: #00ff00;
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.change-password-btn {
    background: linear-gradient(135deg, #00ff00, #00cc00);
    color: #000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.change-password-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 0, 0.4);
}

.privacy-options,
.notification-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.privacy-option,
.notification-option {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.privacy-option:hover,
.notification-option:hover {
    background: rgba(0, 255, 0, 0.05);
}

.privacy-option input,
.notification-option input {
    width: 18px;
    height: 18px;
    accent-color: #00ff00;
}

.theme-options {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.theme-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
    min-width: 100px;
}

.theme-option:hover {
    border-color: rgba(0, 255, 0, 0.6);
    background: rgba(0, 255, 0, 0.05);
}

.theme-option input {
    display: none;
}

.theme-option input:checked + .theme-preview {
    border-color: #00ff00;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}

.theme-preview {
    width: 60px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid rgba(0, 255, 0, 0.3);
    transition: all 0.3s ease;
}

.dark-theme {
    background: linear-gradient(135deg, #000, #333);
}

.light-theme {
    background: linear-gradient(135deg, #fff, #f0f0f0);
}

.auto-theme {
    background: linear-gradient(135deg, #000 50%, #fff 50%);
}

.theme-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
    .settings-modal {
        width: 95%;
        height: 95vh;
    }
    
    .settings-content {
        flex-direction: column;
        height: auto;
    }
    
    .settings-tabs {
        width: 100%;
        display: flex;
        padding: 0;
    }
    
    .tab-btn {
        flex: 1;
        text-align: center;
        padding: 1rem 0.5rem;
        font-size: 0.9rem;
    }
    
    .settings-body {
        padding: 1rem;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .theme-options {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .settings-header {
        padding: 1rem;
    }
    
    .settings-header h2 {
        font-size: 1.5rem;
    }
    
    .current-photo {
        width: 120px;
        height: 120px;
    }
    
    .tab-btn {
        font-size: 0.8rem;
        padding: 0.8rem 0.3rem;
    }
}
</style>
`;

// Añadir estilos
document.head.insertAdjacentHTML('beforeend', userSettingsStyles);

// Inicializar sistema de ajustes
document.addEventListener('DOMContentLoaded', () => {
    window.userSettings = new UserSettings();
});


