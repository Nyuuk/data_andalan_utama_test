## Instalasi

### Pengantar
Dokumentasi ini memberikan panduan langkah demi langkah untuk menginstal dan menjalankan proyek Laravel. Anda dapat memilih antara instalasi dengan Docker atau menggunakan server PHP Artisan bawaan.

Project ini menggunakan Framework [Laravel](https://laravel.com/), [React Js](https://react.dev/), dan [TailwindCss](https://tailwindcss.com/)

### Persyaratan
Sebelum memulai, pastikan sistem Anda memenuhi persyaratan berikut:

- [Composer](https://getcomposer.org/) terinstal
- PHP 8.2 atau versi lebih tinggi terinstal
- [Node.js](https://nodejs.org/) terinstal (Optional)
- [Docker](https://www.docker.com/) terinstal (opsional, hanya jika Anda ingin menggunakan Docker)


### Instalasi dengan Docker (Opsional)
Jika Anda ingin menggunakan Docker, ikuti langkah-langkah berikut:

1. Clone repositori dari GitHub:
   ```bash
   git clone https://github.com/Nyuuk/data_andalan_utama_test.git
   ```

2. Pindah ke direktori proyek:
   ```bash
   cd data_andalan_utama_test
   ```

4. Buat container Docker dan jalankan proyek:
   ```bash
   docker-compose up -d
   ```

5. Menjalankan perintah artisan:
   ```bash
   docker-compose exec app php artisan migrate
   ```

6. Menjalankan perintah build React
   ```bash
   docker-compose exec app npm run build
   ```

NB: Jika NPM atau NodeJS terinstall dalam sistem utama maka jalankan `npm install` sebelum langkah 3. Jika tidak terinstall maka jalankan `docker-compose exec app apt install nodejs npm -y` `docker-compose exec app npm install` setelah langkah 4. pastikan anda memiliki paket data yang cukup. Nomor 6 bisa di jalankan di sistem utama atau di docker, jika di sistem utama maka `npm run build`


6. Akses proyek di [http://localhost:8081](http://localhost:8081)

### Instalasi dengan PHP Artisan Serve
Pastikan untuk menginstall extensi `pdo`, `mysqli`

Jika Anda tidak menggunakan Docker, Anda dapat menggunakan PHP Artisan Serve:
- Pastikan sudah terinstall extension PHP `pdo`, `mysqli` & `pdo_mysql`

1. Clone repositori dari GitHub:
   ```bash
   git clone https://github.com/Nyuuk/data_andalan_utama_test.git
   ```

2. Pindah ke direktori proyek:
   ```bash
   cd data_andalan_utama_test
   ```

3. Copy `.env.example` menjadi `.env` & silahkan konfigurasi database user dan password terlebih dahulu:
   ```bash
   cp .env.example .env
   ```

4. Install dependencies dan atur kunci aplikasi:
   ```bash
   composer install
   npm install
   php artisan migrate
   php artisan key:generate
   ```

5. Jalankan server PHP Artisan:
   ```bash
   php artisan serve
   ```

6. Akses proyek di [http://localhost:8000](http://localhost:8000)

### Catatan
Pastikan untuk mengonfigurasi file `.env` sesuai dengan pengaturan database dan kebutuhan lainnya sebelum menjalankan perintah `php artisan migrate`.
