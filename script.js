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
    return 'WISDOM IS POWER';
  } else if (angle >= 45 && angle < 60) {
    return 'MINOR VICTORY';
  } else if (angle >= 60 && angle < 75) {
    return 'STANCE REVEAL';
  } else if (angle >= 75 && angle < 90) {
    return 'ARTIFACT KNOWLEDGE';
  } else if (angle >= 90 && angle < 105) {
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
