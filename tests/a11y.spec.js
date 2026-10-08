import { test, expect } from '@playwright/test';

test.describe('Accessibility & Reduced-Motion Guardrail Tests', () => {
  test('reduced-motion preference suppresses animations and transforms', async ({ page }) => {
    // Emulate prefers-reduced-motion: reduce
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify media query match
    const isReduced = await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    expect(isReduced).toBe(true);

    // Check CSS rule on a product card: transition-duration is suppressed and transform is none
    const card = page.locator('.product-card').first();
    const transitionDuration = await card.evaluate(el => window.getComputedStyle(el).transitionDuration);
    const durationVal = parseFloat(transitionDuration);
    expect(durationVal <= 0.001).toBeTruthy();

    const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
    expect(transform).toBe('none');
  });

  test('delivery slots are keyboard accessible and trigger selection', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstSlot = page.locator('.slot-card').first();
    await expect(firstSlot).toBeVisible();

    // Focus and press Enter
    await firstSlot.focus();
    await page.keyboard.press('Enter');

    await expect(firstSlot).toHaveClass(/active/);
    await expect(firstSlot).toHaveAttribute('aria-checked', 'true');
  });

  test('privacy policy modal opens, displays BD compliance clauses, and closes properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const privacyTrigger = page.locator('#footer-privacy-trigger');
    await privacyTrigger.scrollIntoViewIfNeeded();
    await privacyTrigger.click();

    const modal = page.locator('#privacy-modal');
    await expect(modal).toHaveClass(/open/);

    // Verify key compliance clause text
    const modalContent = page.locator('#privacy-modal .modal-body');
    await expect(modalContent).toContainText('তথ্য সংগ্রহ ও ব্যবহার');
    await expect(modalContent).toContainText('তথ্যের শতভাগ গোপনীয়তা');
    await expect(modalContent).toContainText('পেমেন্ট তথ্য সংরক্ষণ নিষেধাজ্ঞা');
    await expect(modalContent).toContainText('স্বাস্থ্য ও রিটার্ন গ্যারান্টি');

    // Close via agree button
    const agreeBtn = page.locator('#privacy-agree-btn');
    await agreeBtn.click();
    await expect(modal).not.toHaveClass(/open/);
  });
});
