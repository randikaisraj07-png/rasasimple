import { test, expect } from '@playwright/test';

test.describe('RasaSimpel end-to-end flow', () => {
  test('create, view detail, and delete a recipe', async ({ page }) => {
    await page.goto('/');

    // 1. Open application — hero and default recipes are visible
    await expect(page.getByRole('heading', { name: /RasaSimpel/ })).toBeVisible();
    await expect(page.getByText('Nasi Goreng')).toBeVisible();

    // 2. Create a recipe
    await page.getByLabel('Nama Makanan').fill('Ayam Geprek');
    await page.getByLabel('Bahan-bahan').fill('Ayam goreng, sambal bawang, nasi putih');
    await page.getByLabel('Cara Membuat').fill('Goreng ayam hingga renyah, lumuri sambal, sajikan dengan nasi');
    await page.getByRole('button', { name: 'Simpan Resep' }).click();

    const newCard = page.locator('article').filter({ hasText: 'Ayam Geprek' });
    await expect(newCard).toBeVisible();

    // 3. Open detail modal
    await newCard.getByRole('button', { name: 'Lihat Detail' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // 4. Verify content
    await expect(dialog.getByRole('heading', { name: 'Ayam Geprek' })).toBeVisible();
    await expect(dialog.getByText('Ayam goreng, sambal bawang, nasi putih')).toBeVisible();
    await expect(dialog.getByText(/Goreng ayam hingga renyah/)).toBeVisible();

    await page.getByRole('button', { name: 'Tutup detail resep' }).click();
    await expect(dialog).not.toBeVisible();

    // 5. Delete recipe
    await newCard.getByRole('button', { name: 'Hapus resep Ayam Geprek' }).click();

    // 6. Verify deletion
    await expect(page.locator('article').filter({ hasText: 'Ayam Geprek' })).toHaveCount(0);
  });

  test('shows validation errors when submitting an empty form', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Simpan Resep' }).click();

    await expect(page.getByText('Nama makanan wajib diisi.')).toBeVisible();
    await expect(page.getByText('Bahan-bahan wajib diisi.')).toBeVisible();
    await expect(page.getByText('Cara membuat wajib diisi.')).toBeVisible();
  });

  test('default recipes are present and the app is responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByText('Nasi Goreng')).toBeVisible();
    await expect(page.getByText('Mie Instan')).toBeVisible();
    await expect(page.getByText('Bakso')).toBeVisible();
  });
});
