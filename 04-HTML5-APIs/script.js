let textdb;
const textArea = document.getElementById('text');
const sendButton = document.getElementById('button-send');
const connectionButton = document.getElementById('connection-button');
function start() {
  const buttonSave = document.getElementById('button-save');
  const buttonClear = document.getElementById('button-clear');
  textArea.addEventListener('dragover', makeDragable);
  textArea.addEventListener('drop', updateValue);
  buttonSave.addEventListener('click', addObject);
  buttonClear.addEventListener('click', clearDB);
  init();
  function makeDragable(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }
  function updateValue(event) {
    event.preventDefault();
    let fileDroped = event.dataTransfer.files;
    if (fileDroped[0].type === 'text/plain') {
      let reader = new FileReader();
      reader.readAsText(fileDroped[0]);
      reader.onload = pasteText;
    }
  }
  function pasteText(event) {
    let textDroped = event.target.result;
    textArea.value = textDroped;
  }
  const database = indexedDB.open('textDB');
  database.onsuccess = function (e) {
    textdb = e.target.result;
  }
  database.onupgradeneeded = function (e) {
    textdb = e.target.result;
    textdb.createObjectStore('text-area', { autoIncrement: true });
  }
}
function addObject() {
  let text = document.getElementById('text').value;
  let transactionRW = textdb.transaction(['text-area'], 'readwrite');
  let storage = transactionRW.objectStore('text-area');
  let addtext = storage.add(text);
  addtext.onsuccess = function () {
    let keyStr = 'text';
    let key = keyStr.concat(addtext.result);
    localStorage.setItem(key, text);
  };
  document.getElementById('text').value = '';
}
function clearDB() {
  let transactionRW = textdb.transaction(['text-area'], 'readwrite');
  let storage = transactionRW.objectStore('text-area');
  storage.clear();
  localStorage.clear();
}
function init() {
  websocket = new WebSocket('ws://echo.websocket.org');
  websocket.onopen = function () { onOpen() };
  websocket.onmessage = function (event) { onMessage(event) };
  websocket.onerror = function (event) { onError(event) };
}
function onOpen() {
  sendButton.addEventListener('click', sendMsg);
  connectionButton.addEventListener('click', disconnect);
  display('<span style="color: green;">CONNECTED</span>');
}
function onMessage(event) {
  display('<span style="color: blue";>RESPONSE: ' + event.data + '</span>');
}
function onError(event) {
  display('<span style="color: red;">ERROR:</span> ' + event.data);
}
function sendMsg() {
  let text = textArea.value;
  display('SENT: ' + text);
  websocket.send(text);
  textArea.value = '';
}
function display(message) {
  const output = document.getElementById('display-box');
  let outputContainer = document.createElement('p');
  outputContainer.setAttribute('class', 'output');
  outputContainer.innerHTML = message;
  output.appendChild(outputContainer);
}
function disconnect() {
  websocket.close();
  connectionButton.addEventListener('click', connect);
  connectionButton.removeEventListener('click', disconnect);
  display('<span style="color: red;">DISCONNECTED</span>');
  connectionButton.innerHTML = 'CONNECT'
}
function connect() {
  connectionButton.removeEventListener('click', connect);
  connectionButton.innerHTML = 'DISCONNECT';
  init();
}



window.addEventListener('load', start);