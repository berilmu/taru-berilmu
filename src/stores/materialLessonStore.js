// src/stores/materialLessonStore.js
import { defineStore } from "pinia";

export const useMaterialLessonStore = defineStore("materialLesson", {
  state: () => ({
    items: [],
  }),
  getters: {
    getAll: (state) => state.items,
    getById: (state) => (id) => state.items.find((item) => item.id === id),
  },
  actions: {
    setItems(data) {
      this.items = data;
    },
    clearItems() {
      this.items = [];
    },
  },
});
