import { Component, OnInit } from '@angular/core';
import { NOISE_AMOUNT, NUM_TRIES, SCRUMBLE_DAY_ONE, Track, generateNoise } from './app.model';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showWelcomeModal = true;
  NUM_TRIES = NUM_TRIES;
  title = 'Scrumble';
  track = new Track();
  hint = this.track.hint;
  chars = this.track.answer.replace(/\s+/g, '').toUpperCase().split('').map((v) => v.charCodeAt(0))
  shakeSubject = new Subject<void>(); // todo
  showModal = false;
  copied = false;
  numColumns = this.chars.length + 4;
  solved = false;
  won = false;
  done = false;

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

  ngOnInit(): void {

    const track = localStorage.getItem('track');
    console.log(track);
    if (track) {
      const parsedTrack = JSON.parse(track) as Track;
      if (parsedTrack.hint === this.hint) {
        this.track.moves = parsedTrack.moves;
        this.track.moveIdx = parsedTrack.moveIdx;
        this.track.noise = parsedTrack.noise;
        this.track.j = parsedTrack.j;
        this.track.k = parsedTrack.k;
        this.showWelcomeModal = false;
      }
    }
  }

  getLetters(offset = 0): string[] {
    const baseArray = [...this.track.noise[0], ...this.chars, ...this.track.noise[1]];
    return baseArray.map(
      (_, idx) => this.getStringFromUnicode(baseArray[Math.abs((idx + this.track.k) % baseArray.length)], offset)
    );
  }

  getStringFromUnicode(c: number, offset = 0) {
    return String.fromCharCode((c + this.track.j + offset) % 26 + 65);
  }

  getMoveDisplay(): string[] {
    return this.track.moves.map((m) => this.emojiMap.get(m)![1]);
  }

  check() {
    if (this.isCorrect()) {
      this.track.moves[this.track.moveIdx++] = 'check';
      this.solved = true;
      this.openModal();
    } else {
      this.track.moves[this.track.moveIdx++] = 'x';
      if (this.track.moveIdx === NUM_TRIES) {
        this.openModal();
      }
      this.shakeSubject.next();
    }
    localStorage.setItem('track', JSON.stringify({...this.track, answer: undefined}));
  }

  isCorrect(): boolean {
    return (this.track.j - 13) % 26 === 0 && this.track.k % (this.track.answer.length + 1) === 0;
  }

  getCopyContent(): string {
    const start = 'Scrumble #' + moment().diff(moment(SCRUMBLE_DAY_ONE), 'day') + '\n' + '"' + this.track.hint + '"' + '\n';
    return this.track.moves.reduce((prev, curr, idx) => prev + this.emojiMap.get(curr)![0] + ((idx + 1) % 4 === 0 ? '\n' : ''), start).replace('-', '');
  }

  saveMove(dir: 'up' | 'left' | 'down' | 'right'): void {
    this.track.moves[this.track.moveIdx++] = dir;
  }

  makeMove(dir: 'up' | 'left' | 'down' | 'right') {
    this.moveMap.get(dir)!();
    this.saveMove(dir);
    localStorage.setItem('track', JSON.stringify({...this.track, answer: undefined}));
    if (this.track.moveIdx === NUM_TRIES) {
      this.openModal();
    }
  }

  openModal() {
    this.showModal = true;
    this.copied = false;
    this.won = this.track.moveIdx !== NUM_TRIES || this.isCorrect();
    this.done = true;
  }

  closeWelcomeModal() { this.showWelcomeModal = false; }

  // quick methods - easy black boxes
  closeModal() { this.showModal = false; this.copied = false; }
  toggleModal() { this.showModal = !this.showModal; }
}
