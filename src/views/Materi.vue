<script setup>
import Header from "../components/materiComponents/Header.vue";
import MateriModal from "../components/materiComponents/MateriModal.vue";

import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useLessonStore } from "@/stores/LessonStore";

// pertama aplikasi di buka isi data lesson
import { loadLessonsFromSupabase } from "../service/fetchDummyLesson";
loadLessonsFromSupabase();

// Ambil bagian terakhir dari path URL
const route = useRoute();
const path = computed(() => route.path.split("/").pop());
console.log("📍 Path dari URL:", path.value);

// Reactive: ambil data dari store berdasarkan path
const store = useLessonStore();
// const dataMapel = computed(() =>
//   store.lessons.find((item) => item.path === path.value)
// );
const dataMapel = computed(() => store.getByPath(path.value));
// console.log("data maspel :", dataMapel);

const allMapelNames = computed(() => store.allMapelNames);
console.log("mapelname:", allMapelNames);

onMounted(() => {
  // console.log("✅ Data lesson di komponen:", store.lessons);
  // console.log("🎯 Data berdasarkan path:", dataMapel.value);
  // console.log("📚 Daftar semua mapel:", allMapelNames.value);
});
</script>

<template>
  <div>
    <Header :mapelList="allMapelNames" />
    <main>
      <div v-if="dataMapel">
        <div v-for="level in dataMapel.levels" :key="level.id">
          <MateriModal
            :id="level.id"
            :judul="level.judul"
            :deskripsi="level.deskripsi"
            :status="level.status"
            :progres="level.progress"
            :slug="level.slug"
            :gambar="level.logo"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  background-color: #ffffff;
  padding: 1rem;
}
</style>
