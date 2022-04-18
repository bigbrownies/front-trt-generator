/**
 *  generate random number between min and max with exclude values
 * @param min
 * @param max
 * @param exclude array of number
 * @returns the random number
 */
export function generateRandom(min: number, max: number, exclude: number[]) {
  let random = -1;

  while (random < 0) {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('x ', x);

    if (exclude.indexOf(x) === -1) random = x;
  }
  return random;
}
