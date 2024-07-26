/**
 * Converts a number to a string with 'k' for thousands and 'M' for millions.
 * @param num - The number to convert.
 * @returns A string representation of the number with 'k' for thousands and 'M' for millions.
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "k";
  }
  return num.toString();
};
