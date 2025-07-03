<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import StrokeWritter from "../vueWritter/practice/StrokeWritter.vue";
import { useSoalStore } from "@/stores/soalStore"; // atau sesuaikan path-nya
const soalStore = useSoalStore();

const props = defineProps({
  question: Object,
  NomorSoal: Number,
  jawaban: Object,
});

const emit = defineEmits(["answered"]);

const isAnswered = ref(false);
const size = ref(256);

/**
 * Menyimpan hasil latihan per soal dalam bentuk:
 * {
 *   [id]: {
 *     finished: true,
 *     strokes: [...],
 *     wrongStrokes: [...]
 *   }
 * }
 */
const hasilLatihan = ref({});

// Saat anak selesai menggambar
function handleLatihanSelesai(result) {
  console.log("Latihan selesai:", result);
  isAnswered.value = true;
  hasilLatihan.value[props.question.id] = result;
  emit("answered", isAnswered.value); // Notify parent
}

// Update ukuran canvas agar responsif
function updateSize() {
  const width = window.innerWidth;
  size.value = width < 200 ? 100 : width < 210 ? 150 : width < 260 ? 200 : 256;
}

// Saat mount: muat data dan set ukuran
onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});

// Auto simpan ke localStorage saat hasilLatihan berubah
watch(
  hasilLatihan,
  (val) => {
    // Simpan ke Pinia
    const hasil = val[props.question.id];
    soalStore.setJawabanUser(props.NomorSoal, hasil);
  },
  { deep: true }
);

// Bersihkan listener
onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<template>
  <div class="cov">
    <h2 class="text-xl font-bold text">{{ question.soal }}</h2>

    <div class="box">
      <StrokeWritter
        class="stroke"
        :avgsdH="question.path.avgsdH"
        :avgsdL="question.path.avgsdL"
        :size="size"
        :strokesData="question.path.strokes"
        :defaultColor="'#ccc'"
        :successColor="'#000'"
        :finishColor="'green'"
        :canvasColor="'blue'"
        :strokeWidth="1"
        :lineJoin="'round'"
        :lineCap="'round'"
        :canvasStrokeWidth="5"
        :canvasLineCap="'round'"
        :canvasLineJoin="'round'"
        :trial="5"
        :savedResult="hasilLatihan[question.id]"
        :reviewData="jawaban"
        @finished="handleLatihanSelesai"
      />
    </div>
  </div>
</template>

<style scoped>
.cov {
  padding-top: 3rem;
}
.stroke {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.box {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.text {
  font-size: 1rem;
  margin-bottom: 3rem;
}
</style>
