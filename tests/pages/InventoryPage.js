const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryList  = page.locator('[data-test="inventory-list"]');
    this.primeiroAddBtn = page.locator('[data-test^="add-to-cart-"]').first();
    this.cartLink       = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge      = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addToCart() {
    await this.primeiroAddBtn.click();
  }

  async irParaCarrinho() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
