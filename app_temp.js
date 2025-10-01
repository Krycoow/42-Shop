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

  /**
   * Productos de la tienda
   * - Each product includes: id, name, price, emoji, description
   */
  const products = [
    {
      id: 'running-pro',
      name: 'Zapatillas Running Pro',
      price: 89.99,
      emoji: '👟',
      description: 'Zapatillas deportivas de alto rendimiento con tecnología de amortiguación avanzada. Perfectas para running y entrenamiento intensivo. Diseñadas con materiales transpirables y suela antideslizante.',
    },
    {
      id: 'casual-shirt',
      name: 'Camisa Casual Slim Fit',
      price: 45.99,
      emoji: '👔',
      description: 'Camisa de algodón premium con corte slim fit. Perfecta para ocasiones casuales y semi-formales. Tejido suave y transpirable con acabados de alta calidad.',
    },
    {
      id: 'hiking-boots',
      name: 'Botas de Montaña',
      price: 129.99,
      emoji: '🥾',
      description: 'Botas resistentes al agua para senderismo y actividades outdoor. Suela Vibram® para máximo agarre y membrana impermeable que mantiene tus pies secos.',
    },
    {
      id: 'sport-tshirt',
      name: 'Camiseta Deportiva',
      price: 29.99,
      emoji: '👕',
      description: 'Camiseta técnica con tecnología DryFit para máxima transpirabilidad durante el ejercicio. Tejido ligero y sin costuras para evitar rozaduras.',
    },
    {
      id: 'dress-shoes',
      name: 'Zapatos Elegantes',
      price: 79.99,
      emoji: '👞',
      description: 'Zapatos de vestir en cuero genuino italiano. Suela cosida a mano y forro interior en piel. Perfectos para ocasiones formales y uso profesional.',
    },
    {
      id: 'formal-shirt',
      name: 'Camisa Formal',
      price: 59.99,
      emoji: '👔',
      description: 'Camisa de corte regular en algodón egipcio de 120 hilos. Acabados premium, botones de nácar y puños ajustables. Ideal para la oficina.',
    },
    {
      id: 'urban-sneakers',
      name: 'Zapatillas Urbanas',
      price: 69.99,
      emoji: '👟',
      description: 'Zapatillas con diseño moderno para uso diario. Combinan estilo y comodidad con una suela flexible y plantilla memory foam.',
    },
    {
      id: 'premium-polo',
      name: 'Polo Premium',
      price: 39.99,
      emoji: '👕',
      description: 'Polo en algodón pima peruano con fit moderno. Tejido suave y duradero, perfecto para un look casual elegante.',
    },
    {
      id: 'comfort-sandals',
      name: 'Sandalias Comfort',
      price: 49.99,
      emoji: '🩴',
      description: 'Sandalias ergonómicas con plantilla memory foam y correas ajustables. Ideales para el verano y uso casual.',
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

  // ... resto del código existente ...
})();