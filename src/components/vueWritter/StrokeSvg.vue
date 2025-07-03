<!-- HiraganaStrokeViewer.vue -->
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
      <g>
        <path
          v-for="(stroke, index) in strokesData"
          :key="index"
          :d="stroke"
          :stroke="strokeColor"
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
import { ref, computed } from "vue";

const svgRef = ref(null);

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
});

// Validasi stroke-linejoin
const validLineJoins = ["round", "bevel", "miter", "miter-clip"];
const safeLineJoin = computed(() => {
  return validLineJoins.includes(props.lineJoin) ? props.lineJoin : "round";
});
</script>

<style scoped>
/* Tidak ada animasi */
</style>
