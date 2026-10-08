import { test, expect } from '@playwright/test';

test.describe('B2B Wholesale Module & Procurement Calculator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('volume tier calculator accurately applies 8% bulk discount for 26kg-50kg orders', async ({ page }) => {
    const volInput = page.locator('#b2b-volume-input');
    const discountBadge = page.locator('#b2b-discount-badge');
    const tier2Card = page.locator('.tier-card[data-tier="tier-2"]');

    // Default volume is 30kg (which falls in Tier 2: 26-50kg)
    await expect(volInput).toHaveValue('30');
    await expect(discountBadge).toContainText('৮%');
    await expect(tier2Card).toHaveClass(/highlight/);

    // Set volume to 15kg (Tier 1: 10-25kg -> 5% discount)
    await volInput.fill('15');
    await volInput.dispatchEvent('input');
    await page.waitForTimeout(100);

    await expect(discountBadge).toContainText('৫%');
    const tier1Card = page.locator('.tier-card[data-tier="tier-1"]');
    await expect(tier1Card).toHaveClass(/highlight/);

    // Set volume to 60kg (Tier 3: 50kg+ -> 12% discount)
    await volInput.fill('60');
    await volInput.dispatchEvent('input');
    await page.waitForTimeout(100);

    await expect(discountBadge).toContainText('১২%');
    const tier3Card = page.locator('.tier-card[data-tier="tier-3"]');
    await expect(tier3Card).toHaveClass(/highlight/);
  });

  test('procurement form validates required restaurant and phone fields', async ({ page }) => {
    const b2bSection = page.locator('#b2b-wholesale');
    await b2bSection.scrollIntoViewIfNeeded();

    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });

    const submitBtn = page.locator('#btn-whatsapp-b2b');
    await submitBtn.click();

    // Verify alert message triggered for missing fields
    expect(dialogMessage.length).toBeGreaterThan(0);
  });
});
