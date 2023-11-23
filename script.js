var colors = ["#4d0000", "#4d0000", "#4d0000", "#4d0000", "#4d0000", "#4d0000", "#4d0000", "#4d0000"];
var prizeDescriptions = ["MAJOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "WISDOM IS POWER", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "STANCE REVEAL", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "ARTIFACT KNOWLEDGE", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "SUMMON REFUND", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "MINOR VICTORY", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH", "DEATH"];

var startAngle = 0;
var arc = Math.PI / 4;
var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;

function drawSpinnerWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 
