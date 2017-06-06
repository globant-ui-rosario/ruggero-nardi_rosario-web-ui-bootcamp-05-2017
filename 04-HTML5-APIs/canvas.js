const drawArea = document.getElementById('drawing-area');
function draw() {
  drawArea.width = 600;
  drawArea.height = 600;
  drawSquare();
  drawTriangle();
  drawCircle();
  drawStar();
  drawDivisionCanvas();
}
function drawDivisionCanvas() {
  const divisor = drawArea.getContext('2d');
  divisor.beginPath();
  divisor.moveTo(300, 0);
  divisor.lineTo(300, 600);
  divisor.moveTo(0, 300);
  divisor.lineTo(600, 300);
  divisor.lineWidth=2;
  divisor.strokeStyle = '#000000';
  divisor.stroke();
}
function drawSquare() {
  const square = drawArea.getContext('2d');
  square.lineWidth = 5;
  square.strokeStyle = randomColor();
  square.fillStyle = randomColor();
  square.rect(50, 50, 200, 200);
  square.fill();
  square.stroke();
}
function drawTriangle() {
  const triangle = drawArea.getContext('2d');
  triangle.beginPath();
  triangle.moveTo(450,50);
  triangle.lineTo(350,250);
  triangle.lineTo(550,250);
  triangle.closePath();
  triangle.strokeStyle = randomColor();
  triangle.fillStyle = randomColor();
  triangle.fill();
  triangle.stroke();
}
function drawCircle() {
  const circle = drawArea.getContext('2d');
  circle.beginPath();
  circle.arc(150,450,100,0,2*Math.PI);
  circle.strokeStyle = randomColor();
  circle.fillStyle = randomColor();
  circle.fill();
  circle.stroke();
}
function drawStar() {
  const star = drawArea.getContext('2d');
  star.beginPath();
  star.moveTo(350,550);
  star.lineTo(450,350);
  star.lineTo(550,550);
  star.lineTo(350,425);
  star.lineTo(550,425);
  star.closePath();
  star.strokeStyle = randomColor();
  star.fillStyle = randomColor();
  star.fill();
  star.stroke(); 
}
function randomColor() {
  let hexaValues = '789ABC';
  let color = '#';
  for (let colorHexaIndex = 0; colorHexaIndex < 6; colorHexaIndex++) {
    let randomHexa = hexaValues[Math.floor(Math.random() * 6)];
    color += randomHexa;
  }
  return color;
}

document.addEventListener('load', draw());