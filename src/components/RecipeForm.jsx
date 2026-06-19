import { useState } from 'react';
import { validateRecipe, generateId } from '../utils/validation';

const EMPTY_FORM = {
  namaMakanan: '',
  bahanBahan: '',
  caraMembuat: '',
};

function RecipeForm({ onAddRecipe }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors: validationErrors } = validateRecipe(form);
    setErrors(validationErrors);

    if (!isValid) return;

    onAddRecipe({
      id: generateId(),
      namaMakanan: form.namaMakanan.trim(),
      bahanBahan: form.bahanBahan.trim(),
      caraMembuat: form.caraMembuat.trim(),
      imageUrl: null,
    });

    setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <section aria-labelledby="form-heading" className="mx-auto max-w-5xl px-5 mt-8">
      <div className="rounded-card bg-surface border border-border shadow-card p-6 sm:p-8">
        <h2 id="form-heading" className="text-xl font-bold text-ink mb-1">
          Tambah Resep Baru
        </h2>
        <p className="text-sm text-ink/60 mb-6">
          Isi semua kolom di bawah ini, lalu simpan resepmu.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="namaMakanan" className="block text-sm font-semibold text-ink mb-2">
              Nama Makanan
            </label>
            <input
              id="namaMakanan"
              type="text"
              value={form.namaMakanan}
              onChange={handleChange('namaMakanan')}
              aria-invalid={Boolean(errors.namaMakanan)}
              aria-describedby={errors.namaMakanan ? 'namaMakanan-error' : undefined}
              placeholder="Contoh: Nasi Goreng Spesial"
              className={`w-full rounded-input border px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.namaMakanan ? 'border-danger' : 'border-border'
              }`}
            />
            {errors.namaMakanan && (
              <p id="namaMakanan-error" className="mt-1.5 text-sm text-danger">
                {errors.namaMakanan}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="bahanBahan" className="block text-sm font-semibold text-ink mb-2">
              Bahan-bahan
            </label>
            <textarea
              id="bahanBahan"
              rows={3}
              value={form.bahanBahan}
              onChange={handleChange('bahanBahan')}
              aria-invalid={Boolean(errors.bahanBahan)}
              aria-describedby={errors.bahanBahan ? 'bahanBahan-error' : undefined}
              placeholder="Contoh: 2 piring nasi putih, 2 butir telur, kecap manis..."
              className={`w-full rounded-input border px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none ${
                errors.bahanBahan ? 'border-danger' : 'border-border'
              }`}
            />
            {errors.bahanBahan && (
              <p id="bahanBahan-error" className="mt-1.5 text-sm text-danger">
                {errors.bahanBahan}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="caraMembuat" className="block text-sm font-semibold text-ink mb-2">
              Cara Membuat
            </label>
            <textarea
              id="caraMembuat"
              rows={4}
              value={form.caraMembuat}
              onChange={handleChange('caraMembuat')}
              aria-invalid={Boolean(errors.caraMembuat)}
              aria-describedby={errors.caraMembuat ? 'caraMembuat-error' : undefined}
              placeholder="Jelaskan langkah-langkah memasak secara berurutan..."
              className={`w-full rounded-input border px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none ${
                errors.caraMembuat ? 'border-danger' : 'border-border'
              }`}
            />
            {errors.caraMembuat && (
              <p id="caraMembuat-error" className="mt-1.5 text-sm text-danger">
                {errors.caraMembuat}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-input bg-primary px-8 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-primary-dark active:scale-[0.99]"
          >
            Simpan Resep
          </button>
        </form>
      </div>
    </section>
  );
}

export default RecipeForm;
