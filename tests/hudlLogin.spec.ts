import { test, expect } from '@playwright/test';

const hudlUrl = 'https://www.hudl.com/';
const headerLoginBtn = '[data-qa-id="login-select"]';
const dropdownLoginBtn = '[data-qa-id="login-hudl"]';
const googleBtn = '[data-provider="google"]';
const facebookBtn = '[data-provider="facebook"]';
const appleBtn = '[data-provider="apple"]';

async function goToLoginPage(page) {
  await page.goto(hudlUrl);
  await page.locator(headerLoginBtn).click();
  await page.locator(dropdownLoginBtn).click();
}

test.describe('happy path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering a correct username and password routes user to main page', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('negative path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering an incorrect username shows an error', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });

  test('entering an incorrect password shows an error', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('create account path', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('placeholder test', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });
});

test.describe('third party login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('Login with Google', async ({ page }) => {
    await page.locator(googleBtn).click();
    await expect(page).toHaveURL(/google/);
  });

  test('Login with Facebook', async ({ page }) => {
    await page.locator(facebookBtn).click();
    await expect(page).toHaveURL(/facebook/);
  });

  test('Login with Apple', async ({ page }) => {
    await page.locator(appleBtn).click();
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
    await expect(page).toHaveURL(/login/);
  });
});
