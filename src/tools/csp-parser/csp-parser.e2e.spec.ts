import { test, expect } from '@playwright/test';

test.describe('Tool - Csp parser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/csp-parser');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Csp parser - IT Tools');
  });

  test('', async ({ page }) => {

  });
});