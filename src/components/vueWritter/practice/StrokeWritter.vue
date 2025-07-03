<template>
  <div :style="`position: relative; width: ${size}px; height: ${size}px`">
    <!-- Viewer tetap selalu tampil -->
    <HiraganaStrokeViewer
      :strokes="strokes"
      :size="size"
      :viewBox="viewBox"
      :strokeWidth="strokeWidth"
      :lineCap="lineCap"
      :lineJoin="lineJoin"
    />
    <!-- Jika belum selesai dan bukan review mode -->
    <StrokeCanvas
      v-if="!isFinished && !isReview"
      ref="canvas"
      :size="size"
      :onFinish="handleFinish"
      :strokeWidth="canvasStrokeWidth"
      :lineCap="canvasLineCap"
      :lineJoin="canvasLineJoin"
      :strokeColor="canvasColor"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import HiraganaStrokeViewer from "./HiraganaStrokeViewer.vue";
import StrokeCanvas from "./StrokeCanvas.vue";

const emit = defineEmits(["finished"]);

const props = defineProps({
  strokesData: Array, // ← array path SVG
  reviewData: Object, // ← jika ada, tampilkan hasil review
  size: { type: Number, default: 256 },
  viewBox: { type: Number, default: 24 },
  trial: { type: Number, default: 3 },
  avgsdL: { type: Number, default: 20 },
  avgsdH: { type: Number, default: 50 },
  defaultColor: { type: String, default: "#ccc" },
  successColor: { type: String, default: "#000" },
  finishColor: { type: String, default: "green" },
  wrongColor: { type: String, default: "red" },
  strokeWidth: { type: [Number, String], default: 2 },
  lineCap: { type: String, default: "round" },
  lineJoin: { type: String, default: "round" },
  canvasStrokeWidth: { type: Number, default: 6 },
  canvasLineCap: { type: String, default: "round" },
  canvasLineJoin: { type: String, default: "round" },
  canvasColor: { type: String, default: "black" },
});

const isFinished = ref(false);
const currentIndex = ref(0);
const canvas = ref(null);
const attempts = ref(0);
const wrongStrokes = ref([]);

// Cek apakah mode review
// const isReview = computed(() => props.reviewData != null);
const isReview = props.reviewData != null;
console.log("isi isReview nih", isReview);

const strokes = ref([]);

/**
 * Fungsi untuk menghasilkan array stroke dengan warna (baik normal, review, atau latihan)
 */
function initStrokes(review = null) {
  if (isReview) {
    if (props.reviewData) {
      return props.strokesData.map((path, i) => ({
        path,
        color: props.reviewData.wrongStrokes.includes(i)
          ? props.wrongColor
          : props.finishColor,
      }));
    }
  }

  return props.strokesData.map((path, i) => ({
    path,
    color: i === 0 ? props.defaultColor : props.defaultColor,
  }));
}

strokes.value = initStrokes();

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function getReferencePoints(d, numPoints = 100) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("viewBox", `0 0 ${props.viewBox} ${props.viewBox}`);
  const length = path.getTotalLength();
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const pt = path.getPointAtLength((i / numPoints) * length);
    points.push({
      x: (pt.x / props.viewBox) * props.size,
      y: (pt.y / props.viewBox) * props.size,
    });
  }

  return points;
}

function isSimilarPath(userPath, refPath) {
  const refPoints = getReferencePoints(refPath);
  const minLen = Math.min(userPath.length, refPoints.length);
  let totalDist = 0;

  for (let i = 0; i < minLen; i++) {
    totalDist += distance(userPath[i], refPoints[i]);
  }

  const avgDist = totalDist / minLen;
  console.log(avgDist);
  return !(avgDist > props.avgsdH || avgDist < props.avgsdL);
}

function handleFinish(userPath) {
  const refPath = strokes.value[currentIndex.value].path;

  if (isSimilarPath(userPath, refPath)) {
    strokes.value[currentIndex.value].color = props.successColor;
    nextStroke();
  } else {
    attempts.value++;

    if (attempts.value >= props.trial) {
      strokes.value[currentIndex.value].color = props.wrongColor;
      wrongStrokes.value.push(currentIndex.value);
      nextStroke();
    } else {
      canvas.value.clearCanvas();
    }
  }
}

function nextStroke() {
  currentIndex.value++;
  attempts.value = 0;
  canvas.value.clearCanvas();

  if (currentIndex.value >= strokes.value.length) {
    setTimeout(() => {
      isFinished.value = true;
      strokes.value = strokes.value.map((s, index) => ({
        ...s,
        color: wrongStrokes.value.includes(index)
          ? props.wrongColor
          : props.finishColor,
      }));

      emit("finished", {
        finished: true,
        strokes: props.strokesData,
        wrongStrokes: wrongStrokes.value,
      });
    }, 600);
  } else {
    strokes.value[currentIndex.value].color = props.defaultColor;
  }
}

watch(
  () => props.strokesData,
  () => {
    strokes.value = initStrokes();
    isFinished.value = false;
    currentIndex.value = 0;
    attempts.value = 0;
    wrongStrokes.value = [];

    if (!isReview.value) {
      canvas.value?.clearCanvas();
    }
  },
  { deep: true }
);
</script>
