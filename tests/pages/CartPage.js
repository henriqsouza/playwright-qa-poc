const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems      = page.locator('.cart_item');
    this.btnCheckout    = page.locator('[data-test="checkout"]');
    this.btnContinuar   = page.locator('[data-test="continue-shopping"]');
  }

  async irParaCheckout() {
    await this.btnCheckout.click();
  }
}

module.exports = { CartPage };
