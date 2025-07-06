const btn = document.getElementById('get-prob-btn');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const percentageText = document.getElementById('percentage');
const messageDiv = document.getElementById('random-message');

const messages = [
  "Like this!", "Wow!", "Interesting result!", "Surprising!", "Try again!", 
  "Unbelievable!", "Cool!", "That's fun!", "Unexpected!", "Fascinating!", 
  "What a number!", "Impressive!", "Nice!", "Haha!", "So random!", "Not bad!", "Are you lucky?"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomMessage() {
  return messages[getRandomInt(0, messages.length - 1)];
}

btn.addEventListener('click', () => {
  // Reset
  progressContainer.classList.remove('hidden');
  progressBar.style.width = '0%';
  percentageText.textContent = '0%';
  percentageText.style.color = '#333';
  messageDiv.classList.remove('visible');
  messageDiv.textContent = '';
  
  // Generate target percent
  const target = getRandomInt(0, 100);
  const animDuration = 1100 + getRandomInt(0, 500); // 1.1-1.6s animation
  progressBar.style.transition = `width ${animDuration}ms cubic-bezier(.55,.06,.68,.19)`;

  // Slight delay before animating the bar
  setTimeout(() => {
    progressBar.style.width = `${target}%`;

    // Animate percentage text counting up
    let start = 0;
    const stepTime = Math.max(18, Math.floor(animDuration / (target || 1)));
    const colorStops = [
      { pct: 0, color: "#ff6a00" },
      { pct: 50, color: "#f7971e" },
      { pct: 80, color: "#17ead9" },
      { pct: 100, color: "#6078ea" }
    ];
    function getColor(pct) {
      for (let i = colorStops.length - 1; i >= 0; i--) {
        if (pct >= colorStops[i].pct) return colorStops[i].color;
      }
      return colorStops[0].color;
    }

    const counter = setInterval(() => {
      if (start < target) {
        start++;
        percentageText.textContent = `${start}%`;
        percentageText.style.color = getColor(start);
      } else {
        clearInterval(counter);
        percentageText.textContent = `${target}%`;
        percentageText.style.color = getColor(target);
        // Show message with slight delay
        setTimeout(() => {
          messageDiv.textContent = getRandomMessage();
          messageDiv.classList.add('visible');
        }, 250);
      }
    }, stepTime);

  }, 300); // 300ms delay before animating bar
});