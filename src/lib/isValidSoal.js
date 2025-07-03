export function isValidSoal(obj) {
  if (typeof obj !== "object" || obj === null) return false;

  const requiredKeys = ["nomor", "tipe", "soal", "path", "jawaban"];
  const hasAllKeys = requiredKeys.every((key) => key in obj);
  if (!hasAllKeys) return false;

  const isNomorValid = typeof obj.nomor === "number" || obj.nomor === null;
  const isTipeValid = typeof obj.tipe === "string";
  const isSoalValid = typeof obj.soal === "string";
  const isJawabanValid = typeof obj.jawaban === "string";

  const isPathValid =
    typeof obj.path === "object" &&
    Array.isArray(obj.path.strokes) &&
    obj.path.strokes.every((s) => typeof s === "string") &&
    (typeof obj.path.avgsdH === "number" || obj.path.avgsdH === null) &&
    (typeof obj.path.avgsdL === "number" || obj.path.avgsdL === null);

  return (
    isNomorValid && isTipeValid && isSoalValid && isJawabanValid && isPathValid
  );
}
