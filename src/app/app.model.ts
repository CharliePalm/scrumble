import * as moment from "moment";
export const SCRUMBLE_DAY_ONE = '2024-07-29T05:00:00.000Z';
export const NOISE_AMOUNT = 2
export const DISTANCE = 4;
export const NUM_TRIES = 16;
export class Track {
  hint = puzzleMap.get(moment().format('YYYY-MM-DD'))![0];
  answer = puzzleMap.get(moment().format('YYYY-MM-DD'))![1].toUpperCase();
  j: number;
  k: number;
  moves: ('up' | 'left' | 'down' | 'right' | 'check' | 'x')[] = new Array(NUM_TRIES).fill('-');
  moveIdx: number = 0;
  noise = [generateNoise(), generateNoise()];
  constructor() {
    if (Math.random() < .5) {
      this.j = DISTANCE * -1 - 13;
    } else {
      this.j = DISTANCE + 13;
    }
    this.k = this.answer.replace(/\s+/g, '').length + NOISE_AMOUNT * 2;
    if (Math.random() < .5) {
      this.k += DISTANCE * -1 ;
    } else {
      this.k += DISTANCE;
    }
  }

  right = () => this.k += 1;
  left = () => this.k -= 1;
  up = () => this.j += 1;
  down = () => this.j -= 1;
}

export function generateNoise(): number[] {
  return new Array(NOISE_AMOUNT).fill(65).map((v) => Math.round((Math.random() * 25) + 65));
}

// this should be handled more secretly, but that requires effort that is truly not worth it. If you find this then look away!
export const puzzleMap: Map<string, [string, string]> = new Map([
  ['2025-01-23', ['"Dungeons and Dragons" substitute for Hobbit', 'Halfling']],
  ['2025-01-24', ['Liquid part of blood', 'Plasma']],
  ['2025-01-25', ['Romantic-era classical composer known for his dream-like ambience', 'Debussy']],
]);
