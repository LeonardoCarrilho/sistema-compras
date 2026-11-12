import { test, expect } from '@playwright/test';

// UI fixtures only. This does not replace the MySQL-backed integration journey.
for (const width of [390, 1440]) {
  for (const role of ['solicitante', 'comprador', 'aprovador']) {
    test(`${role} screens at ${width}px`, async ({ page }) => {
      const request = { id: 1, title: 'Material para a equipe', requester: 'Ana Solicitante', deadline: '2027-03-10', status: role === 'aprovador' ? 'em_aprovacao' : 'aberta' };
      const suppliers = [{ id: 1, name: 'Papelaria Exemplo', document: 'Documento de teste', email: 'fornecedor@demo.local', phone: 'Contato de teste' }];
      await page.route('**/api/**', route => {
        const endpoint = new URL(route.request().url()).pathname;
        const responses = {
          '/api/me': { id: 1, name: 'Pessoa de teste', role },
          '/api/requests': [request],
          '/api/suppliers': suppliers,
          '/api/requests/1': { ...request, description: 'Reposição de material para a equipe de atendimento.', selected_quote_id: 1, quotes: [{ id: 1, supplier: 'Papelaria Exemplo', amount_cents: 10000, notes: 'Entrega no prazo solicitado.' }], history: [{ id: 1, action: 'Solicitação criada', user_name: 'Ana Solicitante', created_at: '2026-11-11 10:00' }] },
        };
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(responses[endpoint] ?? {}) });
      });
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Visão geral', exact: true })).toBeVisible();
      const capture = async name => {
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
        await page.screenshot({ path: `.taste-skill/screens/fixture-${role}-${name}-${width}.png`, fullPage: true });
      };
      await capture('panel');
      await page.getByRole('button', { name: /Material para a equipe/ }).click();
      await expect(page.getByRole('heading', { name: 'Detalhes da solicitação' })).toBeVisible();
      if (role === 'comprador') await expect(page.getByRole('button', { name: 'Registrar cotação' })).toBeVisible();
      if (role === 'aprovador') await expect(page.getByRole('button', { name: 'Registrar decisão' })).toBeVisible();
      await capture('detail');
      await page.getByRole('button', { name: /Fornecedores/ }).click();
      await expect(page.getByRole('heading', { name: 'Fornecedores', exact: true })).toBeVisible();
      await capture('suppliers');
      if (role === 'solicitante') {
        await page.getByRole('button', { name: /Nova solicitação/ }).first().click();
        await expect(page.getByLabel('Prazo necessário')).toBeVisible();
        await capture('new');
      }
    });
  }
}
