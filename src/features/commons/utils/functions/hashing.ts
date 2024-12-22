export function obfuscateId(id: number): string {
  // Convert the number to a string
  const idString = id.toString();
  // Use btoa for base64 encoding
  return btoa(idString);
}

export function deobfuscateId(encodedId: string): number {
  // Use atob for base64 decoding
  const idString = atob(encodedId);
  // Convert the string back to a number
  return parseInt(idString, 10);
}

// Contoh penggunaan:
// const obfuscatedId = obfuscateId(12345); // Hasilnya harus "MTIzNDU="
// const originalId = deobfuscateId(obfuscatedId); // Hasilnya harus 12345
