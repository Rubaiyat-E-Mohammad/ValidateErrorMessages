import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login'

let context, page, browser, page1
test.beforeAll(async () => {
  browser = await chromium.launch()
  context = await browser.newContext()
  page = await context.newPage()
  await page.goto('https://farazi.staging.dokandev.com/vendor/login');
  await expect.soft(page).toHaveTitle(/Dokan vendor | Login - Dokan/)
})

test.describe('Validate Coupon Test', () => {

  test('Test Login Page', async () => {

    const Login = new LoginPage(page)
    await Login.login('dederoc695@eachart.com', 'QAweDevs2024')
    //await page.pause()
  })

  test('Add Product of same vendor', async () => {

    await page.getByRole('button', { name: 'Visit Store' }).click();

    const page1Promise = page.waitForEvent('popup');

    await page.getByRole('menuitem', { name: 'erco' }).click();

    page1 = await page1Promise;

    page.mouse.wheel(0, 100)

    await page1.getByText('Blue Shoe').click();

    const context = await browser.newContext();

    await page1.getByRole('button', { name: 'Go to Cart' }).click();

  })

  test('Specific Product', async () => {

    await page1.getByRole('button', { name: 'Have a coupon code ?' }).click();

    await page1.getByText('Type your coupon').click();

    await page1.locator('div').filter({ hasText: /^Apply Coupon$/ }).locator('div').nth(1).click();

    await page1.getByRole('textbox').fill('VP5MKXFA');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is valid for specific products/)).toBeVisible();

  })

  test('Specific Category (Unique collection)', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('BHUADCB9');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Category (Sports & Outdoor)', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('Y9X23GPQ');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Category (Clothing)', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('DJSJH9QS');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Customer', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('SPD656TW');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is not applicable/)).toBeVisible();

  })

  test('Minimum Purchased Amount', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('XC4S3X2A');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/Minimum purchase amount should 10000/)).toBeVisible();

  })

  test('Minimum Quantity of items ', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('286VP8ZV');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/Minimum items should 100/)).toBeVisible();

  })

  test('Usage limit per coupon ', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('GDKCYB9M');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await page1.locator('div').filter({ hasText: /^GDKCYB9MApply Coupon$/ }).locator('div').nth(4).click();

    await page1.getByRole('textbox').fill('GDKCYB9M');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon has already been applied/)).toBeVisible();

  })

  test('Conjunction with other coupons ', async () => {

    await page1.getByRole('textbox').click();

    await page1.getByRole('textbox').press('Meta+a');

    await page1.getByRole('textbox').fill('MTEUSN79');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon cannot be use alongside of other coupon/)).toBeVisible();

  })

  test('Valid date ', async () => {

    await page1.getByRole('textbox').click();
    await page1.getByRole('textbox').press('Meta+a');
    await page1.getByRole('textbox').fill('7XFDR7RC');
    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon code is not currently available/)).toBeVisible();


  })

  test('Add Product of other vendor & Validate coupon', async () => {
    await page1.locator("//div[@class='inline-flex h-5 w-5 items-center justify-center rounded-full border text-dark-400 hover:border-primary-500 hover:text-primary-500']//*[name()='svg']//*[name()='path' and contains(@stroke-linecap,'round')]").click();

    await page1.getByRole('link', { name: 'Shop', exact: true }).click();

    await page1.getByText('Jacket').click();

    await page1.getByText('Go to Cart').click();

    await page1.getByRole('button', { name: 'Have a coupon code ?' }).click();

    await page1.getByText('Type your coupon').click();

    await page1.locator('div').filter({ hasText: /^Apply Coupon$/ }).locator('div').nth(1).click();

    await page1.getByRole('textbox').fill('VP5MKXFA');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon is valid for specific vendor products/)).toBeVisible();

  })

})