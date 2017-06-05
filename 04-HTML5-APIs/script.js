let textdb;
function start() {
  const buttonSave = document.getElementById('button-save');
  const buttonClear = document.getElementById('button-clear');
  const textAreaDrop = document.getElementById('text');
  textAreaDrop.addEventListener("dragover", makeDragable);
  textAreaDrop.addEventListener("drop", updateValue);
  buttonSave.addEventListener('click', addObject);
  buttonClear.addEventListener('click', clearDB);
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
    let textArea = document.getElementById('text');
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
  document.getElementById('text').value = "";
}
function clearDB() {
  let transactionRW = textdb.transaction(['text-area'], 'readwrite');
  let storage = transactionRW.objectStore('text-area');
  storage.clear();
  localStorage.clear();
}



window.addEventListener('load', start);