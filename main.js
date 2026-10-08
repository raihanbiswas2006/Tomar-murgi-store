/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Main Application Orchestrator & State Integrator
 */

import { PRODUCTS, CUT_OPTIONS, DELIVERY_SLOTS, DHAKA_AREAS } from './js/products.js';
import { TRANSLATIONS, toBanglaNumber, formatPrice, formatWeight } from './js/i18n.js';
import { calculateItemPrice, calculateDressedYield, calculateB2BQuote, getB2BDiscount, isValidBdPhone } from './js/pricing.js';
import { cart } from './js/cart.js';
import {
  animatePriceTicker,
  triggerFloatingAddBadge,
  triggerCartBump,
  moveActiveTabIndicator,
  triggerSlotPulse,
  isReducedMotion
} from './js/motion.js';

// Global UI State
let currentLang = 'bn';
let currentCategory = 'all';
let previousActiveElement = null;

// Product local card state map: { [productId]: { weight: number, cutId: string } }
const productCardStates = {};

/**
 * Initialize card states with defaults
 */
function initProductStates() {
  PRODUCTS.forEach(p => {
    productCardStates[p.id] = {
      weight: p.defaultWeight,
      cutId: p.availableCuts.length > 0 ? p.availableCuts[0] : 'whole'
    };
  });
}

/**
 * Render Product Grid
 */
