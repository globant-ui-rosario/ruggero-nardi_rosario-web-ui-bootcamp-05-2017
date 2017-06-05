import {EventEmitter} from './EventEmitterClass.js';
export class Movie extends EventEmitter {
  constructor(title, year, duration) {
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = [];
  }
  play() {
    this.emit('play');
  }
  pause() {
    this.emit('pause');
  }
  resume() {
    this.emit('resume');
  }
  addCast(actor) {
    if (typeof actor === 'object' && actor.length) {
      for (let ii = 0; ii < actor.length; ii++) {
        this.cast.push(actor[ii]);
      }
    } else if (typeof actor === 'object' && !actor.length) {
      this.cast.push(actor);
    } else {
      console.log("Wrong type of argument");
    }
  }
}