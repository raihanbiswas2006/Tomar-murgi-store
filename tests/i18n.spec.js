import { test, expect } from '@playwright/test';

test.describe('Dual-Language Localization & Typography Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('default language is Bengali with correct lang attribute and typography rules', async ({ page }) => {
    // Assert html lang is bn
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'bn');

    // Assert Bengali brand text
    const brandHeading = page.locator('.brand-text h1');
    await expect(brandHeading).toHaveText('তোমার মুরগি স্টোর');

    // Assert letter-spacing is 0 for Bengali
    const letterSpacing = await brandHeading.evaluate(el => window.getComputedStyle(el).letterSpacing);
    expect(letterSpacing === 'normal' || letterSpacing === '0px').toBeTruthy();

    // Assert currency format in Bengali includes '৳'
    const firstPrice = page.locator('.price-main').first();
    const priceText = await firstPrice.textContent();
    expect(priceText).toContain('৳');
  });

  test('switching to English updates html lang, currency format, and UI labels seamlessly', async ({ page }) => {
    const langBtn = page.locator('#lang-switch-btn');
    await expect(langBtn).toBeVisible();

    // Click language toggle
    await langBtn.click();

    // Verify html lang is now en
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');

    // Verify brand heading updated to English
    const brandHeading = page.locator('.brand-text h1');
    await expect(brandHeading).toHaveText('Tomar Murgi Store');

    // Verify button label now says English
    const langLabel = page.locator('#current-lang-label');
    await expect(langLabel).toHaveText('English');

    // Verify hero button updated to English
    const heroBtn = page.locator('#hero-browse-cta span');
    await expect(heroBtn).toHaveText('Browse Fresh Catalog');

    // Verify currency format in English starts with '৳'
    const firstPrice = page.locator('.price-main').first();
    const priceText = await firstPrice.textContent();
    expect(priceText).toMatch(/^৳\s*\d+/);

    // Switch back to Bengali
    await langBtn.click();
    await expect(html).toHaveAttribute('lang', 'bn');
    await expect(brandHeading).toHaveText('তোমার মুরগি স্টোর');
  });
});
