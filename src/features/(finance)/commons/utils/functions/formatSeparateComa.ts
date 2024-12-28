export const formatSeparateComa = (val?: string) => {
  if (!val) return "";
  let cleaned = val.replace(/[^\d]/g, ""); // Menghilangkan selain angka
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Menambahkan pemisah ribuan
};
