import numberPaths from "@/assets/path/numberPath";

export function transformSoalData(data_soal) {
  const soalList = data_soal.map((item) => {
    const angka = item.soal.angka; // angka string, misal: "3"
    const path = numberPaths[angka]; // ambil path dari numberPaths

    return {
      nomor: item.no_urut,
      tipe: item.soal.tipe,
      soal: item.soal.soal,
      angka: angka,
      path: path, // path bisa undefined kalau angka tidak valid
      jawaban: path.nama,
    };
  });

  return soalList;
}

export function transformJawabanData(data) {
  const ansList = data.map((item) => {
    return {
      id: item.id,
      finished: item.finished,
      hasil: item.hasil,
      nomor: item.no_urut,
      wrongestroke: item.wrongestroke,
      jawabanUser: null,
    };
  });

  return ansList;
}
