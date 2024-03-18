import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login'
import { ApplyCoupon } from '../pages/applycoupon';
import { ChangeCoupon } from '../pages/changecoupon';

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
  })

  test('Add Product of same vendor & view cart', async () => {

    await page.getByRole('button', { name: 'Visit Store' }).click();

    await page.waitForTimeout(2000)

    await page.getByRole('menuitem', { name: 'erco' }).click();

    await page.waitForTimeout(5000)

    //await page.pause();

    const pages = await context.pages();

    page1 = await pages[1];

    // await page1.mouse.wheel(0, 100)

    // await page1.waitForTimeout(2000)

    await page1.locator('div').filter({ hasText: /^Blue ShoeAdd to Cart$/ }).locator('div').click();
    await page1.getByRole('button', { name: 'Go to Cart' }).click();

  })

  test('Specific Product', async () => {

    const Appcoupon = new ApplyCoupon(page1)

    await Appcoupon.applycoupon('VP5MKXFA')

    await expect(page1.getByText(/This coupon is valid for specific products/)).toBeVisible();

  })

  test('Specific Category (Unique collection)', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('BHUADCB9')

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Category (Sports & Outdoor)', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('Y9X23GPQ')

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Category (Clothing)', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('DJSJH9QS')

    await expect(page1.getByText(/This coupon is valid for specific product categories/)).toBeVisible();

  })

  test('Specific Customer', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('SPD656TW')

    await expect(page1.getByText(/This coupon is not applicable/)).toBeVisible();

  })

  test('Minimum Purchased Amount', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('XC4S3X2A')

    await expect(page1.getByText(/Minimum purchase amount should 10000/)).toBeVisible();

  })

  test('Minimum Quantity of items ', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('286VP8ZV')

    await expect(page1.getByText(/Minimum items should 100/)).toBeVisible();

  })

  test('Usage limit per coupon ', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('GDKCYB9M')

    await page1.locator('div').filter({ hasText: /^GDKCYB9MApply Coupon$/ }).locator('div').nth(4).click();

    await page1.getByRole('textbox').fill('GDKCYB9M');

    await page1.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page1.getByText(/This coupon has already been applied/)).toBeVisible();

  })

  test('Conjunction with other coupons ', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('MTEUSN79')

    await expect(page1.getByText(/This coupon cannot be use alongside of other coupon/)).toBeVisible();

  })

  test('Valid date ', async () => {

    const change = new ChangeCoupon(page1)

    await change.changecoupon('7XFDR7RC')

    await expect(page1.getByText(/This coupon has expired/)).toBeVisible();


  })

  test.skip('Add Product of other vendor & view cart', async () => {
    await page1.locator("//div[@class='inline-flex h-5 w-5 items-center justify-center rounded-full border text-dark-400 hover:border-primary-500 hover:text-primary-500']//*[name()='svg']//*[name()='path' and contains(@stroke-linecap,'round')]").click();

    await page1.getByRole('link', { name: 'Shop', exact: true }).click();

    await page1.getByText('Jacket').click();

    await page1.getByText('Go to Cart').click();

    const Appcoupon = new ApplyCoupon(page1)

    await Appcoupon.applycoupon('VP5MKXFA')

    await expect(page1.getByText(/This coupon is valid for specific vendor products/)).toBeVisible();

  })

})