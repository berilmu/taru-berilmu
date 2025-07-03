<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import StrokeWritter from "../vueWritter/practice/StrokeWritter.vue";

// const stroke = ["M50,20 L50,90"];
const stroke = [
  "M7.53125 6 C9 6 13 5.5 15.5352 5",
  "M11.5306 3 C10.5 7 9.5 10.5 11.5306 19",
  "M15.4862 9 C15.5559 9.45126 15.5119 10.0367 15.3595 10.7008 M15.3595 10.7008 C14.647 13.8037 11.5647 18.6233 6.63251 19.4919 C6.63251 19.4919 5.28441 19.7802 4.54266 19.0227 C3.28198 17.7351 3.41266 14.3283 14.0208 11.0015 C14.456 10.865 14.9075 10.764 15.3595 10.7008",
  "M15.3595 10.7008 C19.6125 10.1058 23.899 12.8624 14.8758 21",
];

const size = ref(256);

function updateSize() {
  const width = window.innerWidth;

  if (width < 200) {
    size.value = 100;
  } else if (width < 210) {
    size.value = 150;
  } else if (width < 260) {
    size.value = 200;
  } else {
    size.value = 256;
  }
}

onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<template>
  <div class="box">
    <StrokeWritter
      class="stroke"
      :avgsdH="50"
      :avgsdL="20"
      :size="size"
      :strokesData="stroke"
      :defaultColor="'#ccc'"
      :successColor="'#000'"
      :funishColor="'green'"
      :canvasColor="'blue'"
      :strokeWidth="1"
      :lineJoin="'round'"
      :lineCap="'round'"
      :canvasStrokeWidth="5"
      :canvasLineCap="'round'"
      :canvasLineJoin="'round'"
      :trial="5"
    />
    <!-- @finished="handleFeedback" -->

    <div class="bullet-container">
      <router-link :to="'/math/show/1'"
        ><div class="main-bg-col butt">Next</div></router-link
      >
    </div>
  </div>
</template>

<style scoped>
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

/* Bullet slider */
.bullet-container {
  display: flex;
  flex: 1;
  max-height: 5rem;
  justify-content: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.butt {
  min-width: 100px;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 35%;
  border-radius: 3rem;
  max-height: 5rem;
}
</style>
