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
  ['2025-01-01', ['What happens at every Ney Years party', 'Countdown']],
  ['2025-01-02', ['Meaning "Moon"', 'Lunar']],
  ['2025-01-03', ['Substitute for "Vacation" in British English', 'Holiday']],
  ['2025-01-04', ['School groundskeeper in "The Simpsons"', 'Willie']],
  ['2025-01-05', ['Author George R.R.', 'Martin']],
  ['2025-01-06', ['"Star Wars" dynasty', 'Skywalker']],
  ['2025-01-07', ['Father of the Romantic era of classical music', 'Beethoven']],
  ['2025-01-08', ['Corporation that specializes in art supplies for children', 'Crayola']],
  ['2025-01-09', ['Harmless, North American snake species', 'Garter']],
  ['2025-01-10', ['The largest city in Pennsylvania, for short', 'Philly']],
  ['2025-01-11', ['Hurricane, sans water', 'Tornado']],
  ['2025-01-12', ['Cuban genre of music that involves complex, interweaving drum parts. Also a Spanish word used to describe a loud party', 'Rumba']],
  ['2025-01-13', ['Ancient empire responsible for the Epic of Gilgamesh', 'Sumeria']],
  ['2025-01-14', ['Prominent French impressionist painter', 'Monet']],
  ['2025-01-15', ['The capital of Chile', 'Santiago']],
  ['2025-01-16', ['Charli XCX Album of the Year contender', 'Brat']],
]);
