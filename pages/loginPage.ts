import { Page, expect, selectors } from '@playwright/test'

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async verifyLoginTitle() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async verifySuccessfulLogin() {
    await expect(this.page.getByText('Products')).toBeInViewport();
  }

  async verifyWrongPasswordError() {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  }

  async verifyLockedOutUserError() {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  }
}
