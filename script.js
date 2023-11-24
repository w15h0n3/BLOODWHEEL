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

// ... (previous code)

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
  // ... (existing drawSpinnerWheel code)
}

// ... (previous code)

// Define the function to spin the wheel with varying speeds
function spinWheel() {
  // Hide the prize win text
  document.getElementById('prizeText').textContent = '';

  spinTime = 0;

  // Set totalRotations for each second
  var totalRotations;
  if (spinTime < 1000) {
    totalRotations = 4; // First second: 4 rotations
  } else if (spinTime < 2000) {
    totalRotations = 3; // Second second: 3 rotations
  } else if (spinTime < 3000) {
    totalRotations = 2; // Third second: 2 rotations
  } else {
    totalRotations = 1; // Fourth second: 1 rotation
  }

  // Reduce the spinTimeTotal for a shorter spin
  spinTimeTotal = totalRotations * 360 * 5; // Adjust the multiplier for desired speed

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
}

// Define the easing function
function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

// Draw the initial wheel on page load
document.addEventListener("DOMContentLoaded", drawSpinnerWheel);

// ... (remaining code)
