# Epic: Pembuatan Aplikasi Undangan Online (Undanganku)

## Deskripsi
Aplikasi web untuk memfasilitasi pembuatan dan penyebaran undangan digital secara mudah dan cepat. Pengguna dapat memilih template, menyesuaikan konten, dan membagikannya via tautan unik.

## Kategori Undangan yang Didukung
Aplikasi harus mendukung beberapa tema undangan berikut:
- **Pernikahan (Wedding)**
- **Ulang Tahun (Birthday)**
- **Kelulusan (Graduation)**

---

## Fitur Utama: Alur Pembuatan Undangan Dinamis
Fitur inti dari aplikasi ini adalah *wizard* pembuatan undangan. Buatkan alur multi-step bagi pengguna untuk membuat undangan mereka sendiri dengan urutan sebagai berikut:

### Step 1: Pilih Template Undangan
- Tampilkan daftar/katalog template yang tersedia berdasarkan kategori (Pernikahan, Ulang Tahun, Kelulusan).
- Berikan kemampuan bagi pengguna untuk melakukan *preview* (pratinjau) template sebelum memilih.

### Step 2: Custom Wording (Penyesuaian Teks)
- Sediakan form agar pengguna dapat mengisi dan mengubah detail teks pada template yang dipilih.
- Data yang diisi meliputi (namun tidak terbatas pada): Nama yang diundang, Nama penyelenggara acara, Tanggal & Waktu, Lokasi/Alamat, serta pesan khusus atau *quotes*.

### Step 3: Pilih Background Musik
- Berikan pilihan daftar lagu/musik latar (*background music*) yang telah disediakan oleh sistem.
- Musik ini akan diputar secara otomatis (atau dengan interaksi tombol *play*) ketika tamu membuka tautan undangan.

---

## Instruksi Implementasi (High-Level)
Untuk *programmer* atau *agent* yang mengimplementasikan tiket ini, ikuti panduan berikut:

1. **Setup & Layouting**
   - Siapkan *routing* aplikasi (misal menggunakan React Router) untuk halaman Beranda, Halaman *Wizard* Pembuatan Undangan, dan Halaman Pratinjau/Undangan Publik.
   - Buat komponen *layout* utama yang responsif (*mobile-first approach* sangat disarankan karena undangan sering dibuka di HP).

2. **Manajemen State (Wizard Form)**
   - Gunakan *state management* (misal: React Context, Zustand, atau state lokal komponen induk) untuk menyimpan data pilihan pengguna sementara mereka berpindah dari Step 1 hingga Step 3.

3. **Data Mock / Dummy**
   - Untuk tahap awal, gunakan data *dummy* berupa JSON untuk daftar template dan daftar pilihan musik. Belum perlu integrasi *database/backend* kecuali sudah diinstruksikan pada tiket terpisah.

4. **Halaman Undangan Publik (Guest View)**
   - Buat satu halaman dinamis yang bertugas merender data undangan akhir yang sudah dibuat oleh pengguna. Halaman ini yang akan dilihat oleh tamu penerima undangan.

**Catatan Tambahan:** Fokus pada alur kerja (fungsionalitas *step-by-step*) terlebih dahulu sebelum menyempurnakan detail desain yang terlalu kompleks. Pastikan fungsionalitas utama berjalan lancar.
