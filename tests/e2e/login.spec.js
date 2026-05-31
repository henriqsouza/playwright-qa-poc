const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../fixtures/users.json');

test.describe('Login', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navegar();
  });

  test('deve logar com standard_user e acessar o inventário', async () => {
    await test.step('Preencher credenciais e submeter', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verificar navegação para o inventário', async () => {
      await inventoryPage.esperarCarregamento();
      await expect(inventoryPage.inventoryList).toBeVisible();
    });
  });

  test('deve bloquear locked_out_user com mensagem de erro', async () => {
    await test.step('Tentar login com usuário bloqueado', async () => {
      await loginPage.login(users.locked.username, users.locked.password);
    });

    await test.step('Verificar mensagem de bloqueio', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('locked out');
    });
  });

  test('deve exibir erro com credenciais inválidas', async () => {
    await test.step('Tentar login com credenciais inválidas', async () => {
      await loginPage.login(users.invalid.username, users.invalid.password);
    });

    await test.step('Verificar mensagem de erro', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });
  });
});
