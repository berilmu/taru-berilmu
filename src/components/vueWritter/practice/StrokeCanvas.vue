<template>
  <!-- 
  - <canvas> adalah area menggambar.
  - ref="canvasRef" → untuk mengakses elemen canvas di JavaScript.
  - :width dan :height → ukuran canvas berdasarkan prop size (default 256px).
  - @pointerdown, @pointermove, @pointerup, @pointerleave → event handler untuk mulai, menggambar, dan mengakhiri gambar. Semua pakai pointer supaya mendukung mouse dan touch.
  - style="position: absolute; touch-action: none" → posisi absolut agar menumpuk di atas referensi, dan mencegah gesture default seperti scroll atau zoom di layar sentuh. 
  -->
  <canvas
    ref="canvasRef"
    :width="size"
    :height="size"
    @pointerdown="startDraw"
    @pointermove="draw"
    @pointerup="endDraw"
    @pointerleave="endDraw"
    style="position: absolute; touch-action: none"
  ></canvas>
</template>

<script setup>
// Mengimpor ref dan onMounted dari Vue. Kita butuh reactive reference dan hook saat komponen dimount.
import { ref, onMounted } from "vue";

/**
 * size → ukuran canvas (px).
 * strokeWidth → ketebalan garis pengguna.
 * strokeColor → warna garis pengguna.
 * lineCap → bentuk ujung garis: round, square, dll.
 * lineJoin → bentuk sambungan garis.
 * onFinish → callback function dari parent saat pengguna selesai menggambar.
 */
const props = defineProps({
  size: { type: Number, default: 256 },
  strokeWidth: { type: Number, default: 6 },
  strokeColor: { type: String, default: "black" },
  lineCap: { type: String, default: "round" },
  lineJoin: { type: String, default: "round" },
  onFinish: Function,
});

const canvasRef = ref(null);
let ctx = null;
let isDrawing = false;
let path = [];

/**
 * Saat komponen siap, ambil konteks 2D dari <canvas>.
 * Atur properti gambar: lebar garis, warna, bentuk ujung & sambungan.
 */
onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.lineWidth = props.strokeWidth;
  ctx.lineCap = props.lineCap;
  ctx.lineJoin = props.lineJoin;
  ctx.strokeStyle = props.strokeColor;
});

/**
 * Saat pointer menyentuh canvas.
 * Set isDrawing = true → mulai merekam gambar.
 * Simpan titik awal.
 * redraw() untuk memulai gambar.
 * @param e
 */
function startDraw(e) {
  e.preventDefault(); // penting untuk HP
  isDrawing = true;
  path = [getPointerPosition(e)];
  redraw();
}

// Jika sedang menggambar, tambahkan titik baru dari pointer ke path, lalu gambar ulang.
function draw(e) {
  if (!isDrawing) return;
  e.preventDefault(); // mencegah scroll pada HP
  const pos = getPointerPosition(e);
  path.push(pos);
  redraw();
}

/**
 * Selesai menggambar.
 * Kirim data path ke parent lewat onFinish.
 * @param e
 */
function endDraw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  isDrawing = false;
  redraw();
  if (props.onFinish) props.onFinish(path);
}

/**
 * Hapus semua isi canvas, lalu gambar ulang semua titik dalam path sebagai garis.
 * moveTo → titik awal, lineTo → tarik garis ke titik berikutnya.
 */
function redraw() {
  ctx.clearRect(0, 0, props.size, props.size);
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const pt = path[i];
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.stroke();
}

/**
 * Ambil posisi pointer (mouse atau jari) relatif terhadap canvas.
 * Digunakan untuk mencatat titik-titik goresan.
 * @param e
 */
function getPointerPosition(e) {
  const rect = canvasRef.value.getBoundingClientRect();
  const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

/**
 * Menghapus semua gambar dan reset path kosong.
 * Biasanya dipanggil dari parent saat pengguna mengulang gambar.
 */
function clearCanvas() {
  ctx.clearRect(0, 0, props.size, props.size);
  path = [];
}

/**
 * Mengekspos fungsi clearCanvas supaya bisa dipanggil dari parent, contohnya via ref.
 */
defineExpose({ clearCanvas });
</script>
