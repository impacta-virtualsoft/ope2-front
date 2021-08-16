/**
 * Round half away from zero ('commercial' rounding)
 * Uses correction to offset floating-point inaccuracies.
 * Works symmetrically for positive and negative numbers.
 */
function round(num: number, decimalPlaces: number = 2): number {
  const pow = Math.pow(10, decimalPlaces)
  const powedNumber = num * pow * (1 + Number.EPSILON)
  return Math.round(powedNumber) / pow
}

export { round }
