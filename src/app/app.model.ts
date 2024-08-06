export const ANSWER = "IN TO THE FIRE";
export const hint = "Out of the frying pan";
export class Track {
  j: number;
  k: number;
  constructor() {
    this.j = Math.round((Math.random() - .5) * 2 * 14);
    if ([0, 1, -1].includes(this.j)) this.j += (Math.random() === 0 ? -2 : 2);
    this.k = Math.round((Math.random() - .5) * 2 * 14);
    if ([0, 1, -1].includes(this.k)) this.k += (Math.random() === 0 ? -2 : 2);
  }

  right = () => this.j += 1;
  left = () => this.j -= 1;
  up = () => this.k += 1;
  down = () => this.k -= 1;
}

