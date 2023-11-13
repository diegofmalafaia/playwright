import { test, expect, selectors } from '@playwright/test';
import {LoginPage} from "../pages/loginPage";

test('has title', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginTitle();
});

test('login with success', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifySuccessfulLogin();
});

test('login with wrong password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'wrong_password');
  await loginPage.verifyWrongPasswordError();
});

test('login with locked out user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.verifyLockedOutUserError();
});
