export const ANSWER = "TO BLUFF";
export const hint = "To blave";
export const SCRUMBLE_DAY_ONE = '2024-07-29T05:00:00.000Z';
export const NOISE_AMOUNT = 3
export const DISTANCE = 4
export const NUM_TRIES = 16;
export class Track {
  j: number;
  k: number;
  constructor() {
    if (Math.random() < .5) {
      this.j = DISTANCE * -1 - 13;
    } else {
      this.j = DISTANCE + 13;
    }
    if (Math.random() < .5) {
      this.k = DISTANCE * -1 - 1;
    } else {
      this.k = DISTANCE + 1;
    }
  }

  right = () => this.k -= 1;
  left = () => this.k += 1;
  up = () => this.j += 1;
  down = () => this.j -= 1;
}

export function generateNoise(): number[] {
  return new Array(NOISE_AMOUNT).fill(65).map((v) => Math.round((Math.random() * 25) + 65));
}
