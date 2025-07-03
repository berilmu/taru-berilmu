<template>
  <div class="stroke-container">
    <!-- Target div untuk Hanzi Writer -->
    <div ref="strokeTarget" class="stroke-target"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HanziWriter from "hanzi-writer";

const strokeTarget = ref(null);

onMounted(() => {
  // Inisialisasi HanziWriter setelah komponen mount
  if (strokeTarget.value) {
    const writer = HanziWriter.create(strokeTarget.value, "沃", {
      width: 200,
      height: 200,
      padding: 5,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      showOutline: true,
      showCharacter: false,
      showStrokeOrder: true,
      strokeColor: "#000",
      outlineColor: "#DDD",
    });
    writer.animateCharacter();
  }
});
</script>

<style scoped>
.stroke-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.stroke-target {
  width: 200px;
  height: 200px;
}
</style>
