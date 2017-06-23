const button = document.getElementById('button');
let fadeInText = document.getElementById('fade-in-text');

window.onload = function () {
  fadeInText.setAttribute('class', 'visible-text');
};

let config = {
  method: 'GET',
  url: 'http://api.icndb.com/jokes/random'
};

button.addEventListener('click', htmlUpdate);

function htmlUpdate() {
  let objectOfData = promiseFunction(config);
  objectOfData.then(function (result) {
    result.send();
    result.onload = function () {
      let data = JSON.parse(result.responseText);
      fadeInText.innerHTML = data.value.joke;
      fadeInText.setAttribute('class', 'small-text');
    }
  }, function (err) {
    let hiddenTextContainer = document.getElementById('hidden-text-container');
    hiddenTextContainer.setAttribute('class', 'hidden-text-container-error');
    fadeInText.setAttribute('class', 'small-text');
    fadeInText.innerHTML = err;
  });
};

function promiseFunction(configObject) {
  let promise = new Promise(function (resolve, reject) {
    let data = new XMLHttpRequest();
    if ('withCredentials' in data) {
      data.open(configObject.method, configObject.url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      data = new XDomainRequest();
      data.open(configObject.method, configObject.url);
    } else {
      data = null;
    }
    if (data) {
      resolve(data);
    } else {
      reject(Error('Unexpected Error!'));
    }
  });
  return promise;
};

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', search);

function search(event) {
  let value = searchBar.value;
  if (value) {
    let configObject = {
      method: 'GET',
      url: 'https://api.github.com/search/repositories?q=' + value,
    };
    let promise = promiseFunction(configObject);
    promise.then(function (search) {
      search.send();
      search.onload = function () {
        let data = JSON.parse(search.responseText);
        const list = document.getElementById('search-results');
        for (let listCounter = 0; listCounter < 10; listCounter++) {
          newli = document.createElement('li');
          newlink = document.createElement('a');
          newlink.setAttribute('href', data.items[0].url);
          newlink.setAttribute('target', '_blank');
          result = document.createTextNode(data.items[listCounter].owner.login);
          newlink.appendChild(result);
          newli.appendChild(newlink);
          list.appendChild(newli);
        }
      }
    })
  }
}

let matrix = [
  ['First Name', 'Last Name', 'Birthday', 'E-mail'],
  ['Robert', 'De Niro', '17-August-1943', 'DeniroFake@gmail.com'],
  ['Jhon', 'Smith', '24-May-1968', 'JhonSmith@something.com'],
];

(function createTable(matrix) {
  let ref = document.getElementById('table');
  for (let rowCounter = 0; rowCounter < matrix.length; rowCounter++) {
    let row = document.createElement('tr');
    for (let columnCounter = 0; columnCounter < matrix[rowCounter].length; columnCounter++) {
      if (rowCounter === 0) {
        let tag = document.createElement('th');
        tag.setAttribute('class', 'table h');
        let content = document.createTextNode(matrix[rowCounter][columnCounter]);
        tag.appendChild(content);
        row.appendChild(tag);
      } else {
        let ref = document.getElementById('table');
        let tag = document.createElement('td');
        tag.setAttribute('class', 'table d');
        let content = document.createTextNode(matrix[rowCounter][columnCounter]);
        tag.appendChild(content);
        row.appendChild(tag);
      }
    }
    ref.appendChild(row);
  }
}(matrix));