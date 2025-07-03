const numberPaths = {
  0: {
    strokes: [
      "M12 4 C14.76 4 17 6.24 17 9 V15 C17 17.76 14.76 20 12 20 C9.24 20 7 17.76 7 15 V9 C7 6.24 9.24 4 12 4 Z",
    ],
    avgsdH: 100,
    avgsdL: 70,
    nama: "nol",
  },
  1: {
    strokes: ["M9 7L12 4V20"],
    avgsdH: 90,
    avgsdL: 75,
    nama: "satu",
  },
  2: {
    strokes: [
      "M8 8C8 6.97631 8.39052 5.95262 9.17157 5.17157C10.7337 3.60947 13.2663 3.60947 14.8284 5.17157C16.3905 6.73366 16.3905 9.26632 14.8284 10.8284L9.17157 16.4853C8.42143 17.2354 8 18.2528 8 19.3137L8 20L16 20",
    ],
    avgsdH: 95,
    avgsdL: 50,
    nama: "dua",
  },
  3: {
    strokes: [
      "M8 4H16L11 10C13.7614 10 16 12.2386 16 15C16 17.7614 13.7614 20 11 20C9.87439 20 8.83566 19.6281 8 19.0004",
    ],
    avgsdH: 100,
    avgsdL: 75,
    nama: "tiga",
  },
  4: {
    strokes: [
      "M16 4V20", // Garis vertikal utama dari atas ke bawah
      "M8 4V14", // Garis vertikal kiri dari atas ke bawah
      "M8 14H16", // Garis horizontal
    ],
    avgsdH: 50,
    avgsdL: 20,
    nama: "empat",
  },
  5: {
    strokes: [
      "M16 4H8V12C8 12 9.5 10 12 10C14.5 10 16 11.5 16 14C16 16.5 14 18 12 18C10 18 8.5 17 8 16",
    ],
    avgsdH: 70,
    avgsdL: 50,
    nama: "lima",
  },
  6: {
    strokes: [
      "M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16C16 13.7909 14.2091 12 12 12C9.79086 12 8 13.7909 8 16",
    ],
    avgsdH: 100,
    avgsdL: 70,
    nama: "enam",
  },
  7: {
    strokes: ["M8 4H16L10 20"],
    avgsdH: 30,
    avgsdL: 5,
    nama: "tujuh",
  },
  8: {
    strokes: [
      "M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z",
      "M12 12C9.79086 12 8 13.7909 8 16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16C16 13.7909 14.2091 12 12 12Z",
    ],
    avgsdH: 90,
    avgsdL: 20,
    nama: "delapan",
  },
  9: {
    strokes: [
      "M16 9C16 11.7614 13.7614 14 11 14C8.23858 14 6 11.7614 6 9C6 6.23858 8.23858 4 11 4C13.7614 4 16 6.23858 16 9L11 20",
    ],
    avgsdH: 90,
    avgsdL: 60,
    nama: "sembilan",
  },
};

export default numberPaths;

// cara pakai
/**
import numberPaths from '@/assets/data/numberPaths.js'

const strokes = numberPaths['3'].strokes
 */
