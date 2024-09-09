import { MockupTypes } from "../types/mockups";

export const calculatePercentage = (quantity: number) => {
  if (quantity < 25) return 0;
  if (quantity >= 25 && quantity < 50) return 5;
  if (quantity >= 50 && quantity < 100) return 12;
  if (quantity >= 100 && quantity < 150) return 25;
  return 55;
};

export const calculateDiscount = (quantity: number) => {
  if (quantity < 25) return 0;
  if (quantity >= 25 && quantity < 50) return 10;
  if (quantity >= 50 && quantity < 100) return 25;
  if (quantity >= 100 && quantity < 150) return 45;
  return 75;
};

/**
 * Generates a random string with a specified length.
 *
 * @param {number} length - The length of the string to generate.
 * @returns {string} The generated random string.
 */
export function generateRandomString(length: number, type: string): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return (
    "POD-" +
    `${randomString}-${generateSKUFortype(type.replaceAll("-", "_") as MockupTypes)}`
  );
}

export const generateSKUFortype = (type: MockupTypes) => {
  console.log({ type });
  switch (type) {
    case "flat_bill":
      return "1133";
    case "high_profile":
      return "6032";
    case "foam_trucker":
      return "6025";
    case "low_profile":
      return "205";
    case "mid_profile":
      return "6038";
    case "retro_trucker":
      return "6030";
    case "snapback":
      return "SNAP";
    case "relaxed":
      return "RLX";
    case "dad":
      return "DAD";
    case "structured":
      return "STRC";
    case "trucker":
      return "TRCK";
    default:
      return "";
  }
};
