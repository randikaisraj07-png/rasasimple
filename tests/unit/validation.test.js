import { describe, it, expect } from 'vitest';
import { validateRecipe, buildPreview, generateId } from '../../src/utils/validation';

describe('validateRecipe', () => {
  it('returns an error when nama makanan is empty', () => {
    const { isValid, errors } = validateRecipe({
      namaMakanan: '',
      bahanBahan: 'Bahan lengkap',
      caraMembuat: 'Langkah lengkap',
    });

    expect(isValid).toBe(false);
    expect(errors.namaMakanan).toBe('Nama makanan wajib diisi.');
  });

  it('returns an error when bahan-bahan is empty', () => {
    const { isValid, errors } = validateRecipe({
      namaMakanan: 'Nasi Goreng',
      bahanBahan: '   ',
      caraMembuat: 'Langkah lengkap',
    });

    expect(isValid).toBe(false);
    expect(errors.bahanBahan).toBe('Bahan-bahan wajib diisi.');
  });

  it('returns an error when cara membuat is empty', () => {
    const { isValid, errors } = validateRecipe({
      namaMakanan: 'Nasi Goreng',
      bahanBahan: 'Bahan lengkap',
      caraMembuat: '',
    });

    expect(isValid).toBe(false);
    expect(errors.caraMembuat).toBe('Cara membuat wajib diisi.');
  });

  it('is valid when all required fields are filled', () => {
    const { isValid, errors } = validateRecipe({
      namaMakanan: 'Nasi Goreng',
      bahanBahan: 'Nasi, telur, kecap manis',
      caraMembuat: 'Tumis semua bahan hingga matang',
    });

    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  it('reports all three errors at once when every field is empty', () => {
    const { isValid, errors } = validateRecipe({
      namaMakanan: '',
      bahanBahan: '',
      caraMembuat: '',
    });

    expect(isValid).toBe(false);
    expect(Object.keys(errors)).toHaveLength(3);
  });

  it('treats whitespace-only input as invalid', () => {
    const { isValid } = validateRecipe({
      namaMakanan: '   ',
      bahanBahan: '   ',
      caraMembuat: '   ',
    });

    expect(isValid).toBe(false);
  });
});

describe('buildPreview', () => {
  it('returns the original text when it is shorter than the max length', () => {
    expect(buildPreview('Nasi, telur, kecap', 80)).toBe('Nasi, telur, kecap');
  });

  it('truncates long text and appends an ellipsis', () => {
    const longText = 'a'.repeat(100);
    const preview = buildPreview(longText, 80);

    expect(preview.endsWith('…')).toBe(true);
    expect(preview.length).toBeLessThanOrEqual(81);
  });

  it('collapses internal whitespace and newlines', () => {
    expect(buildPreview('Nasi\n  telur   kecap')).toBe('Nasi telur kecap');
  });

  it('returns an empty string for falsy input', () => {
    expect(buildPreview('')).toBe('');
    expect(buildPreview(undefined)).toBe('');
  });
});

describe('generateId', () => {
  it('generates a non-empty string', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });

  it('generates unique ids on consecutive calls', () => {
    const first = generateId();
    const second = generateId();
    expect(first).not.toBe(second);
  });
});