function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = currentCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === currentCategory);

  grid.innerHTML = '';

  filtered.forEach(product => {
    const state = productCardStates[product.id];
    const card = document.createElement('article');
    card.className = 'product-card';
    card.id = `card-${product.id}`;
    card.setAttribute('data-product-id', product.id);

    // Yield calculation
    const yieldInfo = calculateDressedYield(product, state.weight);
    const calculatedPrice = calculateItemPrice(product, state.weight, state.cutId);

    // Badges HTML
    const badgesHtml = product.badges.map(b => {
      const badgeText = currentLang === 'bn' ? TRANSLATIONS.bn[`card.badge.${b}`] : TRANSLATIONS.en[`card.badge.${b}`];
      return `<span class="badge-pill badge-${b}">${badgeText || b}</span>`;
    }).join('');

    // Cut Chips HTML
    let cutChipsHtml = '';
    if (product.availableCuts && product.availableCuts.length > 0) {
      const chips = product.availableCuts.map(cutKey => {
        const cut = CUT_OPTIONS[cutKey];
        if (!cut) return '';
        const isActive = state.cutId === cutKey;
        const label = currentLang === 'bn' ? cut.labelBn : cut.labelEn;
        return `<button type="button" class="cut-chip-btn ${isActive ? 'active' : ''}" data-cut-id="${cutKey}" aria-pressed="${isActive}">${label}</button>`;
      }).join('');

      cutChipsHtml = `
        <div class="cut-selector-section">
          <div class="cut-selector-title">${currentLang === 'bn' ? TRANSLATIONS.bn['card.cut_choice'] : TRANSLATIONS.en['card.cut_choice']}</div>
          <div class="cut-chips-grid">${chips}</div>
        </div>
      `;
    }

    // Yield Indicator HTML
    let yieldHtml = '';
    if (product.isWeightBased && yieldInfo) {
      const liveWtStr = formatWeight(state.weight, 'kg', currentLang);
      const minStr = currentLang === 'bn' ? toBanglaNumber(yieldInfo.minNet) : yieldInfo.minNet;
      const maxStr = currentLang === 'bn' ? toBanglaNumber(yieldInfo.maxNet) : yieldInfo.maxNet;
      const unitStr = currentLang === 'bn' ? 'কেজি' : 'kg';

      yieldHtml = `
        <div class="weight-yield-box">
          <div class="yield-row">
            <span class="yield-label">${currentLang === 'bn' ? TRANSLATIONS.bn['card.live_weight'] : TRANSLATIONS.en['card.live_weight']}</span>
            <span class="yield-val tabular-numbers">${liveWtStr}</span>
          </div>
          <div class="yield-row">
            <span class="yield-label">${currentLang === 'bn' ? TRANSLATIONS.bn['card.dressed_est'] : TRANSLATIONS.en['card.dressed_est']}</span>
            <span class="yield-val tabular-numbers" style="color: var(--color-freshness-primary-600);">${minStr} - ${maxStr} ${unitStr}</span>
          </div>
        </div>
      `;
    }

    const title = currentLang === 'bn' ? product.nameBn : product.nameEn;
    const desc = currentLang === 'bn' ? product.descBn : product.descEn;
    const addBtnText = currentLang === 'bn' ? TRANSLATIONS.bn['card.add_btn'] : TRANSLATIONS.en['card.add_btn'];
    const weightLabel = formatWeight(state.weight, product.unit, currentLang);
    const unitPriceLabel = currentLang === 'bn'
      ? `${formatPrice(product.pricePerKg, 'bn')} ${product.unit === 'dozen' ? TRANSLATIONS.bn['card.per_dozen'] : TRANSLATIONS.bn['card.per_kg']}`
      : `${formatPrice(product.pricePerKg, 'en')} ${product.unit === 'dozen' ? TRANSLATIONS.en['card.per_dozen'] : TRANSLATIONS.en['card.per_kg']}`;

    card.innerHTML = `
      <div class="product-image-frame">
        <div class="card-badges-row">${badgesHtml}</div>
        <img src="${product.image}" alt="${title}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <h3 class="product-title">${title}</h3>
        <p class="product-desc">${desc}</p>
        
        ${yieldHtml}
        ${cutChipsHtml}

        <div class="product-card-footer">
          <div class="weight-and-price-row">
            <div class="weight-stepper" role="group" aria-label="Adjust product quantity">
              <button type="button" class="stepper-btn btn-stepper-minus" aria-label="Decrease quantity">−</button>
              <span class="stepper-value tabular-numbers">${weightLabel}</span>
              <button type="button" class="stepper-btn btn-stepper-plus" aria-label="Increase quantity">+</button>
            </div>
            
            <div class="card-price-block">
              <div class="price-main tabular-numbers" data-raw-price="${calculatedPrice}">${formatPrice(calculatedPrice, currentLang)}</div>
              <div class="price-sub tabular-numbers">${unitPriceLabel}</div>
            </div>
          </div>

          <button type="button" class="btn-add-cart" aria-label="${addBtnText} ${title}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span>${addBtnText}</span>
          </button>
        </div>
      </div>
    `;

    // Attach event listeners for card controls
    const minusBtn = card.querySelector('.btn-stepper-minus');
    const plusBtn = card.querySelector('.btn-stepper-plus');
    const addBtn = card.querySelector('.btn-add-cart');
    const cutBtns = card.querySelectorAll('.cut-chip-btn');
    const stepperVal = card.querySelector('.stepper-value');
    const priceDisplay = card.querySelector('.price-main');

    minusBtn.addEventListener('click', () => {
      const step = product.weightStep || 0.25;
      const min = product.minWeight || 0.5;
      if (state.weight > min) {
        state.weight = Number((state.weight - step).toFixed(2));
        updateCardUi();
      }
    });

    plusBtn.addEventListener('click', () => {
      const step = product.weightStep || 0.25;
      const max = product.maxWeight || 10;
      if (state.weight < max) {
        state.weight = Number((state.weight + step).toFixed(2));
        updateCardUi();
      }
    });

    cutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cutBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.cutId = btn.getAttribute('data-cut-id');
        updateCardUi();
      });
    });

    addBtn.addEventListener('click', () => {
      cart.addItem(product.id, state.weight, state.cutId);
      const floatText = product.unit === 'dozen'
        ? (currentLang === 'bn' ? `+${toBanglaNumber(state.weight)} ডজন` : `+${state.weight} dozen`)
        : (currentLang === 'bn' ? `+${toBanglaNumber(state.weight)} কেজি` : `+${state.weight} kg`);
      triggerFloatingAddBadge(addBtn, floatText);
      triggerCartBump();
    });

    function updateCardUi() {
      stepperVal.textContent = formatWeight(state.weight, product.unit, currentLang);
      const newPrice = calculateItemPrice(product, state.weight, state.cutId);
      animatePriceTicker(priceDisplay, newPrice, currentLang);

      // Re-update yield if present
      const yBox = card.querySelector('.weight-yield-box');
      if (yBox && product.isWeightBased) {
        const newYield = calculateDressedYield(product, state.weight);
        const liveSpan = yBox.querySelector('.yield-row:first-child .yield-val');
        const estSpan = yBox.querySelector('.yield-row:last-child .yield-val');
        if (liveSpan) liveSpan.textContent = formatWeight(state.weight, 'kg', currentLang);
        if (estSpan && newYield) {
          const minS = currentLang === 'bn' ? toBanglaNumber(newYield.minNet) : newYield.minNet;
          const maxS = currentLang === 'bn' ? toBanglaNumber(newYield.maxNet) : newYield.maxNet;
          const uStr = currentLang === 'bn' ? 'কেজি' : 'kg';
          estSpan.textContent = `${minS} - ${maxS} ${uStr}`;
        }
      }
    }

    grid.appendChild(card);
  });
}

