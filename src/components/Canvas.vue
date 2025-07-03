<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const canvasRef = ref(null);
const strokeColor = ref("#0000ff");
let lastValidColor = "#0000ff";
const tempColor = ref("#0000ff");
const strokeWidth = ref(3);
let ctx = null;
let isDrawing = false;

const history = [];
let redoStack = [];
let lastPenWidth = 3;
let lastErasWidth = 12;

const router = useRouter();
import { useCanvasStore } from "@/stores/canvas";
const canvasStore = useCanvasStore();

function goBack() {
  const dataURL = canvasRef.value.toDataURL();
  canvasStore.saveCanvas(dataURL);
  router.go(-1);

  // Simpan pengaturan jika berubah
  canvasStore.saveSettings({
    strokeColor: strokeColor.value,
    tempColor: tempColor.value,
    strokeWidth: strokeWidth.value,
    lastValidColor,
    lastPenWidth,
    lastErasWidth,
  });
}

function reset() {
  strokeColor.value = "#0000ff";
  lastValidColor = "#0000ff";
  tempColor.value = "#0000ff";
  strokeWidth.value = 3;
  lastPenWidth = 3;
  lastErasWidth = 12;
  // Simpan pengaturan jika berubah
  canvasStore.resetSettings();
}
function getPos(e) {
  const rect = canvasRef.value.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function getLuminance({ r, g, b }) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function onColorInput() {
  const selected = tempColor.value.toLowerCase();
  console.log("Warna!", selected);
  const rgb = hexToRgb(selected);
  const luminance = getLuminance(rgb);
  console.log(luminance);

  if (luminance > 0.95) {
    // Kembalikan warna picker ke lastValidColor
    console.log("Warna terlalu terang!", selected);
    setColor(lastValidColor.toLowerCase());
  } else {
    setColor(selected);
  }
}

function onSizeInput(event) {
  const selected = event.target.value;
  if (!(strokeColor.value == "#ffffff")) {
    strokeWidth.value = selected; // simpan ukuran pena
    lastPenWidth = strokeWidth.value; // simpan ukuran pena
  } else {
    strokeWidth.value = selected; // simpan ukuran pena
    lastErasWidth = strokeWidth.value; // simpan ukuran pena
  }
}

function setColor(color) {
  tempColor.value = color;
  strokeColor.value = color;
  strokeWidth.value = lastPenWidth; // kembalikan ke ukuran sebelumnya saat bukan penghapus
}

function useEraser() {
  if (!(strokeColor.value.toLowerCase() === "#ffffff")) {
    lastValidColor = strokeColor.value;
  }
  tempColor.value = strokeColor.value;
  setColor("#ffffff");
  lastPenWidth = strokeWidth.value; // simpan ukuran pena
  strokeWidth.value = lastErasWidth; // perbesar stroke saat menghapus
}

function startDraw(e) {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  const pos = getPos(e);
  ctx.strokeStyle = strokeColor.value;
  ctx.lineWidth = strokeWidth.value;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function endDraw() {
  if (!isDrawing) return;
  isDrawing = false;
  ctx.closePath();
  saveToHistory(); // Simpan snapshot
}

function saveToHistory() {
  const snapshot = ctx.getImageData(
    0,
    0,
    canvasRef.value.width,
    canvasRef.value.height
  );
  history.push(snapshot);
  // reset redo stack setelah gambar baru
  redoStack = [];
}

function undo() {
  if (history.length === 0) return;
  const snapshot = history.pop();
  redoStack.push(
    ctx.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height)
  );
  if (history.length > 0) {
    ctx.putImageData(history[history.length - 1], 0, 0);
  }
}

function redo() {
  if (redoStack.length === 0) return;
  const snapshot = redoStack.pop();
  ctx.putImageData(snapshot, 0, 0);
  history.push(snapshot);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  history.length = 0;
  redoStack.length = 0;
  canvasStore.clearCanvasData();
}

onMounted(() => {
  const canvas = canvasRef.value;
  const container = canvas.parentElement;
  const width = container.clientWidth;
  const height = container.clientHeight * 0.85;
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Restore dari store
  if (canvasStore.canvasDataUrl) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = canvasStore.canvasDataUrl;

    // Restore settings
    strokeColor.value = canvasStore.strokeColor;
    tempColor.value = canvasStore.tempColor;
    strokeWidth.value = canvasStore.strokeWidth;
    lastValidColor = canvasStore.lastValidColor;
    lastPenWidth = canvasStore.lastPenWidth;
    lastErasWidth = canvasStore.lastErasWidth;
  }
});
</script>

<template>
  <div class="canvas-container">
    <div class="tools main-bg-col justify-content-between align-items-center">
      <div class="nav justify-content-center text-white logofont">
        <input type="color" v-model="tempColor" @input="onColorInput" />
        <i
          class="bi bi-pencil-fill"
          :style="{
            color: strokeColor === '#ffffff' ? lastValidColor : strokeColor,
          }"
          @click="
            setColor(strokeColor === '#ffffff' ? lastValidColor : strokeColor)
          "
        ></i>
        <i class="bi bi-eraser-fill" @click="useEraser"></i>
        <i class="bi bi-trash3-fill" @click="clearCanvas"></i>
        <i
          class="bi bi-arrow-counterclockwise"
          style="color: white"
          @click="undo"
        ></i>
        <i class="bi bi-arrow-clockwise" style="color: white" @click="redo"></i>
        <input
          type="range"
          min="1"
          max="20"
          v-model="strokeWidth"
          @input="onSizeInput"
        /><i class="bi bi-radioactive" @click="reset"></i>
      </div>

      <div class="menu">
        <i class="bi bi-x" @click="goBack"></i>
      </div>
    </div>
    <canvas
      ref="canvasRef"
      @pointerdown="startDraw"
      @pointermove="draw"
      @pointerup="endDraw"
      @pointerleave="endDraw"
      style="
        touch-action: none;
        width: 100%;
        height: 85%;
        background: white;
        border: 1px solid #ccc;
      "
    />
  </div>
</template>
<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.tools {
  height: 15%;
  display: flex;
  flex-direction: row;
}
.nav {
  margin-left: 2rem;
  font-size: 1rem;
}
.menu {
  color: rgb(255, 240, 240);
  font-size: 2rem;
  margin-right: 2rem;
}
/* Saat di-hover */
.menu:hover {
  color: #b56e3f;
}
.nav i {
  margin: 0 0.5rem;
  cursor: pointer;
}
.nav i:hover {
  transform: scale(1.2);
}
</style>
