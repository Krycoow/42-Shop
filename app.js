(function () {
  const catalogEl = document.getElementById('catalog');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const cartButton = document.getElementById('cartButton');
  const cartEl = document.getElementById('cart');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkout');
  const backdrop = document.getElementById('cartBackdrop');
  const toast = document.getElementById('toast');
  const successOverlay = document.getElementById('successOverlay');
  const closeSuccess = document.getElementById('closeSuccess');
  const payRadios = Array.from(document.querySelectorAll('input[name="pay"]'));
  const cardFields = document.getElementById('cardFields');
  const cardNumber = document.getElementById('cardNumber');
  const cardExp = document.getElementById('cardExp');
  const cardCvc = document.getElementById('cardCvc');
  // Brand dropdown
  const brandButton = document.getElementById('brandButton');
  const brandDropdown = document.getElementById('brandDropdown');
  const brandMenu = document.getElementById('brandMenu');
  // Reviews section
  const reviewsSection = document.getElementById('reviews');
  // Auth modal
  const authModal = document.getElementById('authModal');
  const closeAuth = document.getElementById('closeAuth');
  const reviewForm = document.getElementById('reviewForm');
  const reviewText = document.getElementById('reviewText');
  const reviewHint = document.getElementById('reviewHint');
  const productModal = document.getElementById('productModal');
  const closeProduct = document.getElementById('closeProduct');
  const pmTitle = document.getElementById('pmTitle');
  const pmThumb = document.getElementById('pmThumb');
  const pmDesc = document.getElementById('pmDesc');
  const pmPrice = document.getElementById('pmPrice');
  const pmQty = document.getElementById('pmQty');
  const pmPlus = document.getElementById('pmPlus');
  const pmMinus = document.getElementById('pmMinus');
  const pmAdd = document.getElementById('pmAdd');
  const paypalButtonsHost = document.getElementById('paypalButtons');
  const paypalContainer = document.getElementById('paypalContainer');
  const reviewModal = document.getElementById('reviewModal');
  const closeReview = document.getElementById('closeReview');
  const reviewModalForm = document.getElementById('reviewModalForm');
  const reviewModalText = document.getElementById('reviewModalText');
  const starsEl = document.getElementById('stars');
  // User UI
  const userArea = document.getElementById('userArea');
  const userButton = document.getElementById('userButton');
  const userDropdown = document.getElementById('userDropdown');
  const userAvatar = document.getElementById('userAvatar');
  const userNameShort = document.getElementById('userNameShort');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const settingsForm = document.getElementById('settingsForm');
  const avatarInput = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const fullNameInput = document.getElementById('fullNameInput');
  const usernameInput = document.getElementById('usernameInput');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const addressInput = document.getElementById('addressInput');
  const cityInput = document.getElementById('cityInput');
  const zipInput = document.getElementById('zipInput');
  const countryInput = document.getElementById('countryInput');
  const trackingModal = document.getElementById('trackingModal');
  const closeTracking = document.getElementById('closeTracking');
  const purchasesModal = document.getElementById('purchasesModal');
  const closePurchases = document.getElementById('closePurchases');
  const trackingList = document.getElementById('trackingList');
  const purchasesList = document.getElementById('purchasesList');
  // i18n & currency
  const langSelect = document.getElementById('langSelect');
  const curSelect = document.getElementById('curSelect');

  /**
   * Demo products
   * - Each product can include: id, name, price, emoji, img (optional), description
   */
  const products = [
    {
      id: 'Air-Jordan-1',
      name: 'Air Jordan 1 High OG Chicago',
      price: 179.99,
      emoji: '👟',
      description: 'Un clásico eterno que marcó la historia del sneaker culture. Los Air Jordan 1 High OG Chicago llegan con su icónica combinación de colores en rojo, blanco y negro, inspirada en los Chicago Bulls. Su diseño atemporal mantiene los detalles originales de 1985, con cuero premium que garantiza durabilidad, comodidad y un estilo inconfundible.',
    },
    {
      id: 'Air-Jordan-1',
      name: 'Air Jordan 1 High OG “Bred”',
      price: 179.99,
      emoji: '🥾',
      description: 'Uno de los pares más icónicos de todos los tiempos. El AJ1 High OG Bred combina cuero premium en negro y rojo con el diseño original de 1985 que rompió las reglas de la NBA. Un símbolo de rebeldía, historia y estilo que no puede faltar en ninguna colección.',
    },
    {
      id: 'Air-Jordan-4',
      name: 'Air Jordan 4 “Red Thunder/Infrared”',
      price: 199.99,
      emoji: '🥿',
      description: 'Un modelo explosivo que combina el diseño clásico del AJ4 con detalles en rojo infrarrojo que resaltan sobre la base negra. Con materiales premium, gran comodidad y un estilo inconfundible, este par es perfecto para destacar dentro y fuera de la cancha.',
    },
    {
      id: 'Air-Jordan-1',
      name: 'Air Jordan 1 Mid “Green Mint',
      price: 124.99,
      emoji: '🥾',
      description: 'Fresco y versátil, este AJ1 Mid combina el clásico diseño de Jordan con toques en verde menta que aportan un estilo moderno y llamativo. Confeccionado en materiales de calidad y la comodidad característica de la línea, es el par ideal para darle un aire único a tu outfit diario.',
    },
    {
      id: 'Air-Jordan-4',
      name: 'Air Jordan 4 “Fire Red”',
      price: 219.99,
      emoji: '👞',
      description: ' clásico de 1989 que vuelve con toda su fuerza. El AJ4 Fire Red mantiene su diseño original con base en cuero blanco premium, detalles en rojo intenso y negro, y la legendaria etiqueta “Nike Air” en el talón. Un par histórico que combina legado, estilo y autenticidad, imprescindible para cualquier amante de Jordan.',
    },
    {
      id: 'Air-Jordan-4',
      name: 'Air Jordan 4 “Thunder (Black/Yellow)',
      price: 219.99,
      emoji: '👟',
      description: 'Un par legendario que regresa con toda su energía. El AJ4 Thunder destaca con una base en nubuck negro premium contrastada por detalles en amarillo vibrante, logrando un look audaz y llamativo. Con el diseño clásico de 1989 y toda la comodidad característica de Jordan, es un imprescindible para coleccionistas y amantes del streetwear.',
    },
    {
      id: 'Air-Jordan-1',
      name: 'Air Jordan 1 High OG “University Blue”',
      price: 179.99,
      emoji: '🧦',
      description: 'Inspirado en los colores de la Universidad de Carolina del Norte, este AJ1 High OG combina cuero blanco premium con gamuza azul claro y detalles en negro que resaltan su silueta clásica de 1985.',
    },
    {
      id: 'Converse',
      name: 'Converse Chuck Taylor All Star High “Black',
      price: 69.99,
      emoji: '👟',
      description: 'Un clásico atemporal. Las Chuck Taylor All Star High Black mantienen su icónico diseño en lona negra con la emblemática puntera de goma blanca y suela vulcanizada. Versátiles, cómodas y fáciles de combinar,',
    },
    {
      id: 'Converse',
      name: 'Converse Chuck Taylor All Star High “White Platform”',
      price: 89.99,
      emoji: '👟',
      description: 'El clásico de siempre, ahora con un toque elevado. Las Chuck Taylor All Star High White Platform mantienen el icónico diseño en lona blanca con puntera de goma, pero suman una suela de plataforma que aporta estilo.',
    }
  ];

  // Persist products for checkout page use
  try { localStorage.setItem('ds_products', JSON.stringify(products)); } catch {}

  const state = {
    query: '',
    sort: 'popular',
    cart: /** @type {Record<string, number>} */ ({}),
    user: null,
    productView: null
  };

  // Load persisted user
  try {
    const saved = JSON.parse(localStorage.getItem('ds_user') || 'null');
    if (saved) state.user = saved;
  } catch {}

  function getCurrency() { return (localStorage.getItem('ds_cur') || 'EUR'); }
  function formatPrice(value) {
    return new Intl.NumberFormat(getLocale(), { style: 'currency', currency: getCurrency() }).format(value);
  }
  function getLocale() {
    const lang = localStorage.getItem('ds_lang') || 'es';
    return lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-PT' : 'es-ES';
  }

  function getSortedFilteredProducts() {
    const q = state.query.trim().toLowerCase();
    let list = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    if (state.sort === 'price-asc') list = list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list = list.sort((a, b) => b.price - a.price);
    return list;
  }

  function renderCatalog() {
    const items = getSortedFilteredProducts();
    catalogEl.setAttribute('aria-busy', 'true');
    catalogEl.innerHTML = items.map(p => `
      <article class="card" data-id="${p.id}" data-open>
        <div class="card__img" aria-hidden="true">${p.img ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-bottom:1px solid rgba(34,197,94,0.12);">` : p.emoji}</div>
        <div class="card__body">
          <h3 class="card__title">${p.name}</h3>
          <p class="card__desc">${p.description}</p>
          <div class="card__meta">
            <span class="price">${formatPrice(p.price)}</span>
            <button class="button button--accent" data-add="${p.id}">Añadir</button>
          </div>
        </div>
      </article>
    `).join('');
    catalogEl.setAttribute('aria-busy', 'false');
    // Stagger reveal for cards
    requestAnimationFrame(() => {
      const host = catalogEl;
      host.classList.add('revealed');
    });
  }

  // i18n strings
  const t = {
    es: { sort: 'Ordenar:', popular: 'Populares', asc: 'Precio: menor a mayor', desc: 'Precio: mayor a menor', reviews: 'Reviews', yourReview: 'Tu reseña', publish: 'Publicar reseña', loginToPost: 'Inicia sesión para publicar.' },
    en: { sort: 'Sort:', popular: 'Popular', asc: 'Price: low to high', desc: 'Price: high to low', reviews: 'Reviews', yourReview: 'Your review', publish: 'Post review', loginToPost: 'Sign in to post.' },
    pt: { sort: 'Ordenar:', popular: 'Populares', asc: 'Preço: menor para maior', desc: 'Preço: maior para menor', reviews: 'Avaliações', yourReview: 'Sua avaliação', publish: 'Publicar', loginToPost: 'Faça login para publicar.' }
  };
  function applyI18n() {
    const lang = localStorage.getItem('ds_lang') || 'es';
    const d = t[lang];
    document.getElementById('sortLabel').textContent = d.sort;
    document.getElementById('optPopular').textContent = d.popular;
    document.getElementById('optAsc').textContent = d.asc;
    document.getElementById('optDesc').textContent = d.desc;
    document.getElementById('reviewsTitle').textContent = d.reviews;
    document.getElementById('yourReviewLabel').firstChild.nodeValue = d.yourReview + '\n';
    document.getElementById('publishBtn').textContent = d.publish;
    reviewHint.textContent = state.user ? d.publish : d.loginToPost;
    langSelect.value = lang;
    curSelect.value = getCurrency();
    renderCatalog();
    renderCart();
  }
  langSelect.addEventListener('change', () => { localStorage.setItem('ds_lang', langSelect.value); applyI18n(); });
  curSelect.addEventListener('change', () => { localStorage.setItem('ds_cur', curSelect.value); renderCatalog(); renderCart(); });

  function openCart() {
    cartEl.classList.add('open');
    cartEl.setAttribute('aria-hidden', 'false');
    cartButton.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
  }
  function closeCart() {
    cartEl.classList.remove('open');
    cartEl.setAttribute('aria-hidden', 'true');
    cartButton.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  }

  function addToCart(productId) {
    state.cart[productId] = (state.cart[productId] || 0) + 1;
    renderCart();
    showToast('Producto añadido al carrito');
  }
  function updateQty(productId, delta) {
    const next = (state.cart[productId] || 0) + delta;
    if (next <= 0) delete state.cart[productId];
    else state.cart[productId] = next;
    renderCart();
  }

  function cartEntries() {
    return Object.entries(state.cart).map(([id, qty]) => ({
      product: products.find(p => p.id === id),
      qty
    })).filter(x => x.product);
  }

  function renderCart() {
    const entries = cartEntries();
    const total = entries.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
    cartItemsEl.innerHTML = entries.length ? entries.map(({ product, qty }) => `
      <div class="cart__row">
        <div class="cart__thumb">${product.img ? `<img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : product.emoji}</div>
        <div>
          <h4 class="cart__title">${product.name}</h4>
          <div class="cart__qty">
            <button class="qty-btn" data-delta="-1" data-id="${product.id}">-</button>
            <span>${qty}</span>
            <button class="qty-btn" data-delta="1" data-id="${product.id}">+</button>
          </div>
        </div>
        <div>${formatPrice(product.price * qty)}</div>
      </div>
    `).join('') : '<p style="color:var(--muted); padding: 8px;">Tu carrito está vacío.</p>';
    cartTotalEl.textContent = formatPrice(total);
    cartCountEl.textContent = String(entries.reduce((n, e) => n + e.qty, 0));
    checkoutBtn.disabled = entries.length === 0;
    persistCart();
  }

  function updateUserUI() {
    const logged = !!state.user;
    // Show user area if logged; else hide
    userArea.hidden = !logged;
    if (logged) {
      const displayName = state.user.fullName || state.user.name || state.user.username || 'Usuario';
      userNameShort.textContent = displayName.split(' ')[0];
      const fallback = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22><rect width=%2248%22 height=%2248%22 rx=%2224%22 fill=%22%230c1310%22/><text x=%2224%22 y=%2230%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%2322c55e%22>🙂</text></svg>';
      userAvatar.src = state.user.avatar || fallback;
      if (avatarPreview) avatarPreview.src = state.user.avatar || fallback;
    }
  }

  // Events
  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderCatalog();
  });
  sortSelect.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderCatalog();
  });

  catalogEl.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.getAttribute && target.getAttribute('data-add');
    if (id) { addToCart(id); return; }
    const card = target.closest && target.closest('[data-open]');
    if (card) {
      const pid = card.getAttribute('data-id');
      openProduct(pid);
    }
  });

  cartButton.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);

  cartItemsEl.addEventListener('click', (e) => {
    const target = e.target;
    const pid = target.getAttribute && target.getAttribute('data-id');
    const delta = target.getAttribute && Number(target.getAttribute('data-delta'));
    if (pid && delta) updateQty(pid, delta);
  });

  checkoutBtn.addEventListener('click', () => {
    const entries = cartEntries();
    if (!entries.length) return;
    persistCart();
    window.location.href = 'checkout.html';
  });

  // Brand dropdown interactions
  function toggleDropdown(show) {
    const isOpen = show ?? brandDropdown.hasAttribute('hidden');
    if (isOpen) {
      brandDropdown.removeAttribute('hidden');
      brandButton.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', onDocClick);
      document.addEventListener('keydown', onEsc);
    } else {
      brandDropdown.setAttribute('hidden', '');
      brandButton.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    }
  }
  function onDocClick(e) {
    if (!brandMenu.contains(e.target)) toggleDropdown(false);
  }
  function onEsc(e) {
    if (e.key === 'Escape') toggleDropdown(false);
  }
  brandButton.addEventListener('click', () => toggleDropdown());
  brandDropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('.dropdown__item');
    if (!btn) return;
    const dest = btn.getAttribute('data-nav');
    toggleDropdown(false);
    if (dest === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'reviews') {
      reviewsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (dest === 'auth') {
      openAuthModal('login');
    }
  });

  // Auth modal
  function openAuthModal(tab) {
    if (typeof authModal.showModal === 'function') authModal.showModal();
    else authModal.setAttribute('open', '');
    setActiveTab(tab || 'login');
  }
  function closeAuthModal() {
    if (typeof authModal.close === 'function') authModal.close();
    else authModal.removeAttribute('open');
  }
  closeAuth.addEventListener('click', (e) => { e.preventDefault(); closeAuthModal(); });
  authModal.addEventListener('click', (e) => {
    const dialogRect = authModal.querySelector('.modal__content').getBoundingClientRect();
    if (e.clientX < dialogRect.left || e.clientX > dialogRect.right || e.clientY < dialogRect.top || e.clientY > dialogRect.bottom) {
      closeAuthModal();
    }
  });
  const tabs = document.querySelectorAll('.tab');
  function setActiveTab(name) {
    tabs.forEach(t => {
      const active = t.getAttribute('data-tab') === name;
      t.classList.toggle('tab--active', active);
    });
    document.querySelectorAll('.tabpanel').forEach(p => {
      const active = p.getAttribute('data-panel') === name;
      if (active) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
    });
  }
  tabs.forEach(t => t.addEventListener('click', () => setActiveTab(t.getAttribute('data-tab'))));

  // Review gating
  function updateReviewGate() {
    const logged = !!state.user;
    reviewText.disabled = !logged;
    reviewHint.textContent = logged ? 'Publica tu experiencia.' : 'Inicia sesión para publicar.';
  }
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.user) { openAuthModal('login'); return; }
    const text = reviewText.value.trim();
    if (!text) return;
    const grid = document.querySelector('.reviews__grid');
    const node = document.createElement('article');
    node.className = 'review';
    node.innerHTML = `
      <header class="review__head">
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <strong>${state.user.name || 'Usuario'}</strong>
      </header>
      <p></p>`;
    node.querySelector('p').textContent = text;
    grid.prepend(node);
    reviewText.value = '';
  });

  // Simple fake auth: mark user as created on any submit in auth dialog
  authModal.addEventListener('submit', (e) => {
    e.preventDefault();
    state.user = {
      name: document.getElementById('regName')?.value || 'Cliente',
      username: document.getElementById('regName')?.value?.toLowerCase()?.replace(/\s+/g, '') || 'cliente'
    };
    updateReviewGate();
    updateUserUI();
    localStorage.setItem('ds_user', JSON.stringify(state.user));
    closeAuthModal();
    alert('Cuenta creada / sesión iniciada (demo).');
    openReviewModal();
  });

  // Product modal
  function openProduct(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    state.productView = { id: p.id, qty: 1 };
    pmTitle.textContent = p.name;
    pmThumb.textContent = p.emoji;
    pmDesc.textContent = p.description;
    pmPrice.textContent = formatPrice(p.price);
    pmQty.textContent = '1';
    if (typeof productModal.showModal === 'function') productModal.showModal();
    else productModal.setAttribute('open', '');
  }
  function closeProductModal() {
    if (typeof productModal.close === 'function') productModal.close();
    else productModal.removeAttribute('open');
  }
  closeProduct.addEventListener('click', (e) => { e.preventDefault(); closeProductModal(); });
  productModal.addEventListener('click', (e) => {
    const content = productModal.querySelector('.modal__content');
    const r = content.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeProductModal();
  });
  pmPlus.addEventListener('click', () => {
    if (!state.productView) return;
    state.productView.qty += 1;
    pmQty.textContent = String(state.productView.qty);
  });
  pmMinus.addEventListener('click', () => {
    if (!state.productView) return;
    state.productView.qty = Math.max(1, state.productView.qty - 1);
    pmQty.textContent = String(state.productView.qty);
  });
  pmAdd.addEventListener('click', () => {
    if (!state.productView) return;
    const { id, qty } = state.productView;
    for (let i = 0; i < qty; i++) addToCart(id);
    closeProductModal();
    openCart();
  });

  // Initialize
  updateReviewGate();
  // Reveal on load
  function revealOnView() {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));
  }
  // Payment UI events
  // Deprecated cart payment UI; redirect to checkout page
  payRadios.forEach(r => r.addEventListener('change', () => {}));
  cardFields.style.display = 'none';
  paypalContainer.hidden = true;

  function validateCard() {
    const num = (cardNumber.value || '').replace(/\s+/g, '');
    const exp = (cardExp.value || '');
    const cvc = (cardCvc.value || '');
    const okNum = /^\d{13,19}$/.test(num);
    const okExp = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp);
    const okCvc = /^\d{3,4}$/.test(cvc);
    return okNum && okExp && okCvc;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 1800);
  }

  let successHideTimer;
  function showSuccess() {
    successOverlay.classList.add('open');
    clearTimeout(successHideTimer);
    successHideTimer = setTimeout(() => { hideSuccess(); }, 4000);
    recordOrder();
  }
  function hideSuccess() { successOverlay.classList.remove('open'); }
  closeSuccess.addEventListener('click', hideSuccess);
  successOverlay.addEventListener('click', (e) => {
    // close if clicking the dark backdrop outside the success box
    const box = successOverlay.querySelector('.success-box');
    const r = box.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) hideSuccess();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideSuccess(); });

  // PayPal integration (client ID must be configured in index.html script URL)
  function renderPayPalButtons() { /* handled in checkout page */ }

  // Review modal with stars
  let selectedStars = 0;
  function openReviewModal() {
    selectedStars = 0; updateStars(); reviewModalText.value = '';
    if (typeof reviewModal.showModal === 'function') reviewModal.showModal();
    else reviewModal.setAttribute('open', '');
  }
  function closeReviewModal() {
    if (typeof reviewModal.close === 'function') reviewModal.close();
    else reviewModal.removeAttribute('open');
  }
  closeReview.addEventListener('click', (e) => { e.preventDefault(); closeReviewModal(); });
  reviewModal.addEventListener('click', (e) => {
    const content = reviewModal.querySelector('.modal__content');
    const r = content.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeReviewModal();
  });
  function updateStars() {
    Array.from(starsEl.querySelectorAll('button')).forEach((b, i) => {
      b.classList.toggle('active', i < selectedStars);
    });
  }
  starsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-star]');
    if (!btn) return;
    selectedStars = Number(btn.getAttribute('data-star'));
    updateStars();
  });
  reviewModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.user) { closeReviewModal(); openAuthModal('login'); return; }
    const text = reviewModalText.value.trim();
    if (!text || !selectedStars) { showToast('Selecciona estrellas y escribe tu opinión'); return; }
    const grid = document.querySelector('.reviews__grid');
    const node = document.createElement('article');
    node.className = 'review';
    node.innerHTML = `
      <header class="review__head">
        <span>${'⭐️'.repeat(selectedStars)}${'☆'.repeat(5 - selectedStars)}</span>
        <strong>${state.user.name || 'Usuario'}</strong>
      </header>
      <p></p>`;
    node.querySelector('p').textContent = text;
    grid.prepend(node);
    closeReviewModal();
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealOnView, { once: true });
  } else {
    revealOnView();
  }

  // Ensure overlays are hidden on first load
  successOverlay.classList.remove('open');

  // User dropdown
  function toggleUserDropdown(show) {
    const isOpen = show ?? userDropdown.hasAttribute('hidden');
    if (isOpen) {
      userDropdown.removeAttribute('hidden');
      userButton.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', onUserDocClick);
    } else {
      userDropdown.setAttribute('hidden', '');
      userButton.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onUserDocClick);
    }
  }
  function onUserDocClick(e) { if (!document.getElementById('userArea').contains(e.target)) toggleUserDropdown(false); }
  userButton?.addEventListener('click', () => toggleUserDropdown());
  userDropdown?.addEventListener('click', (e) => {
    const btn = e.target.closest('.dropdown__item');
    if (!btn) return;
    const action = btn.getAttribute('data-user');
    toggleUserDropdown(false);
    if (action === 'settings') openSettings();
    if (action === 'tracking') openTracking();
    if (action === 'purchases') openPurchases();
    if (action === 'logout') { state.user = null; localStorage.removeItem('ds_user'); updateReviewGate(); updateUserUI(); }
  });

  // Settings
  function openSettings() {
    fullNameInput.value = state.user?.fullName || state.user?.name || '';
    usernameInput.value = state.user?.username || '';
    emailInput.value = state.user?.email || '';
    phoneInput.value = state.user?.phone || '';
    addressInput.value = state.user?.address || '';
    cityInput.value = state.user?.city || '';
    zipInput.value = state.user?.zip || '';
    countryInput.value = state.user?.country || '';
    const fallback = 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22112%22 height=%22112%22><rect width=%22112%22 height=%22112%22 rx=%2220%22 fill=%22%230c1310%22/><text x=%2256%22 y=%2272%22 font-size=%2236%22 text-anchor=%22middle%22 fill=%22%2322c55e%22>🙂</text></svg>';
    if (avatarPreview) avatarPreview.src = state.user?.avatar || fallback;
    if (typeof settingsModal.showModal === 'function') settingsModal.showModal();
    else settingsModal.setAttribute('open', '');
  }
  function closeSettingsModal() { if (typeof settingsModal.close === 'function') settingsModal.close(); else settingsModal.removeAttribute('open'); }
  closeSettings.addEventListener('click', (e) => { e.preventDefault(); closeSettingsModal(); });
  settingsModal.addEventListener('click', (e) => {
    const content = settingsModal.querySelector('.modal__content');
    const r = content.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeSettingsModal();
  });
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.user.fullName = fullNameInput.value.trim();
    state.user.username = usernameInput.value.trim() || state.user.username;
    state.user.email = emailInput.value.trim();
    state.user.phone = phoneInput.value.trim();
    state.user.address = addressInput.value.trim();
    state.user.city = cityInput.value.trim();
    state.user.zip = zipInput.value.trim();
    state.user.country = countryInput.value.trim();
    const file = avatarInput.files && avatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { state.user.avatar = reader.result; persistUser(); updateUserUI(); closeSettingsModal(); };
      reader.readAsDataURL(file);
    } else {
      persistUser(); updateUserUI(); closeSettingsModal();
    }
  });
  // Live preview on avatar file select
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files && avatarInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (avatarPreview) avatarPreview.src = reader.result; };
    reader.readAsDataURL(file);
  });
  function persistUser() { localStorage.setItem('ds_user', JSON.stringify(state.user)); }

  // Orders tracking & purchases (demo)
  function openTracking() {
    const orders = refreshOrderStatuses();
    trackingList.innerHTML = orders.length ? orders.map(o => `
      <div class="card-row">
        <div>
          <div><strong>Pedido #${o.id}</strong> — <span class="badge badge--ok">${o.status}</span></div>
          <div class="muted">${new Date(o.id).toLocaleString()} — ${o.shipTo || ''}</div>
        </div>
        <div>${o.total}</div>
      </div>
    `).join('') : '<p style="color:var(--muted)">No hay pedidos aún.</p>';
    if (typeof trackingModal.showModal === 'function') trackingModal.showModal(); else trackingModal.setAttribute('open', '');
  }
  function closeTrackingModal() { if (typeof trackingModal.close === 'function') trackingModal.close(); else trackingModal.removeAttribute('open'); }
  closeTracking.addEventListener('click', (e) => { e.preventDefault(); closeTrackingModal(); });
  function openPurchases() {
    const orders = refreshOrderStatuses();
    purchasesList.innerHTML = orders.length ? orders.map(o => `
      <div class="card-row">
        <div>
          <div><strong>Pedido #${o.id}</strong> — ${o.items} artículos — <span class="badge badge--ok">${o.status}</span></div>
          <div class="muted">${new Date(o.id).toLocaleString()}</div>
        </div>
        <div>${o.total}</div>
      </div>
    `).join('') : '<p style="color:var(--muted)">No hay compras aún.</p>';
    if (typeof purchasesModal.showModal === 'function') purchasesModal.showModal(); else purchasesModal.setAttribute('open', '');
  }
  function closePurchasesModal() { if (typeof purchasesModal.close === 'function') purchasesModal.close(); else purchasesModal.removeAttribute('open'); }
  closePurchases.addEventListener('click', (e) => { e.preventDefault(); closePurchasesModal(); });

  // Record orders on success
  function recordOrder() {
    const entries = cartEntries();
    const total = entries.reduce((s, { product, qty }) => s + product.price * qty, 0);
    const orders = JSON.parse(localStorage.getItem('ds_orders') || '[]');
    const shipTo = state.user ? `${state.user.fullName || state.user.name || ''} — ${state.user.address || ''}, ${state.user.city || ''}` : 'Invitado';
    orders.unshift({ id: Date.now(), items: entries.reduce((n, e) => n + e.qty, 0), total: formatPrice(total), status: 'Procesando', shipTo });
    localStorage.setItem('ds_orders', JSON.stringify(orders));
  }

  // Simulated status progression based on elapsed time since order id (timestamp)
  function refreshOrderStatuses() {
    const orders = JSON.parse(localStorage.getItem('ds_orders') || '[]');
    const now = Date.now();
    const updated = orders.map(o => {
      const ageMs = now - Number(o.id);
      const min = Math.floor(ageMs / 60000);
      let status = 'Procesando';
      if (min >= 1 && min < 3) status = 'En preparación';
      else if (min >= 3 && min < 5) status = 'Enviado';
      else if (min >= 5) status = 'Entregado';
      if (o.status !== status) o.status = status;
      return o;
    });
    localStorage.setItem('ds_orders', JSON.stringify(updated));
    return updated;
  }

  // Initial render
  // Load persisted cart
  try { state.cart = JSON.parse(localStorage.getItem('ds_cart') || '{}') || {}; } catch {}
  renderCatalog();
  renderCart();

  function persistCart() {
    localStorage.setItem('ds_cart', JSON.stringify(state.cart));
  }
})();



