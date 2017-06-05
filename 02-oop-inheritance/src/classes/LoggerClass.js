export class Logger {
  constructor() {
  }
  log(info) {
    let logRecord = 'The ' + info + ' event has been emitted';
    console.log(logRecord);
  }
}