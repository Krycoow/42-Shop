(function(){
  // Elementos del DOM
  const itemsEl = document.getElementById('coItems');
  const totalEl = document.getElementById('coTotal');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const form = document.getElementById('checkoutForm');
  const payRadios = Array.from(document.querySelectorAll('input[name="pay"]'));
  const cardFields = document.getElementById('coCardFields');
  const cardNumber = document.getElementById('coCardNumber');
  const cardExp = document.getElementById('coCardExp');
  const cardCvc = document.getElementById('coCardCvc');
  const paypalContainer = document.getElementById('coPaypal');
  const paypalButtonsHost = document.getElementById('coPaypalButtons');
  const toast = document.getElementById('toast');
  const successOverlay = document.getElementById('successOverlay');
  
  // Variables de estado
  let currentStep = 1;
  const totalSteps = 3;

  function showToast(message, type = 'info'){
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.hidden = true, 3000);
  }

  // Funciones para manejar pasos
  function nextStep() {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
        updateProgressBar();
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
      updateProgressBar();
    }
  }

  function updateStepDisplay() {
    // Ocultar todos los pasos
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
    });
    
    // Mostrar paso actual
    const currentStepEl = document.getElementById(`step${currentStep}`);
    if (currentStepEl) {
      currentStepEl.classList.add('active');
    }
    
    // Actualizar contenido según el paso
    if (currentStep === 3) {
      updateOrderSummary();
    }
  }

  function updateProgressBar() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
      step.classList.toggle('active', index + 1 <= currentStep);
    });
  }

  function validateCurrentStep() {
    switch (currentStep) {
      case 1:
        return validateShippingData();
      case 2:
        return validatePaymentData();
      case 3:
        return true;
      default:
        return false;
    }
  }

  function validateShippingData() {
    const requiredFields = ['coFullName', 'coEmail', 'coPhone', 'coCountry', 'coAddress', 'coCity', 'coZip'];
    const missingFields = [];
    
    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (!field || !field.value.trim()) {
        missingFields.push(fieldId);
      }
    });
    
    if (missingFields.length > 0) {
      showToast('Por favor, completa todos los campos requeridos', 'error');
      return false;
    }
    
    return true;
  }

  function validatePaymentData() {
    const selectedPayment = document.querySelector('input[name="pay"]:checked');
    if (!selectedPayment) {
      showToast('Por favor, selecciona un método de pago', 'error');
      return false;
    }
    
    if (selectedPayment.value === 'card') {
      return validateCardData();
    }
    
    return true;
  }

  function validateCardData() {
    const cardNum = cardNumber.value.replace(/\s+/g, '');
    const exp = cardExp.value;
    const cvc = cardCvc.value;
    
    if (!/^\d{13,19}$/.test(cardNum)) {
      showToast('Número de tarjeta inválido', 'error');
      return false;
    }
    
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp)) {
      showToast('Fecha de expiración inválida (MM/AA)', 'error');
      return false;
    }
    
    if (!/^\d{3,4}$/.test(cvc)) {
      showToast('CVC inválido', 'error');
      return false;
    }
    
    return true;
  }

  function updateOrderSummary() {
    // Actualizar resumen del pedido
    const entries = cartEntries();
    const orderItemsEl = document.getElementById('coItems');
    
    if (entries.length === 0) {
      orderItemsEl.innerHTML = '<p class="muted">No hay artículos en el carrito.</p>';
      return;
    }
    
    orderItemsEl.innerHTML = entries.map(({product, qty}) => `
      <div class="order-item">
        <div>
          <div><strong>${product.name}</strong></div>
          <div class="muted">Cantidad: ${qty}</div>
        </div>
        <div>${formatPrice(product.price * qty)}</div>
      </div>
    `).join('');
    
    // Actualizar información de envío
    const shippingInfoEl = document.getElementById('shippingInfo');
    const fullName = document.getElementById('coFullName').value;
    const address = document.getElementById('coAddress').value;
    const city = document.getElementById('coCity').value;
    const zip = document.getElementById('coZip').value;
    const country = document.getElementById('coCountry').value;
    
    shippingInfoEl.innerHTML = `
      <div><strong>${fullName}</strong></div>
      <div>${address}</div>
      <div>${city}, ${zip}</div>
      <div>${country}</div>
    `;
    
    // Actualizar información de pago
    const paymentInfoEl = document.getElementById('paymentInfo');
    const selectedPayment = document.querySelector('input[name="pay"]:checked');
    const paymentMethod = selectedPayment.value === 'card' ? 'Tarjeta de crédito/débito' : 'PayPal';
    
    paymentInfoEl.innerHTML = `
      <div><strong>${paymentMethod}</strong></div>
      ${selectedPayment.value === 'card' ? 
        `<div>**** **** **** ${cardNumber.value.slice(-4)}</div>` : 
        '<div>Pago seguro con PayPal</div>'
      }
    `;
  }

  function getLocale(){ const lang = localStorage.getItem('ds_lang')||'es'; return lang==='en'?'en-US':lang==='pt'?'pt-PT':'es-ES'; }
  function getCurrency(){ return localStorage.getItem('ds_cur')||'EUR'; }
  function formatPrice(v){ return new Intl.NumberFormat(getLocale(), { style: 'currency', currency: getCurrency() }).format(v); }

  function loadCart(){
    try { return JSON.parse(localStorage.getItem('ds_cart')||'{}') || {}; } catch { return {}; }
  }
  function loadProducts(){
    // Minimal mirror of products used for checkout rendering
    try { return JSON.parse(localStorage.getItem('ds_products')||'null'); } catch {}
    return null;
  }

  // Build items from cart and products stored by app.js (we'll serialize products on first load there)
  let products;
  try {
    products = JSON.parse(localStorage.getItem('ds_products'));
  } catch {}

  function cartEntries(){
    const cart = loadCart();
    const list = [];
    // fallback: if no products persisted, read from window.opener is not available; we only have ids and qty
    if (!products) { try { products = []; } catch {} }
    for (const id in cart){
      const qty = cart[id];
      const p = products && products.find ? products.find(x=>x.id===id) : null;
      if (p) list.push({ product: p, qty });
    }
    return list;
  }

  function renderSummary(){
    const entries = cartEntries();
    if (!entries.length){ itemsEl.innerHTML = '<p class="muted">No hay artículos en el carrito.</p>'; totalEl.textContent = '$0.00'; return; }
    itemsEl.innerHTML = entries.map(({product, qty})=>`
      <div class="card-row">
        <div>
          <div><strong>${product.name}</strong></div>
          <div class="muted">x${qty}</div>
        </div>
        <div>${formatPrice(product.price*qty)}</div>
      </div>
    `).join('');
    const total = entries.reduce((s,{product,qty})=> s+product.price*qty,0);
    totalEl.textContent = formatPrice(total);
  }

  // Persist products from opener app for checkout use (app writes this too on load)
  if (!products){
    // no-op; app.js should have stored ds_products when rendering
  }

  // Load user to prefill
  try {
    const u = JSON.parse(localStorage.getItem('ds_user')||'null');
    if (u){
      document.getElementById('coFullName').value = u.fullName || u.name || '';
      document.getElementById('coEmail').value = u.email || '';
      document.getElementById('coPhone').value = u.phone || '';
      document.getElementById('coCountry').value = u.country || '';
      document.getElementById('coAddress').value = u.address || '';
      document.getElementById('coCity').value = u.city || '';
      document.getElementById('coZip').value = u.zip || '';
    }
  } catch {}

  payRadios.forEach(r=> r.addEventListener('change', ()=>{
    const method = payRadios.find(x=>x.checked)?.value;
    cardFields.style.display = method==='card' ? 'grid' : 'none';
    paypalContainer.hidden = method!=='paypal';
    if (method==='paypal') renderPayPalButtons();
  }));
  cardFields.style.display = 'grid'; paypalContainer.hidden = true;

  function validateCard(){
    const num = (cardNumber.value||'').replace(/\s+/g,'');
    const exp = (cardExp.value||'');
    const cvc = (cardCvc.value||'');
    return /^\d{13,19}$/.test(num) && /^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp) && /^\d{3,4}$/.test(cvc);
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const method = payRadios.find(x=>x.checked)?.value;
    if (method==='card' && !validateCard()) { showToast('Completa correctamente los datos de tarjeta'); return; }
    completeOrder();
  });

  function renderPayPalButtons(){
    if (!window.paypal || !paypalButtonsHost) return;
    paypalButtonsHost.innerHTML = '';
    window.paypal.Buttons({
      createOrder: (_, actions)=>{
        const total = cartEntries().reduce((s,{product,qty})=> s+product.price*qty,0);
        return actions.order.create({ purchase_units: [{ amount: { value: total.toFixed(2) } }]});
      },
      onApprove: async (_, actions)=>{ try { await actions.order.capture(); } catch{} completeOrder(); },
      onError: ()=> showToast('Error con PayPal')
    }).render('#coPaypalButtons');
  }

  function completeOrder(){
    const entries = cartEntries(); 
    if (!entries.length) { 
      showToast('Carrito vacío', 'error'); 
      return; 
    }
    
    // Validar datos finales
    if (!validateCurrentStep()) {
      return;
    }
    
    const subtotal = entries.reduce((s,{product,qty})=> s+product.price*qty,0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    // Crear pedido
    const orderData = {
      id: Date.now(),
      items: entries,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      status: 'Procesando',
      shipTo: {
        name: document.getElementById('coFullName').value,
        address: document.getElementById('coAddress').value,
        city: document.getElementById('coCity').value,
        zip: document.getElementById('coZip').value,
        country: document.getElementById('coCountry').value
      },
      paymentMethod: document.querySelector('input[name="pay"]:checked').value,
      date: new Date().toISOString()
    };
    
    // Guardar pedido
    const orders = JSON.parse(localStorage.getItem('ds_orders')||'[]');
    orders.unshift(orderData);
    localStorage.setItem('ds_orders', JSON.stringify(orders));
    
    // Limpiar carrito
    localStorage.setItem('ds_cart', JSON.stringify({}));
    
    // Mostrar popup de éxito
    showSuccessPopup();
  }

  function showSuccessPopup() {
    successOverlay.classList.add('show');
    
    // Animar elementos
    setTimeout(() => {
      const checkCircle = document.querySelector('.check-circle');
      const checkMark = document.querySelector('.check-mark');
      
      if (checkCircle && checkMark) {
        checkCircle.style.animation = 'checkPulse 2s ease-in-out infinite';
        checkMark.style.animation = 'checkBounce 0.6s ease';
      }
    }, 100);
  }

  // Funciones globales para los botones
  window.nextStep = nextStep;
  window.prevStep = prevStep;
  window.goToShop = function() {
    window.location.href = 'index.html';
  };
  window.viewOrder = function() {
    // Aquí podrías redirigir a una página de pedidos
    showToast('Funcionalidad de pedidos próximamente', 'info');
  };

  // Render initial
  renderSummary();
})();


