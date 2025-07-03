/**
 *
 * @param {*} key
 * @param {object} path
 * @returns
 */
export function generateNumberPathEssaySoal(path, key = null) {
  const keys = Object.keys(path);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  if (key != null) {
    randomKey = key;
  }
  // console.log(key);

  const selectedPath = path[randomKey];
  console.log("selectedPath", selectedPath);

  return {
    tipe: "esay-singkat-stroke",
    soal: "Angka berapakah ini?",
    angka: randomKey,
    path: {
      strokes: selectedPath.strokes,
    },
    jawaban: selectedPath.nama,
  };
}

export function generateNumberWiterSoal(path, key = null) {
  const keys = Object.keys(path);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  if (key != null) {
    randomKey = key;
  }

  const selectedPath = path[randomKey];

  return {
    tipe: "menulis-stroke-angka",
    soal: `Menulis angka ${randomKey}`,
    angka: randomKey,
    path: {
      strokes: selectedPath.strokes,
      avgsdH: selectedPath.avgsdH,
      avgsdL: selectedPath.avgsdL,
    },
    jawaban: selectedPath.nama,
  };
}

export function generatePlayerNumberSoal(path, key = null) {
  const keys = Object.keys(path);
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  if (key != null) {
    randomKey = key;
  }

  const selectedPath = path[randomKey];

  return {
    tipe: "play-stroke-angka",
    soal: `Ingat cara Menulis angka ${randomKey}`,
    angka: randomKey,
    path: {
      strokes: selectedPath.strokes,
      avgsdH: selectedPath.avgsdH,
      avgsdL: selectedPath.avgsdL,
    },
    jawaban: selectedPath.nama,
  };
}
