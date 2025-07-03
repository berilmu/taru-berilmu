<template>
  <div class="stroke-container">
    <svg
      width="256"
      height="256"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        v-for="(stroke, index) in strokes"
        :key="index"
        :d="stroke"
        class="stroke-path"
        :style="{ animationDelay: `${index * delayPerStroke}s` }"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
  </div>
</template>

<script setup>
const strokes = [
  "M7.53125 6 C9 6 13 5.5 15.5352 5",
  "M11.5306 3 C10.5 7 9.5 10.5 11.5306 19",
  "M15.4862 9 C15.5559 9.45126 15.5119 10.0367 15.3595 10.7008 M15.3595 10.7008 C14.647 13.8037 11.5647 18.6233 6.63251 19.4919 C6.63251 19.4919 5.28441 19.7802 4.54266 19.0227 C3.28198 17.7351 3.41266 14.3283 14.0208 11.0015 C14.456 10.865 14.9075 10.764 15.3595 10.7008",
  "M15.3595 10.7008 C19.6125 10.1058 23.899 12.8624 14.8758 21",
];

// Delay antar stroke (dalam detik)
const delayPerStroke = 1.5;
</script>

<style scoped>
.stroke-path {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw 1.5s linear forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
