export class EventEmitter {
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