import {
  generateNumberPathEssaySoal,
  generateNumberWiterSoal,
  generatePlayerNumberSoal,
} from "../soalGenerate";
import numberPath from "../../assets/path/numberPath";

function specialData(name) {
  if (name === "mengenal-angka") {
    const soal1 = generateAllMengenalAngka(5);
    const soal2 = generateAllMenulisAngka(5);
    const soal3 = convertToPlayerSoalList(soal2);

    const hasilShuffle = shuffleArray([...soal1, ...soal2]);

    const hasilGabung = [...soal3, ...hasilShuffle];

    // Reset nomor sesuai urutan gabungan
    const finalSoal = hasilGabung.map((soal, index) => ({
      ...soal,
      nomor: index + 1,
    }));

    return finalSoal;
  } else {
    return null;
  }
}

function generateAllMengenalAngka(jumlah) {
  const usedAnswers = new Set();
  const results = [];

  while (
    results.length < jumlah &&
    usedAnswers.size < Object.keys(numberPath).length
  ) {
    const soal = generateNumberPathEssaySoal(numberPath);
    if (!usedAnswers.has(soal.jawaban)) {
      usedAnswers.add(soal.jawaban);
      results.push({
        nomor: results.length + 1,
        ...soal,
      });
    }
  }

  return results;
}

function generateAllMenulisAngka(jumlah) {
  const usedAnswers = new Set();
  const results = [];

  while (
    results.length < jumlah &&
    usedAnswers.size < Object.keys(numberPath).length
  ) {
    const soal = generateNumberWiterSoal(numberPath);
    if (!usedAnswers.has(soal.jawaban)) {
      usedAnswers.add(soal.jawaban);
      results.push({
        nomor: results.length + 1,
        ...soal,
      });
    }
  }

  return results;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.map((item, index) => ({
    ...item,
    nomor: index + 1,
  }));
}

function convertToPlayerSoalList(originalList) {
  return originalList.map((item) => ({
    ...item,
    tipe: "play-stroke-angka",
    soal: `Ingat cara Menulis angka ${item.angka}`,
  }));
}

export default specialData;
