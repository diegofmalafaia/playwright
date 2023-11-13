import { test, expect, selectors } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login with success', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user') ;
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.getByText('Products')).toBeInViewport();
});

test('login with wrong password', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user') ;
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('login with locked out user', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('locked_out_user') ;
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});