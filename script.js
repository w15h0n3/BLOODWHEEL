// Define the colors and prize descriptions
var colors = {
  "MAJOR": "#B8860B",
  "MINOR": "#8B0000", // Dark Red for "MINOR"
  "SUMMON": "#00008B", // Dark Blue for "SUMMON"
  "STANCE": "#00008B", // Dark Blue for "STANCE"
  "ARTIFACT": "#00008B", // Dark Blue for "ARTIFACT"
  "WISDOM": "#00008B" // Dark Blue for "WISDOM"
};

var prize_descriptions = [
  "MAJOR", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "WISDOM", "DEATH",
  "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR",
  "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "WISDOM", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "STANCE", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "ARTIFACT", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "SUMMON", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH",
  "MINOR", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH"
];

// ... (remaining code)


// Define the variables for the spinning function
var startAngle = 0;
var numSegments = 82; // Number of segments
var arc = (2 * Math.PI) / numSegments; // Calculate the arc dynamically
var outsideRadius = 200;
var insideRadius = 150;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

// ... (previous code)

// Define the function to draw the spinner wheel
function drawSpinnerWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = 'bold 12px Cinzel, serif';

    // Draw the wheel
    for (var i = 0; i < numSegments; i++) {
      var angle = startAngle + i * arc;
      var color;

      if (prize_descriptions[i % prize_descriptions.length] === "DEATH") {
        color = "#444444"; // Dark Grey for "DEATH"
      } else {
        color = colors[prize_descriptions[i % prize_descriptions.length]];
      }

      ctx.fillStyle = color;

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
      var text = prize_descriptions[i % prize_descriptions.length];
      if (text == undefined) text = "Not this time! " + i;

      // Calculate the font size dynamically based on the segment size
      var maxTextWidth = insideRadius * Math.sin(arc / 2);
      var maxTextHeight = outsideRadius - insideRadius;
      var fontSize = Math.min((9 * maxTextWidth) / text.length, maxTextHeight);
      ctx.font = 'bold ' + fontSize + 'px Cinzel, serif';

      // Adjust the position for vertical text
      var textRadius = outsideRadius - 20; // Adjust the distance from the center
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);

      // Rotate the text to be vertical
      ctx.rotate(angle + arc / 2 + Math.PI);

      // Adjust the position for centered text
      var textWidth = ctx.measureText(text).width;
      ctx.fillText(text, -textWidth / 2, 0);
      ctx.restore();
    }

    // Draw the logo in the center
    var logo = new Image();
    logo.src = 'https://github.com/w15h0n3/BLOODWHEEL/raw/main/KING%20SNOOCH%20-%20FULL%20LOGO-01.png';
    var logoSize = 350;

    logo.onload = function () {
      ctx.drawImage(logo, 250 - logoSize / 2, 250 - logoSize / 2, logoSize, logoSize);
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

// ... (remaining code)



// Define the function to spin the wheel
function spinWheel() {
  // Hide the prize win text
  document.getElementById('prizeText').textContent = '';

  spinTime = 0;

  // Generate a random start angle for each spin
  spinArcStart = Math.random() * 360 + 180; // Start angle between 180 and 540 degrees

  // Set totalRotations to 1 for just one full rotation
  var totalRotations = 1;

  // Reduce the spinTimeTotal for a shorter spin
  spinTimeTotal = totalRotations * 360 * 5; // Adjust the multiplier for desired speed

  // Hide the prize win text
  document.getElementById('prizeText').textContent = '';

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
  startAngle += (spinAngle * Math.PI / 180);
  drawSpinnerWheel();
  spinTimeout = setTimeout(() => rotateWheel(), 30);
}

// Define the function to stop the wheel
function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd); // Adjusting the index calculation
  ctx.save();

  // Style for the prize win text
  var prizeTextElement = document.getElementById('prizeText');
  prizeTextElement.style.fontFamily = 'Another Danger, sans-serif'; // Apply the custom font
  prizeTextElement.style.fontSize = '30px';
  prizeTextElement.style.color = 'red';

  // Get the prize description
  var text = prize_descriptions[index % prize_descriptions.length];

  // Display the prize win text
  prizeTextElement.textContent = text;
  alert(text);
}

// Define the easing function
function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// Draw the initial wheel on page load
document.addEventListener("DOMContentLoaded", drawSpinnerWheel);
