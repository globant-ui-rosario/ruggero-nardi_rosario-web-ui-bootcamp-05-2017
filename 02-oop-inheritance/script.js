class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }
  emit(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (callback) {
        console.log('Triggered callback ' + callback);
      });
    }
  }
  off(eventName, callback) {
    let index = this.events[eventName].indexOf(callback);
    delete this.events[eventName][index];
  }
}
class Movie extends EventEmitter {
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
      for (let i = 0; i < actor.length; i++) {
        this.cast.push(actor[i]);
      }
    } else if (typeof actor === 'object' && !actor.length) {
      this.cast.push(actor);
    } else {
      console.log("Wrong type of argument");
    }
  }
}
class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}