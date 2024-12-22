/**
 * Generate a random string with a default length of 20 characters.
 * @param length - The length of the generated string (default is 20).
 * @returns A randomly generated string.
 */
export const generateUID = (length: number = 20): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
};
