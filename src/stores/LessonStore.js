// src/stores/lessonStore.js
import { defineStore } from "pinia";

export const useLessonStore = defineStore("lesson", {
  state: () => ({
    lessons: [], // array kosong, nanti diisi oleh helper/fetcher
    loading: false,
    error: null,
  }),

  actions: {
    setLessons(data) {
      this.lessons = data;
    },

    clearLessons() {
      this.lessons = [];
    },

    setError(err) {
      this.error = err;
    },

    setLoading(status) {
      this.loading = status;
    },
  },

  getters: {
    getByPath: (state) => (path) => {
      return state.lessons.find((item) => item.path === path);
    },

    getLesson: (state) => (path, slug) => {
      const data = state.lessons.find((item) => item.path === path);
      return data.levels.find((item) => item.slug === slug);
      // return dataMentah.find((item) => item.slug === slug);
    },

    allMapelNames: (state) => {
      return state.lessons.map((item) => ({
        mapel: item.mapel,
        path: item.path,
        app: item.app,
        img: item.img,
      }));
    },
  },
});
