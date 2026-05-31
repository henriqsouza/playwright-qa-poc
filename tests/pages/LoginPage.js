const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputUsuario = page.locator('[data-test="username"]');
    this.inputSenha   = page.locator('[data-test="password"]');
    this.btnEntrar    = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navegar() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.inputUsuario.fill(username);
    await this.inputSenha.fill(password);
    await this.btnEntrar.click();
  }
}

module.exports = { LoginPage };
