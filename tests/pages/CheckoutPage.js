const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputNome      = page.locator('[data-test="firstName"]');
    this.inputSobrenome = page.locator('[data-test="lastName"]');
    this.inputCep       = page.locator('[data-test="postalCode"]');
    this.btnContinuar   = page.locator('[data-test="continue"]');
    this.btnFinalizar   = page.locator('[data-test="finish"]');
    this.errorMessage   = page.locator('[data-test="error"]');
  }

  async preencherDados(firstName, lastName, postalCode) {
    await this.inputNome.fill(firstName);
    await this.inputSobrenome.fill(lastName);
    await this.inputCep.fill(postalCode);
  }

  async continuar() {
    await this.btnContinuar.click();
  }

  async finalizar() {
    await this.btnFinalizar.click();
  }
}

module.exports = { CheckoutPage };
