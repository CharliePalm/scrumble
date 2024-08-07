import { Component } from '@angular/core';
import { ANSWER, NOISE_AMOUNT, NUM_TRIES, SCRUMBLE_DAY_ONE, Track, generateNoise, hint } from './app.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showWelcomeModal = true;
  NUM_TRIES = NUM_TRIES;
  hint = hint;
  title = 'Scrumble';
  track = new Track();
  moves: ('up' | 'left' | 'down' | 'right' | 'check' | 'x')[] = new Array(NUM_TRIES).fill('-');
  shakeSubject = new Subject<void>();
  noise = [generateNoise(), generateNoise()];
  chars = ANSWER.replace(/\s+/g, '').toUpperCase().split('').map((v) => v.charCodeAt(0))
  moveIdx = 0;
  showModal = false;
  copied = false;
  numColumns = this.chars.length + 4;
  solved = false;
  won = false;

  moveMap = new Map<'up' | 'left' | 'down' | 'right', () => void>([
    ['up', this.track.up],
    ['right', this.track.right],
    ['down', this.track.down],
    ['left', this.track.left],
  ]);

  emojiMap = new Map<'up' | 'left' | 'down' | 'right' | 'check' | 'x' | '-', [string, string]>([
    ['up', ['⬆️', '↑']],
    ['right', ['➡️', '→']],
    ['down', ['⬇️', '↓']],
    ['left', ['⬅️', '←']],
    ['x', ['❌', 'x']],
    ['check', ['✅', '✓']],
    ['-', ['', '—']],
  ]);

  getLetters(offset = 0): string[] {
    const baseArray = [...this.noise[0], ...this.chars, ...this.noise[1]];
    return baseArray.map(
      (_, idx) => this.getStringFromUnicode(baseArray[Math.abs((idx + this.track.k)) % baseArray.length], offset)
    ).slice(this.noise[0].length - 2, -1 * (this.noise[1].length - 2));
  }

  getStringFromUnicode(c: number, offset = 0) {
    return String.fromCharCode((c + this.track.j + offset) % 26 + 65);
  }

  getMoveDisplay(): string[] {
    return this.moves.map((m) => this.emojiMap.get(m)![1]);
  }

  check() {
    if (this.isCorrect()) {
      this.moves[this.moveIdx++] = 'check';
      this.solved = true;
      this.openModal();
    } else {
      this.moves[this.moveIdx++] = 'x';
      this.shakeSubject.next();
    }
  }

  isCorrect(): boolean {
    return (this.track.j - 13) % 26 === 0 && this.track.k % (ANSWER.length - 1 + NOISE_AMOUNT * 2) === 0;
  }

  getCopyContent(): string {
    const start = 'Scrumble #' + moment().diff(moment(SCRUMBLE_DAY_ONE), 'day') + '\n' + '"' + hint + '"' + '\n';
    return this.moves.reduce((prev, curr, idx) => prev + this.emojiMap.get(curr)![0] + ((idx + 1) % 4 === 0 ? '\n' : ''), start).replace('-', '');
  }

  saveMove(dir: 'up' | 'left' | 'down' | 'right'): void {
    this.moves[this.moveIdx++] = (dir);
  }

  makeMove(dir: 'up' | 'left' | 'down' | 'right') {
    this.moveMap.get(dir)!();
    this.saveMove(dir);
    if (this.moveIdx === 12) {
      this.openModal();
    }
  }

  openModal() {
    this.showModal = true;
    this.copied = false;
    this.won = this.moveIdx !== 12;
  }

  closeWelcomeModal() { this.showWelcomeModal = false; }

  // quick methods - easy black boxes
  closeModal() { this.showModal = false; this.copied = false; }
  toggleModal() { this.showModal = !this.showModal; }
}
