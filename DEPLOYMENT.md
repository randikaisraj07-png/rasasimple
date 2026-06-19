# Panduan Deployment — Vercel

RasaSimpel adalah aplikasi statis hasil build Vite, sehingga sangat mudah dideploy ke Vercel tanpa konfigurasi backend apa pun.

## Opsi 1 — Deploy lewat Vercel Dashboard (tanpa CLI)

1. Push proyek ini ke repository GitHub/GitLab/Bitbucket.
2. Buka [vercel.com](https://vercel.com) → **Add New Project**.
3. Import repository RasaSimpel.
4. Vercel akan otomatis mendeteksi framework **Vite**. Konfigurasi default sudah sesuai (dan juga sudah dideklarasikan di `vercel.json`):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Klik **Deploy**. Setelah build selesai, aplikasi langsung dapat diakses lewat URL `*.vercel.app` yang diberikan.

## Opsi 2 — Deploy lewat Vercel CLI

```bash
npm install -g vercel
vercel login
vercel        # deploy preview
vercel --prod # deploy ke production
```

Ikuti instruksi interaktif CLI (pilih scope/akun, konfirmasi root direktori proyek, dan biarkan Vercel menggunakan pengaturan default Vite).

## Environment Variables

Tidak ada environment variable yang dibutuhkan — RasaSimpel tidak terhubung ke layanan eksternal, database, maupun API key apa pun.

## Menghubungkan CI/CD GitHub Actions dengan Vercel (opsional)

Pipeline di `.github/workflows/ci.yml` saat ini fokus pada testing dan build verification (`npm run build`) sebagai gerbang kualitas. Jika ingin Vercel melakukan auto-deploy setelah pipeline GitHub Actions sukses:

1. Hubungkan repository ke Vercel seperti pada Opsi 1 — Vercel akan otomatis membuat deployment baru setiap kali ada push ke branch `main` (deployment ini berjalan independen dari GitHub Actions).
2. Jika ingin deployment hanya terjadi setelah seluruh test di GitHub Actions lulus, nonaktifkan auto-deploy bawaan Vercel pada repository settings, lalu tambahkan job berikut di akhir `ci.yml` (setelah job `build`):

```yaml
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

Simpan `VERCEL_TOKEN`, `VERCEL_ORG_ID`, dan `VERCEL_PROJECT_ID` sebagai GitHub Actions secrets (didapat dari dashboard Vercel → Project Settings → General, dan dari `vercel whoami`/`vercel link`).

## Verifikasi Pasca-Deploy

Setelah deployment selesai, lakukan pengecekan manual berikut di URL production:

- [ ] Hero section dan warning card tampil dengan benar
- [ ] 3 resep default (Nasi Goreng, Mie Instan, Bakso) muncul sebagai kartu
- [ ] Mengisi form dan klik **Simpan Resep** menambahkan resep baru tanpa reload
- [ ] Klik **Lihat Detail** membuka modal dengan konten lengkap
- [ ] Klik **Hapus** menghapus resep dari daftar
- [ ] Refresh halaman mengembalikan data ke 3 resep default (sesuai desain — data tidak persisten)
- [ ] Tampilan tetap rapi di breakpoint mobile, tablet, dan desktop
