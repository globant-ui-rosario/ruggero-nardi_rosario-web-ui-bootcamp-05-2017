'use strict';

var _EventEmitterClass = require('./classes/EventEmitterClass.js');

var _MovieClass = require('./classes/MovieClass.js');

var _ActorClass = require('./classes/ActorClass.js');

var _LoggerClass = require('./classes/LoggerClass.js');

var social = {
  share: function share(friendName) {
    return friendName + ' share ' + this.title;
  },
  like: function like(friendName) {
    return friendName + ' like ' + this.title;
  }
};
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
var terminator = new _MovieClass.Movie('Terminator I', 1985, 60);
var lg = new _LoggerClass.Logger();
extend(terminator, social);
terminator.on("play", lg.log);
terminator.on("pause", lg.log);
terminator.on("resume", lg.log);