/**
 * Render Delivery Slots
 */
function renderDeliverySlots() {
  const container = document.getElementById('slots-grid');
  if (!container) return;

  container.innerHTML = '';
  DELIVERY_SLOTS.forEach(slot => {
    const isSelected = cart.selectedSlot === slot.id;
    const card = document.createElement('div');
    card.className = `slot-card ${isSelected ? 'active' : ''}`;
    card.setAttribute('role', 'radio');
    card.setAttribute('aria-checked', String(isSelected));
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-slot-id', slot.id);

    const title = currentLang === 'bn' ? slot.titleBn : slot.titleEn;
    const time = currentLang === 'bn' ? slot.timeBn : slot.timeEn;
    const desc = currentLang === 'bn' ? slot.descBn : slot.descEn;

    card.innerHTML = `
      <div class="slot-header">
        <span class="slot-title">${title}</span>
        <div class="slot-check-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>
      <div class="slot-time tabular-numbers">${time}</div>
      <div class="slot-desc">${desc}</div>
    `;

    const handleSelect = () => {
      document.querySelectorAll('.slot-card').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      cart.setSlot(slot.id);
      triggerSlotPulse(card);
    };

    card.addEventListener('click', handleSelect);
    card.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSelect();
      }
    });

    container.appendChild(card);
  });
}

/**
 * Update B2B Bulk Calculator UI
 */
function updateB2BCalculator() {
  const varietySelect = document.getElementById('b2b-variety-select');
  const cutSelect = document.getElementById('b2b-cut-select');
  const volumeInput = document.getElementById('b2b-volume-input');
  const discountBadge = document.getElementById('b2b-discount-badge');
  const totalDisplay = document.getElementById('b2b-est-total');

  if (!varietySelect || !cutSelect || !volumeInput) return;

  const product = PRODUCTS.find(p => p.id === varietySelect.value) || PRODUCTS[0];
  const volume = Number(volumeInput.value) || 10;
  const cutId = cutSelect.value;

  const quote = calculateB2BQuote(product, volume, cutId);
  const discountInfo = getB2BDiscount(volume);

  if (discountBadge) {
    discountBadge.textContent = currentLang === 'bn'
      ? `${toBanglaNumber(quote.discountPercent)}% হোলসেল ডিসকাউন্ট`
      : `${quote.discountPercent}% Wholesale Discount`;
  }

  if (totalDisplay) {
    totalDisplay.textContent = formatPrice(quote.netTotal, currentLang);
  }

  // Highlight corresponding tier card
  document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('highlight'));
  if (volume >= 10 && volume <= 25) {
    document.querySelector('.tier-card[data-tier="tier-1"]')?.classList.add('highlight');
  } else if (volume >= 26 && volume <= 50) {
    document.querySelector('.tier-card[data-tier="tier-2"]')?.classList.add('highlight');
  } else if (volume > 50) {
    document.querySelector('.tier-card[data-tier="tier-3"]')?.classList.add('highlight');
  }
}

