/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Motion & Physics Engine (Emil Kowalski Micro-Interactions)
 * Anime.js Tickers, Floating Badges & Motion.dev Spring Physics
 */

import { animate as animeAnimate } from 'animejs';
import { animate as motionAnimate } from 'motion';
import { toBanglaNumber } from './i18n.js';

export const isReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Dynamic rolling price ticker using Anime.js
 * Updates target element smoothly from current numeric value to next
 */
export function animatePriceTicker(element, targetPrice, lang = 'bn') {
  if (!element) return;
  if (isReducedMotion()) {
    element.textContent = lang === 'bn' ? `${toBanglaNumber(targetPrice)} ৳` : `৳ ${targetPrice}`;
    return;
  }

  const currentText = element.getAttribute('data-raw-price') || '0';
  const startVal = parseInt(currentText, 10) || targetPrice;
  const targetVal = parseInt(targetPrice, 10) || 0;

  element.setAttribute('data-raw-price', String(targetVal));

  if (startVal === targetVal) {
    element.textContent = lang === 'bn' ? `${toBanglaNumber(targetVal)} ৳` : `৳ ${targetVal}`;
    return;
  }

  const counterObj = { val: startVal };

  animeAnimate(counterObj, {
    val: targetVal,
    duration: 320,
    ease: 'outExpo',
    onUpdate: () => {
      const current = Math.round(counterObj.val);
      element.textContent = lang === 'bn' ? `${toBanglaNumber(current)} ৳` : `৳ ${current}`;
    }
  });
}

/**
 * Floating "+1 kg" / "+1 item" badge flight from trigger button
 * Flies up 28px and fades out smoothly
 */
export function triggerFloatingAddBadge(buttonElement, text = '+1 kg') {
  if (!buttonElement) return;

  // Button depress feedback
  if (!isReducedMotion()) {
    buttonElement.style.transform = 'scale(0.96)';
    setTimeout(() => {
      buttonElement.style.transform = '';
    }, 120);
  }

  const badge = document.createElement('div');
  badge.className = 'floating-badge';
  badge.textContent = text;
  document.body.appendChild(badge);

  const rect = buttonElement.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;

  badge.style.position = 'fixed';
  badge.style.left = `${startX}px`;
  badge.style.top = `${startY}px`;
  badge.style.transform = 'translate(-50%, -50%)';
  badge.style.pointerEvents = 'none';
  badge.style.zIndex = '9999';

  if (isReducedMotion()) {
    badge.style.opacity = '1';
    setTimeout(() => {
      badge.remove();
    }, 300);
    return;
  }

  animeAnimate(badge, {
    translateY: -36,
    opacity: [0, 1, 0],
    scale: [0.85, 1.05, 0.95],
    duration: 650,
    ease: 'outCubic',
    onComplete: () => {
      badge.remove();
    }
  });
}

/**
 * Header cart trigger bounce animation on item addition
 */
export function triggerCartBump() {
  const cartTrigger = document.getElementById('cart-trigger-btn');
  const cartBadge = document.getElementById('header-cart-count');
  const target = cartBadge || cartTrigger;
  if (!target) return;

  if (isReducedMotion()) {
    target.style.opacity = '0.7';
    setTimeout(() => { target.style.opacity = '1'; }, 100);
    return;
  }

  animeAnimate(target, {
    scale: [1, 1.35, 0.92, 1],
    duration: 440,
    ease: 'outBack'
  });
}

/**
 * Category tab sliding active pill positioner using Motion.dev springs
 */
export function moveActiveTabIndicator(activeTabElement, indicatorElement) {
  if (!activeTabElement || !indicatorElement) return;

  const parent = activeTabElement.parentElement;
  if (!parent) return;

  const parentRect = parent.getBoundingClientRect();
  const activeRect = activeTabElement.getBoundingClientRect();

  const targetLeft = activeRect.left - parentRect.left + parent.scrollLeft;
  const targetWidth = activeRect.width;

  if (isReducedMotion()) {
    indicatorElement.style.left = `${targetLeft}px`;
    indicatorElement.style.width = `${targetWidth}px`;
    return;
  }

  motionAnimate(
    indicatorElement,
    {
      left: `${targetLeft}px`,
      width: `${targetWidth}px`
    },
    {
      duration: 0.28,
      ease: [0.2, 0, 0, 1]
    }
  );
}

/**
 * Delivery slot selection pulse ring animation
 */
export function triggerSlotPulse(slotCard) {
  if (!slotCard) return;
  slotCard.classList.remove('slot-pulse');
  // Trigger reflow to restart CSS animation
  void slotCard.offsetWidth;
  slotCard.classList.add('slot-pulse');
}
