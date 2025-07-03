// src/composables/useFetchMaterialLessons.js
import { ref } from "vue";
import { getMaterialLessonByLessonId } from "@/service/supabase/materialLesson";
import { useMaterialLessonStore } from "@/stores/materialLessonStore";

export function useFetchMaterialLessons() {
  const loading = ref(false);
  const error = ref(null);
  const store = useMaterialLessonStore();

  const fetchLessons = async (lessonId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getMaterialLessonByLessonId(lessonId);
      store.setItems(data);
    } catch (err) {
      error.value = err.message;
      store.clearItems();
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchLessons,
  };
}
