var colors = ["#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000", "#8B0000"];
var prize_descriptions = ["MAJOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "STANCE REVEAL", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "ARTIFACT KNOWLEDGE", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "SUMMON REFUND", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH"];

var startAngle = 0;
var arc = Math.PI / 4;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var current_user_status = null;
var spin_results = null;
var ctx;

document.getElementById("spinButton").addEventListener("click", spin);

function drawSpinnerWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.lineWidth = 2;

    ctx.font = 'bold 12px "Cinzel", Helvetica, Arial, sans-serif';

    for (var i = 0; i < 8; i++) {
      var angle = startAngle + i * arc;

      if (prize_descriptions[i] === "DEATH") {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
      } else {
        ctx.fillStyle = colors[i];
        ctx.strokeStyle = "black";
      }

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
      var text = prize_descriptions[i];
      if (text == undefined) text = "Not this time! " + i;
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    // Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawSpinnerWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(s
