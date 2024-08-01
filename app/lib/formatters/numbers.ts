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

/**
 * Formats a number to a money string with commas and two decimal places.
 *
 * @param {number} num - The number to format.
 * @returns {string} The formatted money string.
 */
export const formatToMoney = (num: number): string => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Generic function to calculate the total value from an array of data points.
 *
 * @template T - The type of the data points, which must include a `value` property.
 * @param {T[]} data - The array of data points to calculate the total value from.
 * @returns {number} The total value calculated from the data points.
 */
export const calculateTotalValue = <T extends { value: number }>(
  data: T[],
): number => {
  return data.reduce((prev, item) => prev + Number(item.value), 0);
};
