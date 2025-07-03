<script setup>
// header
import Header from "../components/levelDetailComponents/Header.vue";
import Hero from "../components/levelDetailComponents/HeroComponent.vue";
import ProgresBar from "../components/levelDetailComponents/ProgressBar.vue";
import card from "../components/levelDetailComponents/CardDetailLevel.vue";
import BottomNav from "../components/navComponents/BottomNav.vue";

import { computed } from "vue";

// ambil data di router
import { useRoute } from "vue-router";
const route = useRoute();
const mapel = route.params.mapel;
const slug = route.params.slugmateri;

// lesson store
import { useLessonStore } from "@/stores/LessonStore";
const storeLesson = useLessonStore();
const data = computed(() => storeLesson.getLesson(mapel, slug));

// ambil data
import { onMounted } from "vue";
import { useFetchMaterialLessons } from "@/stores/compossable/useFetchMaterialLessons";
import { useMaterialLessonStore } from "@/stores/materialLessonStore";
const { fetchLessons, loading, error } = useFetchMaterialLessons();
const storeMaterialLesson = useMaterialLessonStore();

const lessonId = route.params.id;

onMounted(() => {
  fetchLessons(lessonId);
});
</script>

<template>
  <div>
    <div class="sticky-header">
      <Header :judul="data" />
    </div>
    <div class="container" style="padding-top: 0.5rem">
      <Hero :data="data" />
    </div>
    <div class="container mt-1 pt-1">
      <ProgresBar :progres="90" />
    </div>
    <div class="container space">
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error }}</div>
      <div v-else>
        <router-link
          v-for="item in storeMaterialLesson.getAll"
          :key="item.id"
          class="list-group-item list-group-item-action"
          :to="{
            path: `/${mapel}/${item.lastgroup ? 'show' : 'd'}/${item.id}`,
            query: { needData: JSON.stringify(item.needData) },
          }"
        >
          {{ item.needData }}
          <card
            :id="item.id"
            :deskripsi="item.description"
            :judul="item.name"
            :gambar="item.logo_picture"
            :progres="item.presentase"
            :lastgroup="item.lastgroup"
        /></router-link>
      </div>
    </div>
    <BottomNav class="bottomnav" :home="mapel" />
  </div>
</template>

<style scoped>
/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white; /* atau ganti sesuai warna header */
}
@media (min-width: 768px) {
  .bottomnav {
    display: none;
  }
}
@media (max-width: 768px) {
  .space {
    padding-bottom: 4.2rem;
  }
}
</style>
