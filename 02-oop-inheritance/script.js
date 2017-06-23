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
        this.events[eventName].forEach( callback => {
        callback(eventName);
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
      for (let ii = 0; ii < actor.length; ii++) {
        this.cast.push(actor[ii]);
      }
    } else if (typeof actor === 'object' && !actor.length) {
      this.cast.push(actor);
    } else {
      console.log('Wrong type of argument');
    }
  }
}
class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
class Logger {
  constructor() {
  }
  log(info) {
    let logRecord = 'The ' + info + ' event has been emitted';
    console.log(logRecord);
  }
}
let social = {
  share: function (friendName) {
    return friendName + ' share ' + this.title;
  },
  like: function (friendName) {
    return friendName + ' like ' + this.title;
  }
}
function extend(target) {
  if (!arguments[1]) {
    return;
  }
  for (var ii = 0; ii < arguments.length; ii++) {
    var source = arguments[ii];
    for (var property in source) {
      if (!target[property] && source.hasOwnProperty(property)) {
        target[property] = source[property];
      }
    }
  }
}
const terminator = new Movie('Terminator I', 1985, 60);
const lg = new Logger;
extend(terminator, social);
terminator.on('play', lg.log);
terminator.on('pause', lg.log);
terminator.on('resume', lg.log);