export class ChangeCoupon {

    constructor(page1) {
        this.page1 = page1

        this.textbox = page1.getByRole('textbox')

        this.couponbutton = page1.getByRole('button', { name: 'Apply Coupon' })
    }

    async changecoupon(code){

        await this.textbox.click()

        await this.textbox.press('Meta+a')

        await this.textbox.fill(code)

        await this.couponbutton.click()

    }
}