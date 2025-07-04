// const app = require("./app");
// const dotenv = require("dotenv");

// dotenv.config();

// const PORT = process.env.PORT;

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// src/server.js
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

// --- MULAI TAMBAHKAN KODE INI DI SINI ---
// Ini akan menangkap error sinkron yang tidak tertangani
process.on("uncaughtException", (err) => {
  console.error("*** UNCAUGHT EXCEPTION ***");
  console.error("Terjadi error fatal yang tidak tertangani di aplikasi:");
  console.error(err); // Ini akan mencetak detail error dan stack trace
  // Penting: Keluar dari proses setelah error untuk menghindari keadaan yang tidak stabil
  // Railway akan me-restart kontainer secara otomatis setelah ini
  process.exit(1);
});

// Ini akan menangkap Promise yang di-reject tapi tidak di-catch
process.on("unhandledRejection", (reason, promise) => {
  console.error("*** UNHANDLED REJECTION ***");
  console.error("Ada promise yang ditolak tapi tidak ditangani:");
  console.error("Promise:", promise);
  console.error("Reason:", reason); // Ini akan mencetak alasan rejection
  // Penting: Keluar dari proses setelah error
  process.exit(1);
});

console.log("Global error handlers have been registered."); // <<< TAMBAHKAN INI
// --- AKHIR KODE YANG DITAMBAHKAN ---

const PORT = process.env.PORT; // Pastikan PORT ini ada di environment variables Railway

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
