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
  if (angle >= 0 && angle < 15) {
    return 'MAJOR VICTORY';
  } else if (angle >= 15 && angle < 30) {
    return 'DEATH';
  } else if (angle >= 30 && angle < 45) {
    return 'DEATH';
  } else if (angle >= 45 && angle < 60) {
    return 'DEATH';
  } else if (angle >= 60 && angle < 75) {
    return 'DEATH';
  } else if (angle >= 75 && angle < 90) {
    return 'DEATH';
  } else if (angle >= 90 && angle < 105) {
    return 'DEATH';
  } else if (angle >= 105 && angle < 120) {
    return 'DEATH';
  } else if (angle >= 120 && angle < 135) {
    return 'DEATH';
  } else if (angle >= 135 && angle < 150) {
    return 'DEATH';
  } else if (angle >= 150 && angle < 165) {
    return 'DEATH';
  } else if (angle >= 165 && angle < 180) {
    return 'DEATH';
  } else if (angle >= 180 && angle < 195) {
    return 'DEATH';
  } else if (angle >= 195 && angle < 210) {
    return 'WISDOM IS POWER';
  } else if (angle >= 210 && angle < 225) {
    return 'DEATH';
  } else if (angle >= 225 && angle < 240) {
    return 'DEATH';
  } else if (angle >= 240 && angle < 255) {
    return 'DEATH';
  } else if (angle >= 255 && angle < 270) {
    return 'DEATH';
  } else if (angle >= 270 && angle < 285) {
    return 'DEATH';
  } else if (angle >= 285 && angle < 300) {
    return 'DEATH';
  } else if (angle >= 300 && angle < 315) {
    return 'DEATH';
  } else if (angle >= 315 && angle < 330) {
    return 'DEATH';
  } else if (angle >= 330 && angle < 345) {
    return 'DEATH';
  } else if (angle >= 345 && angle < 360) {
    return 'DEATH';
  } else {
    return 'UNKNOWN';
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
