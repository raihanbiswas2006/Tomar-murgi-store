/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Pricing & Weight Calculation Engine
 * Live vs Dressed Weight Algorithms & B2B Wholesale Tier Matrix
 */

import { CUT_OPTIONS, B2B_TIERS, DHAKA_AREAS } from './products.js';

/**
 * Calculate retail product total based on weight and cut multiplier
 */
export function calculateItemPrice(product, weight, cutId) {
  if (!product) return 0;
  const cut = CUT_OPTIONS[cutId] || { priceMultiplier: 1.0 };
  const base = product.pricePerKg * weight;
  return Math.round(base * cut.priceMultiplier);
}

/**
 * Calculate estimated clean dressed net weight range from gross live weight
 */
export function calculateDressedYield(product, liveWeight) {
  if (!product || !product.isWeightBased) {
    return null;
  }
  const ratio = product.yieldRatio || 0.74;
  const netEstimated = liveWeight * ratio;
  const minNet = (netEstimated * 0.96).toFixed(2);
  const maxNet = (netEstimated * 1.04).toFixed(2);
  return {
    netEstimated: Number(netEstimated.toFixed(2)),
    minNet: Number(minNet),
    maxNet: Number(maxNet)
  };
}

/**
 * Get B2B wholesale discount percentage and tier info
 */
export function getB2BDiscount(volumeKg) {
  const kg = Number(volumeKg) || 0;
  if (kg < 10) {
    return {
      tier: null,
      discountPercent: 0,
      perksBn: 'বাল্ক ডিসকাউন্টের জন্য ন্যূনতম ১০ কেজি নির্বাচন করুন',
      perksEn: 'Select at least 10kg for wholesale tier benefits'
    };
  }
  for (const tier of B2B_TIERS) {
    if (kg >= tier.minKg && kg <= tier.maxKg) {
      return {
        tier,
        discountPercent: tier.discountPercent,
        perksBn: tier.perksBn,
        perksEn: tier.perksEn
      };
    }
  }
  // Above highest maxKg
  const highest = B2B_TIERS[B2B_TIERS.length - 1];
  return {
    tier: highest,
    discountPercent: highest.discountPercent,
    perksBn: highest.perksBn,
    perksEn: highest.perksEn
  };
}

/**
 * Calculate estimated B2B bulk cost
 */
export function calculateB2BQuote(product, volumeKg, cutId) {
  const kg = Number(volumeKg) || 10;
  const basePrice = calculateItemPrice(product, kg, cutId);
  const { discountPercent } = getB2BDiscount(kg);
  const discountAmount = Math.round(basePrice * (discountPercent / 100));
  const netTotal = basePrice - discountAmount;

  return {
    basePrice,
    discountPercent,
    discountAmount,
    netTotal,
    effectiveRatePerKg: Math.round(netTotal / kg)
  };
}

/**
 * Resolve delivery fee by neighborhood ID
 */
export function getDeliveryFeeByArea(areaId) {
  const area = DHAKA_AREAS.find(a => a.id === areaId);
  return area ? area.deliveryFee : 50;
}

/**
 * Validate Bangladesh mobile phone numbers (013 - 019 series)
 */
export function isValidBdPhone(phone) {
  if (!phone) return false;
  const clean = String(phone).trim().replace(/[\s-]/g, '');
  const bdRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  return bdRegex.test(clean);
}
