export function isValidLessonData(data) {
  if (!Array.isArray(data)) {
    console.warn("❌ Data bukan array");
    return false;
  }

  for (const item of data) {
    if (
      typeof item.id !== "number" ||
      typeof item.mapel !== "string" ||
      typeof item.nama_mapel !== "string" ||
      typeof item.path !== "string" ||
      !Array.isArray(item.levels)
    ) {
      // console.warn("❌ Struktur utama tidak valid", item); // nyalakan untuk cek kesalahan
      return false;
    }

    for (const level of item.levels) {
      if (
        typeof level.id !== "string" ||
        typeof level.judul !== "string" ||
        typeof level.deskripsi !== "string" ||
        typeof level.status !== "string" ||
        typeof level.progres !== "number" ||
        typeof level.gambar !== "string"
      ) {
        // console.warn("❌ Level tidak valid", level); // // nyalakan untuk cek kesalahan
        return false;
      }
    }
  }

  return true;
}
