<template>
  <div>
    <svg
      ref="svgRef"
      :width="size"
      :height="size"
      :viewBox="`0 0 ${viewBox} ${viewBox}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g :key="animationKey">
        <path
          v-for="(stroke, index) in strokesData"
          :key="index"
          :d="stroke"
          class="stroke-path"
          :stroke="strokeColor"
          :stroke-width="strokeWidth"
          :stroke-linecap="lineCap"
          :stroke-linejoin="safeLineJoin"
          fill="none"
          :style="{
            animationDelay: `${index * delayBetweenStrokes}s`,
            animationDuration: `${animationDuration}s`,
          }"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";

const svgRef = ref(null);
const emit = defineEmits(["finished"]);

const props = defineProps({
  strokesData: {
    type: Array,
    required: true,
  },
  viewBox: {
    type: [String, Number],
    default: 24,
  },
  size: {
    type: [String, Number],
    default: 256,
  },
  strokeWidth: {
    type: [String, Number],
    default: 2,
  },
  lineJoin: {
    type: String,
    default: "round",
  },
  lineCap: {
    type: String,
    default: "round",
  },
  strokeColor: {
    type: String,
    default: "#000000",
  },
  delayBetweenStrokes: {
    type: Number,
    default: 0.5,
  },
  animationDuration: {
    type: Number,
    default: 2,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
});

const validLineJoins = ["round", "bevel", "miter", "miter-clip"];
const safeLineJoin = computed(() =>
  validLineJoins.includes(props.lineJoin) ? props.lineJoin : "round"
);

const animationKey = ref(0);

function restartAnimation() {
  animationKey.value++;
}

function setupAnimationEndListener() {
  nextTick(() => {
    if (!svgRef.value) return;

    const paths = svgRef.value.querySelectorAll(".stroke-path");
    let finishedCount = 0;

    paths.forEach((path) => {
      path.addEventListener(
        "animationend",
        () => {
          finishedCount++;
          if (finishedCount === paths.length) {
            emit("finished", {
              status: "success",
              message: "Latihan selesai!",
            });
          }
        },
        { once: true }
      );
    });
  });
}

// Saat pertama dimount
onMounted(() => {
  if (props.autoStart) {
    setupAnimationEndListener();
  }
});

// Jika animationKey berubah (karena restartAnimation), pasang ulang listener
watch(animationKey, () => {
  setupAnimationEndListener();
});

// ✅ Jika strokesData berubah, restart animasi dan pasang listener baru
watch(
  () => props.strokesData,
  () => {
    restartAnimation();
    setupAnimationEndListener();
  },
  { deep: true }
);

defineExpose({
  restartAnimation,
});
</script>

<style scoped>
@keyframes draw {
  0% {
    stroke-dashoffset: 300;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.stroke-path {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation-name: draw;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
