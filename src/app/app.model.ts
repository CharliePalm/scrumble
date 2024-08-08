import * as moment from "moment";

export const ANSWER = "TO BLUFF";
export const hint = "To blave";
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
    this.k = 2 * (ANSWER.length + 1);
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

export const puzzleMap: Map<string, [string, string]> = new Map([
  ["2024-08-07", ["To blave", "To bluff"]], // Princess Bride reference
  ["2024-08-08", ["A sauce, or a dance", "Salsa"]],
  ["2024-08-09", ["He who beams up", "Scotty"]], // Star Trek reference
  ["2024-08-10", ["Bury the hatchet", "Reconcile"]],
  ['2024-08-11', ['Cats out of the bag', 'Revelation']],
  ["2024-08-12", ["Literary classic dog", "Old Yeller"]],
  ["2024-08-13", ["'The Godfather' actor", "Marlon Brando"]],
  ["2024-08-14", ["World's largest ocean", "Pacific"]],
  ["2024-08-15", ["Classic arcade game", "Pacman"]],
  ["2024-08-16", ["Planetary neighbor", "Venus"]],
  ["2024-08-17", ["Having to do with the moon", "Lunar"]],
  ["2024-08-18", ["Burn the midnight oil", "Work late"]],
  ["2024-08-19", ["The Grand Budapest Hotel, and The Life Aquatic", "Wes Anderson"]],
  ["2024-08-20", ["Our largest neighbor", "Jupiter"]],
  ["2024-08-21", ["Break a leg", "Good luck"]],
  ["2024-08-22", ["Ontario's capital", "Toronto"]],
  ["2024-08-23", ["Ontario's capital", "Toronto"]],
]);
