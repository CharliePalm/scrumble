import { Component } from '@angular/core';
import { ANSWER, Track, hint } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hint = hint;
  title = 'Scrumble';
  track = new Track();
  blocks = ANSWER.split(' ').map((v) => {
    const x: number[] = [];
    for (let i = 0; i < v.length; i ++) {
      x.push(v.charCodeAt(i));
    }
    return x;
  });

  getChar(blockIdx: number, strIdx: number): string {
    return this.getStringFromUnicode(this.blocks[blockIdx][strIdx]); // 65 is where capital letters start
  }

  getStringFromUnicode(c: number) {
    return String.fromCharCode((c + (this.track.j)) % 26 + 65);
  }

  check() {
  }

  isCorrect(): boolean {
    const s = ANSWER.replace(' ', '');
    let sdx = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (this.getStringFromUnicode(this.blocks[i][j]) != s[sdx]) {
          return false;
        }
      }
    }
    return true;
  }
}
