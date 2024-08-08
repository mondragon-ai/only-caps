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
