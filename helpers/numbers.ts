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

function calculateTokenExpiration(hasTick: boolean, tick: number) {
  const almostAnHourFromNow = new Date(Date.now() + 1 * (60 * 59 * 1000))
  const accessTokenExpires = hasTick
    ? new Date(tick * 1000)
    : almostAnHourFromNow

  return accessTokenExpires
}

export { round, calculateTokenExpiration }
