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
      for (let index = 0; index < actor.length; index++) {
        this.cast.push(actor[index]);
      }
    } else if (typeof actor === 'object' && !actor.length) {
      this.cast.push(actor);
    } else {
      console.log("Wrong type of argument");
    }
  }
}