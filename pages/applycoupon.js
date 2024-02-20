export class ApplyCoupon {

    constructor(page1) {
        this.page1 = page1

        this.havecoupon = page1.getByRole('button', { name: 'Have a coupon code ?' })

        this.typeCoupon = page1.getByText('Type your coupon')

        this.hascoupon = page1.locator('div').filter({ hasText: /^Apply Coupon$/ }).locator('div').nth(1)

        this.textbox = page1.getByRole('textbox')

        this.couponbutton = page1.getByRole('button', { name: 'Apply Coupon' })
    }

    async applycoupon(code){

        await this.havecoupon.click()

        await this.typeCoupon.click()

        await this.hascoupon.click()

        await this.textbox.fill(code)

        await this.couponbutton.click()

    }
}