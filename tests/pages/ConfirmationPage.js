const { BasePage } = require('./BasePage');

class ConfirmationPage extends BasePage {
  constructor(page) {
    super(page);
    this.cabecalho        = page.locator('[data-test="complete-header"]');
    this.texto            = page.locator('[data-test="complete-text"]');
    this.btnVoltarProdutos = page.locator('[data-test="back-to-products"]');
  }
}

module.exports = { ConfirmationPage };
