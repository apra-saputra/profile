export const downloadCsv = (
  csvContent: string,
  filename: string = "transaction.csv"
) => {
  const bom = "\uFEFF"; // Byte Order Mark
  const blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const jsonToCsv = (data: any[], delimiter = ","): string => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]).join(delimiter);
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(delimiter)
  );

  return [headers, ...rows].join("\n");
};
