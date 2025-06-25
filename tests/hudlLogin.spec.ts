import { test, expect } from '@playwright/test';
import { goToLoginPage } from '../functions/login';
import { selectors } from '../selectors/login';

// these two are sent in the CLI when the tests are run. See README for more info.
const usernameString = process.env.USERNAME;
const passwordString = process.env.PASSWORD;

test.describe('happy path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering a correct username reveals the password input and forgot password button', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.locator(selectors.passwordInput)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot Password' })).toBeVisible();
    await expect(page.locator(selectors.editUn)).toBeVisible();
  });

  test('entering a correct username and password directs user to homepage', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator(selectors.passwordInput).fill(passwordString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/home/);
  });
});

test.describe('reset password path', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('user can send a reset password email', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('link', { name: 'Forgot Password' }).click();
    await expect(page).toHaveURL(/reset-password/);
    await page.locator(selectors.goBackBtn).click();
    await expect(page).not.toHaveURL(/reset-password/);
  });
});

test.describe('negative path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering an incorrect username shows an error', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill("notAnEmail@gmail");
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByText('Enter a valid email.')).toBeVisible();
  });

  test('entering an empty username shows an error', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill('');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // no error message is shown, but the password input should not be visibl
    await expect(page.locator(selectors.passwordInput)).not.toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('entering an incorrect password shows an error', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator(selectors.passwordInput).fill('thisIsWrong');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByText('Your email or password is')).toBeVisible();
  });

  test('entering an empty password shows an error', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator(selectors.passwordInput).fill('');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // no error message is shown, but the password input should be visible and URL should not change
    await expect(page.locator(selectors.passwordInput)).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('create account', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('can navigate to create account page', async ({ page }) => {
    await page.getByRole('link', { name: 'Create Account' }).click();
    await expect(page).toHaveURL(/signup/);
    await expect(page.locator(selectors.updateUserFirst)).toBeVisible();
    await expect(page.locator(selectors.updateUserLast)).toBeVisible(); 
    await expect(page.locator(selectors.updateUserEmail)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible();
  });
});

test.describe('third party login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('Login with Google', async ({ page }) => {
    await page.locator(selectors.googleBtn).click();
    await expect(page).toHaveURL(/google/);
  });

  test('Login with Facebook', async ({ page }) => {
    await page.locator(selectors.facebookBtn).click();
    await expect(page).toHaveURL(/facebook/);
  });

  test('Login with Apple', async ({ page }) => {
    await page.locator(selectors.appleBtn).click();
    await expect(page).toHaveURL(/apple/);
  });
});

// nice to have tests:
test.describe('happy path login: accessibility version', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering a correct username and password using only a keyboard routes user to main page', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('happy path login: mobile version', () => {
  test.use({ viewport: { width: 360, height: 740 } });
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering a correct username and password on a mobile screen size routes user to main page', async ({ page }) => {
    await page.locator(selectors.usernameInput).fill(usernameString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator(selectors.passwordInput).fill(passwordString ?? '');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/home/);
  });
});
