export function formatCurrency(value: number, targetCurrency?: string): string {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: targetCurrency || "IDR",
    maximumFractionDigits: 0,
  };
  return new Intl.NumberFormat("en-US", options).format(value);
}
