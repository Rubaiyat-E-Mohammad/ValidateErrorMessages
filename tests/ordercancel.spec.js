import { test, expect, chromium } from '@playwright/test';

let context, page, browser, page1
test.beforeAll(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://farazi.staging.dokandev.com/');
    await expect.soft(page).toHaveTitle(/Farazi | Home/)
})
test.describe('Order product and cancellation', async () => {
    test('Login', async () => {
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('youremail@example.com').fill('trubaiyatemohammad@gmail.com');
        await page.getByPlaceholder('Minimum 6 characters').fill('Tt@468468');
        await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    })

    test('Add Product', async () => {
        await page.getByRole('link', { name: 'Shop', exact: true }).click();
        await page.getByPlaceholder('Search').click()
        await page.getByPlaceholder('Search').fill('Green');
        await page.getByText('Green Hoodie').click();
        await page.getByRole('button', { name: 'Add To Cart' }).click();
    })

    test('Checkout', async () => {

        await page.getByRole('button', { name: 'Go to Cart' }).click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    })

    test('Customer info', async () => {
        await page.getByPlaceholder('First name').fill('Rubaiyat E');
        await page.getByPlaceholder('Last Name').fill('Mohammad');
        await page.locator('.css-17wv8nz').click();
        await page.getByRole('option', { name: 'Bangladesh' }).click();
        await page.getByPlaceholder('Enter an address').fill('Uttara');
        await expect.soft(page.getByText('Uttara').first()).toBeVisible()
        await page.getByText('Uttara').first().click();
        await page.getByPlaceholder('Postal Code').fill('1230');
        await page.getByRole('button', { name: 'Continue to Payment' }).click();

    })

    test('Payment', async () => {
        await page.getByRole('button', { name: 'Continue to Payment' }).click();
        await page.locator('div').filter({ hasText: /^Cash On Delivery$/ }).click();
        await page.getByRole('button', { name: 'Pay $' }).click();
    })

    test('Cancel order', async () => {
        await page.getByRole('link', { name: 'Continue Shopping' }).click();
        await page.getByRole('button', { name: 'Hello Rubaiyat E Mohammad' }).click();
        await page.getByRole('link', { name: 'My Account' }).click();
        await page.getByRole('link', { name: 'Orders' }).click();
        await page.getByRole('link', { name: 'Order Details' }).nth(0).click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();
    })


})
