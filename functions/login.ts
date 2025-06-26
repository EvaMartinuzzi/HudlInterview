import { Page } from 'playwright-core';
import { selectors } from '../selectors/login';

const hudlUrl = 'https://www.hudl.com/'

export async function goToLoginPage(page: Page) {
    await page.goto(hudlUrl);
    await page.locator(selectors.headerLoginBtn).click();
    await page.locator(selectors.dropdownLoginBtn).click();
    await page.waitForURL(/login/);
}
