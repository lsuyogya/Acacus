window.onload = () => {
  scrambleText('#scrambleText');
  gradientMove();
  initAos();
};

// function scrambleText(id) {
//   const textElement = document.querySelector(id);
//   const originalText = textElement.innerText;

//   gsap.registerPlugin(ScrambleTextPlugin, SplitText);

//   const split = new SplitText(textElement, { type: 'chars' });
//   const chars = split.chars;
//   debugger;
//   const animateScramble = () => {
//     // Reset all character colors to white
//     gsap.set(chars, { color: 'white' });

//     const tl = gsap.to(textElement, {
//       duration: 1,
//       scrambleText: {
//         text: originalText,
//         chars: 'uppercase',
//         revealDelay: 0.5,
//         speed: 2,
//       },
//       onUpdate: function () {
//         const progress = tl.progress(); // get timeline's progress (0 to 1)
//         const charsToColor = Math.floor(progress * chars.length);
//         chars.forEach((char, i) => {
//           gsap.set(char, {
//             color: i <= charsToColor ? 'black' : 'white',
//           });
//         });
//       },
//     });
//   };

//   // Initial animation
//   setTimeout(animateScramble, 500);

//   // Triggers
//   textElement.addEventListener('pointerover', animateScramble);
//   textElement.setAttribute('tabindex', '0');
//   textElement.addEventListener('focus', animateScramble);
// }

function scrambleText(id) {
  gsap.registerPlugin(SplitText);

  const textElement = document.querySelector(id);

  // Replace with spans
  textElement.innerHTML = textElement.textContent;

  const split = new SplitText(textElement, { type: 'chars' });
  const chars = split.chars;

  function animateSweep() {
    // Reset all to white
    gsap.set(chars, { color: 'white' });

    // Animate a black sweep left to right
    chars.forEach((char, i) => {
      gsap.to(char, {
        color: 'black',
        delay: i * 0.05,
        duration: 0.2,
      });
    });
  }

  textElement.addEventListener('pointerover', animateSweep);
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
