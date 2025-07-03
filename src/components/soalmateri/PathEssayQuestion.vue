<template>
  <div class="cov">
    <div class="uncov">
      <h2 class="text-xl font-bold mb-2 text">{{ question.soal }}</h2>

      <div class="box">
        <StrokeSvg
          class="stroke"
          :strokesData="question.path.strokes"
          viewBox="24"
        />
      </div>

      <div class="mt-4">
        <input
          v-model="userAnswer"
          type="text"
          placeholder="Jawaban kamu"
          class="border px-2 py-1 rounded w-full mb-2"
          :disabled="isAnswered"
        />

        <button
          @click="submitAnswer"
          class="bg-green-500 text-white px-4 py-2 rounded"
          :disabled="isAnswered"
        >
          Submit
        </button>
      </div>

      <div v-if="showResult" class="mt-4">
        <p :class="isCorrect ? 'text-success' : 'text-danger'">
          {{
            "Jawaban " +
            (isCorrect
              ? "Benar!"
              : "Salah. Jawaban yang benar adalah " + question.jawaban)
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import StrokeSvg from "../vueWritter/StrokeSvg.vue";

import { useSoalStore } from "@/stores/soalStore"; // atau sesuaikan path-nya
const soalStore = useSoalStore();

const props = defineProps({
  question: Object,
  jawaban: Object,
  NomorSoal: Number,
});

// **Reset local state tiap kali soal atau jawaban awal berubah**
watch(
  () => props.NomorSoal,
  () => {
    if (props.jawaban != null) {
      isAnswered.value = true;
      showResult.value = true;
      isCorrect.value = props.jawaban.hasil;
      userAnswer.value = props.jawaban.answer;
    } else {
      userAnswer.value = "";
      showResult.value = false;
      isAnswered.value = false;
    }
  }
);

// Saat mount
onMounted(() => {
  if (props.jawaban != null) {
    isAnswered.value = true;
    showResult.value = true;
    isCorrect.value = props.jawaban.hasil;
    userAnswer.value = props.jawaban.answer;
    emit("answered", isAnswered.value); // Emit event ke parent
  } else {
    userAnswer.value = "";
    showResult.value = false;
    isAnswered.value = false;
  }
});

const emit = defineEmits(["answered"]); // Emit event for answered status

const userAnswer = ref("");
const showResult = ref(false);
const isCorrect = ref(false);
const isAnswered = ref(false); // Menyimpan status apakah soal sudah dijawab

function submitAnswer() {
  showResult.value = true;
  isCorrect.value =
    userAnswer.value.trim().toLowerCase() ===
    props.question.jawaban.toLowerCase();
  isAnswered.value = true; // Menandakan soal sudah dijawab
  emit("answered", isAnswered.value); // Emit event ke parent
  simpanJawabanKeStore(props.NomorSoal, {
    hasil: isCorrect.value,
    answer: userAnswer.value,
  });
}

function simpanJawabanKeStore(nomor, jawaban) {
  console.log("Jawaban disimpan");
  console.log("nomor yang disimpan", nomor);

  soalStore.setJawabanUser(nomor, jawaban);
}
</script>

<style scoped>
button:focus {
  outline: none;
}
.stroke {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.cov {
  justify-items: center;
}
.uncov {
  padding-top: 4rem;
}
.text {
  font-size: 1rem;
  margin-bottom: 3rem;
}
</style>
