# Contexto do Projeto

## Objetivo
POC de automação de testes com Playwright + JavaScript para demonstrar
pipeline CI/CD completo. Será apresentado em reunião de avaliação de PDI.

## Stack
- Playwright + JavaScript (sem TypeScript)
- Page Object Model
- GitHub Actions
- Docker
- SonarCloud

## Sistema Under Test
https://www.saucedemo.com

## Escopo dos testes (apenas esses dois fluxos)
1. Login: standard_user, locked_out_user, credenciais inválidas
2. Checkout Flow: adicionar item ao carrinho → checkout → confirmação

## Padrão de Page Objects (seguir exatamente essa estrutura)

### BasePage
- Recebe `page` no constructor
- Centraliza lógica de espera: aguardar header visível + loader oculto
- Métodos utilitários reutilizáveis (formatação, esperas customizadas)

### Pages específicas
- Estendem BasePage
- Constructor define todos os locators como propriedades da instância
- Hierarquia de seletores: data-test > id > aria > CSS semântico
- Métodos representam ações do usuário (login, addToCart, etc.)
- Sem lógica de asserção nas pages — asserções ficam nos specs

### Estrutura de pastas
tests/
  e2e/          → specs (.spec.js)
  pages/        → page objects
  fixtures/     → dados de teste (users.json)

### Exemplo de padrão (BasePage)
class BasePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('header');
    this.loader = page.locator('.loading').first();
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

### Exemplo de padrão (Page específica)
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputUsuario = page.locator('[data-test="username"]');
    this.inputSenha   = page.locator('[data-test="password"]');
    this.btnEntrar    = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(username, password) {
    await this.inputUsuario.fill(username);
    await this.inputSenha.fill(password);
    await this.btnEntrar.click();
    await this.esperarCarregamento();
  }
}

### Exemplo de padrão (Spec)
- Usa test.describe + test.beforeEach
- Cada test representa um cenário isolado
- Instancia pages no beforeEach
- Usa test.step para organizar etapas dentro do teste
- Asserções com expect do @playwright/test

## O que já existe no projeto
- playwright.config.js configurado (chromium, firefox, webkit)
- tests/fixtures/users.json com standard_user, locked_out_user, invalid
- Pages e specs criados mas precisam ser refatorados para seguir o padrão acima

## O que precisa ser feito agora
1. Criar tests/pages/BasePage.js com o padrão acima
2. Refatorar todos os Page Objects para estender BasePage
3. Refatorar specs para usar test.step e seguir o padrão
4. Validar que todos os testes passam com npx playwright test
5. Criar Dockerfile
6. Criar .github/workflows/playwright-ci.yml
7. Configurar SonarCloud

## Restrições
- JavaScript apenas (sem TypeScript)
- Não usar waitForTimeout exceto via esperarCarregamento com esperaExtra
- Não usar XPath
- Não usar seletores CSS frágeis (nth-child, posicionais)
- Credenciais nunca hardcoded nos specs — sempre via fixtures ou .env
