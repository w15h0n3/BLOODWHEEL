let wheelSpinning = false;

function startWheel() {
  // Enable spinning only if the wheel is not already spinning
  if (!wheelSpinning) {
    spinWheel();
  }
}

function spinWheel() {
  const wheel = document.getElementById('wheel');
  
  // Generate a random number of rotations (e.g., between 3 and 5 rotations)
  const randomRotations = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  
  // Calculate the total rotation angle for the wheel
  const totalRotation = randomRotations * 360;
  
  // Set up the animation
  wheel.style.transition = 'transform 3s cubic-bezier(0.4, 2.5, 0.35, 1)';
  wheel.style.transform = `rotate(${totalRotation}deg)`;

  // Disable the spin button during the animation
  document.querySelector('button').disabled = true;
  wheelSpinning = true;

  // After the animation completes, re-enable the spin button
  setTimeout(() => {
    wheel.style.transition = 'none';
    document.querySelector('button').disabled = false;
    wheelSpinning = false;
    calculatePrize(totalRotation % 360);
    wheel.style.transform = 'rotate(0deg)'; // Reset the wheel rotation
  }, 3000);
}

function calculatePrize(degrees) {
  // Calculate the prize based on the wheel rotation
  const prizeSections = ["Prize 1", "Prize 2"]; // Add more prizes as needed
  const sectionAngle = 360 / prizeSections.length;
  const index = Math.floor((degrees % 360) / sectionAngle);
  const prize = prizeSections[index];

  // Display an animated alert for the won prize
  const prizeAlert = document.createElement('div');
  prizeAlert.className = 'prize-alert';
  prizeAlert.textContent = `Congratulations! You won: ${prize}`;
  document.body.appendChild(prizeAlert);

  // Animate the alert and remove it after a delay
  setTimeout(() => {
    prizeAlert.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(prizeAlert);
    }, 500); // Adjust the duration based on your animation
  }, 3000); // Adjust the duration based on the spin duration
}
