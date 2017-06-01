const button = document.getElementById("button");
let fade_in_text = document.getElementById("fade-in-text");

window.onload = function () {
  fade_in_text.setAttribute("class", "visible-text");
};

let config = {
  method: "GET",
  url: "http://api.icndb.com/jokes/random"
};

button.addEventListener("click", htmlUpdate);

function htmlUpdate() {
  let ObjectOfData = promiseFunction(config);
  ObjectOfData.then(function (result) {
    result.send();
    result.onload = function () {
      let data = JSON.parse(result.responseText);
      fade_in_text.innerHTML = data.value.joke;
      fade_in_text.setAttribute("class", "small-text");
    }
  }, function (err) {
    let hidden_text_container = document.getElementById("hidden-text-container");
    hidden_text_container.setAttribute("class", "hidden-text-container-error");
    fade_in_text.setAttribute("class", "small-text");
    fade_in_text.innerHTML = err;
  });
};

function promiseFunction(configObject) {
  let promise = new Promise(function (resolve, reject) {
    let data = new XMLHttpRequest();
    if ("withCredentials" in data) {
      data.open(configObject.method, configObject.url, true);
    } else if (typeof XDomainRequest != "undefined") {
      data = new XDomainRequest();
      data.open(configObject.method, configObject.url);
    } else {
      data = null;
    }
    if (data != null) {
      resolve(data);
    } else {
      reject(Error("Unexpected Error!"));
    }
  });
  return promise;
};

const search_bar = document.getElementById("search-bar");
const search_button = document.getElementById("search-button");

search_button.addEventListener("click", pepe);

function pepe(event) {
  console.log("in pepe");
  let value = search_bar.value;
  console.log(value);
  if (value != "") {
    let configObject = {
      method: "GET",
      url: "https://api.github.com/search/repositories?q=" + value,
    };
    let promise = promiseFunction(configObject);
    promise.then(function (search) {
      search.send();
      search.onload = function () {
        let data = JSON.parse(search.responseText);
        const list=document.getElementById("search-results");
        for (i=0; i<10;i++){
          newli = document.createElement("li");
          newlink = document.createElement("a");
          newlink.setAttribute("href", data.items[0].url);
          result = document.createTextNode(data.items[i].owner.login);
          newlink.appendChild(result);
          newli.appendChild(newlink);
          list.appendChild(newli);
        }
      }
    })
  }
}