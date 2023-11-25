// Define the colors and prize descriptions
var colors = {
  "MAJOR": "#B8860B",
  "MINOR": "#8B0000",
  "SUMMON": "#00008B",
  "STANCE": "#00008B",
  "ARTIFACT": "#00008B",
  "WISDOM": "#00008B"
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

// Variables for the spinning function
var startAngle = 0;
var numSegments = 82; // Number of segments
var arc = (2 * Math.PI) / numSegments; // Calculate the arc dynamically
var outsideRadius = 200;
var insideRadius = 150;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

// Preload the images
var logo = new Image();
logo.src = 'https://github.com/w15h0n3/BLOODWHEEL/raw/main/KING%20SNOOCH%20-%20FULL%20LOGO-01.png';
var arrow = new Image();
arrow.src = 'https://github.com/w15h0n3/BLOODWHEEL/raw/main/arrow.png';

// Function to shuffle an array with a fixed number of "DEATH" prizes
function shuffleArrayWithFixedDeathCount(array, fixedDeathCount) {
  const nonDeathPrizes = array.filter(prize => prize !== "DEATH");
  const shuffledNonDeathPrizes = nonDeathPrizes.sort(() => Math.random() - 0.5);
  const shuffledArray = array.map(prize => (prize === "DEATH" ? "DEATH" : shuffledNonDeathPrizes.pop()));
  return shuffledArray;
}

// Function to draw the spinner wheel
function drawSpinnerWheel() {
  ctx.clearRect(0, 0, 500, 500);

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
  var logoSize = 350;
  ctx.drawImage(logo, 250 - logoSize / 2, 250 - logoSize / 2, logoSize, logoSize);

  // Draw the arrow image
  ctx.drawImage(arrow, 250 - 25, 250 - outsideRadius - 40, 40, 70);
}

// Function to spin the wheel with varying speeds
function spinWheel() {
  // Shuffle the prize_descriptions array to make the outcome more random
  prize_descriptions = shuffleArrayWithFixedDeathCount(prize_descriptions, 20);

  // Hide the prize win text
  document.getElementById('prizeText').textContent = '';

  spinTime = 0;

  // Generate a random number of rotations (between 8 and 14)
  var totalRotations = Math.floor(Math.random() * 7) + 8;
  spinTimeTotal = totalRotations * 1000; // Adjust the multiplier for desired speed

  // Set up the spinning animation using setInterval
  var interval = 30;
  var steps = spinTimeTotal / interval;
  var currentStep = 0;

  var spinInterval = setInterval(function () {
    animateSpin();
    currentStep++;

    if (currentStep >= steps) {
      clearInterval(spinInterval);
      stopRotateWheel();
    }
  }, interval);
}

// Function to animate the spinning
function animateSpin() {
  spinTime += 30;

  var spinAngle = spinArcStart - easeOut(spinTime, 0, spinArcStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawSpinnerWheel();
}

// Function to stop the wheel
function stopRotateWheel() {
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
}

// Draw the initial wheel on page load
document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    // Use Promise.all to wait for both images to load
    Promise.all([
      new Promise(resolve => {
        logo.onload = () => resolve();
      }),
      new Promise(resolve => {
        arrow.onload = () => resolve();
      })
    ]).then(() => {
      // Once both images are loaded, draw them on the canvas
      drawSpinnerWheel();
    });
  }
});

// Easing function
function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}
