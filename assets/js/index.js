window.onload = () => {
  scrambleText('#scrambleText');
  gradientMove();
  initAos();
};

function scrambleText(id) {
  const textElement = document.querySelector(id);
  const originalText = textElement.innerText;

  gsap.registerPlugin(ScrambleTextPlugin);

  const animateScramble = () => {
    gsap.to(textElement, {
      duration: 1,
      scrambleText: {
        text: originalText,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        revealDelay: 0.5,
        speed: 2,
      },
    });
  };

  // Initial animation on page load
  setTimeout(animateScramble, 500);

  // Trigger on hover
  textElement.addEventListener('pointerover', animateScramble);

  //   // Trigger on focus (keyboard nav)
  //   textElement.setAttribute("tabindex", "0"); // make it focusable
  //   textElement.addEventListener("focus", animateScramble);
}

function gradientMove() {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    if (interBubble) {
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }
    requestAnimationFrame(move);
  }

  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
}

function initAos() {
  if (!AOS) return;
  AOS.init();
}
