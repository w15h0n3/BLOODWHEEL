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
  if (angle >= 0 && angle < 40) {
    return
