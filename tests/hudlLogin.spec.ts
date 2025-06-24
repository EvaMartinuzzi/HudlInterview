import { test, expect } from '@playwright/test';

//pull these into their own files so they can be used globally
//import { login } from '../helpers/login';
//import { selectors } from '../selectors/login';

const hudlUrl = 'https://www.hudl.com/';
const headerLoginBtn = '[data-qa-id="login-select"]';
const dropdownLoginBtn = '[data-qa-id="login-hudl"]';
const googleBtn = '[data-provider="google"]';
const facebookBtn = '[data-provider="facebook"]';
const appleBtn = '[data-provider="apple"]';
const editUn = '[data-link-name="edit-username"]';
const usernameInput = '[id="username"]';
const passwordInput = '[id="password"]';
const forgotPassBtn = '[a contains text Forgot Password]';
const submitBtn = '[button[type="submit"]';
// these two are sent in the CLI when the tests are run. See README for more info.
const usernameString = process.env.USERNAME;
const passwordString = process.env.PASSWORD;

async function goToLoginPage(page) {
  await page.goto(hudlUrl);
  await page.locator(headerLoginBtn).click();
  await page.locator(dropdownLoginBtn).click();
  await page.waitForNavigation();
}

test.describe('happy path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering a correct username reveals the password input and forgot password button', async ({ page }) => {
    // expect password input
    // expect forgot password button
    // expect edit username button
  });

  test('entering a correct username and password directs user to homepage', async ({ page }) => {
    // expect password input
    // expect forgot password button
  });
});

test.describe('reset password path', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('user can send a reset password email', async ({ page }) => {
    // enter correct username
    // click forgot password button
    await expect(page).toHaveURL(/reset-password/);
    // click go back
    await expect(page).not.toHaveURL(/reset-password/);
  });
});

test.describe('negative path login', () => {
  test.beforeEach(async ({ page }) => {
    await goToLoginPage(page);
  });

  test('entering an incorrect username shows an error', async ({ page }) => {
    // enter a username that is NOT formatted as an email
    //expect error message
  });

  test('entering an empty username shows an error', async ({ page }) => {
    //expect error message
  });

  test('entering an incorrect password shows an error', async ({ page }) => {
    //expect error message
  });

  test('entering an empty password shows an error', async ({ page }) => {
    //expect error message
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
