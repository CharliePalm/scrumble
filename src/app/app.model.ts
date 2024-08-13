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
  ["2024-08-07", ["To blave", "To bluff"]],
  ["2024-08-08", ["A sauce, or a dance", "Salsa"]],
  ["2024-08-09", ["Graph of x squared", "Parabola"]],
  ["2024-08-10", ["Bury the hatchet", "Reconcile"]],
  ['2024-08-11', ['Cat\'s out of the bag, or John\'s vision', 'Revelation']],
  ["2024-08-12", ["Literary classic dog", "Old Yeller"]],
  ["2024-08-13", ["'The Godfather' actor", "Marlon Brando"]],
  ["2024-08-14", ["World's largest ocean", "Pacific"]],
  ["2024-08-15", ["Classic arcade game", "Pacman"]],
  ["2024-08-16", ["Planetary neighbor", "Venus"]],
  ["2024-08-17", ["Having to do with the moon", "Lunar"]],
  ["2024-08-18", ["Burn the midnight oil", "Work late"]],
  ["2024-08-19", ["The Grand Budapest Hotel, and The Life Aquatic", "Wes Anderson"]],
  ["2024-08-21", ["Broken leg wishes", "Good luck"]],
  ["2024-08-20", ["He who beams up", "Scotty"]],
  ["2024-08-22", ["Ontario's capital", "Toronto"]],
  ["2024-08-23", ["Our largest neighbor", "Jupiter"]],
  ['2024-08-24', ["Movie based on the novel 'Do Androids Dream of Electric Sheep?'", 'Blade Runner']],
  ['2024-08-25', ['Famous Russian ballet company', 'BOLSHOI']],
  ['2024-08-26', ['Language used for web development', 'JAVASCRIPT']],
  ['2024-08-27', ['Another term for a narrow street', 'ALLEY']],
  ['2024-08-28', ['Funk powerhouse group born in Chicago', 'Earth Wind And Fire']],
  ['2024-08-29', ['Spain\'s peninsula', 'Iberia']],
  ['2024-08-30', ['Instrument with both strings and keys', 'PIANO']],
  ['2024-08-31', ['Measurement of power in music equipment', 'WATTS']],
  ['2024-09-01', ['Vegetable or fruit?', 'TOMATO']],
  ['2024-09-02', ['An animal known for its ability to mimic sounds', 'PARROT']],
  ['2024-09-03', ['Board game involving real estate', 'MONOPOLY']],
  ['2024-09-04', ["Meaning 'normal', especially referencing religion", 'Orthodox']],
  ['2024-09-05', ['Colombia\'s Northeast neighbor', 'Panama']],
  ['2024-09-06', ['A large meal', 'FEAST']],
  ['2024-09-07', ['Planet known for its rings', 'SATURN']],
  ['2024-09-08', ['A fastener used in clothing', 'ZIPPER']],
  ['2024-09-09', ['Sport that seems a cousin to baseball', 'Cricket']],
  ['2024-09-10', ['The longest river in the world', 'NILE']],
  ['2024-09-11', ['Opposite of urban', 'RURAL']],
]);
