# 🍜 RasaSimpel

RasaSimpel adalah aplikasi web pengelola resep makanan yang ringan, dibangun untuk mendemonstrasikan praktik **Software Testing, Automated Testing, dan CI/CD** secara end-to-end — mulai dari unit test, integration test, hingga end-to-end test dengan Playwright, semuanya dijalankan otomatis lewat GitHub Actions.

Aplikasi ini sengaja dibuat **tanpa backend, tanpa database, dan tanpa autentikasi**. Semua data resep disimpan murni di memori (React state) dan akan hilang setiap kali halaman direfresh — sesuai cakupan proyek akademik ini.

## Fitur

- **Tambah resep** — isi Nama Makanan, Bahan-bahan, dan Cara Membuat, lalu simpan. Validasi berjalan instan tanpa reload halaman.
- **Lihat daftar resep** — ditampilkan sebagai kartu bergaya food-discovery app, lengkap dengan gambar, nama, dan ringkasan bahan.
- **Lihat detail resep** — modal berisi gambar, nama, bahan lengkap, dan cara membuat.
- **Hapus resep** — langsung terhapus dari state, tanpa konfirmasi tambahan.
- **Tidak ada fitur Edit/Update** — sesuai cakupan PRD.

Tidak ada loading state karena seluruh operasi berjalan di memori — semua perubahan terasa instan.

## Tech Stack

| Layer | Tools |
|---|---|
| UI | React 18 + Vite |
| Styling | TailwindCSS (custom design tokens) |
| Unit & Integration Testing | Vitest + React Testing Library |
| End-to-End Testing | Playwright |
| CI/CD | GitHub Actions |
| Deployment Target | Vercel |

## Struktur Proyek

```
rasasimpel/
├── src/
│   ├── components/        # Hero, WarningBanner, RecipeForm, RecipeList, RecipeCard, RecipeDetailModal
│   ├── data/               # defaultRecipes.js — seed data (Nasi Goreng, Mie Instan, Bakso)
│   ├── utils/               # validation.js — validateRecipe, buildPreview, generateId
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tests/
│   ├── unit/                # Validation logic tests
│   ├── integration/         # Create / delete / detail-modal flow tests (RTL)
│   ├── e2e/                  # Full user journey tests (Playwright)
│   └── setup.js
├── .github/workflows/ci.yml # CI pipeline
├── tailwind.config.js
├── vite.config.js            # Also configures Vitest
├── playwright.config.js
├── vercel.json
└── package.json
```

## Menjalankan Proyek Secara Lokal

### Prasyarat

- Node.js 18+ dan npm

### Instalasi

```bash
npm install
```

### Mode pengembangan

```bash
npm run dev
```

Buka `http://localhost:5173`.

### Build produksi

```bash
npm run build
npm run preview
```

## Menjalankan Test

| Command | Keterangan |
|---|---|
| `npm run test` | Menjalankan unit test + integration test (Vitest) |
| `npm run test:unit` | Hanya unit test untuk `validateRecipe`, `buildPreview`, `generateId` |
| `npm run test:integration` | Hanya integration test (create flow, delete flow, detail modal) |
| `npm run test:watch` | Vitest dalam mode watch |
| `npm run test:e2e` | Playwright end-to-end test (otomatis build + preview server) |

> **Catatan:** `npm run test:e2e` mengunduh browser Chromium saat pertama kali dijalankan (`npx playwright install chromium`). Pastikan koneksi internet tersedia, atau jalankan di lingkungan CI yang sudah mengizinkan akses ke `cdn.playwright.dev`.

### Cakupan Test

**Unit test** (`tests/unit/validation.test.js`)
1. Nama makanan kosong → invalid
2. Bahan-bahan kosong → invalid
3. Cara membuat kosong → invalid
4. Semua field terisi → valid
5. Tambahan: kombinasi semua field kosong, input hanya whitespace, `buildPreview`, dan `generateId`

**Integration test** (`tests/integration/recipeFlow.test.jsx`)
- Isi form → submit → resep baru muncul di daftar
- Form ter-reset dan tidak ada error setelah submit berhasil
- Submit form kosong → error validasi tampil, resep tidak ditambahkan
- Hapus resep → resep hilang dari daftar, resep lain tetap ada
- Buka modal detail → konten lengkap tampil
- Tutup modal detail dengan tombol close

**End-to-end test** (`tests/e2e/recipe.spec.js`)
1. Buka aplikasi
2. Buat resep baru
3. Buka modal detail dan verifikasi isinya
4. Tutup modal, lalu hapus resep
5. Verifikasi resep terhapus
6. Verifikasi validasi form kosong dan tampilan responsif di viewport mobile

## CI/CD Pipeline

Pipeline didefinisikan di `.github/workflows/ci.yml` dan berjalan pada setiap `push`/`pull_request` ke branch `main`:

```
Install Dependencies
   ↓
Run Unit Tests
   ↓
Run Integration Tests
   ↓
Run Playwright Tests
   ↓
Build Application
```

Setiap job berjalan secara berurutan (`needs:`) — jika satu langkah gagal, langkah berikutnya tidak dijalankan dan pipeline ditandai gagal. Hasil build (`dist/`) dan laporan Playwright diunggah sebagai artifact.

## Desain

Desain mengikuti gaya **food-discovery app** yang modern dan bersih, terinspirasi dari pengalaman aplikasi pencarian makanan populer (tanpa meniru branding atau aset visual mana pun):

- Font: **Poppins**
- Warna utama: `#EF4F5F` (primary), `#F8F8F8` (background), `#FFFFFF` (surface), `#1C1C1C` (text)
- Kartu dengan radius besar (16–20px), shadow lembut, dan spacing yang lega
- Mobile-first, responsif di desktop, tablet, dan mobile
- Aksesibilitas: label terhubung ke input, pesan error terhubung via `aria-describedby`, modal dengan `role="dialog"`, fokus otomatis ke tombol close, dan dapat ditutup dengan tombol `Esc`

## Batasan yang Disengaja (Sesuai PRD)

- ❌ Tidak ada fitur Edit/Update resep
- ❌ Tidak ada database, backend, API, Firebase/Supabase, localStorage, atau autentikasi
- ✅ Data hanya hidup selama tab terbuka — refresh akan mengembalikan ke 3 resep default (Nasi Goreng, Mie Instan, Bakso)

## Deployment

Lihat [`DEPLOYMENT.md`](./DEPLOYMENT.md) untuk panduan lengkap deploy ke Vercel.

## Lisensi

Proyek ini dibuat untuk keperluan akademik (mata kuliah Software Testing / Automated Testing / CI-CD) dan bebas digunakan untuk tujuan pembelajaran.
