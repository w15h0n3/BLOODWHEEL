function startWheel() {
  document.querySelector('button').disabled = true;

  const randomAngle = Math.floor(Math.random() * 360) + 360 * 5;

  const wheel = document.getElementById('wheel');
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${randomAngle}deg)`;

  setTimeout(() => {
    const prize = getPrize(randomAngle % 360);
    displayPrize(prize);
    
    document.querySelector('button').disabled = false;

    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
  }, 4000);
}

function getPrize(angle) {
  if (angle >= 0 && angle < 45) {
    return 'MAJOR VICTORY';
  } else if (angle >= 45 && angle < 90) {
    return 'DEATH';
  } else if (angle >= 90 && angle < 135) {
    return 'WISDOM IS POWER';
  } else if (angle >= 135 && angle < 180) {
    return 'MINOR VICTORY';
  } else if (angle >= 180 && angle < 225) {
    return 'STANCE REVEAL';
  } else if (angle >= 225 && angle < 270) {
    return 'ARTIFACT KNOWLEDGE';
  } else if (angle >= 270 && angle < 315) {
    return 'SUMMON REFUND';
  } else {
    // Add conditions for other prizes
  }
}

function displayPrize(prize) {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('prize-alert');
  alertDiv.textContent = `Congratulations! You won: ${prize}`;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
