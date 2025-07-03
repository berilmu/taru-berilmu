<!-- ./HiraganaStrokeViewer.vue -->
<template>
  <div>
    <!-- 
    - <svg> adalah elemen utama tempat stroke-stroke ditampilkan.
    - :width dan :height → menentukan ukuran SVG dalam piksel.
    - :viewBox="0 0 viewBox viewBox" → menentukan sistem koordinat dalam SVG. Misalnya viewBox="0 0 24 24" artinya: koordinat (0,0) di kiri atas, (24,24) di kanan bawah. Ini membuat semua stroke bisa diskalakan dengan benar.
    - fill="none" → tidak mengisi warna (hanya garis).
    - xmlns → namespace SVG, wajib ada.
    -->
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${viewBox} ${viewBox}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 
    <g> artinya "group" → mengelompokkan semua path agar bisa diberi transformasi bersama jika perlu.
    Path bagian utama: menampilkan setiap stroke sebagai path SVG.
    - v-for="(stroke, index) in strokes" → loop untuk setiap stroke.
    - :key="index" → optimisasi rendering.
    - :d="stroke.path" → path SVG (string instruksi seperti M, C, L).
    - :stroke="stroke.color" → warna stroke, bisa berbeda tergantung status (default, benar, salah).
    - :stroke-width="strokeWidth" → tebal garis.
    - :stroke-linecap="lineCap" → ujung garis: butt, round, atau square.
    - :stroke-linejoin="safeLineJoin" → bagaimana garis disambung antar segmen. (lihat penjelasan komputasi di bagian script)
    - fill="none" → tidak diisi warna, hanya outline saja.
    -->
      <g>
        <path
          v-for="(stroke, index) in strokes"
          :key="index"
          :d="stroke.path"
          :stroke="stroke.color"
          :stroke-width="strokeWidth"
          :stroke-linecap="lineCap"
          :stroke-linejoin="safeLineJoin"
          fill="none"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
// computed digunakan untuk membuat nilai yang dihitung otomatis dan efisien dari props.
import { computed } from "vue";

/**
 Mendefinisikan properti eksternal (props) yang dikirim dari parent component:
 * Prop	Fungsi
 * strokes	Array of stroke (path + color), contoh: { path: 'M10 10 L20 20', color: '#ccc' }
 * viewBox	Ukuran koordinat SVG internal
 * size	Ukuran fisik dalam piksel (lebar dan tinggi SVG)
 * strokeWidth	Ketebalan garis
 * lineJoin	Bentuk sambungan antar garis
 * lineCap	Ujung garis: butt, round, square
 */
const props = defineProps({
  strokes: { type: Array, required: true },
  viewBox: { type: [String, Number], default: 24 },
  size: { type: [String, Number], default: 256 },
  strokeWidth: { type: [String, Number], default: 2 },
  lineJoin: { type: String, default: "round" },
  lineCap: { type: String, default: "round" },
});

// Daftar nilai valid untuk lineJoin. Berguna untuk validasi agar tidak error saat menggambar SVG.
const validLineJoins = ["round", "bevel", "miter", "miter-clip"];

/**
 * Jika lineJoin yang dikirim bukan salah satu dari nilai yang valid, maka fallback ke "round".
 * Ini untuk mencegah SVG error karena lineJoin tidak valid.
 */
const safeLineJoin = computed(() =>
  validLineJoins.includes(props.lineJoin) ? props.lineJoin : "round"
);
</script>
