import { format } from "date-fns";
import { id, enIN } from "date-fns/locale";

// Buat array berisi tanggal setiap bulan dalam setahun
const months = Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1));

export const getMonthNamesByLocale = (
  locales: typeof id | typeof enIN = id
) => {
  return months.map((date) => format(date, "LLLL", { locale: locales }));
};

export const getThisMonth = (
  date = new Date(),
  locales: typeof id | typeof enIN = id
) => {
  return format(date, "LLLL", { locale: locales });
};
