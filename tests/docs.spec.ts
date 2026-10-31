import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('home page title contains Playwright', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('Get started opens the intro docs', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/\/docs\/intro/);
});

test('Installation heading is visible', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('search for "locators" shows a result', async ({ page }) => {
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search docs').fill('locators');
  await expect(page.getByRole('option').first()).toBeVisible();
});