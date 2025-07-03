<!-- src/StrokePlay.vue -->
<script setup>
import { ref } from "vue";
import StrokeAnimation from "../vueWritter/practice/StrokeAnimate.vue";

const props = defineProps({
  question: Object,
});

const writer1 = ref(null);

function startAnimationHandler() {
  writer1.value?.restartAnimation();
}
</script>

<template>
  <div class="box">
    <div class="button-top-container">
      <a class="ms-3" @click="startAnimationHandler" href="#">
        <i class="bi bi-repeat"></i>
      </a>
    </div>
    <StrokeAnimation
      class="stroke"
      ref="writer1"
      :strokesData="question.path.strokes"
      :size="'10rem'"
      strokeColor="blue"
      :delayBetweenStrokes="1"
      :animationDuration="5"
    />
    <div class="button-bottom-container">
      <router-link :to="'/math/show/3'"
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
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.button-bottom-container {
  justify-content: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.button-top-container,
.button-bottom-container {
  display: flex;
  flex: 1;
  align-items: center;
  max-height: 5rem;
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
