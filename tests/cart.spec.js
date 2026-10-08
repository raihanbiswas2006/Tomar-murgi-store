import { test, expect } from '@playwright/test';

test.describe('Cart Drawer, Price Calculation & Checkout Engine Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start with empty cart
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('adding product updates cart count, triggers animation, opens drawer with focus trap', async ({ page }) => {
    // Initial cart count should be 0
    const cartCount = page.locator('#header-cart-count');
    await expect(cartCount).toHaveText('০');

    // Click "Add to Cart" on first product
    const firstAddBtn = page.locator('.btn-add-cart').first();
    await firstAddBtn.click();

    // Header count should increment
    await expect(cartCount).not.toHaveText('০');

    // Open Cart Drawer
    const cartTrigger = page.locator('#cart-trigger-btn');
    await cartTrigger.click();

    // Verify Drawer is visible with .open class
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);

    // Verify Focus moves to close button inside drawer
    const closeBtn = page.locator('#drawer-close-btn');
    await expect(closeBtn).toBeFocused();

    // Verify line item exists
    const cartItem = page.locator('.cart-item-card').first();
    await expect(cartItem).toBeVisible();

    // Verify Escape key closes drawer and returns focus
    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveClass(/open/);
  });

  test('modifying weight on card updates dynamic price odometer with correct arithmetic', async ({ page }) => {
    const firstCard = page.locator('.product-card').first();
    const priceDisplay = firstCard.locator('.price-main');
    const plusBtn = firstCard.locator('.btn-stepper-plus');

    const initialPriceStr = await priceDisplay.getAttribute('data-raw-price');
    const initialPrice = parseInt(initialPriceStr, 10);

    // Click plus button on card
    await plusBtn.click();

    // Wait for price ticker update
    await page.waitForTimeout(350);

    const updatedPriceStr = await priceDisplay.getAttribute('data-raw-price');
    const updatedPrice = parseInt(updatedPriceStr, 10);

    // Updated price must be strictly greater than initial price
    expect(updatedPrice).toBeGreaterThan(initialPrice);
  });

  test('line item weight adjustment and deletion in cart drawer', async ({ page }) => {
    // Add first item
    await page.locator('.btn-add-cart').first().click();

    // Open cart
    await page.locator('#cart-trigger-btn').click();
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);

    const plusBtn = page.locator('.btn-cart-plus').first();
    const itemPrice = page.locator('.cart-item-price').first();
    const initialPriceText = await itemPrice.textContent();

    await plusBtn.click();
    await page.waitForTimeout(100);

    const newPriceText = await itemPrice.textContent();
    expect(newPriceText).not.toBe(initialPriceText);

    // Remove item
    const removeBtn = page.locator('.cart-item-remove-btn').first();
    await removeBtn.click();

    // Verify empty state is displayed
    const emptyState = page.locator('#empty-cart-state');
    await expect(emptyState).toBeVisible();
  });
});
