(function(){
  const itemsEl = document.getElementById('coItems');
  const totalEl = document.getElementById('coTotal');
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

  function showToast(message){
    toast.textContent = message; toast.hidden = false;
    clearTimeout(showToast._t); showToast._t = setTimeout(()=> toast.hidden = true, 1800);
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
    const entries = cartEntries(); if (!entries.length) { showToast('Carrito vacío'); return; }
    const total = entries.reduce((s,{product,qty})=> s+product.price*qty,0);
    const orders = JSON.parse(localStorage.getItem('ds_orders')||'[]');
    orders.unshift({ id: Date.now(), items: entries.reduce((n,e)=>n+e.qty,0), total: formatPrice(total), status: 'Procesando', shipTo: document.getElementById('coAddress').value+ ', ' + document.getElementById('coCity').value });
    localStorage.setItem('ds_orders', JSON.stringify(orders));
    localStorage.setItem('ds_cart', JSON.stringify({}));
    successOverlay.classList.add('open');
  }

  // Render initial
  renderSummary();
})();


