<template>
  <div class="d-flex align-items-center">
    <div
      class="progress-logo main-bg-col d-flex justify-content-center align-items-center"
    >
      <i class="bi bi-sliders"></i>
    </div>
    <div class="progress-wrapper flex-grow-1">
      <div
        class="progress-fill main-bg-col"
        :style="{ width: progres + '%' }"
      ></div>
      <div class="progress-text">{{ progres }}%</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progres: Number,
});
</script>

<style scoped>
.progress-logo {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.3rem;
  border-radius: 50%;
  color: #ffffff;
}
.progress-wrapper {
  position: relative;
  height: 1.5rem;
  border: 1px solid #ccc;
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ccc;
}
</style>
