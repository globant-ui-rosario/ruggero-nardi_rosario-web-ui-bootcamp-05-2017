import {EventEmitter} from './classes/eventemitterclass.js';
import {Movie} from './classes/movieclass.js';
import {Actor} from './classes/actorclass.js';
import {Logger} from './classes/loggerclass.js';

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
  for (let argumentsIndex = 0; argumentsIndex < arguments.length; argumentsIndex++) {
    let source = arguments[argumentsIndex];
    for (let property in source) {
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