/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Cart & Order State Management Engine
 * LocalStorage Persistence & Checkout Dispatcher
 */

import { calculateItemPrice, getDeliveryFeeByArea } from './pricing.js';
import { PRODUCTS, CUT_OPTIONS } from './products.js';

const STORAGE_KEY = 'tomar_murgi_cart_v1';
const PREFS_KEY = 'tomar_murgi_prefs_v1';

class CartStore {
  constructor() {
    this.items = this.loadCart();
    this.selectedArea = 'gulshan';
    this.selectedSlot = 'morning';
    this.paymentMethod = 'cod';
    this.listeners = [];
    this.loadPrefs();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch {
      // Storage unavailable or full
    }
    this.notify();
  }

  loadPrefs() {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedArea) this.selectedArea = parsed.selectedArea;
        if (parsed.selectedSlot) this.selectedSlot = parsed.selectedSlot;
        if (parsed.paymentMethod) this.paymentMethod = parsed.paymentMethod;
      }
    } catch {
      // Ignore
    }
  }

  savePrefs() {
    try {
      localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({
          selectedArea: this.selectedArea,
          selectedSlot: this.selectedSlot,
          paymentMethod: this.paymentMethod
        })
      );
    } catch {
      // Ignore
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  addItem(productId, weight, cutId = 'whole') {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Unique key for line item combining product and chosen cut
    const itemKey = `${productId}::${cutId}`;
    const existingIndex = this.items.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.items[existingIndex].weight += weight;
      this.items[existingIndex].weight = Number(this.items[existingIndex].weight.toFixed(2));
      this.items[existingIndex].price = calculateItemPrice(
        product,
        this.items[existingIndex].weight,
        cutId
      );
    } else {
      const itemPrice = calculateItemPrice(product, weight, cutId);
      this.items.push({
        key: itemKey,
        productId,
        weight: Number(weight.toFixed(2)),
        cutId,
        price: itemPrice
      });
    }

    this.saveCart();
  }

  updateItemWeight(itemKey, delta) {
    const item = this.items.find(i => i.key === itemKey);
    if (!item) return;

    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return;

    const step = product.weightStep || 0.25;
    const newWeight = Number((item.weight + delta * step).toFixed(2));

    if (newWeight <= 0) {
      this.removeItem(itemKey);
      return;
    }

    item.weight = newWeight;
    item.price = calculateItemPrice(product, item.weight, item.cutId);
    this.saveCart();
  }

  changeItemCut(itemKey, newCutId) {
    const itemIndex = this.items.findIndex(i => i.key === itemKey);
    if (itemIndex === -1) return;

    const currentItem = this.items[itemIndex];
    const product = PRODUCTS.find(p => p.id === currentItem.productId);
    if (!product) return;

    const newKey = `${currentItem.productId}::${newCutId}`;
    const duplicateIndex = this.items.findIndex(i => i.key === newKey);

    if (duplicateIndex > -1 && duplicateIndex !== itemIndex) {
      // Merge weights
      this.items[duplicateIndex].weight += currentItem.weight;
      this.items[duplicateIndex].price = calculateItemPrice(
        product,
        this.items[duplicateIndex].weight,
        newCutId
      );
      this.items.splice(itemIndex, 1);
    } else {
      currentItem.key = newKey;
      currentItem.cutId = newCutId;
      currentItem.price = calculateItemPrice(product, currentItem.weight, newCutId);
    }

    this.saveCart();
  }

  removeItem(itemKey) {
    this.items = this.items.filter(i => i.key !== itemKey);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  setArea(areaId) {
    this.selectedArea = areaId;
    this.savePrefs();
  }

  setSlot(slotId) {
    this.selectedSlot = slotId;
    this.savePrefs();
  }

  setPaymentMethod(method) {
    this.paymentMethod = method;
    this.savePrefs();
  }

  getTotalItemCount() {
    return this.items.reduce((sum, item) => sum + (item.productId === 'prod-organic-eggs' ? item.weight : 1), 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  getDeliveryFee() {
    if (this.items.length === 0) return 0;
    return getDeliveryFeeByArea(this.selectedArea);
  }

  getGrandTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }
}

export const cart = new CartStore();
