const drawArea = document.getElementById('drawing-area');
let context = drawArea.getContext('2d');
const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
drawArea.width = 600;
drawArea.height = 600;
const canvasWidth = drawArea.width;
const canvasHeight = drawArea.height;
let square = {
  x: 50,
  y: 50,
  width: 200,
  height: 200,
  halfAnimationDone: false
}
function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = '#330066';
  context.fillRect(square.x, square.y, square.width, square.height);
  getNewPosition();
  requestAnimationFrame(draw);
}

function getNewPosition() {
  if (!(square.x === drawArea.width - square.width - 50) && square.halfAnimationDone === false) {
    square.x += 10;
  } else if (!(square.y === drawArea.height - square.height - 50) && square.halfAnimationDone === false) {
    square.y += 10;
  } else {
    square.halfAnimationDone = true;
  }
  if (!(square.x === 50) && square.halfAnimationDone === true) {
    square.x -= 10;
  } else if (!(square.y === 50) && square.halfAnimationDone === true) {
    square.y -= 10;
  } else {
    square.halfAnimationDone = false;
  }
}
window.onload = draw();