// stores/canvas.js
import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    canvasDataUrl: null, // untuk menyimpan isi canvas sebagai dataURL
    canvasDataUrl: null,
    strokeColor: "#0000ff",
    tempColor: "#0000ff",
    strokeWidth: 3,
    lastValidColor: "#0000ff",
    lastPenWidth: 3,
    lastErasWidth: 12,
  }),
  actions: {
    saveCanvas(dataUrl) {
      this.canvasDataUrl = dataUrl;
    },
    clearCanvasData() {
      this.canvasDataUrl = null;
    },

    saveSettings({
      strokeColor,
      tempColor,
      strokeWidth,
      lastValidColor,
      lastPenWidth,
      lastErasWidth,
    }) {
      if (strokeColor !== "#0000ff") this.strokeColor = strokeColor;
      if (tempColor !== "#0000ff") this.tempColor = tempColor;
      if (strokeWidth !== 3) this.strokeWidth = strokeWidth;
      if (lastValidColor !== "#0000ff") this.lastValidColor = lastValidColor;
      if (lastPenWidth !== 3) this.lastPenWidth = lastPenWidth;
      if (lastErasWidth !== 12) this.lastErasWidth = lastErasWidth;
    },
    resetSettings() {
      this.strokeColor = "#0000ff";
      this.tempColor = "#0000ff";
      this.strokeWidth = 3;
      this.lastValidColor = "#0000ff";
      this.lastPenWidth = 3;
      this.lastErasWidth = 12;
    },
  },
});
