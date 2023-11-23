// Define the colors and prize descriptions
var colors = ["#eaeaea", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000"];
var prize_descriptions = [
  "MAJOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "STANCE REVEAL", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "ARTIFACT KNOWLEDGE", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "SUMMON REFUND", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH"
];

// Define the variables for the spinning function
var startAngle = 0;
var arc = Math.PI / 41;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

// Define the function to draw the spinner wheel
function drawSpinnerWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Cinzel, serif'; // Use the Cinzel font

    for (var i = 0; i < 82; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = colors[i % colors.length];

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = prize_descriptions[i % prize_descriptions.length];
      if (text == undefined) text = "Not this time! " + i;
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    // Draw the arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

// Define the function to spin the wheel
function spin() {
  spinArcStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

// Define the function to rotate the wheel
function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinArcStart - easeOut(spinTime, 0, spinArcStart, spinTimeTotal);
  start
