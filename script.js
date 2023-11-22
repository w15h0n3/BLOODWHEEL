function startWheel() {
    // Disable the button during wheel spinning to prevent multiple spins
    document.querySelector('button').disabled = true;
  
    // Generate a random angle for spinning (you may customize this logic)
    const randomAngle = Math.floor(Math.random() * 360) + 360 * 5; // Spin 5 times
  
    // Apply the rotation animation to the wheel
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'transform 4s ease-out'; // Adjust the duration as needed
    wheel.style.transform = `rotate(${randomAngle}deg)`;
  
    // Wait for the animation to finish and then display the prize
    setTimeout(() => {
      displayPrize(getPrize(randomAngle % 360));
      
      // Re-enable the button after the animation
      document.querySelector('button').disabled = false;
  
      // Reset the wheel rotation
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';
    }, 4000); // Adjust the timeout based on your animation duration
  }
  
  // Function to determine the prize based on the wheel angle
  function getPrize(angle) {
    // Add your logic to determine the prize based on the angle
    // You may use if statements, switch cases, or other methods
    if (angle >= 0 && angle < 60) {
      return 'Major Jackpot';
    } else if (angle >= 60 && angle < 120) {
      return 'Wisdom Bonus';
    } else if (angle >= 120 && angle < 180) {
      return 'Artifact Reveal';
    } else if (angle >= 180 && angle < 240) {
      return 'Minor Jackpot 1';
    } else if (angle >= 240 && angle < 300) {
      return 'Minor Jackpot 2';
    } else {
      return 'Lose';
    }
  }
  
  // Function to display the prize alert
  function displayPrize(prize) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('prize-alert');
    alertDiv.textContent = `Congratulations! You won: ${prize}`;
  
    document.body.appendChild(alertDiv);
  
    // Remove the alert after a few seconds (adjust as needed)
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
  