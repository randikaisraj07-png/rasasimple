import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';

describe('Create recipe flow', () => {
  it('adds a new recipe to the list after filling and submitting the form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Nama Makanan'), 'Rendang Daging');
    await user.type(
      screen.getByLabelText('Bahan-bahan'),
      'Daging sapi, santan, cabai, bumbu rendang'
    );
    await user.type(
      screen.getByLabelText('Cara Membuat'),
      'Masak daging dengan santan dan bumbu hingga kering dan empuk'
    );

    await user.click(screen.getByRole('button', { name: 'Simpan Resep' }));

    expect(await screen.findByText('Rendang Daging')).toBeInTheDocument();
  });

  it('clears the form and shows no validation errors after a successful submit', async () => {
    const user = userEvent.setup();
    render(<App />);

    const namaInput = screen.getByLabelText('Nama Makanan');
    await user.type(namaInput, 'Soto Ayam');
    await user.type(screen.getByLabelText('Bahan-bahan'), 'Ayam, kunyit, serai');
    await user.type(screen.getByLabelText('Cara Membuat'), 'Rebus ayam dengan bumbu hingga matang');

    await user.click(screen.getByRole('button', { name: 'Simpan Resep' }));

    await screen.findByText('Soto Ayam');
    expect(namaInput).toHaveValue('');
    expect(screen.queryByText('Nama makanan wajib diisi.')).not.toBeInTheDocument();
  });

  it('shows validation errors and does not add a recipe when fields are empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Simpan Resep' }));

    expect(await screen.findByText('Nama makanan wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Bahan-bahan wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Cara membuat wajib diisi.')).toBeInTheDocument();
  });
});

describe('Delete recipe flow', () => {
  it('removes a recipe from the list when its delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('Nasi Goreng')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Hapus resep Nasi Goreng' }));

    expect(screen.queryByText('Nasi Goreng')).not.toBeInTheDocument();
  });

  it('only removes the targeted recipe, leaving the others intact', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Hapus resep Mie Instan' }));

    expect(screen.queryByText('Mie Instan')).not.toBeInTheDocument();
    expect(screen.getByText('Nasi Goreng')).toBeInTheDocument();
    expect(screen.getByText('Bakso')).toBeInTheDocument();
  });
});

describe('Detail modal flow', () => {
  it('opens a modal with full recipe content when "Lihat Detail" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const baksoCard = screen.getByText('Bakso').closest('article');
    await user.click(within(baksoCard).getByRole('button', { name: 'Lihat Detail' }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Bahan-bahan')).toBeInTheDocument();
    expect(within(dialog).getByText('Cara Membuat')).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const nasiCard = screen.getByText('Nasi Goreng').closest('article');
    await user.click(within(nasiCard).getByRole('button', { name: 'Lihat Detail' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Tutup detail resep' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
