window.onload = function() {
  let fade_in_text = document.getElementById("fade-in-text");
  fade_in_text.setAttribute("class", "visible-text");
}

const button_to_index = document.getElementById("button-to-index");

button_to_index.onclick = function() {
  alert("Button Clicked");
  window.location.href="index.html";
}
