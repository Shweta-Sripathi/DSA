import confetti from 'canvas-confetti';

export function firePastelConfetti() {
  const count = 75;
  const defaults = {
    origin: { y: 0.65 },
    colors: ['#D98880', '#A3B18A', '#FADBD8', '#F5CBA7', '#E8D7F1', '#C86D51', '#FAF7F2']
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireGrandFinaleConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#D98880', '#A3B18A', '#FADBD8', '#F5CBA7', '#E8D7F1', '#D4AF37', '#FAF7F2'];

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });
  }, 250);
}
