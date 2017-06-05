let textdb;
function start() {
  const buttonSave = document.getElementById('button-save');
  const buttonClear = document.getElementById('button-clear');
  buttonSave.addEventListener('click', addObject);
  buttonClear.addEventListener('click', clearDB);
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