/**
 * Update Cart Drawer UI
 */
function updateCartDrawer(store) {
  const countBadge = document.getElementById('header-cart-count');
  const emptyState = document.getElementById('empty-cart-state');
  const itemsContainer = document.getElementById('cart-items-list');
  const checkoutFooter = document.getElementById('drawer-checkout-footer');
  const subtotalElem = document.getElementById('drawer-subtotal');
  const deliveryFeeElem = document.getElementById('drawer-delivery-fee');
  const grandTotalElem = document.getElementById('drawer-grand-total');

  const totalCount = store.getTotalItemCount();
  if (countBadge) {
    countBadge.textContent = currentLang === 'bn' ? toBanglaNumber(totalCount) : totalCount;
  }

  if (!itemsContainer) return;

  if (store.items.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (checkoutFooter) checkoutFooter.style.display = 'none';
    itemsContainer.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (checkoutFooter) checkoutFooter.style.display = 'block';

  itemsContainer.innerHTML = '';

  store.items.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return;

    const cut = CUT_OPTIONS[item.cutId] || { labelBn: 'গোটা', labelEn: 'Whole' };
    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item-card';

    const title = currentLang === 'bn' ? product.nameBn : product.nameEn;
    const cutLabel = currentLang === 'bn' ? cut.labelBn : cut.labelEn;
    const weightLabel = formatWeight(item.weight, product.unit, currentLang);
    const priceLabel = formatPrice(item.price, currentLang);

    itemCard.innerHTML = `
      <img src="${product.image}" alt="${title}" class="cart-item-thumb" />
      <div class="cart-item-info">
        <h4 class="cart-item-title">${title}</h4>
        <div class="cart-item-cut-badge">
          ${currentLang === 'bn' ? TRANSLATIONS.bn['drawer.cut_lbl'] : TRANSLATIONS.en['drawer.cut_lbl']} ${cutLabel}
        </div>
        <div class="cart-item-footer">
          <div class="weight-stepper">
            <button type="button" class="stepper-btn btn-cart-minus" aria-label="Decrease item weight">−</button>
            <span class="stepper-value tabular-numbers">${weightLabel}</span>
            <button type="button" class="stepper-btn btn-cart-plus" aria-label="Increase item weight">+</button>
          </div>
          <span class="cart-item-price tabular-numbers">${priceLabel}</span>
          <button type="button" class="cart-item-remove-btn" aria-label="Remove item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;

    itemCard.querySelector('.btn-cart-minus').addEventListener('click', () => {
      cart.updateItemWeight(item.key, -1);
    });

    itemCard.querySelector('.btn-cart-plus').addEventListener('click', () => {
      cart.updateItemWeight(item.key, 1);
    });

    itemCard.querySelector('.cart-item-remove-btn').addEventListener('click', () => {
      cart.removeItem(item.key);
    });

    itemsContainer.appendChild(itemCard);
  });

  const subtotal = store.getSubtotal();
  const deliveryFee = store.getDeliveryFee();
  const grandTotal = store.getGrandTotal();

  if (subtotalElem) subtotalElem.textContent = formatPrice(subtotal, currentLang);
  if (deliveryFeeElem) deliveryFeeElem.textContent = formatPrice(deliveryFee, currentLang);
  if (grandTotalElem) grandTotalElem.textContent = formatPrice(grandTotal, currentLang);
}

/**
 * Open / Close Drawer with Accessible Focus Management
 */
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;

  previousActiveElement = document.activeElement;
  backdrop.classList.add('open');
  drawer.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  drawer.setAttribute('aria-hidden', 'false');

  const closeBtn = document.getElementById('drawer-close-btn');
  if (closeBtn) {
    requestAnimationFrame(() => {
      closeBtn.focus();
    });
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;

  backdrop.classList.remove('open');
  drawer.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('aria-hidden', 'true');

  if (previousActiveElement) {
    previousActiveElement.focus();
  }
}

/**
 * Apply i18n Translations Across DOM
 */
function applyTranslations(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'bn' ? 'বাংলা' : 'English';
  }

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = TRANSLATIONS[lang]?.[key];
    if (translated) {
      el.textContent = translated;
    }
  });

  // Re-render components with language sensitive formatting
  renderProductGrid();
  renderDeliverySlots();
  updateB2BCalculator();
  updateCartDrawer(cart);
}

/**
 * App Setup & Event Wiring
 */
document.addEventListener('DOMContentLoaded', () => {
  initProductStates();
  renderProductGrid();
  renderDeliverySlots();
  updateB2BCalculator();

  // Cart Subscription
  cart.subscribe(updateCartDrawer);

  // Synchronize area select
  const areaSelect = document.getElementById('global-area-select');
  if (areaSelect) {
    areaSelect.value = cart.selectedArea;
    areaSelect.addEventListener('change', e => {
      cart.setArea(e.target.value);
    });
  }

  // Drawer Triggers
  const cartTriggerBtn = document.getElementById('cart-trigger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerEmptyBrowseBtn = document.getElementById('drawer-empty-browse-btn');

  if (cartTriggerBtn) cartTriggerBtn.addEventListener('click', openCartDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeCartDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeCartDrawer);
  if (drawerEmptyBrowseBtn) {
    drawerEmptyBrowseBtn.addEventListener('click', () => {
      closeCartDrawer();
      document.getElementById('retail-catalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Escape key closes modals and drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      document.getElementById('privacy-modal')?.classList.remove('open');
      document.getElementById('order-success-modal')?.classList.remove('open');
    }
  });

  // Category Tabs Filter & Sliding Pill Indicator
  const tabsNav = document.getElementById('category-tabs-nav');
  const tabIndicator = document.getElementById('tab-active-indicator');
  const tabButtons = document.querySelectorAll('.category-tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProductGrid();
      moveActiveTabIndicator(btn, tabIndicator);
    });
  });

  // Initialize tab indicator position
  const activeTab = document.querySelector('.category-tab-btn.active');
  if (activeTab && tabIndicator) {
    setTimeout(() => moveActiveTabIndicator(activeTab, tabIndicator), 50);
  }

  // Language Switcher Toggle
  const langSwitchBtn = document.getElementById('lang-switch-btn');
  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'bn' ? 'en' : 'bn';
      applyTranslations(nextLang);
    });
  }

  // Audience Mode Toggle (Retail vs B2B)
  const retailBtn = document.getElementById('mode-retail-btn');
  const b2bBtn = document.getElementById('mode-b2b-btn');

  if (retailBtn && b2bBtn) {
    retailBtn.addEventListener('click', () => {
      retailBtn.classList.add('active');
      b2bBtn.classList.remove('active');
      document.getElementById('retail-catalog')?.scrollIntoView({ behavior: 'smooth' });
    });

    b2bBtn.addEventListener('click', () => {
      b2bBtn.classList.add('active');
      retailBtn.classList.remove('active');
      document.getElementById('b2b-wholesale')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hero CTAs
  document.getElementById('hero-browse-cta')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('retail-catalog')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('hero-b2b-cta')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('b2b-wholesale')?.scrollIntoView({ behavior: 'smooth' });
  });

  // B2B Bulk Calculator inputs
  const b2bForm = document.getElementById('b2b-quote-form');
  const b2bVariety = document.getElementById('b2b-variety-select');
  const b2bCut = document.getElementById('b2b-cut-select');
  const b2bVol = document.getElementById('b2b-volume-input');

  [b2bVariety, b2bCut, b2bVol].forEach(el => {
    if (el) el.addEventListener('input', updateB2BCalculator);
  });

  if (b2bForm) {
    b2bForm.addEventListener('submit', e => {
      e.preventDefault();
      const restName = document.getElementById('b2b-rest-name')?.value.trim();
      const phone = document.getElementById('b2b-phone')?.value.trim();

      if (!restName || !phone) {
        alert(currentLang === 'bn' ? 'দয়া করে রেস্টুরেন্টের নাম এবং ফোন নম্বর প্রদান করুন।' : 'Please enter restaurant name and phone number.');
        return;
      }

      if (!isValidBdPhone(phone)) {
        alert(currentLang === 'bn' ? 'সঠিক বাংলাদেশি মোবাইল নম্বর (১১ ডিজিট) দিন।' : 'Please enter a valid 11-digit Bangladesh phone number.');
        return;
      }

      const product = PRODUCTS.find(p => p.id === b2bVariety.value) || PRODUCTS[0];
      const volume = b2bVol.value;
      const cut = CUT_OPTIONS[b2bCut.value] || { labelBn: 'কারি কাট', labelEn: 'Curry Cut' };
      const quote = calculateB2BQuote(product, volume, b2bCut.value);

      // Save lead locally
      const lead = {
        restName,
        phone,
        product: product.nameEn,
        cut: cut.labelEn,
        volume,
        estTotal: quote.netTotal,
        timestamp: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(localStorage.getItem('tomar_murgi_b2b_leads') || '[]');
        existing.push(lead);
        localStorage.setItem('tomar_murgi_b2b_leads', JSON.stringify(existing));
      } catch {}

      // Format WhatsApp payload
      const waMsg = encodeURIComponent(
        `*Tomar Murgi Store — B2B Bulk Procurement Inquiry*\n\n` +
        `Enterprise: ${restName}\n` +
        `Contact: ${phone}\n` +
        `Product: ${product.nameEn}\n` +
        `Cut Spec: ${cut.labelEn}\n` +
        `Daily Volume: ${volume} kg\n` +
        `Estimated Rate: ৳ ${quote.netTotal}\n` +
        `Delivery Slot: Early Commercial 5:00 AM - 7:00 AM\n\n` +
        `Please confirm today's wholesale contract rate.`
      );

      window.open(`https://wa.me/8801700000000?text=${waMsg}`, '_blank');
    });
  }

  // Payment Tiles Toggle
  document.querySelectorAll('.payment-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.payment-tile').forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      cart.setPaymentMethod(tile.getAttribute('data-method'));
    });
  });

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const phoneInput = document.getElementById('checkout-phone');
      const phoneVal = phoneInput?.value.trim();

      if (!isValidBdPhone(phoneVal)) {
        alert(currentLang === 'bn' ? 'দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।' : 'Please provide a valid 11-digit mobile number.');
        phoneInput?.focus();
        return;
      }

      // Generate simulated order ID
      const orderId = `TMS-${Math.floor(10000 + Math.random() * 90000)}`;
      const successIdElem = document.getElementById('success-order-id');
      if (successIdElem) {
        successIdElem.textContent = currentLang === 'bn' ? `TMS-${toBanglaNumber(orderId.replace('TMS-', ''))}` : orderId;
      }

      cart.clearCart();
      closeCartDrawer();

      // Show success modal
      const successModal = document.getElementById('order-success-modal');
      if (successModal) successModal.classList.add('open');
    });
  }

  document.getElementById('btn-success-dismiss')?.addEventListener('click', () => {
    document.getElementById('order-success-modal')?.classList.remove('open');
  });

  // Privacy Policy Modal Handlers
  const privacyModal = document.getElementById('privacy-modal');
  const footerPrivacyTrigger = document.getElementById('footer-privacy-trigger');
  const privacyCloseBtn = document.getElementById('privacy-close-btn');
  const privacyAgreeBtn = document.getElementById('privacy-agree-btn');

  const openPrivacy = e => {
    if (e) e.preventDefault();
    privacyModal?.classList.add('open');
  };

  const closePrivacy = () => {
    privacyModal?.classList.remove('open');
  };

  if (footerPrivacyTrigger) footerPrivacyTrigger.addEventListener('click', openPrivacy);
  if (privacyCloseBtn) privacyCloseBtn.addEventListener('click', closePrivacy);
  if (privacyAgreeBtn) privacyAgreeBtn.addEventListener('click', closePrivacy);
  privacyModal?.addEventListener('click', e => {
    if (e.target === privacyModal) closePrivacy();
  });
});
