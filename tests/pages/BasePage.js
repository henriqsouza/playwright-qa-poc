class BasePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('[data-test="primary-header"]');
    this.loader = page.locator('.loading_message').first();
  }

  async esperarCarregamento(timeoutMs = 30000, esperaExtra = 0) {
    await Promise.all([
      this.header.waitFor({ state: 'visible', timeout: timeoutMs }),
      this.loader.waitFor({ state: 'hidden', timeout: timeoutMs }),
    ]);
    if (esperaExtra > 0) {
      await this.page.waitForTimeout(esperaExtra);
    }
  }
}

module.exports = { BasePage };
