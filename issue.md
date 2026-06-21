# Epic: Pengembangan Fitur Multi-Halaman (Tabs) pada Template Undangan

## Deskripsi
Tiket ini bertujuan untuk mengembangkan fungsionalitas halaman undangan publik (Guest View). Undangan tidak lagi ditampilkan sebagai halaman memanjang biasa (scroll panjang), melainkan dibagi menjadi beberapa halaman (pages) yang interaktif. Navigasi antar halaman menggunakan **Tab Bar (Bottom Navigation)** di bagian bawah layar yang menyerupai aplikasi mobile.

## Referensi Desain
Berikut adalah referensi antarmuka dan pengalaman pengguna (UX) yang diharapkan. Perhatikan konsep navigasi menu di bagian bawah:
- **Wedding:** [Blue Butterfly](https://satumomen.com/preview/blue-butterfly)
- **Graduation:** [Emerald UICI](https://satumomen.com/preview/emerald-uici)
- **Birthday:** [Bikini Bottom](https://satumomen.com/preview/bikini-bottom)

---

## Kebutuhan Konten (Default Tabs)
Setiap varian template undangan wajib mengimplementasikan 5 (lima) halaman/tab berikut:

1. **Opening (Pembukaan):**
   - Menampilkan *cover* utama.
   - Nama pemilik acara / mempelai / wisudawan.
   - Nama tamu yang diundang (diambil dari parameter URL, misal `?to=Budi`).
2. **Salam:**
   - Menampilkan foto/gambar ilustrasi.
   - Teks sapaan pembuka, doa, atau kutipan (*quotes*).
3. **Acara:**
   - Rincian hari, tanggal, dan jam.
   - Lokasi / alamat acara.
   - Tambahan opsional: Tombol *Google Maps* atau *Countdown Timer*.
4. **Reservasi (RSVP):**
   - Form Konfirmasi Kehadiran (Nama, Kehadiran: Ya/Tidak, Jumlah Tamu).
   - Form Ucapan / Doa untuk penyelenggara acara.
   - Menampilkan *list* ucapan dari tamu-tamu sebelumnya.
5. **Thanks (Penutup):**
   - Ucapan terima kasih dari penyelenggara.
   - Gambar penutup / salam.

---

## Panduan Implementasi (Untuk Junior Programmer / AI Agent)

Jika Anda ditugaskan untuk mengerjakan tiket ini, silakan ikuti tahapan-tahapan implementasi berikut secara berurutan:

### Tahap 1: Setup Layout Mobile & Bottom Navigation
1. **Pembuatan Wrapper Layout:** Di dalam komponen render undangan (`src/pages/InvitationView.jsx`), ubah struktur sehingga memiliki *container* berukuran layar penuh (`h-screen`) dan lebar maksimal seperti *smartphone* (`max-w-md mx-auto`).
2. **Bottom Navigation:** Implementasikan komponen `BottomNavigation` (bisa menggunakan komponen bawaan Material UI `@mui/material/BottomNavigation`). Pasang elemen ini agar *fixed* atau *sticky* di bagian paling bawah layar.
3. **State Manajemen Tab:** Buat state lokal `const [activeTab, setActiveTab] = useState(0)` untuk mendeteksi indeks tab yang sedang dibuka oleh tamu.

### Tahap 2: Pembuatan Komponen View untuk Tiap Tab
Buat komponen-komponen React terpisah untuk menjaga kebersihan kode (misalnya letakkan di folder `src/components/invitation-pages/`):
- `OpeningTab.jsx`
- `SalamTab.jsx`
- `AcaraTab.jsx`
- `ReservasiTab.jsx`
- `ThanksTab.jsx`

*Instruksi Penting:* Render komponen-komponen ini secara kondisional berdasarkan nilai state `activeTab`. Kirimkan data undangan (`wording`) ke dalam komponen-komponen ini melalui *props*.

### Tahap 3: Implementasi Fungsionalitas RSVP (Reservasi)
Mengingat belum ada integrasi database backend:
1. Buat form sederhana pada `ReservasiTab.jsx` menggunakan Material UI TextField dan Select.
2. Saat tombol "Kirim Ucapan" ditekan, cegah *reload* halaman dan cukup simpan data ucapan baru tersebut ke dalam *state array* sementara, atau simpan ke dalam `localStorage` browser agar seolah-olah ucapan berhasil terkirim dan muncul di *list* ucapan.

### Tahap 4: Desain & Pembuatan 3 Tema Template
Aplikasi harus mendeteksi ID template (`templateId`) dan merender gaya (*styling*) yang berbeda. Buat tiga varian gaya menggunakan kelas *Tailwind CSS* atau *MUI Theme*:

1. **Template Wedding (Elegan/Biru Pastel):**
   - **Gaya:** Estetika pernikahan elegan, terinspirasi dari referensi *Blue Butterfly*.
   - **Font:** Gunakan *font* berjenis serif klasik (misal: *Playfair Display* atau *Cinzel*).
   - **Aksen:** Latar belakang warna biru pastel/putih, bisa tambahkan ornamen/divider berbentuk floral.
2. **Template Graduation (Emerald/Formal):**
   - **Gaya:** Resmi dan terhormat, terinspirasi dari referensi *Emerald UICI*.
   - **Font:** Gunakan *font* formal dan tegas.
   - **Aksen:** Latar belakang berwarna hijau zamrud (emerald) gelap berpadu dengan aksen warna teks/garis emas (gold).
3. **Template Birthday (Ceria/Bikini Bottom):**
   - **Gaya:** Lucu, kekanak-kanakan, ceria, mirip referensi *Bikini Bottom*.
   - **Font:** Gunakan *font* kasual yang melengkung (misal: *Fredoka* atau *Comic Sans*).
   - **Aksen:** Warna-warni cerah (Kuning laut, biru laut), berikan sudut membulat (*rounded*) yang ekstrem pada setiap kontainer *card*.

**Saran Pendekatan Kode untuk Tema:**
Anda dapat membuat objek kamus (*dictionary*) yang memetakan `templateId` dengan kumpulan kelas utilitas Tailwind. Terapkan kelas-kelas ini pada *wrapper* utama agar warna dan *font* mengalir ke semua komponen di dalamnya (*CSS cascade*).
