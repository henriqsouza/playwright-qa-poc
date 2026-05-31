const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { ConfirmationPage } = require('../pages/ConfirmationPage');
const users = require('../fixtures/users.json');

test.describe('Checkout Flow', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  let confirmationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);

    await loginPage.navegar();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.esperarCarregamento();
  });

  test('deve completar checkout com sucesso', async () => {
    await test.step('Adicionar item ao carrinho', async () => {
      await inventoryPage.addToCart();
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('Ir para o carrinho', async () => {
      await inventoryPage.irParaCarrinho();
      await expect(cartPage.cartItems).toHaveCount(1);
    });

    await test.step('Iniciar checkout', async () => {
      await cartPage.irParaCheckout();
      await expect(checkoutPage.inputNome).toBeVisible();
    });

    await test.step('Preencher dados de entrega', async () => {
      await checkoutPage.preencherDados(
        users.checkout.firstName,
        users.checkout.lastName,
        users.checkout.postalCode
      );
      await checkoutPage.continuar();
      await expect(checkoutPage.btnFinalizar).toBeVisible();
    });

    await test.step('Confirmar pedido', async () => {
      await checkoutPage.finalizar();
      await expect(confirmationPage.cabecalho).toBeVisible();
      await expect(confirmationPage.cabecalho).toHaveText('Thank you for your order!');
    });
  });
});
