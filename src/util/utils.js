export const getRewardPoints = (price) => {
  let finalPrice = 0;
  if (price > 50 && price < 100) {
    finalPrice = 100 - price;
  } else if (price > 100) {
    finalPrice = (price - 100) * 2 + 50;
  } else {
    finalPrice = 0;
  }
  return finalPrice;
};
