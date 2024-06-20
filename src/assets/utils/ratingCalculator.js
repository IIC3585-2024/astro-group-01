export function ratingCalculator(list) {
  if (list.length === 0) return 0;

  const sum = list.reduce((acc, num) => acc + num, 0);
  const mean = sum / list.length;

  return mean.toFixed(1);
}
