/**
 * Validation utilities for RasaSimpel recipe form.
 *
 * A recipe is considered valid when all three required fields contain
 * non-empty, non-whitespace-only text.
 */

/**
 * Validate a recipe payload.
 * @param {{ namaMakanan: string, bahanBahan: string, caraMembuat: string }} recipe
 * @returns {{ isValid: boolean, errors: { namaMakanan?: string, bahanBahan?: string, caraMembuat?: string } }}
 */
export function validateRecipe(recipe) {
  const errors = {};
  const namaMakanan = recipe?.namaMakanan ?? '';
  const bahanBahan = recipe?.bahanBahan ?? '';
  const caraMembuat = recipe?.caraMembuat ?? '';

  if (!namaMakanan.trim()) {
    errors.namaMakanan = 'Nama makanan wajib diisi.';
  }

  if (!bahanBahan.trim()) {
    errors.bahanBahan = 'Bahan-bahan wajib diisi.';
  }

  if (!caraMembuat.trim()) {
    errors.caraMembuat = 'Cara membuat wajib diisi.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Build a short, single-line preview from a multi-line ingredients string.
 * Used on recipe cards so long ingredient lists don't break the layout.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function buildPreview(text, maxLength = 80) {
  if (!text) return '';
  const flattened = text.replace(/\s+/g, ' ').trim();
  if (flattened.length <= maxLength) return flattened;
  return `${flattened.slice(0, maxLength).trim()}…`;
}

/**
 * Generate a reasonably unique id for an in-memory recipe record.
 * Not cryptographically strong — sufficient for a client-only, non-persisted list.
 * @returns {string}
 */
export function generateId() {
  return `recipe-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
