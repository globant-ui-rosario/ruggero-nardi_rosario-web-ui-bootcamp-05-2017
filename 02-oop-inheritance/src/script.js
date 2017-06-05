import {EventEmitter} from './classes/EventEmitterClass.js';
import {Movie} from './classes/MovieClass.js';
import {Actor} from './classes/ActorClass.js';
import {Logger} from './classes/LoggerClass.js';

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
terminator.on("play", lg.log);
terminator.on("pause", lg.log);
terminator.on("resume", lg.log);