/**
 * Take a word to replace the "_" with a space and capitalize each word
 *
 * @returns {string} Capitalized word
 */
export const capitalizeEachWord = (text: string): string => {
  return text
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
};
